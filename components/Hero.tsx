import Image from "next/image";
import { getHomepageContent } from "@/lib/homepage";

// Real, free-to-use photography from Unsplash (Unsplash License — free for
// commercial use). Swap for your own/licensed shots whenever you have them;
// until then these are legitimate, not placeholders.
//   Interior: photo by William Rudolph — unsplash.com/@william_rudolph
//   Facade:   photo by Ahmed Salem — unsplash.com/@mozarty
//   Towers:   photo by Pourya Gohari — unsplash.com/@_pourya_
//   Skyline1: photo by Davit Margaryan — unsplash.com/@davitmarg
//   Skyline2: photo by Salma Abdelnaby — unsplash.com/@salma_abdelnaby
// The hero headline/subhead/badge/rating/photo are content-writer editable
// from /admin/homepage — this file just renders whatever's in there.
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1567437890326-0084ea9d99e9?q=80&w=900&auto=format&fit=crop",
    alt: "Sagrada Familia basilica facade against the sky in Barcelona",
    label: "The Basilica",
  },
  {
    src: "https://images.unsplash.com/photo-1728249960363-13079cc2c6f6?q=80&w=900&auto=format&fit=crop",
    alt: "Sagrada Familia spires with apostle statues",
    label: "The Towers",
  },
  {
    src: "https://images.unsplash.com/photo-1764107183244-0cef642a99a9?q=80&w=900&auto=format&fit=crop",
    alt: "Barcelona skyline with the Sagrada Familia rising above the city",
    label: "Barcelona Skyline",
  },
  {
    src: "https://images.unsplash.com/photo-1758471206484-0eaa2568320c?q=80&w=900&auto=format&fit=crop",
    alt: "Barcelona cityscape with the Sagrada Familia at sunset",
    label: "Sunset Views",
  },
];

export default function Hero() {
  const content = getHomepageContent();
  return (
    <section id="top" className="relative overflow-hidden bg-basilica-plum text-white">
      {/* Full-bleed photo background */}
      <div className="absolute inset-0">
        <Image
          src={content.heroImage}
          alt={content.heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Gradient scrim for text legibility + brand-tinted mosaic glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-basilica-plum via-basilica-plum/70 to-basilica-plum/30" />
        <div className="absolute inset-0 bg-mosaic mix-blend-soft-light" aria-hidden="true" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-400 backdrop-blur-sm">
          {content.heroBadge}
        </p>

        <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.1] tracking-tight drop-shadow-sm sm:text-6xl">
          {content.heroHeading}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-white/90 drop-shadow-sm">
          {content.heroSubheading}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#tours"
            className="group inline-flex items-center gap-2 rounded-full bg-basilica-terracotta px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-basilica-terracotta/90"
          >
            Compare Guided Tours
            <span className="transition group-hover:translate-x-0.5">→</span>
          </a>
          <a
            href="#prices"
            className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            See Tour Prices
          </a>

          {/* Floating glass rating card */}
          <div className="ml-auto flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
            <span className="text-2xl text-gold-400">★</span>
            <div className="text-left leading-tight">
              <p className="text-sm font-bold">{content.ratingValue}</p>
              <p className="text-xs text-white/70">{content.ratingCount}</p>
            </div>
          </div>
        </div>

        {/* Real photo strip — facade, towers, skyline, sunset */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {galleryImages.map((img) => (
            <div
              key={img.label}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-white/15 shadow-lg shadow-black/20"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                className="object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
              <span className="absolute bottom-2 left-3 text-xs font-semibold text-white drop-shadow">
                {img.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
