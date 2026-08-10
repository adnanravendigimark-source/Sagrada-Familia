import { getTours } from "@/lib/data";

// Built directly from the tours sold above — every row is a real,
// bookable product with its own "Book" link, so this table works as a
// second conversion surface rather than just reference info.
export default async function PriceComparison() {
  const tours = await getTours();
  return (
    <section id="prices" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="font-display text-3xl font-bold text-stone-900">Compare & Choose Your Tours & Ticket</h2>
      <p className="mt-3 max-w-2xl text-stone-900/70">
        All three options side by side — pick the one that fits your trip, then book straight from
        the table.
      </p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-stone-900/10">
        <table className="w-full min-w-[680px] border-collapse bg-white text-left text-sm">
          <thead>
            <tr className="bg-stone-900 text-white">
              <th className="px-5 py-4 font-semibold">Ticket Type</th>
              <th className="px-5 py-4 font-semibold">Price</th>
              <th className="px-5 py-4 font-semibold">Live Guide</th>
              <th className="px-5 py-4 font-semibold">Tower Access</th>
              <th className="px-5 py-4 font-semibold">Best For</th>
              <th className="px-5 py-4 font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour, i) => (
              <tr
                key={tour.id}
                className={`border-t border-stone-900/10 ${
                  tour.ribbon === "Bestseller" ? "bg-basilica-teal/5" : i % 2 ? "bg-stone-50" : ""
                }`}
              >
                <td className="px-5 py-4 font-medium text-stone-900">{tour.title}</td>
                <td className="px-5 py-4 font-semibold text-basilica-terracotta">
                  €{tour.price} <span className="font-normal text-stone-900/40">/ person</span>
                </td>
                <td className="px-5 py-4 text-stone-900/70">
                  {tour.badge === "self-guided" ? "No" : "Yes — certified guide"}
                </td>
                <td className="px-5 py-4 text-stone-900/70">
                  {tour.id === "guided-tour-tower-access" ? "Passion or Nativity Tower" : "No"}
                </td>
                <td className="px-5 py-4 text-stone-900/70">{tour.bestFor}</td>
                <td className="px-5 py-4 text-right">
                  <a
                    href={tour.href}
                    target="_blank"
                    rel="noopener nofollow sponsored"
                    className="inline-flex rounded-full bg-basilica-terracotta px-4 py-2 text-xs font-semibold text-white transition hover:bg-basilica-terracotta/90"
                  >
                    Book
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-stone-900/50">
        Children under 11 typically enter free; students, seniors, and youth-card holders get
        reduced rates — check each ticket's booking page for exact tiers.
      </p>
    </section>
  );
}
