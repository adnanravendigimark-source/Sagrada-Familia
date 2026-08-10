import {
  ShieldCheckIcon,
  ClockPayIcon,
  RefundIcon,
  LockIcon,
  TicketIcon,
  HeadsetIcon,
} from "./icons";

// Concrete, specific reassurances with real SVG icons in brand-colored
// badges instead of emoji, which render inconsistently across OS/browsers
// and look unpolished at this scale. (Quantified social-proof stat line was
// tried above this and dropped — it ran together without proper spacing.)
const badges = [
  {
    icon: ShieldCheckIcon,
    tint: "bg-basilica-teal/10 text-basilica-teal",
    label: "Certified Local Guides",
    sub: "Licensed & vetted — not just line-skipping",
  },
  {
    icon: ClockPayIcon,
    tint: "bg-gold-500/10 text-gold-600",
    label: "Reserve Now, Pay Later",
    sub: "Lock in your slot, no charge until closer to the date",
  },
  {
    icon: RefundIcon,
    tint: "bg-basilica-terracotta/10 text-basilica-terracotta",
    label: "Free Cancellation",
    sub: "Full refund up to 24 hours before your visit",
  },
  {
    icon: LockIcon,
    tint: "bg-basilica-teal/10 text-basilica-teal",
    label: "Secure Payment",
    sub: "Encrypted checkout — Visa, Mastercard, PayPal, Apple Pay",
  },
  {
    icon: TicketIcon,
    tint: "bg-gold-500/10 text-gold-600",
    label: "Instant Mobile Ticket",
    sub: "Delivered to your inbox in seconds, no printing needed",
  },
  {
    icon: HeadsetIcon,
    tint: "bg-basilica-terracotta/10 text-basilica-terracotta",
    label: "24/7 Support",
    sub: "Real humans to help, before and during your visit",
  },
];

export default function TrustBadges() {
  return (
    <section className="border-b border-stone-900/10 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-3">
        {badges.map(({ icon: Icon, tint, label, sub }) => (
          <div key={label} className="flex items-start gap-3">
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tint}`}>
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-stone-900">{label}</p>
              <p className="mt-0.5 text-xs leading-snug text-stone-900/60">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
