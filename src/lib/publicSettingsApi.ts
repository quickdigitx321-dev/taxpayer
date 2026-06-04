import { apiFetch } from "./api";
import { WebsiteSettings } from "./adminApi";

export const fallbackSettings: WebsiteSettings = {
  siteTitle: "Tax Payer Alliance Pakistan",
  logoUrl: "",
  faviconUrl: "",
  contactEmail: "admin@taxpayeralliancepakistan.com",
  phone: "",
  address: "",
  facebook: "",
  twitter: "",
  linkedin: "",
  instagram: "",
  whatsapp: "",
  footerText:
    "Official digital platform for TPAP membership, public submissions, leadership, articles, and taxpayer advocacy.",
  seoTitle: "Tax Payer Alliance Pakistan",
  seoDescription:
    "Official website of Tax Payer Alliance Pakistan for membership, taxpayer advocacy, articles, and public submissions.",
  analyticsCode: ""
};

export async function getPublicSettings() {
  const response = await apiFetch("/settings");
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Could not load website settings.");
  }

  return { ...fallbackSettings, ...data.settings } as WebsiteSettings;
}
