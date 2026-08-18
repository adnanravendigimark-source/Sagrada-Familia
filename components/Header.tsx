import Link from "next/link";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import { getSiteChrome } from "@/lib/homepage";

// Navbar — logo, nav links, and the CTA button are all CMS-editable from
// /admin/homepage → Content tab (see lib/homepage.ts's HeaderContent).
// Runs on every page (not just the homepage), so it fetches its own data
// rather than relying on props from a page-specific parent.
export default async function Header() {
  const { header } = await getSiteChrome();
  return (
    <header className="sticky top-0 z-50 border-b border-stone-900/10 bg-stone-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 sm:px-6">
        <Logo src={header.logoImage} alt={header.logoAlt} line1={header.logoLine1} line2={header.logoLine2} />
        <nav className="hidden items-center gap-7 text-sm font-medium text-stone-900/70 md:flex">
          {header.navLinks.map((link) => (
            <Link key={link.href + link.label} href={link.href} className="hover:text-basilica-plum">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href={header.ctaHref}
            className="hidden rounded-full bg-basilica-terracotta px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-basilica-terracotta/90 md:inline-flex"
          >
            {header.ctaText}
          </Link>
          <MobileNav navLinks={header.navLinks} ctaText={header.ctaText} ctaHref={header.ctaHref} />
        </div>
      </div>
    </header>
  );
}
