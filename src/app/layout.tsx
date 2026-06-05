import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://taxpayersalliancepakistan.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Tax Payers Alliance Pakistan",
  authors: [{ name: "Tax Payers Alliance Pakistan", url: siteUrl }],
  creator: "Tax Payers Alliance Pakistan",
  publisher: "Tax Payers Alliance Pakistan",
  category: "Taxpayer Advocacy",
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
    locale: "en_PK",
    url: siteUrl,
    siteName: "Tax Payers Alliance Pakistan",
    images: [
      {
        url: "/brand/tpap-logo-blue.png",
        width: 485,
        height: 201,
        alt: "Tax Payers Alliance Pakistan"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Tax Payers Alliance Pakistan",
    description:
      "Pakistan's national taxpayer advocacy alliance for fair taxation, simpler compliance, and accountable public spending.",
    images: ["/brand/tpap-logo-blue.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tax Payers Alliance Pakistan",
    alternateName: "TPAP",
    url: siteUrl,
    logo: `${siteUrl}/brand/tpap-logo-blue.png`,
    email: "admin@taxpayersalliancepakistan.com",
    areaServed: "Pakistan",
    description:
      "A national taxpayer advocacy alliance promoting fair taxation, simpler compliance, fiscal transparency, and accountable public spending."
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tax Payers Alliance Pakistan",
    alternateName: "TPAP",
    url: siteUrl,
    inLanguage: "en-PK",
    publisher: {
      "@type": "Organization",
      name: "Tax Payers Alliance Pakistan",
      url: siteUrl
    }
  };

  return (
    <html lang="en">
      <body>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, websiteSchema]).replace(/</g, "\\u003c")
          }}
          type="application/ld+json"
        />
      </body>
    </html>
  );
}
