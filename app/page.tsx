import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedTour from "@/components/FeaturedTour";
import TourGrid from "@/components/TourGrid";
import WhyGuidedTour from "@/components/WhyGuidedTour";
import TowerAccess from "@/components/TowerAccess";
import PriceComparison from "@/components/PriceComparison";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import { getTours } from "@/lib/data";

// Content (hero copy, tours, FAQs) now lives in /data and is editable from
// /admin — render dynamically so edits show up without a rebuild.
export const dynamic = "force-dynamic";

export default function HomePage() {
  // Product structured data for the featured guided tours — makes them
  // eligible for star-rating rich results in search.
  const productJsonLd = getTours()
    .filter((t) => t.featured)
    .map((t) => ({
      "@context": "https://schema.org",
      "@type": "Product",
      name: t.title,
      description: t.description,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: t.rating,
        reviewCount: t.reviews,
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        price: t.price,
        availability: "https://schema.org/InStock",
        url: t.href,
      },
    }));

  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedTour />
        <TourGrid />
        <WhyGuidedTour />
        <TowerAccess />
        <PriceComparison />
        <FAQSection />
        {/* Spacer so the mobile sticky booking bar never covers the footer */}
        <div className="h-20 sm:hidden" aria-hidden="true" />
      </main>
      <Footer />
      {productJsonLd.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
