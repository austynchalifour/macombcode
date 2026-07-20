import { get, put } from "@vercel/blob";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

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

function missingBlobError() {
  return new Error(
    "Vercel Blob is not connected. Set BLOB_STORE_ID (or ADMIN_PASSWORD_STORE_ID) and redeploy.",
  );
}

async function readBlobText(blobPath: string): Promise<string | null> {
  const result = await get(blobPath, {
    ...blobOptions(),
    useCache: false,
  });
  if (!result?.stream) return null;
  return new Response(result.stream).text();
}

async function writeBlobText(blobPath: string, content: string) {
  await put(blobPath, content, {
    ...blobOptions(),
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

async function ensureLocalDir(dir: string) {
  await mkdir(dir, { recursive: true });
}

export async function readJsonFile<T>(
  relativePath: string,
  fallback: T,
): Promise<T> {
  const blobPath = relativePath.replace(/\\/g, "/");
  const localPath = path.join(process.cwd(), relativePath);

  if (!shouldUseBlob()) {
    try {
      await ensureLocalDir(path.dirname(localPath));
      const raw = await readFile(localPath, "utf8");
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  }

  try {
    const raw = await readBlobText(blobPath);
    if (raw == null) return fallback;
    return JSON.parse(raw) as T;
  } catch (error) {
    if (!isVercelRuntime()) {
      try {
        const raw = await readFile(localPath, "utf8");
        return JSON.parse(raw) as T;
      } catch {
        return fallback;
      }
    }
    if (!hasBlobCredentials()) throw missingBlobError();
    throw error;
  }
}

export async function writeJsonFile<T>(
  relativePath: string,
  value: T,
): Promise<void> {
  const content = `${JSON.stringify(value, null, 2)}\n`;
  const blobPath = relativePath.replace(/\\/g, "/");
  const localPath = path.join(process.cwd(), relativePath);

  if (!shouldUseBlob()) {
    await ensureLocalDir(path.dirname(localPath));
    await writeFile(localPath, content, "utf8");
    return;
  }

  try {
    await writeBlobText(blobPath, content);
  } catch (error) {
    if (!isVercelRuntime()) {
      await ensureLocalDir(path.dirname(localPath));
      await writeFile(localPath, content, "utf8");
      return;
    }
    if (!hasBlobCredentials()) throw missingBlobError();
    throw error;
  }
}

export { DATA_DIR };
