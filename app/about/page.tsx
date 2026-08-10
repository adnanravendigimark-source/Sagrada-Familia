import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShieldCheckIcon, StarIcon, LockIcon, HeadsetIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "About Us | Sagrada Familia Guided Tour & Ticket Booking Guide",
  description:
    "Who curates our Sagrada Familia guided tours and skip-the-line tickets online, how we pick certified guides, and why a guided tour beats a bare entry ticket.",
  keywords: [
    "About Sagrada Familia tickets",
    "Sagrada Familia guided tour guide",
    "book Sagrada Familia tour online",
    "certified Sagrada Familia guides",
    "Sagrada Familia tickets online",
  ],
};

const whyUs = [
  {
    icon: ShieldCheckIcon,
    title: "Certified, Licensed Guides",
    body: "Every guided tour we list uses certified local guides — not fast-track entry resold as a \"tour.\"",
  },
  {
    icon: StarIcon,
    title: "Real Review Volume",
    body: "We only list tours with verifiable review counts and ratings, not cherry-picked testimonials.",
  },
  {
    icon: LockIcon,
    title: "Transparent Pricing",
    body: "The price you see on the tour card is the price you pay — no hidden fees added at checkout.",
  },
  {
    icon: HeadsetIcon,
    title: "Honest, Clear Info",
    body: "We tell you exactly what's included — and what isn't, like tower access, which is often separate.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero banner */}
        <section className="relative overflow-hidden bg-basilica-plum text-white">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1567437890326-0084ea9d99e9?q=80&w=2000&auto=format&fit=crop"
              alt="Sagrada Familia basilica facade in Barcelona"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-basilica-plum via-basilica-plum/75 to-basilica-plum/40" />
          </div>
          <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">
              About Us
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-5xl">
              Your Independent Guide to Sagrada Familia Tickets &amp; Guided Tours
            </h1>
            <p className="mt-5 text-white/85">
              We help travelers book the right Sagrada Familia guided tour or skip-the-line ticket
              online — curated from certified, licensed operators, explained in plain language.
            </p>
          </div>
        </section>

        {/* What we do — text + image */}
        <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold text-stone-900">
              Why We Built a Sagrada Familia Tour &amp; Ticket Guide
            </h2>
            <p className="mt-4 text-stone-900/70">
              We built this site around one belief: a guide is worth more than a bare entry
              ticket. Sagrada Familia has almost no on-site signage explaining what you're looking
              at — the symbolism in the façades, why the columns lean like trees, what each tower
              represents. A skip-the-line ticket gets you through the door. A good guided tour is
              the difference between seeing a beautiful building and actually understanding
              Gaudí's design.
            </p>
            <p className="mt-4 text-stone-900/70">
              We're an independent Sagrada Familia tickets and tours guide — not the official
              venue website. We compare guided tours, skip-the-line tickets, and tower-access
              options from licensed, established operators, currently via GetYourGuide, and point
              you to the ones worth your time and money.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1728249960363-13079cc2c6f6?q=80&w=1000&auto=format&fit=crop"
              alt="Sagrada Familia spires with apostle statues"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </section>

        {/* Why us — icon cards */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-display text-2xl font-bold text-stone-900">
              How We Pick Our Sagrada Familia Guided Tours
            </h2>
            <p className="mt-3 max-w-2xl text-stone-900/70">
              Every guided tour and ticket listed on this site is screened against four criteria
              before it earns a spot.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {whyUs.map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-2xl border border-stone-900/10 bg-stone-50 p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-basilica-teal/10 text-basilica-teal">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-sm font-semibold text-stone-900">{title}</p>
                  <p className="mt-1.5 text-sm text-stone-900/60">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Disclosure + CTA */}
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-xl font-semibold text-stone-900">A Note on How We Earn</h2>
          <p className="mt-3 text-sm text-stone-900/70">
            When you book a Sagrada Familia guided tour or ticket through a link on this site, we
            earn a small commission from the operator at no extra cost to you. This is how we keep
            the site free and independently written — it doesn't affect which tours we recommend
            or how we rank them.
          </p>

          <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl bg-basilica-teal/5 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-stone-900">
              Ready to book your Sagrada Familia guided tour?
            </p>
            <a
              href="/#tours"
              className="shrink-0 rounded-full bg-basilica-terracotta px-6 py-3 text-sm font-semibold text-white transition hover:bg-basilica-terracotta/90"
            >
              Compare Tours &amp; Tickets →
            </a>
          </div>

          <p className="mt-8 text-sm text-stone-900/70">
            Questions before you book? Reach out via our{" "}
            <a href="/contact" className="font-medium text-basilica-terracotta underline">
              contact page
            </a>
            .
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
