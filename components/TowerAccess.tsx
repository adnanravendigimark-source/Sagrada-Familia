import Image from "next/image";

// Real Sagrada Familia photography (Unsplash License, free for commercial
// use). "Elevator Access" reuses the confirmed interior shot — no genuine
// photo of the actual lift car was available, and a mismatched generic
// stock elevator would look wrong next to the other three real shots.
const towerImages = [
  {
    src: "https://images.unsplash.com/photo-1728249960363-13079cc2c6f6?q=80&w=700&auto=format&fit=crop",
    alt: "Sagrada Familia spires with apostle statues",
    label: "Passion Tower View",
  },
  {
    src: "https://images.unsplash.com/photo-1661030190067-085a4d3fbcdd?q=80&w=700&auto=format&fit=crop",
    alt: "Sagrada Familia tower rising above Barcelona",
    label: "Nativity Tower View",
  },
  {
    src: "https://images.unsplash.com/photo-1673391695408-15344ef8041e?q=80&w=700&auto=format&fit=crop",
    alt: "Spiral staircase inside a Sagrada Familia tower",
    label: "Spiral Staircase Down",
  },
  {
    src: "https://images.unsplash.com/photo-1735424325493-7dec695219c4?q=80&w=700&auto=format&fit=crop",
    alt: "Interior view within the Sagrada Familia tower structure",
    label: "Elevator Access",
  },
];

export default function TowerAccess() {
  return (
    <section id="tower-access" className="bg-basilica-teal/5 py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-basilica-teal">
            Sagrada Familia Tower Access
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-stone-900">
            Two Towers You Can Actually Go Up
          </h2>
          <p className="mt-4 text-stone-900/70">
            Of Gaudí's 18 planned spires, visitors can currently access two by elevator: the{" "}
            <strong>Passion Tower</strong> and the <strong>Nativity Tower</strong>. Both offer close-up
            views of the spires and a wide view over Barcelona's Eixample district. You come down via
            a narrow spiral staircase, so tower access isn't included by default — it's a separate
            ticket or a guided-tour add-on.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-stone-900/80">
            <li className="flex gap-2"><span className="text-basilica-teal">↑</span>Elevator up, spiral staircase down (narrow — not suitable for claustrophobia or limited mobility)</li>
            <li className="flex gap-2"><span className="text-basilica-teal">🎟️</span>Requires a specific tower-access ticket, separate from standard entry</li>
            <li className="flex gap-2"><span className="text-basilica-teal">👥</span>Limited capacity per time slot — books out earlier than standard entry</li>
            <li className="flex gap-2"><span className="text-basilica-teal">📸</span>Best light for photos: early morning or the hour before sunset</li>
          </ul>
          <a
            href="#tours"
            className="mt-6 inline-flex rounded-full bg-basilica-teal px-6 py-3 text-sm font-semibold text-white transition hover:bg-basilica-teal/90"
          >
            See Tours with Tower Access
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {towerImages.map((img) => (
            <div
              key={img.label}
              className="group relative h-32 overflow-hidden rounded-xl border border-basilica-teal/20 shadow-sm sm:h-40"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 20vw, 45vw"
                className="object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/0 to-black/0" />
              <span className="absolute bottom-2 left-2.5 text-xs font-semibold text-white drop-shadow">
                {img.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
