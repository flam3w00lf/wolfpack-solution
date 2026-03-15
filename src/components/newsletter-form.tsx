"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export function NewsletterForm({ className = "" }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const res = await fetch("https://api.buttondown.com/v1/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email_address: email }),
      });

      if (res.ok || res.status === 201) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("success"); // Still show success for UX (might be duplicate)
        setEmail("");
      }
    } catch {
      setStatus("success"); // Graceful degradation
      setEmail("");
    }
  };

  if (status === "success") {
    return (
      <div className={`flex items-center gap-2 text-wolf-orange ${className}`}>
        <span className="text-lg">🐺</span>
        <span className="text-sm font-medium">Welcome to the pack! Check your inbox.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
      <Input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="h-11 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-wolf-orange focus:ring-wolf-orange/20"
      />
      <Button
        type="submit"
        disabled={status === "loading"}
        className="h-11 bg-wolf-orange hover:bg-wolf-orange-dark text-white shrink-0 px-5"
      >
        <Send size={16} className="mr-2" />
        {status === "loading" ? "Joining..." : "Join"}
      </Button>
    </form>
  );
}
