"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const avatarUrl = user?.user_metadata?.avatar_url;
  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.user_name ||
    user?.email?.split("@")[0];

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
          {loading ? (
            <div className="h-8 w-8 rounded-full bg-white/5 animate-pulse" />
          ) : user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/5"
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt=""
                    className="h-7 w-7 rounded-full border border-white/10"
                  />
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-wolf-orange/20 border border-wolf-orange/30">
                    <User size={14} className="text-wolf-orange" />
                  </div>
                )}
                <span className="text-sm text-zinc-300 max-w-[120px] truncate">
                  {displayName}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-zinc-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-wolf-card shadow-2xl overflow-hidden"
                  >
                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      <User size={15} />
                      Profile
                    </Link>
                    <button
                      onClick={async () => {
                        setDropdownOpen(false);
                        await signOut();
                      }}
                      className="flex w-full items-center gap-2 px-4 py-3 text-sm text-zinc-400 transition-colors hover:bg-red-500/10 hover:text-red-400 border-t border-white/5"
                    >
                      <LogOut size={15} />
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="px-3 py-2 text-sm text-zinc-400 transition-colors hover:text-white rounded-md hover:bg-white/5"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="inline-flex h-9 items-center rounded-lg bg-wolf-orange px-4 text-sm font-medium text-white transition-all hover:bg-wolf-orange-dark hover:shadow-lg hover:shadow-orange-500/20"
              >
                Join the Pack
              </Link>
            </>
          )}
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
                {user ? (
                  <div className="space-y-1">
                    <Link
                      href="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 px-3 py-2.5 text-sm text-zinc-400 transition-colors hover:text-white rounded-md hover:bg-white/5"
                    >
                      <User size={16} />
                      Profile
                    </Link>
                    <button
                      onClick={async () => {
                        setIsOpen(false);
                        await signOut();
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2.5 text-sm text-zinc-400 transition-colors hover:text-red-400 rounded-md hover:bg-red-500/10"
                    >
                      <LogOut size={16} />
                      Sign out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2.5 text-sm text-zinc-400 transition-colors hover:text-white rounded-md hover:bg-white/5"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-center rounded-lg bg-wolf-orange px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-wolf-orange-dark"
                    >
                      Join the Pack
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
