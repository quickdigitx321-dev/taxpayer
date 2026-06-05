import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://taxpayersalliancepakistan.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tax Payers Alliance Pakistan (TPAP) | Taxpayer Rights & Tax Reform Advocacy",
    template: "%s | Tax Payer Alliance Pakistan"
  },
  description:
    "TPAP is Pakistan's leading taxpayer advocacy alliance. We fight for lower taxes, simpler compliance, and transparent government spending. Join thousands of Pakistani taxpayers today.",
  keywords: [
    "Tax Payer Alliance Pakistan",
    "TPAP",
    "taxpayer advocacy",
    "tax reform Pakistan",
    "taxpayer rights Pakistan",
    "fiscal transparency",
    "government accountability",
    "taxpayer representation",
    "Taxpayer Association Pakistan",
    "Tax Complaints Pakistan",
    "Economic Policy Pakistan",
    "Public Finance Pakistan",
    "Taxpayer Community",
    "FBR Reforms",
    "SME Taxation Pakistan",
    "Government Spending Pakistan",
    "Ease of Doing Business Pakistan",
    "Withholding Tax Pakistan",
    "GST Pakistan",
    "Pakistan Finance Act",
    "Tax Simplification Pakistan"
  ],
  openGraph: {
    title: "Tax Payer Alliance Pakistan",
    description:
      "Pakistan's national taxpayer advocacy alliance for lower taxes, simpler compliance, and accountable government spending.",
    type: "website",
    locale: "en_PK"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
