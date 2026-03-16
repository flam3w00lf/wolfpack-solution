"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";

interface DownloadButtonProps {
  token: string;
  fileName: string;
  fileUrl: string;
}

export function DownloadButton({ token, fileName, fileUrl }: DownloadButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDownload() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Download failed");
        setLoading(false);
        return;
      }

      // Trigger the actual file download
      window.location.href = fileUrl;
    } catch {
      setError("Download failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleDownload}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-xl bg-wolf-orange hover:bg-wolf-orange-dark text-white font-bold text-lg px-8 py-4 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/50 transition-all hover:scale-[1.03] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {loading ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
        {loading ? "Preparing..." : `Download ${fileName}`}
      </button>
      {error && (
        <p className="mt-3 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
