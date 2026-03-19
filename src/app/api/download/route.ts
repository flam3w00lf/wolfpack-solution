import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { readFile } from "fs/promises";
import path from "path";

const PRODUCT_FILES: Record<string, string> = {
  "defi-yield-farming-toolkit": "defi-toolkit.pdf",
  "vibe-coder-starter-kit": "vibe-coder-kit.pdf",
  "ai-code-prompt-pack": "ai-prompt-pack.pdf",
};

// Supabase Storage bucket for paid products
const STORAGE_BUCKET = "products";

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  const supabase = getSupabaseAdmin();

  const { data: purchase, error } = await supabase
    .from("purchases")
    .select("*")
    .eq("download_token", token)
    .single();

  if (error || !purchase) {
    return NextResponse.json({ error: "Invalid token" }, { status: 404 });
  }

  const now = new Date();
  const expiresAt = new Date(purchase.expires_at);

  if (now > expiresAt) {
    return NextResponse.json({ error: "Token expired" }, { status: 410 });
  }

  if (purchase.download_count >= 5) {
    return NextResponse.json({ error: "Download limit reached" }, { status: 429 });
  }

  const fileName = PRODUCT_FILES[purchase.product_slug];
  if (!fileName) {
    return NextResponse.json({ error: "Product file not found" }, { status: 404 });
  }

  // Increment download count
  await supabase
    .from("purchases")
    .update({ download_count: purchase.download_count + 1 })
    .eq("id", purchase.id);

  // Try Supabase Storage first (production), fall back to local file (dev)
  let fileBuffer: Buffer | null = null;

  const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (hasServiceKey) {
    try {
      const { data, error: storageError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .download(fileName);

      if (!storageError && data) {
        const arrayBuffer = await data.arrayBuffer();
        fileBuffer = Buffer.from(arrayBuffer);
      } else if (storageError) {
        console.error(`Supabase Storage error for ${fileName}: ${storageError.message}`);
      }
    } catch (err) {
      console.error(`Supabase Storage exception for ${fileName}:`, err);
    }
  }

  if (!fileBuffer) {
    // Fallback: local file (works in dev, and on Vercel if PDFs are bundled)
    try {
      const filePath = path.join(process.cwd(), "private", "products", fileName);
      fileBuffer = await readFile(filePath);
    } catch {
      console.error(
        `PDF not found: ${fileName}. ` +
        (hasServiceKey
          ? "Check that the 'products' bucket exists in Supabase Storage and PDFs are uploaded."
          : "SUPABASE_SERVICE_ROLE_KEY is not set — add it in Vercel Environment Variables.")
      );
      return NextResponse.json({ error: "File not available" }, { status: 500 });
    }
  }

  return new NextResponse(new Uint8Array(fileBuffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Content-Length": fileBuffer.length.toString(),
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
