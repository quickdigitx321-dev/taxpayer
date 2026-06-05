import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tax Payers Alliance Pakistan",
    short_name: "TPAP",
    description:
      "Pakistan's national taxpayer advocacy alliance for fair taxation, simpler compliance, and accountable public spending.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#003c77",
    icons: [
      {
        src: "/brand/tpap-logo-blue.png",
        sizes: "485x201",
        type: "image/png"
      }
    ]
  };
}
