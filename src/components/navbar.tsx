"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/forge", label: "The Forge" },
  { href: "/blog", label: "Blog" },
  { href: "/community", label: "Community" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-wolf-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl transition-transform group-hover:scale-110">
            🐺
          </span>
          <span className="text-lg font-bold tracking-tight text-white">
            WolfPack
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm text-zinc-400 transition-colors hover:text-white rounded-md hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/forge"
            className="inline-flex h-9 items-center rounded-lg bg-wolf-orange px-4 text-sm font-medium text-white transition-all hover:bg-wolf-orange-dark hover:shadow-lg hover:shadow-orange-500/20"
          >
            Start Building
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-zinc-400 hover:text-white"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-wolf-bg/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 text-sm text-zinc-400 transition-colors hover:text-white rounded-md hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-white/5">
                <Link
                  href="/forge"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center rounded-lg bg-wolf-orange px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-wolf-orange-dark"
                >
                  Start Building
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
