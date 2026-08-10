import { getTours } from "@/lib/data";
import { getHomepageContent } from "@/lib/homepage";
import TourCard from "./TourCard";

export default function TourGrid() {
  const content = getHomepageContent();
  const tours = getTours();

  // The admin-picked recommended tour leads the grid on desktop rather than
  // sitting wherever it happens to fall in the data file.
  const orderedTours = content.showFeaturedTour
    ? [...tours].sort((a, b) => {
        if (a.id === content.featuredTourId) return -1;
        if (b.id === content.featuredTourId) return 1;
        return 0;
      })
    : tours;

  return (
    <section id="tours" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-bold text-stone-900">
          Sagrada Familia Guided Tours & Tickets
        </h2>
        <p className="mt-3 text-stone-900/70">
          Three clear options — a guided tour, a guided tour with tower access, and a self-guided
          entry ticket for a lower budget. A certified guide is the single biggest upgrade to a
          Sagrada Familia visit.
        </p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {orderedTours.map((tour) => (
          <TourCard
            key={tour.id}
            tour={tour}
            recommended={
              content.showFeaturedTour && tour.id === content.featuredTourId
                ? {
                    badgeLabel: content.featuredBadgeLabel,
                    reasons: content.featuredReasons,
                    urgencyText: content.featuredUrgencyText,
                  }
                : undefined
            }
          />
        ))}
      </div>
    </section>
  );
}
