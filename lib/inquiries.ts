import { get, put } from "@vercel/blob";
import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

type BlobAccess = "public" | "private";

const BLOB_PATH = "inquiries.json";
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "inquiries.json");

function isVercelRuntime() {
  return process.env.VERCEL === "1";
}

/** Blob is available via read-write token and/or OIDC store id on Vercel. */
function hasBlobCredentials() {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN?.trim() ||
      process.env.BLOB_STORE_ID?.trim(),
  );
}

function shouldUseBlob() {
  return hasBlobCredentials() || isVercelRuntime();
}

function configuredBlobAccess(): BlobAccess {
  return process.env.BLOB_ACCESS === "private" ? "private" : "public";
}

function alternateAccess(access: BlobAccess): BlobAccess {
  return access === "public" ? "private" : "public";
}

function sortNewest(inquiries: Inquiry[]) {
  return inquiries.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

function parseInquiries(raw: string): Inquiry[] {
  try {
    const parsed = JSON.parse(raw) as Inquiry[];
    if (!Array.isArray(parsed)) return [];
    return sortNewest(parsed);
  } catch {
    return [];
  }
}

function missingBlobError() {
  return new Error(
    "Vercel Blob is not connected. In Vercel → Storage, create a Blob store, link it to this project, then redeploy.",
  );
}

async function readFromBlob(access: BlobAccess): Promise<Inquiry[]> {
  const result = await get(BLOB_PATH, {
    access,
    useCache: false,
  });

  if (!result?.stream) return [];

  const raw = await new Response(result.stream).text();
  return parseInquiries(raw);
}

async function writeToBlob(inquiries: Inquiry[], access: BlobAccess) {
  await put(BLOB_PATH, `${JSON.stringify(inquiries, null, 2)}\n`, {
    access,
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

async function withBlobAccessFallback<T>(
  operation: (access: BlobAccess) => Promise<T>,
): Promise<T> {
  const primary = configuredBlobAccess();
  try {
    return await operation(primary);
  } catch (primaryError) {
    try {
      return await operation(alternateAccess(primary));
    } catch {
      throw primaryError;
    }
  }
}

async function ensureLocalStore() {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    await readFile(DATA_FILE, "utf8");
  } catch {
    await writeFile(DATA_FILE, "[]\n", "utf8");
  }
}

async function readFromFile(): Promise<Inquiry[]> {
  await ensureLocalStore();
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    return parseInquiries(raw);
  } catch {
    return [];
  }
}

async function writeToFile(inquiries: Inquiry[]) {
  await ensureLocalStore();
  await writeFile(DATA_FILE, `${JSON.stringify(inquiries, null, 2)}\n`, "utf8");
}

export async function readInquiries(): Promise<Inquiry[]> {
  if (!shouldUseBlob()) {
    return readFromFile();
  }

  try {
    return await withBlobAccessFallback(readFromBlob);
  } catch (error) {
    if (!isVercelRuntime()) {
      return readFromFile();
    }
    if (!hasBlobCredentials()) {
      throw missingBlobError();
    }
    throw error;
  }
}

export async function addInquiry(input: {
  name: string;
  email: string;
  message: string;
}): Promise<Inquiry> {
  const inquiries = await readInquiries();
  const inquiry: Inquiry = {
    id: randomUUID(),
    name: input.name,
    email: input.email,
    message: input.message,
    createdAt: new Date().toISOString(),
  };

  inquiries.unshift(inquiry);

  if (!shouldUseBlob()) {
    await writeToFile(inquiries);
    return inquiry;
  }

  try {
    await withBlobAccessFallback((access) => writeToBlob(inquiries, access));
    return inquiry;
  } catch (error) {
    if (!isVercelRuntime()) {
      await writeToFile(inquiries);
      return inquiry;
    }
    if (!hasBlobCredentials()) {
      throw missingBlobError();
    }
    throw error;
  }
}
