#!/usr/bin/env node
/**
 * Deploy Storage — One-command setup for Supabase products bucket
 *
 * Creates the bucket, applies RLS policies, uploads all product PDFs.
 * Idempotent — safe to run multiple times.
 *
 * Prerequisites:
 *   SUPABASE_SERVICE_ROLE_KEY must be set in .env.local
 *
 * Usage: node scripts/deploy-storage.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
config({ path: join(ROOT, ".env.local") });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const BUCKET = "products";
const PRODUCTS_DIR = join(ROOT, "private", "products");

const FILES = [
  "defi-toolkit.pdf",
  "vibe-coder-kit.pdf",
  "ai-prompt-pack.pdf",
];

// ── Preflight checks ──────────────────────────────────────────────
function preflight() {
  const issues = [];

  if (!SUPABASE_URL) issues.push("NEXT_PUBLIC_SUPABASE_URL not set in .env.local");
  if (!SERVICE_KEY) {
    issues.push(
      "SUPABASE_SERVICE_ROLE_KEY not set in .env.local\n" +
      "  → Get it from: Supabase Dashboard > Settings > API > service_role (secret)\n" +
      "  → Add to .env.local: SUPABASE_SERVICE_ROLE_KEY=eyJ..."
    );
  }

  for (const f of FILES) {
    const p = join(PRODUCTS_DIR, f);
    if (!existsSync(p)) issues.push(`Missing PDF: ${p}`);
  }

  if (issues.length > 0) {
    console.error("\n✗ Preflight failed:\n");
    issues.forEach((i) => console.error(`  • ${i}`));
    console.error("");
    process.exit(1);
  }

  console.log("✓ Preflight passed");
  console.log(`  URL: ${SUPABASE_URL}`);
  console.log(`  Key: service_role (${SERVICE_KEY.slice(0, 20)}...)`);
  console.log(`  PDFs: ${FILES.length} files ready\n`);
}

// ── Step 1: Create bucket ─────────────────────────────────────────
async function createBucket(supabase) {
  console.log("Step 1: Creating products bucket...");

  const { error } = await supabase.storage.createBucket(BUCKET, {
    public: false,
    fileSizeLimit: 10485760, // 10 MB
    allowedMimeTypes: ["application/pdf"],
  });

  if (error) {
    if (error.message.includes("already exists")) {
      console.log("  ✓ Bucket already exists (skipped)");
      return true;
    }
    console.error(`  ✗ Bucket creation failed: ${error.message}`);
    return false;
  }

  console.log("  ✓ Bucket created (private, PDF-only, 10MB limit)");
  return true;
}

// ── Step 2: Apply RLS policies via SQL ────────────────────────────
async function applyPolicies(supabase) {
  console.log("Step 2: Applying storage RLS policies...");

  const policies = [
    {
      name: "Service role can upload products",
      sql: `CREATE POLICY "Service role can upload products" ON storage.objects FOR INSERT TO service_role WITH CHECK (bucket_id = 'products');`,
    },
    {
      name: "Service role can update products",
      sql: `CREATE POLICY "Service role can update products" ON storage.objects FOR UPDATE TO service_role USING (bucket_id = 'products');`,
    },
    {
      name: "Service role can delete products",
      sql: `CREATE POLICY "Service role can delete products" ON storage.objects FOR DELETE TO service_role USING (bucket_id = 'products');`,
    },
    {
      name: "Service role can read products",
      sql: `CREATE POLICY "Service role can read products" ON storage.objects FOR SELECT TO service_role USING (bucket_id = 'products');`,
    },
  ];

  let applied = 0;
  for (const p of policies) {
    const { error } = await supabase.rpc("exec_sql", { query: p.sql }).maybeSingle();
    if (error) {
      if (error.message.includes("already exists")) {
        console.log(`  ✓ "${p.name}" (already exists)`);
        applied++;
      } else {
        // Policy application via rpc may not be available — try direct approach
        console.log(`  ⚠ "${p.name}" — run storage-migration.sql manually if policies are missing`);
      }
    } else {
      console.log(`  ✓ "${p.name}"`);
      applied++;
    }
  }

  if (applied === 0) {
    console.log("  ℹ Policies may need manual application via SQL Editor:");
    console.log("    Dashboard > SQL Editor > paste supabase/storage-migration.sql > Run");
  }

  return true;
}

// ── Step 3: Upload PDFs ───────────────────────────────────────────
async function uploadFiles(supabase) {
  console.log("Step 3: Uploading product PDFs...");

  let success = 0;
  for (const fileName of FILES) {
    const filePath = join(PRODUCTS_DIR, fileName);
    const fileBuffer = readFileSync(filePath);

    const { data, error } = await supabase.storage
      .from(BUCKET)
      .upload(fileName, fileBuffer, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (error) {
      console.error(`  ✗ ${fileName}: ${error.message}`);
    } else {
      console.log(`  ✓ ${fileName} (${(fileBuffer.length / 1024).toFixed(1)} KB) → ${data.path}`);
      success++;
    }
  }

  return success;
}

// ── Step 4: Verify ────────────────────────────────────────────────
async function verify(supabase) {
  console.log("Step 4: Verifying uploads...");

  const { data, error } = await supabase.storage.from(BUCKET).list();

  if (error) {
    console.error(`  ✗ Could not list bucket: ${error.message}`);
    return false;
  }

  const uploaded = data.map((f) => f.name);
  const missing = FILES.filter((f) => !uploaded.includes(f));

  if (missing.length > 0) {
    console.error(`  ✗ Missing files: ${missing.join(", ")}`);
    return false;
  }

  console.log(`  ✓ All ${FILES.length} files verified in bucket`);

  // Test download
  for (const fileName of FILES) {
    const { data: dlData, error: dlError } = await supabase.storage
      .from(BUCKET)
      .download(fileName);

    if (dlError) {
      console.error(`  ✗ Download test failed for ${fileName}: ${dlError.message}`);
      return false;
    }
    const size = (await dlData.arrayBuffer()).byteLength;
    console.log(`  ✓ Download test: ${fileName} (${(size / 1024).toFixed(1)} KB)`);
  }

  return true;
}

// ── Main ──────────────────────────────────────────────────────────
async function main() {
  console.log("═══════════════════════════════════════════════");
  console.log("  WolfPack Solution — Storage Deploy");
  console.log("═══════════════════════════════════════════════\n");

  preflight();

  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

  const bucketOk = await createBucket(supabase);
  if (!bucketOk) process.exit(1);

  await applyPolicies(supabase);

  const uploaded = await uploadFiles(supabase);
  if (uploaded < FILES.length) {
    console.error(`\n✗ Only ${uploaded}/${FILES.length} files uploaded. Fix errors and re-run.`);
    process.exit(1);
  }

  const verified = await verify(supabase);

  console.log("\n═══════════════════════════════════════════════");
  if (verified) {
    console.log("  ✓ STORAGE DEPLOY COMPLETE");
    console.log("  Products bucket is live with all PDFs.");
    console.log("  Download API will now serve from Supabase Storage.");
  } else {
    console.log("  ⚠ DEPLOY PARTIALLY COMPLETE");
    console.log("  Files uploaded but verification had issues.");
    console.log("  Check the errors above.");
  }
  console.log("═══════════════════════════════════════════════\n");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
