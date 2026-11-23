import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SafeImage from "@/components/SafeImage";
import { getAboutPage } from "@/lib/about";
import { AUTHOR } from "@/lib/author";
import { resolveRobots, resolveCanonical, resolveOg, pageTitle, buildBreadcrumbJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";


// Every field below (title, description, canonical, indexing, follow, OG)
// comes from the admin-editable About page content (lib/about.ts) —
// nothing here is hardcoded. See /admin/about.
export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutPage();
  const og = resolveOg(
    { ogTitle: about.ogTitle, ogDescription: about.ogDescription, ogImage: about.ogImage },
    { title: about.metaTitle, description: about.metaDescription, image: about.heroImage }
  );
  return {
    title: pageTitle(about.metaTitle),
    description: about.metaDescription,
    alternates: { canonical: resolveCanonical("/about", about.canonicalUrl) },
    robots: resolveRobots(about.noIndex, about.noFollow),
    openGraph: {
      type: "website",
      title: og.title,
      description: og.description,
      url: "/about",
      images: og.image ? [{ url: og.image, alt: about.heroImageAlt }] : undefined,
    },
    twitter: { card: "summary_large_image", title: og.title, description: og.description, images: og.image ? [og.image] : undefined },
  };
}

// The page is intentionally just two things now: a photo hero banner, and
// one flowing rich-text content section below it — the whole page body is
// written as a single article in the admin (see AboutForm.tsx), the same
// way a blog post is written, instead of many separate structured fields.
export default async function AboutPage() {
  const about = await getAboutPage();

  // Matches the visible "Home > About Us" trail in the hero, plus the
  // editor as a Person entity that every guide's Article author points to.
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
  ]);
  const editorJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": AUTHOR.url,
    name: AUTHOR.name,
    jobTitle: AUTHOR.role,
    url: AUTHOR.url,
    worksFor: { "@type": "Organization", name: "Sagrada Familia Guided Tours", url: SITE_URL },
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero banner */}
        <section className="relative overflow-hidden bg-basilica-plum text-white">
          <div className="absolute inset-0">
            <SafeImage
              src={about.heroImage}
              alt={about.heroImageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-basilica-plum via-basilica-plum/80 to-transparent" />
          </div>
          <div className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20">
            <nav aria-label="Breadcrumb" className="text-xs font-medium text-white/70">
              <ol className="flex items-center justify-center gap-1.5">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-white/40">&gt;</li>
                <li className="font-semibold text-white" aria-current="page">
                  About Us
                </li>
              </ol>
            </nav>
            <span className="mt-4 inline-block text-xs font-bold uppercase tracking-widest text-gold-400">
              {about.heroEyebrow}
            </span>
            <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {about.heroHeading}
            </h1>
            <div
              className="rich-content rich-content-invert mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/90 sm:text-base"
              dangerouslySetInnerHTML={{ __html: about.heroSubheading }}
            />
          </div>
        </section>

        {/* Page body — one flowing rich-text article, admin-editable as a
            single field (see AboutForm.tsx / TiptapArticleEditor). */}
        <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="rich-content leading-relaxed text-stone-900/80" dangerouslySetInnerHTML={{ __html: about.content }} />

          {/* Named editor + editorial policy. Fixed in code (not admin HTML)
              so the Article schema's author URL and the Organization's
              publishingPrinciples URL always resolve to these anchors. */}
          <section id="editor" className="rich-content mt-12 scroll-mt-24 border-t border-stone-200 pt-10 leading-relaxed text-stone-900/80">
            <h2>Who writes these guides</h2>
            <p>
              The guides on this site are written and kept up to date by <strong>{AUTHOR.name}</strong>, the site&apos;s{" "}
              {AUTHOR.role.toLowerCase()}. John checks each tour&apos;s price, rating, review count, duration and cancellation
              terms on its GetYourGuide listing, and checks opening hours, entry rules and tower restrictions against the
              official Sagrada Família website. Every guide shows the date its facts were last checked.
            </p>
          </section>

          <section id="editorial-policy" className="rich-content mt-10 scroll-mt-24 leading-relaxed text-stone-900/80">
            <h2>Editorial policy</h2>
            <ul>
              <li>
                <strong>Where facts come from.</strong> Tour prices, ratings, durations and inclusions come from the
                GetYourGuide listing for each tour. Opening hours, dress code, entry rules and tower restrictions come from
                the official Sagrada Família website:{" "}
                <a href="https://sagradafamilia.org/en/schedules-how-to-get" target="_blank" rel="noopener">opening hours</a>,{" "}
                <a href="https://sagradafamilia.org/en/rules-and-regulations" target="_blank" rel="noopener">visitor rules</a>,{" "}
                <a href="https://sagradafamilia.org/en/general-condition-purchase" target="_blank" rel="noopener">ticket conditions</a> and{" "}
                <a href="https://sagradafamilia.org/en/faqs" target="_blank" rel="noopener">FAQs</a>.
              </li>
              <li>
                <strong>Prices.</strong> We show &quot;from&quot; prices with the date we checked them. Prices change by date
                and option, so the price on the booking page is the one that counts.
              </li>
              <li>
                <strong>Ratings.</strong> Star ratings and review counts are GetYourGuide&apos;s, shown as text with their
                source. We don&apos;t write our own reviews or award our own stars.
              </li>
              <li>
                <strong>Affiliate links.</strong> We earn a commission from GetYourGuide when you book through our links, at
                no extra cost to you. Booking links are marked as sponsored. Commission never changes the facts we show.
              </li>
              <li>
                <strong>Independence.</strong> This is an independent guide. It is not the official Sagrada Família website
                and is not connected to the Basilica.
              </li>
              <li>
                <strong>Corrections.</strong> If you spot something out of date, <Link href="/contact">tell us</Link>. We
                re-check it, fix the guide and update its date.
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(editorJsonLd) }} />
    </>
  );
}
