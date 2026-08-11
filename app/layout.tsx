import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// Real display typeface (was falling back to plain system Georgia before —
// that's what made the header wordmark look "very normal"). Loaded once
// here and exposed as a CSS variable so every font-display usage site-wide
// (headings, the logo wordmark) picks it up automatically.
const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

// SEO: title + description written to target "guided tour" and "tower
// access" alongside "tickets" — the current top-ranking competitor page
// only optimizes for "tickets" (see analysis doc). Keep this unique per
// page as you add /guided-tours, /tower-access, etc.
//
// metadataBase MUST be your real deployed domain — it's used to resolve
// canonical URLs and OG image URLs. Update this if you attach a custom
// domain in Vercel (it was previously left as the example.com placeholder,
// which would have made canonical/OG URLs wrong on every page).

// Default social-share image — used whenever a page doesn't set its own
// (blog posts override this with their own photo in generateMetadata).
// Without this, links shared to WhatsApp/iMessage/Facebook/Twitter show no
// preview image at all, which measurably hurts click-through on shared
// links — a big deal for a site that depends on organic + social traffic.
const DEFAULT_OG_IMAGE =
  "https://images.unsplash.com/photo-1735424325493-7dec695219c4?q=80&w=2400&auto=format&fit=crop";

// Organization + WebSite structured data — site-wide brand identity signal
// for Google (E-E-A-T). Deliberately NOT a TouristAttraction/LocalBusiness
// schema for the basilica itself — this site is an independent affiliate
// guide, not the official venue, and the footer disclaimer says so; schema
// claiming to BE the attraction would misrepresent that.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sagrada Familia Guided Tours",
  url: SITE_URL,
  description:
    "Independent guide comparing Sagrada Familia guided tours, skip-the-line tickets, and tower access from licensed operators.",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sagrada Familia Guided Tours",
  url: SITE_URL,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Kept under 60 characters so Google doesn't truncate it in results.
  title: {
    default: "Sagrada Familia Guided Tours & Tickets (2026)",
    template: "%s | Sagrada Familia Guided Tours",
  },
  // Kept under 155 characters for the same reason.
  description:
    "Compare Sagrada Familia guided tours and skip-the-line tickets. Certified local guides, tower access, and instant online booking for 2026.",
  keywords: [
    "Sagrada Familia guided tour",
    "Sagrada Familia tower access",
    "Sagrada Familia tickets",
    "book Sagrada Familia tour",
    "Sagrada Familia tour price",
    "Sagrada Familia tickets online",
    "skip the line Sagrada Familia",
    "Sagrada Familia skip the line tickets",
    "Nativity tower vs Passion tower",
    "is a guided tour worth it Sagrada Familia",
    "Barcelona guided tours",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sagrada Familia Guided Tours & Tickets | Skip the Line + Tower Access",
    description:
      "Certified guides, skip-the-line entry, and optional tower access. Compare Sagrada Familia guided tour prices and book online.",
    type: "website",
    url: SITE_URL,
    siteName: "Sagrada Familia Guided Tours",
    images: [{ url: DEFAULT_OG_IMAGE, width: 2400, height: 1350, alt: "Sagrada Familia basilica interior" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sagrada Familia Guided Tours & Tickets | Skip the Line + Tower Access",
    description:
      "Certified guides, skip-the-line entry, and optional tower access. Compare Sagrada Familia guided tour prices and book online.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={displayFont.variable}>
      <body className="font-body bg-stone-50 text-stone-900 antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
