import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const siteUrl = "https://taxpayersalliancepakistan.com";

const baseMetadata: Metadata = {
  applicationName: "Tax Payers Alliance Pakistan",
  authors: [{ name: "Tax Payers Alliance Pakistan", url: siteUrl }],
  creator: "Tax Payers Alliance Pakistan",
  publisher: "Tax Payers Alliance Pakistan",
  category: "Taxpayer Advocacy",
  title: {
    default: "Tax Payers Alliance Pakistan (TPAP) | Taxpayer Rights & Tax Reform Advocacy",
    template: "%s | Tax Payers Alliance Pakistan"
  },
  description:
    "TPAP is Pakistan's leading taxpayer advocacy alliance. We fight for lower taxes, simpler compliance, and transparent government spending. Join thousands of Pakistani taxpayers today.",
  keywords: [
    "Tax Payer Alliance Pakistan",
    "TPAP",
    "taxpayer advocacy",
    "tax reform Pakistan",
    "FBR reform",
    "taxpayer rights",
    "fiscal transparency",
  ],
  openGraph: {
    title: "Tax Payers Alliance Pakistan",
    description:
      "Pakistan's national taxpayer advocacy alliance for lower taxes, simpler compliance, and accountable government spending.",
    type: "website",
    locale: "en_PK",
    url: siteUrl,
    siteName: "Tax Payers Alliance Pakistan",
    images: [
      {
        url: "/brand/tpap-social-share.jpg",
        width: 1200,
        height: 630,
        alt: "Tax Payers Alliance Pakistan"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Tax Payers Alliance Pakistan",
    description:
      "Pakistan's national taxpayer advocacy alliance for fair taxation, simpler compliance, and accountable public spending.",
    images: ["/brand/tpap-social-share.jpg"]
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

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const path = requestHeaders.get("x-canonical-path") || "/";
  return {
    ...baseMetadata,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: new URL(path, siteUrl).toString() }
  };
}

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
