#!/usr/bin/env node
/**
 * Pre-flight deploy check — validates everything needed for production
 *
 * Checks:
 *   1. All required env vars are set
 *   2. Supabase connection works
 *   3. Products bucket exists and has PDFs
 *   4. Stripe keys are configured
 *
 * Usage: node scripts/preflight-deploy.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "..", ".env.local") });

const REQUIRED_ENV = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "STRIPE_SECRET_KEY",
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
  "STRIPE_WEBHOOK_SECRET",
];

const EXPECTED_PDFS = [
  "defi-toolkit.pdf",
  "vibe-coder-kit.pdf",
  "ai-prompt-pack.pdf",
];

let pass = 0;
let fail = 0;
let warn = 0;

function ok(msg) { pass++; console.log(`  ✓ ${msg}`); }
function bad(msg) { fail++; console.error(`  ✗ ${msg}`); }
function warning(msg) { warn++; console.log(`  ⚠ ${msg}`); }

async function main() {
  console.log("═══════════════════════════════════════════════");
  console.log("  WolfPack Solution — Deploy Preflight Check");
  console.log("═══════════════════════════════════════════════\n");

  // ── 1. Environment variables ──
  console.log("1. Environment Variables");
  for (const key of REQUIRED_ENV) {
    const val = process.env[key];
    if (!val) {
      bad(`${key} — NOT SET`);
    } else if (val.startsWith("eyJ") || val.startsWith("sk_") || val.startsWith("pk_") || val.startsWith("whsec_")) {
      ok(`${key} — set (${val.slice(0, 12)}...)`);
    } else {
      ok(`${key} — set`);
    }
  }
  console.log();

  // ── 2. Supabase connection ──
  console.log("2. Supabase Connection");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    bad("Cannot test — missing SUPABASE_URL or SERVICE_ROLE_KEY");
    console.log();
  } else {
    const supabase = createClient(url, serviceKey);
    try {
      const { error } = await supabase.from("purchases").select("id").limit(1);
      if (error) {
        bad(`Purchases table: ${error.message}`);
      } else {
        ok("Purchases table accessible");
      }
    } catch (err) {
      bad(`Connection failed: ${err.message}`);
    }

    // ── 3. Storage bucket ──
    console.log();
    console.log("3. Products Storage Bucket");
    try {
      const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
      if (bucketError) {
        bad(`Cannot list buckets: ${bucketError.message}`);
      } else {
        const productsBucket = buckets.find((b) => b.id === "products");
        if (!productsBucket) {
          bad("Products bucket does not exist — run: node scripts/deploy-storage.mjs");
        } else {
          ok(`Products bucket exists (public: ${productsBucket.public})`);

          // Check files
          const { data: files, error: listError } = await supabase.storage.from("products").list();
          if (listError) {
            bad(`Cannot list files: ${listError.message}`);
          } else {
            for (const expected of EXPECTED_PDFS) {
              const found = files.find((f) => f.name === expected);
              if (found) {
                ok(`${expected} (${(found.metadata?.size / 1024 || 0).toFixed(1)} KB)`);
              } else {
                bad(`${expected} — MISSING from bucket`);
              }
            }
          }
        }
      }
    } catch (err) {
      bad(`Storage check failed: ${err.message}`);
    }
    console.log();
  }

  // ── 4. Stripe keys ──
  console.log("4. Stripe Configuration");
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (stripeKey?.startsWith("sk_test_")) {
    warning("Stripe is in TEST mode (sk_test_). Switch to live keys for production.");
  } else if (stripeKey?.startsWith("sk_live_")) {
    ok("Stripe is in LIVE mode");
  } else {
    bad("STRIPE_SECRET_KEY format not recognized");
  }
  console.log();

  // ── Summary ──
  console.log("═══════════════════════════════════════════════");
  if (fail === 0) {
    console.log(`  ✓ PREFLIGHT PASSED (${pass} checks passed, ${warn} warnings)`);
    console.log("  Ready for production deploy.");
  } else {
    console.log(`  ✗ PREFLIGHT FAILED (${fail} failures, ${pass} passed, ${warn} warnings)`);
    console.log("  Fix the issues above before deploying.");
  }
  console.log("═══════════════════════════════════════════════\n");

  process.exit(fail > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
