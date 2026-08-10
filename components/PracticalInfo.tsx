const hours = [
  ["November – February", "9:00 AM – 6:00 PM"],
  ["March", "9:00 AM – 7:00 PM"],
  ["April – September", "9:00 AM – 8:00 PM"],
  ["October", "9:00 AM – 7:00 PM"],
];

export default function PracticalInfo() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-stone-900">Opening Hours (2026)</h3>
          <table className="mt-4 w-full text-sm">
            <tbody>
              {hours.map(([range, time]) => (
                <tr key={range} className="border-b border-stone-900/5">
                  <td className="py-2 text-stone-900/70">{range}</td>
                  <td className="py-2 text-right font-medium text-stone-900">{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-stone-900">Address</h3>
          <p className="mt-4 text-sm text-stone-900/70">
            Carrer de Mallorca, 401<br />
            08013 Barcelona, Spain
          </p>
          <p className="mt-3 text-sm text-stone-900/70">
            Metro: L2 / L5 — Sagrada Família station
          </p>
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-stone-900">Best Time for a Guided Tour</h3>
          <p className="mt-4 text-sm text-stone-900/70">
            Morning tours catch the warm-toned stained glass on the Nativity side; late-afternoon
            tours catch the cooler-toned Passion side. Book autumn or winter dates for smaller
            groups — April through August is peak season.
          </p>
        </div>
      </div>
    </section>
  );
}
