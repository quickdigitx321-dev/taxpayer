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

  return (
    <div className="mt-10 grid gap-4 text-sm text-charcoal-650">
      <p className="flex gap-3 bg-white p-5 shadow-soft">
        <MapPin className="text-forest-700" size={20} />
        {settings.address || "Pakistan"}
      </p>
      <p className="flex gap-3 bg-white p-5 shadow-soft">
        <Phone className="text-forest-700" size={20} />
        {settings.phone || "Available through official contact channels"}
      </p>
      <p className="flex gap-3 bg-white p-5 shadow-soft">
        <Mail className="text-forest-700" size={20} />
        {settings.contactEmail}
      </p>
    </div>
  );
}
