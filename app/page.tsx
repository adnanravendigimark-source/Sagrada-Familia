import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TicketChooser from "@/components/TicketChooser";
import OfficialVsTour from "@/components/OfficialVsTour";
import PlanYourVisit from "@/components/PlanYourVisit";
import FinalCta from "@/components/FinalCta";
import FeaturedTour from "@/components/FeaturedTour";
import WhyGuidedTour from "@/components/WhyGuidedTour";
import TowerAccess from "@/components/TowerAccess";
import PracticalInfo from "@/components/PracticalInfo";
import FAQSection from "@/components/FAQSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import { getTours } from "@/lib/data";
import { getHomepageContent } from "@/lib/homepage";
import { SITE_URL } from "@/lib/site";
import { resolveRobots, resolveCanonical, resolveOg, stripHtml } from "@/lib/seo";

// Content (hero copy, tours, FAQs) now lives in /data and is editable from
// /admin — render dynamically so edits show up without a rebuild.

// title/description are left unset so they inherit the root layout's
// defaults — but canonical, robots, and OG are always set here from the
// homepage's own admin-editable fields (lib/homepage.ts) so an admin
// override always wins over the layout's hardcoded fallback.
export async function generateMetadata(): Promise<Metadata> {
  const homepage = await getHomepageContent();
  const og = resolveOg(
    { ogTitle: homepage.ogTitle, ogDescription: homepage.ogDescription, ogImage: homepage.ogImage },
    { title: homepage.heroHeading, description: stripHtml(homepage.heroSubheading), image: homepage.heroImage }
  );
  return {
    // Left unset when blank so the page inherits the root layout's
    // default title/description — an admin-entered SEO Title/Meta
    // Description (Homepage → SEO tab) always overrides that default.
    ...(homepage.metaTitle.trim() ? { title: homepage.metaTitle } : {}),
    ...(homepage.metaDescription.trim() ? { description: homepage.metaDescription } : {}),
    alternates: { canonical: resolveCanonical("/", homepage.canonicalUrl) },
    robots: resolveRobots(homepage.noIndex, homepage.noFollow),
    openGraph: { type: "website", title: og.title, description: og.description, url: "/", images: og.image ? [{ url: og.image }] : undefined },
    twitter: { card: "summary_large_image", title: og.title, description: og.description, images: og.image ? [og.image] : undefined },
  };
}

export default async function HomePage() {
  // Structured data for this page. Deliberately no Product/AggregateRating:
  // the tours are sold by GetYourGuide, not this site, and Google's review
  // snippet rules don't allow marking up ratings collected elsewhere. The
  // basilica is described as what this page is *about* (with the official
  // site as its URL), so the schema never claims this site is the venue.
  const [tours, homepage] = await Promise.all([getTours(), getHomepageContent()]);
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: homepage.heroHeading,
    about: {
      "@type": "TouristAttraction",
      name: "Sagrada Família",
      url: "https://sagradafamilia.org/",
      sameAs: ["https://en.wikipedia.org/wiki/Sagrada_Fam%C3%ADlia"],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Carrer de Mallorca, 401",
        postalCode: "08013",
        addressLocality: "Barcelona",
        addressCountry: "ES",
      },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: tours
        .map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.title, url: t.href })),
    },
  };

  return (
    <>
      <Header overlay />
      <main>
        <Hero />
        <FeaturedTour />
        <TicketChooser />
        <WhyGuidedTour />
        <TowerAccess />
        <OfficialVsTour />
        <PlanYourVisit />
        <PracticalInfo />
        <FAQSection />
        <BlogSection />
        <FinalCta />
        {/* Spacer so the mobile sticky booking bar never covers the footer */}
        <div className="h-20 sm:hidden" aria-hidden="true" />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
