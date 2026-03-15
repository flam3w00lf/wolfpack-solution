import Link from "next/link";

const footerLinks = {
  Products: [
    { label: "VibeSniffer", href: "/products/vibesniffer" },
    { label: "Vibe Coder Kit", href: "/products/vibe-coder-starter-kit" },
    { label: "DeFi Toolkit", href: "/products/defi-yield-farming-toolkit" },
    { label: "All Products", href: "/products" },
  ],
  Platform: [
    { label: "The Forge", href: "/forge" },
    { label: "Community", href: "/community" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-wolf-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🐺</span>
              <span className="text-lg font-bold text-white">WolfPack</span>
            </Link>
            <p className="mt-3 text-sm text-zinc-500 max-w-xs">
              AI tools for entrepreneurs who build. No fluff. No buzzwords. Just
              tools that work.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white">{title}</h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-500 transition-colors hover:text-wolf-orange"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} WolfPack Solution. Built by AI,
            for humans.
          </p>
          <p className="text-xs text-zinc-600">
            Part of the 🐺 WolfPack ecosystem
          </p>
        </div>
      </div>
    </footer>
  );
}
