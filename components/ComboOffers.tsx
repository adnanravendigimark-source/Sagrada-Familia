import { getComboOffers } from "@/lib/data";

export default async function ComboOffers() {
  const comboOffers = await getComboOffers();
  return (
    <section className="bg-basilica-plum/5 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-bold text-stone-900">Combine with Other Gaudí Sites</h2>
        <p className="mt-3 max-w-2xl text-stone-900/70">
          Book Sagrada Familia together with Gaudí's other landmarks for one guided day.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {comboOffers.map((offer) => (
            <div key={offer.id} className="rounded-2xl border border-stone-900/10 bg-white p-6">
              <h3 className="font-display text-lg font-semibold text-stone-900">{offer.title}</h3>
              <p className="mt-2 text-sm text-stone-900/70">{offer.description}</p>
              <a
                href={offer.href}
                target="_blank"
                rel="noopener nofollow sponsored"
                className="mt-4 inline-flex rounded-full bg-basilica-terracotta px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-basilica-terracotta/90"
              >
                Book Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
