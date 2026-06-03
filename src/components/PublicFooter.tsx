"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter
} from "lucide-react";
import { navItems } from "@/data/site";
import { fallbackSettings, getPublicSettings } from "@/lib/publicSettingsApi";

export function PublicFooter() {
  const [settings, setSettings] = useState(fallbackSettings);
  const socialLinks = [
    { href: settings.facebook, label: "Facebook", icon: Facebook },
    { href: settings.twitter, label: "X / Twitter", icon: Twitter },
    { href: settings.linkedin, label: "LinkedIn", icon: Linkedin },
    { href: settings.instagram, label: "Instagram", icon: Instagram }
  ].filter((item) => item.href);

  useEffect(() => {
    getPublicSettings()
      .then(setSettings)
      .catch(() => setSettings(fallbackSettings));
  }, []);

  return (
    <footer className="bg-charcoal-950 text-white">
      <div className="container-shell grid gap-10 py-14 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center overflow-hidden border border-gold-300/70 text-sm font-bold text-gold-200">
              {settings.logoUrl ? (
                <img
                  alt={settings.siteTitle}
                  className="h-full w-full object-contain"
                  src={settings.logoUrl}
                />
              ) : (
                "TP"
              )}
            </span>
            <div>
              <p className="text-sm font-semibold tracking-[0.2em]">TPAP</p>
              <p className="text-sm text-white/55">{settings.siteTitle}</p>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-7 text-white/58">
            {settings.footerText}
          </p>
          {socialLinks.length > 0 ? (
            <div className="mt-6 flex gap-3 text-white/70">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    aria-label={item.label}
                    className="grid size-10 place-items-center rounded-full border border-white/10 transition hover:border-gold-300 hover:text-gold-200"
                    href={item.href}
                    key={item.label}
                    target="_blank"
                  >
                    <Icon size={16} />
                  </Link>
                );
              })}
            </div>
          ) : null}
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold-200">
            Navigation
          </h3>
          <div className="mt-5 grid gap-3 text-sm text-white/62">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold-200">
            Contact
          </h3>
          <div className="mt-5 grid gap-4 text-sm text-white/62">
            <p className="flex gap-3">
              <MapPin size={18} className="mt-0.5 text-gold-300" />
              {settings.address || "Pakistan"}
            </p>
            <p className="flex gap-3">
              <Phone size={18} className="mt-0.5 text-gold-300" />
              {settings.phone || "Available through official contact channels"}
            </p>
            <p className="flex gap-3">
              <Mail size={18} className="mt-0.5 text-gold-300" />
              {settings.contactEmail}
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <p className="container-shell text-xs text-white/42">
          Copyright 2026 Tax Payer Alliance Pakistan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
