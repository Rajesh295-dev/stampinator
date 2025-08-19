// export default function Header() {
//   return (
//     <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70">
//       <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
//         <a href="/" className="group inline-flex items-center gap-2">
//           <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow" />
//           <span className="text-lg font-semibold tracking-tight">STAMPINATOR 🖋️</span>
//         </a>

//         <nav className="hidden items-center gap-6 sm:flex">
//           <a href="/designer" className="text-sm text-neutral-300 hover:text-white">Designer</a>
//           <a href="/catalog" className="text-sm text-neutral-300 hover:text-white">Catalog</a>
//           <a href="/pricing" className="text-sm text-neutral-300 hover:text-white">Pricing</a>
//           <a href="/quoteGenerator" className="text-sm text-neutral-300 hover:text-white">QuoteGenerator</a>
//           <a href="/orders" className="text-sm text-neutral-300 hover:text-white">Orders</a>
//         </nav>

//         <div className="flex items-center gap-3">
//           <a
//             href="/auth/signin"
//             className="rounded-xl border border-neutral-800 px-3 py-2 text-sm text-neutral-300 hover:border-neutral-700 hover:text-white"
//           >
//             Sign in
//           </a>
//           <a
//             href="/designer"
//             className="rounded-xl bg-emerald-500 px-3 py-2 text-sm font-medium text-neutral-950 hover:bg-emerald-400"
//           >
//             Start designing
//           </a>
//         </div>
//       </div>
//     </header>
//   );
// }



"use client";

import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "/designer", label: "Designer" },
  { href: "/catalog", label: "Catalog" },
  { href: "/pricing", label: "Pricing" },
  { href: "/quoteGenerator", label: "QuoteGenerator" },
  { href: "/orders", label: "Orders" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  // Close on Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Brand */}
        <a href="/" className="group inline-flex items-center gap-2">
          <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow" />
          <span className="text-lg font-semibold tracking-tight">STAMPINATOR 🖋️</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 sm:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-neutral-300 hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 sm:flex">
          <a
            href="/auth/signin"
            className="rounded-xl border border-neutral-800 px-3 py-2 text-sm text-neutral-300 hover:border-neutral-700 hover:text-white"
          >
            Sign in
          </a>
          <a
            href="/designer"
            className="rounded-xl bg-emerald-500 px-3 py-2 text-sm font-medium text-neutral-950 hover:bg-emerald-400"
          >
            Start designing
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
          className="sm:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800/80 hover:border-neutral-700"
        >
          <Menu className="h-5 w-5 text-neutral-200" />
        </button>
      </div>

      {/* Mobile overlay + panel */}
      {open && (
        <div className="sm:hidden">
          {/* Screen overlay */}
          <div
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />

          {/* Slide-down panel */}
          <div
            id="mobile-menu"
            className="fixed inset-x-0 top-0 z-40 origin-top animate-in slide-in-from-top duration-200"
            role="dialog"
            aria-modal="true"
          >
            <div className="mx-auto w-full max-w-7xl px-6">
              <div className="mt-3 rounded-2xl border border-neutral-800 bg-neutral-950/95 shadow-xl">
                {/* Panel header */}
                <div className="flex items-center justify-between px-4 py-4">
                  <a href="/" className="group inline-flex items-center gap-2" onClick={() => setOpen(false)}>
                    <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow" />
                    <span className="text-lg font-semibold tracking-tight">STAMPINATOR 🖋️</span>
                  </a>
                  <button
                    aria-label="Close menu"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800/80 hover:border-neutral-700"
                  >
                    <X className="h-5 w-5 text-neutral-200" />
                  </button>
                </div>

                {/* Links */}
                <nav className="px-4 pb-3">
                  <ul className="space-y-1">
                    {LINKS.map((l) => (
                      <li key={l.href}>
                        <a
                          href={l.href}
                          className="block rounded-xl px-3 py-2 text-[15px] text-neutral-200 hover:bg-neutral-800/60"
                          onClick={() => setOpen(false)}
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Actions */}
                <div className="border-t border-neutral-800 px-4 py-3">
                  <div className="flex gap-2">
                    <a
                      href="/auth/signin"
                      className="flex-1 rounded-xl border border-neutral-800 px-3 py-2 text-sm text-neutral-300 hover:border-neutral-700 hover:text-white text-center"
                      onClick={() => setOpen(false)}
                    >
                      Sign in
                    </a>
                    <a
                      href="/designer"
                      className="flex-1 rounded-xl bg-emerald-500 px-3 py-2 text-sm font-medium text-neutral-950 hover:bg-emerald-400 text-center"
                      onClick={() => setOpen(false)}
                    >
                      Start designing
                    </a>
                  </div>
                </div>
              </div>
              <div className="h-3" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

