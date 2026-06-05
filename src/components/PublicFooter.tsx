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
import { fallbackSettings, getPublicSettings } from "@/lib/publicSettingsApi";

const exploreLinks = [
  { label: "About TPAP", href: "/about" },
  { label: "Policy Advocacy", href: "/policy-advocacy" },
  { label: "Leadership", href: "/leadership" },
  { label: "Blogs & Insights", href: "/blogs" },
  { label: "Press Releases", href: "/press-releases" }
];

const involvementLinks = [
  { label: "Become a Member", href: "/membership" },
  { label: "Submit a Complaint", href: "/complaints" },
  { label: "Partner With Us", href: "/partner-with-us" },
  { label: "Careers", href: "/careers" },
  { label: "Contact TPAP", href: "/contact" },
  { label: "Frequently Asked Questions", href: "/faq" }
];

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
      <div className="container-shell grid gap-10 py-14 md:grid-cols-2 xl:grid-cols-[1.3fr_0.75fr_0.85fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-16 w-48 place-items-center overflow-hidden">
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
            Explore TPAP
          </h3>
          <div className="mt-5 grid gap-3 text-sm text-white/62">
            {exploreLinks.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold-200">
            Get Involved
          </h3>
          <div className="mt-5 grid gap-3 text-sm text-white/62">
            {involvementLinks.map((item) => (
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
        <div className="container-shell flex flex-col gap-3 text-xs text-white/42 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 Tax Payer Alliance Pakistan. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link className="hover:text-white" href="/privacy-policy">Privacy Policy</Link>
            <Link className="hover:text-white" href="/terms-of-use">Terms of Use</Link>
            <Link className="hover:text-white" href="/media-press">Media &amp; Press</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
