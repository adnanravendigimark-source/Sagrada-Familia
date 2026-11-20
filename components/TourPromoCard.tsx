import SafeImage from "./SafeImage";
import ProviderRating from "./ProviderRating";
import type { Tour } from "@/lib/data";

export default function TourPromoCard({
  tour,
  recommendedLabel = "Recommended for you",
  bookNowText = "Book Now",
  affiliateNote,
}: {
  tour: Tour;
  recommendedLabel?: string;
  bookNowText?: string;
  affiliateNote?: string;
}) {
  return (
    <div className="my-8 flex flex-col gap-5 overflow-hidden rounded-2xl border border-basilica-teal/20 bg-basilica-teal/5 p-5 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-40">
        <SafeImage src={tour.image} alt={tour.imageAlt} fill sizes="200px" className="object-cover" />
      </div>
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-basilica-teal">{recommendedLabel}</p>
        <p className="mt-1 font-display text-base font-semibold text-stone-900">{tour.title}</p>
        <div className="mt-1 flex items-center gap-2 text-xs text-stone-900/70">
          <ProviderRating rating={tour.rating} reviews={tour.reviews} source={tour.ratingSource} />
          <span>·</span>
          <span>from €{tour.price}/person</span>
        </div>
      </div>
      <a
        href={tour.href}
        target="_blank"
        rel="noopener nofollow sponsored"
              data-placement="post_promo"
        className="shrink-0 rounded-full bg-basilica-terracotta px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:brightness-90"
      >
        {tour.ctaLabel || bookNowText}
      </a>
      {affiliateNote && <p className="text-xs text-stone-900/65 sm:basis-full">{affiliateNote}</p>}
    </div>
  );
}
