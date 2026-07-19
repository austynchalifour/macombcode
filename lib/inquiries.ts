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

const BLOB_PATH = "inquiries.json";
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "inquiries.json");

function isVercelRuntime() {
  return process.env.VERCEL === "1";
}

function getBlobStoreId() {
  return (
    process.env.BLOB_STORE_ID?.trim() ||
    process.env.ADMIN_PASSWORD_STORE_ID?.trim() ||
    ""
  );
}

/** Blob is available via read-write token and/or OIDC store id on Vercel. */
function hasBlobCredentials() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim() || getBlobStoreId());
}

function shouldUseBlob() {
  return hasBlobCredentials() || isVercelRuntime();
}

function blobOptions() {
  const storeId = getBlobStoreId();
  return {
    access: "private" as const,
    ...(storeId ? { storeId } : {}),
  };
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
    "Vercel Blob is not connected. Set BLOB_STORE_ID (or ADMIN_PASSWORD_STORE_ID) and redeploy.",
  );
}

async function readFromBlob(): Promise<Inquiry[]> {
  const result = await get(BLOB_PATH, {
    ...blobOptions(),
    useCache: false,
  });

  if (!result?.stream) return [];

  const raw = await new Response(result.stream).text();
  return parseInquiries(raw);
}

async function writeToBlob(inquiries: Inquiry[]) {
  await put(BLOB_PATH, `${JSON.stringify(inquiries, null, 2)}\n`, {
    ...blobOptions(),
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
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
    return await readFromBlob();
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
    await writeToBlob(inquiries);
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
