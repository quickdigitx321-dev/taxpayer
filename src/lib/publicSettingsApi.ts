import { apiFetch } from "./api";
import { WebsiteSettings } from "./adminApi";

export const fallbackSettings: WebsiteSettings = {
  siteTitle: "Tax Payer Alliance Pakistan",
  logoUrl: "",
  faviconUrl: "",
  contactEmail: "admin@taxpayersalliancepakistan.com",
  phone: "",
  address: "",
  facebook: "https://www.facebook.com/share/1HSmyqtAVT/",
  twitter: "https://x.com/tpap_prime",
  linkedin: "https://www.linkedin.com/company/tax-payers-alliance-pakistan-tpap/",
  instagram: "https://www.instagram.com/tpap_prime",
  whatsapp: "",
  footerText:
    "Pakistan's national taxpayer advocacy alliance for lower taxes, simpler compliance, fiscal transparency, and accountable government spending.",
  seoTitle: "Tax Payer Alliance Pakistan",
  seoDescription:
    "Tax Payer Alliance Pakistan represents taxpayers through research, policy advocacy, public education, and complaint support.",
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
