import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/Logo.png";

// Logo.png is a tall lockup: icon + halo arc on top (~0–60% of the canvas
// height), a clear blank gap, then the "LA SAGRADA FAMILIA / GUIDED TOURS"
// text underneath. A header row is short and wide, so showing the whole
// tall lockup forces the text down to an illegible size — that's the "looks
// small" problem. Fix: for the compact (header/footer) use, crop to just
// the icon region with a wide frame (object-cover + object-top so the crop
// always starts at the very top of the image and only ever removes canvas
// from the bottom — it can never cut into the icon itself), sized to fill
// the row. For the stacked use (plenty of vertical room), show the full,
// uncropped artwork at its true aspect ratio.
export default function Logo({
  className = "",
  variant = "compact",
  theme = "light",
  src = "",
  alt = "La Sagrada Familia Guided Tours",
  line1 = "La Sagrada Familia",
  line2 = "Guided Tours",
}: {
  className?: string;
  variant?: "compact" | "stacked";
  theme?: "light" | "dark";
  // Admin-uploaded logo override (Homepage → Images tab). Blank (the
  // default) keeps using the bundled Logo.png asset below, unchanged.
  src?: string;
  alt?: string;
  // Two-line wordmark text shown next to the icon in the compact variant
  // only — the stacked variant's artwork already has the wordmark baked
  // into the image itself.
  line1?: string;
  line2?: string;
}) {
  const isDark = theme === "dark";
  const customSrc = src.trim();

  if (variant === "stacked") {
    return (
      <Link href="/" className={`inline-flex items-center ${className}`}>
        {customSrc ? (
          <span className="relative block h-32 w-52 sm:h-40 sm:w-64">
            <Image src={customSrc} alt={alt} fill sizes="260px" className="object-contain object-left" priority />
          </span>
        ) : (
          <Image src={logo} alt={alt} priority className="h-32 w-auto sm:h-40" />
        )}
      </Link>
    );
  }

  const image = (
    <span className="relative block h-11 w-[5.75rem] shrink-0 overflow-hidden sm:h-12 sm:w-[6.25rem]">
      <Image
        src={customSrc || logo}
        alt={alt}
        fill
        priority
        sizes="150px"
        className={customSrc ? "object-contain" : undefined}
      />
    </span>
  );

  const wordmark = (
    <span className="flex min-w-0 items-center gap-3">
      <span
        className={`h-8 w-px shrink-0 ${isDark ? "bg-gold-400/40" : "bg-gold-500/40"}`}
        aria-hidden="true"
      />
      <span className="min-w-0 leading-tight">
        <span
          className={`block truncate font-display text-base font-semibold italic tracking-tight sm:text-lg ${
            isDark ? "text-white" : "text-stone-900"
          }`}
        >
          {line1}
        </span>
        <span
          className={`block truncate text-[10px] font-semibold uppercase tracking-[0.24em] ${
            isDark ? "text-gold-400" : "text-basilica-terracotta"
          }`}
        >
          {line2}
        </span>
      </span>
    </span>
  );

  // Logo.png itself has no background baked in, so both themes render it
  // the same way — no extra white card behind it. min-w-0 lets the wordmark
  // actually shrink/truncate on narrow screens instead of forcing the
  // header to overflow (or collide with the mobile hamburger) when an
  // admin-entered site name is long — see MobileNav.tsx.
  return (
    <Link href="/" className={`inline-flex min-w-0 items-center gap-3 ${className}`}>
      {image}
      {wordmark}
    </Link>
  );
}
