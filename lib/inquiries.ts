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

function useBlobStore() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
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

async function readFromBlob(): Promise<Inquiry[]> {
  const result = await get(BLOB_PATH, {
    access: "private",
    useCache: false,
  });

  if (!result?.stream) return [];

  const raw = await new Response(result.stream).text();
  return parseInquiries(raw);
}

async function writeToBlob(inquiries: Inquiry[]) {
  await put(BLOB_PATH, `${JSON.stringify(inquiries, null, 2)}\n`, {
    access: "private",
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
  if (useBlobStore()) {
    return readFromBlob();
  }

  if (process.env.VERCEL) {
    throw new Error(
      "BLOB_READ_WRITE_TOKEN is missing. Create a Blob store in the Vercel project so inquiries can persist.",
    );
  }

  return readFromFile();
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

  if (useBlobStore()) {
    await writeToBlob(inquiries);
  } else if (process.env.VERCEL) {
    throw new Error(
      "BLOB_READ_WRITE_TOKEN is missing. Create a Blob store in the Vercel project so inquiries can persist.",
    );
  } else {
    await writeToFile(inquiries);
  }

  return inquiry;
}
