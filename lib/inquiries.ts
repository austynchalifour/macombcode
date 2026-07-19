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

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "inquiries.json");

async function ensureStore() {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    await readFile(DATA_FILE, "utf8");
  } catch {
    await writeFile(DATA_FILE, "[]\n", "utf8");
  }
}

export async function readInquiries(): Promise<Inquiry[]> {
  await ensureStore();

  try {
    const raw = await readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as Inquiry[];
    if (!Array.isArray(parsed)) return [];
    return parsed.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  } catch {
    return [];
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
  await writeFile(DATA_FILE, `${JSON.stringify(inquiries, null, 2)}\n`, "utf8");
  return inquiry;
}
