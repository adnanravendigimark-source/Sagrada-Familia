const itinerary = [
  { time: "0:00", step: "Meet your guide outside the Nativity Façade — quick intro & security check" },
  { time: "0:15", step: "Nativity Façade: the carvings Gaudí completed in his lifetime, explained scene by scene" },
  { time: "0:35", step: "Interior: the forest of columns, how they distribute weight, and why they lean" },
  { time: "1:00", step: "Stained glass: how light changes the space through the day, and where to stand for photos" },
  { time: "1:30", step: "Passion Façade: the deliberate contrast with Nativity, and what it represents" },
  { time: "1:50", step: "Optional: elevator up the tower for the view, if your ticket includes tower access" },
];

const learn = [
  "Why the basilica has taken over 140 years to build, and what's left",
  "How Gaudí used hanging chain models to design the structure without modern engineering software",
  "What each of the three façades (Nativity, Passion, Glory) represents",
  "Which details in the stone carvings are easy to miss without someone pointing them out",
];

export default function WhyGuidedTour() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-bold text-stone-900">
          What You Actually Get on a Guided Tour
        </h2>
        <p className="mt-3 max-w-2xl text-stone-900/70">
          Walk in with just a ticket and you'll see an impressive building. Walk in with a guide
          and someone points out why the columns lean like trees, which carvings tell which Bible
          story, and what's still being built 140 years later. Here's what a typical 2-hour tour
          covers, hour by hour.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-lg font-semibold text-stone-900">Sample tour timeline</h3>
            <ol className="mt-4 space-y-4 border-l border-stone-900/10 pl-5">
              {itinerary.map((row) => (
                <li key={row.time} className="relative">
                  <span className="absolute -left-[27px] top-1 h-2.5 w-2.5 rounded-full bg-basilica-teal" />
                  <span className="text-xs font-semibold text-basilica-teal">{row.time}</span>
                  <p className="text-sm text-stone-900/80">{row.step}</p>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-stone-900">What you'll learn</h3>
            <ul className="mt-4 space-y-3">
              {learn.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl bg-stone-50 p-4 text-sm text-stone-900/80">
                  <span className="text-gold-500">◆</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-stone-900/50">
              Guides are certified local guides briefed on Sagrada Familia's history, architecture,
              and construction status. Tours run in small groups with a headset system so you can
              hear clearly even in a full basilica.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl bg-basilica-teal/5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-stone-900">
            Convinced? The guided tour is €54/person and sells out in peak season.
          </p>
          <a
            href="#tours"
            className="shrink-0 rounded-full bg-basilica-terracotta px-6 py-3 text-sm font-semibold text-white transition hover:bg-basilica-terracotta/90"
          >
            Book the Guided Tour →
          </a>
        </div>
      </div>
    </section>
  );
}
