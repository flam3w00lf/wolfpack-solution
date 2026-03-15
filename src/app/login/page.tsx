"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Mail, Github, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Check your email for the magic link — the pack awaits.");
    }
    setLoading(false);
  };

  const handleOAuth = async (provider: "github" | "google") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) setError(error.message);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <span className="text-5xl">🐺</span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white">
            Welcome back, wolf
          </h1>
          <p className="mt-2 text-zinc-400">
            Sign in to your WolfPack account
          </p>
        </div>

        <div className="rounded-xl border border-wolf-border bg-wolf-card p-8 shadow-2xl">
          {/* OAuth buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleOAuth("github")}
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-all hover:bg-white/10 hover:border-white/20"
            >
              <Github size={18} />
              Continue with GitHub
            </button>
            <button
              onClick={() => handleOAuth("google")}
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-all hover:bg-white/10 hover:border-white/20"
            >
              <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-wolf-card px-3 text-zinc-500">
                or use email
              </span>
            </div>
          </div>

          {/* Email magic link */}
          <form onSubmit={handleMagicLink} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-300"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="wolf@pack.dev"
                required
                className="mt-1.5 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-wolf-orange focus:outline-none focus:ring-1 focus:ring-wolf-orange transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-wolf-orange px-4 py-3 text-sm font-medium text-white transition-all hover:bg-wolf-orange-dark hover:shadow-lg hover:shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Mail size={18} />
              )}
              Send Magic Link
            </button>
          </form>

          {/* Messages */}
          {message && (
            <p className="mt-4 rounded-lg bg-green-500/10 border border-green-500/20 p-3 text-center text-sm text-green-400">
              {message}
            </p>
          )}
          {error && (
            <p className="mt-4 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-center text-sm text-red-400">
              {error}
            </p>
          )}
        </div>

        <p className="text-center text-sm text-zinc-500">
          New to the pack?{" "}
          <Link
            href="/signup"
            className="text-wolf-orange transition-colors hover:text-wolf-orange-light"
          >
            Join the Pack
          </Link>
        </p>
      </div>
    </div>
  );
}
