/**
 * Upload product PDFs to Supabase Storage
 *
 * Prerequisites:
 *   - SUPABASE_SERVICE_ROLE_KEY must be set in .env.local
 *   - Run the storage-migration.sql first (creates the 'products' bucket)
 *
 * Usage: node scripts/upload-products.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "..", ".env.local") });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const BUCKET = "products";
const PRODUCTS_DIR = join(__dirname, "..", "private", "products");

const FILES = [
  "defi-toolkit.pdf",
  "vibe-coder-kit.pdf",
  "ai-prompt-pack.pdf",
];

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function ensureBucket() {
  // Try to create the bucket (idempotent)
  const { error } = await supabase.storage.createBucket(BUCKET, {
    public: false,
    fileSizeLimit: 10485760, // 10MB
    allowedMimeTypes: ["application/pdf"],
  });
  if (error && !error.message.includes("already exists")) {
    console.error("Bucket creation failed:", error.message);
    // Continue anyway — bucket may already exist via SQL migration
  } else {
    console.log(`✓ Bucket '${BUCKET}' ready`);
  }
}

async function uploadFile(fileName) {
  const filePath = join(PRODUCTS_DIR, fileName);
  const fileBuffer = readFileSync(filePath);

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, fileBuffer, {
      contentType: "application/pdf",
      upsert: true,
    });

  if (error) {
    console.error(`✗ ${fileName}: ${error.message}`);
    return false;
  }
  console.log(`✓ ${fileName} uploaded (${fileBuffer.length} bytes) → ${data.path}`);
  return true;
}

async function main() {
  console.log(`Supabase URL: ${SUPABASE_URL}`);
  console.log(`Using key type: ${process.env.SUPABASE_SERVICE_ROLE_KEY ? "service_role" : "anon (limited)"}\n`);

  await ensureBucket();

  let success = 0;
  for (const file of FILES) {
    if (await uploadFile(file)) success++;
  }

  console.log(`\n${success}/${FILES.length} files uploaded successfully`);
  if (success < FILES.length) {
    console.log("\nIf uploads failed, ensure SUPABASE_SERVICE_ROLE_KEY is set in .env.local");
    console.log("Find it at: Supabase Dashboard > Settings > API > service_role key");
  }
}

main().catch(console.error);
