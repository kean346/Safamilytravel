import type { Metadata, Viewport } from "next";
import { site } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "SA Family Travel | Extraordinary Places. Together.",
  description: "Thoughtfully curated South African family journeys. Discover luxury safaris, Cape Town, the Garden Route and coastal escapes with 25+ years of experience.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "SA Family Travel | Extraordinary Places. Together.",
    description: "Wild places. Wonderful memories. Discover South Africa with a journey shaped around your family.",
    url: site.url,
    siteName: site.name,
    locale: "en_ZA",
    type: "website",
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#f8f5ef" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-ZA"><body><a className="skip-link" href="#main-content">Skip to content</a>{children}</body></html>;
}
