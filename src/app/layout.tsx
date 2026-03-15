import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "WolfPack Solution \u2014 AI Tools for Entrepreneurs Who Build",
    template: "%s | WolfPack Solution",
  },
  description:
    "AI tools, frameworks, and a gamified learning platform for entrepreneurs who ship. No fluff. No buzzwords. Just tools that work.",
  keywords: [
    "AI tools",
    "entrepreneur",
    "AI agents",
    "prompt engineering",
    "developer tools",
    "WolfPack",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
