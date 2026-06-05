"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/data/site";
import { fallbackSettings, getPublicSettings } from "@/lib/publicSettingsApi";

export function PublicHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState(fallbackSettings);

  useEffect(() => {
    getPublicSettings()
      .then(setSettings)
      .catch(() => setSettings(fallbackSettings));
  }, []);

  return (
    <header className="absolute inset-x-0 top-0 z-30 border-b border-white/10 bg-forest-950/20 backdrop-blur-sm">
      <div className="container-shell flex h-20 items-center justify-between">
        <Link href="/" className="flex min-w-0 items-center gap-3 text-white">
          <span className="grid h-12 w-40 shrink-0 place-items-center overflow-hidden">
            {settings.logoUrl ? (
              <img
                alt={settings.siteTitle}
                className="h-full w-full object-contain"
                src={settings.logoUrl}
              />
            ) : (
              <img
                alt="TPAP"
                className="h-full w-full object-contain"
                src="/brand/tpap-logo-white.png"
              />
            )}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.14em] text-white/70 xl:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/membership"
            className="hidden rounded-full bg-gold-300 px-5 py-2.5 text-sm font-semibold text-charcoal-950 transition hover:bg-gold-200 sm:inline-flex"
          >
            Join TPAP
          </Link>
          <button
            className="grid size-10 place-items-center rounded-full border border-white/15 text-white xl:hidden"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="border-t border-white/10 bg-forest-950/95 px-4 py-4 shadow-premium xl:hidden">
          <nav className="container-shell grid gap-2 text-sm font-semibold text-white/76">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border border-white/10 px-4 py-3 hover:bg-white/10 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/membership"
              className="mt-2 rounded-full bg-gold-300 px-5 py-3 text-center text-sm font-bold text-charcoal-950"
              onClick={() => setIsOpen(false)}
            >
              Become a Member
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
