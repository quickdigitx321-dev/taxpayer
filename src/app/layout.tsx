import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://taxpayersalliancepakistan.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tax Payer Alliance Pakistan",
    template: "%s | Tax Payer Alliance Pakistan"
  },
  description:
    "Official website of Tax Payer Alliance Pakistan for membership, taxpayer advocacy, public submissions, leadership updates, and articles.",
  keywords: [
    "Tax Payer Alliance Pakistan",
    "TPAP",
    "taxpayer advocacy",
    "membership Pakistan",
    "taxpayer representation"
  ],
  openGraph: {
    title: "Tax Payer Alliance Pakistan",
    description:
      "Official digital platform for TPAP membership, advocacy, complaints, leadership, and articles.",
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
