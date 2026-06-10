"use client";

import { useEffect, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { fallbackSettings, getPublicSettings } from "@/lib/publicSettingsApi";

export function PublicContactDetails() {
  const [settings, setSettings] = useState(fallbackSettings);

  useEffect(() => {
    getPublicSettings()
      .then(setSettings)
      .catch(() => setSettings(fallbackSettings));
  }, []);

  const rows = [
    { Icon: MapPin, value: settings.address || "Pakistan" },
    { Icon: Phone, value: settings.phone || "Available through official contact channels" },
    { Icon: Mail, value: settings.contactEmail, href: `mailto:${settings.contactEmail}` }
  ];

  return (
    <div className="mt-8 grid gap-3">
      {rows.map(({ Icon, value, href }) => {
        const inner = (
          <>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-forest-50 text-forest-700 ring-1 ring-forest-100 transition-colors duration-150 group-hover:bg-forest-100 group-hover:ring-forest-300">
              <Icon size={16} strokeWidth={1.75} />
            </span>
            <span className="text-sm leading-6 text-charcoal-700">{value}</span>
          </>
        );

        return href ? (
          <a
            key={value}
            href={href}
            className="group flex items-center gap-4 border border-charcoal-100 bg-white px-5 py-4 transition-all duration-150 hover:border-forest-200 hover:shadow-[0_4px_16px_rgba(0,38,66,0.07)]"
          >
            {inner}
          </a>
        ) : (
          <div
            key={value}
            className="group flex items-center gap-4 border border-charcoal-100 bg-white px-5 py-4"
          >
            {inner}
          </div>
        );
      })}
    </div>
  );
}
