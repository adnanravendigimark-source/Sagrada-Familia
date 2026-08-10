import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
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
export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: "Sagrada Familia Guided Tours & Tickets | Skip the Line + Tower Access (2026)",
  description:
    "Book Sagrada Familia guided tours online: skip-the-line entry, certified local guides, and optional tower access. Compare guided tour prices and tickets for 2026.",
  keywords: [
    "Sagrada Familia guided tour",
    "Sagrada Familia tower access",
    "Sagrada Familia tickets",
    "book Sagrada Familia tour",
    "Sagrada Familia tour price",
    "Sagrada Familia tickets online",
    "skip the line Sagrada Familia",
    "Sagrada Familia skip the line tickets",
    "Barcelona guided tours",
  ],
  openGraph: {
    title: "Sagrada Familia Guided Tours & Tickets | Skip the Line + Tower Access",
    description:
      "Certified guides, skip-the-line entry, and optional tower access. Compare Sagrada Familia guided tour prices and book online.",
    type: "website",
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
      </body>
    </html>
  );
}
