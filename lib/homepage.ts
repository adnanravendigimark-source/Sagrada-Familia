import { sql } from "./db";

export interface GalleryImage {
  src: string;
  alt: string;
  label: string;
}

export interface TimelineRow {
  time: string;
  step: string;
}

export interface HoursRow {
  range: string;
  time: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

// "Why a Guided Tour" section (the timeline + what-you'll-learn section
// right below the tour grid).
export interface WhySection {
  heading: string;
  intro: string; // rich text HTML
  timelineHeading: string;
  timeline: TimelineRow[];
  learnHeading: string;
  learn: string[];
  note: string;
  // Optional third block, used by sites that need one more grouped list
  // here (e.g. "Where you can board" for a river cruise site) — left
  // blank/empty here, and WhyGuidedTour.tsx simply doesn't render it when
  // extraItems is empty, so this changes nothing for a site that doesn't
  // use it.
  extraHeading: string;
  extraItems: { name: string; note: string }[];
  ctaText: string;
  ctaButtonText: string;
  ctaHref: string;
}

// "Tower Access" section.
export interface TowerSection {
  eyebrow: string;
  heading: string;
  body: string; // rich text HTML
  bullets: string[];
  ctaButtonText: string;
  ctaHref: string;
  images: GalleryImage[];
}

// "Practical Info" section (opening hours / address / best time).
export interface PracticalSection {
  hoursHeading: string;
  hours: HoursRow[];
  addressHeading: string;
  address: string;
  metro: string;
  bestTimeHeading: string;
  bestTimeBody: string; // rich text HTML
}

// "Compare & Choose" price table intro.
export interface PriceSection {
  heading: string;
  subheading: string;
  note: string;
  // Column headers for the price-comparison table below — admin-editable
  // so a differently-shaped product (e.g. a river cruise site with
  // "Duration"/"Meal Included" instead of "Live Guide"/"Tower Access")
  // never needs a code change to relabel its own table.
  itemLabel: string;
  priceLabel: string;
  column1Label: string;
  column2Label: string;
  bestForLabel: string;
}

export interface HomepageSections {
  why: WhySection;
  tower: TowerSection;
  practical: PracticalSection;
  price: PriceSection;
}

// Site-wide navbar — edited from the Homepage admin tab for simplicity,
// but rendered on every page (see components/Header.tsx).
export interface HeaderContent {
  logoImage: string; // blank = use the bundled Logo.png asset
  logoAlt: string;
  navLinks: NavLink[];
  ctaText: string;
  ctaHref: string;
}

// Site-wide footer — same "edited from Homepage, rendered everywhere" deal.
export interface FooterContent {
  tagline: string; // rich text HTML
  columns: FooterColumn[];
  addressHeading: string;
  addressLine1: string;
  addressLine2: string;
  copyrightText: string;
}

// Site-wide brand colors — blank fields fall back to the original
// hardcoded hex values (see globals.css :root), so leaving these blank
// changes nothing. See lib/theme.ts for how these become live CSS.
export interface ThemeColors {
  primary: string; // "basilica-terracotta" — main CTA buttons
  secondary: string; // "basilica-teal" — accents, links
  dark: string; // "basilica-plum" — hero background
  accent: string; // "gold-400" — ratings, badges
}

export interface HomepageContent {
  heroBadge: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  heroImageAlt: string;
  heroGallery: GalleryImage[];
  heroCtaPrimaryText: string;
  heroCtaPrimaryHref: string;
  heroCtaSecondaryText: string;
  heroCtaSecondaryHref: string;
  ratingValue: string;
  ratingCount: string;
  // "Featured/Recommended Tour" widget — a compact sticky bar on mobile,
  // a richer showcase card on desktop. Which tour it promotes and its
  // copy are both editable from /admin/recommended.
  showFeaturedTour: boolean;
  featuredTourId: string;
  featuredBadgeLabel: string;
  featuredUrgencyText: string;
  featuredReasons: string[];
  // Everything below the hero — Why a Guided Tour, Tower Access, Practical
  // Info, and the Price Comparison intro.
  sections: HomepageSections;
  // Site-wide navbar + footer (see interfaces above).
  header: HeaderContent;
  footer: FooterContent;
  // Site-wide brand colors.
  theme: ThemeColors;
  // On-page SEO title/description — falls back to the root layout's
  // site-wide defaults if left blank (see app/page.tsx generateMetadata).
  metaTitle: string;
  metaDescription: string;
  // Used only by the "Advanced SEO" tab's on-page checklist — not written
  // to any meta tag, just a helper so the person editing content can see
  // whether the phrase they're targeting actually shows up in the H1/
  // title/description.
  focusKeyword: string;
  // Search Engine Indexing toggle (admin-editable from /admin/indexing).
  // false (default) = indexable (index, follow). true = noindex, nofollow.
  noIndex: boolean;
  // Independent "Link Following" toggle — see lib/seo.ts's resolveRobots.
  noFollow: boolean;
  // Blank = auto-generate from SITE_URL + "/" (see lib/seo.ts resolveCanonical).
  canonicalUrl: string;
  // Open Graph / Twitter overrides — blank falls back to the page's own
  // title/description/hero image (see lib/seo.ts resolveOg).
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

// Every default below is a byte-for-byte transcription of the copy that
// used to be hardcoded directly in Header.tsx / Footer.tsx / Hero.tsx /
// WhyGuidedTour.tsx / TowerAccess.tsx / PracticalInfo.tsx /
// PriceComparison.tsx — moving it here and having each component render
// whatever's in the (possibly-blank) database column, falling back to
// this, means the live site looks 100% identical until someone actually
// edits a field in /admin/homepage.
export const DEFAULT_HEADER: HeaderContent = {
  logoImage: "",
  logoAlt: "La Sagrada Familia Guided Tours",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  ctaText: "Book a Tour",
  ctaHref: "/#tours",
};

export const DEFAULT_FOOTER: FooterContent = {
  tagline:
    "<strong>Independent booking guide.</strong> Not the official Sagrada Familia website — we curate guided tours and tickets from licensed operators and earn a commission on bookings made through our links, at no extra cost to you.",
  columns: [
    {
      title: "Explore",
      links: [
        { label: "Guided Tours", href: "/#tours" },
        { label: "Tower Access", href: "/#tower-access" },
        { label: "Tour Prices", href: "/#prices" },
        { label: "FAQ", href: "/#faq" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy-policy" },
      ],
    },
  ],
  addressHeading: "Sagrada Familia",
  addressLine1: "Carrer de Mallorca, 401",
  addressLine2: "08013 Barcelona, Spain",
  copyrightText:
    "Sagrada Familia Guided Tours. All prices shown in EUR and subject to change by the ticket operator.",
};

export const DEFAULT_THEME: ThemeColors = {
  primary: "#c4552f",
  secondary: "#0f5c5c",
  dark: "#4a2545",
  accent: "#d9a441",
};

export const DEFAULT_GALLERY: GalleryImage[] = [
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

export const DEFAULT_SECTIONS: HomepageSections = {
  why: {
    heading: "What You Actually Get on a Guided Tour",
    intro:
      "Walk in with just a ticket and you'll see an impressive building. Walk in with a guide and someone points out why the columns lean like trees, which carvings tell which Bible story, and what's still being built 140 years later. Here's what a typical 2-hour tour covers, hour by hour.",
    timelineHeading: "Sample tour timeline",
    timeline: [
      { time: "0:00", step: "Meet your guide outside the Nativity Façade — quick intro & security check" },
      { time: "0:15", step: "Nativity Façade: the carvings Gaudí completed in his lifetime, explained scene by scene" },
      { time: "0:35", step: "Interior: the forest of columns, how they distribute weight, and why they lean" },
      { time: "1:00", step: "Stained glass: how light changes the space through the day, and where to stand for photos" },
      { time: "1:30", step: "Passion Façade: the deliberate contrast with Nativity, and what it represents" },
      { time: "1:50", step: "Optional: elevator up the tower for the view, if your ticket includes tower access" },
    ],
    learnHeading: "What you'll learn",
    learn: [
      "Why the basilica has taken over 140 years to build, and what's left",
      "How Gaudí used hanging chain models to design the structure without modern engineering software",
      "What each of the three façades (Nativity, Passion, Glory) represents",
      "Which details in the stone carvings are easy to miss without someone pointing them out",
    ],
    note: "Guides are certified local guides briefed on Sagrada Familia's history, architecture, and construction status. Tours run in small groups with a headset system so you can hear clearly even in a full basilica.",
    extraHeading: "",
    extraItems: [],
    ctaText: "Convinced? The guided tour is €54/person and sells out in peak season.",
    ctaButtonText: "Book the Guided Tour →",
    ctaHref: "#tours",
  },
  tower: {
    eyebrow: "Sagrada Familia Tower Access",
    heading: "Two Towers You Can Actually Go Up",
    body:
      "Of Gaudí's 18 planned spires, visitors can currently access two by elevator: the <strong>Passion Tower</strong> and the <strong>Nativity Tower</strong>. Both offer close-up views of the spires and a wide view over Barcelona's Eixample district. You come down via a narrow spiral staircase, so tower access isn't included by default — it's a separate ticket or a guided-tour add-on.",
    bullets: [
      "Elevator up, spiral staircase down (narrow — not suitable for claustrophobia or limited mobility)",
      "Requires a specific tower-access ticket, separate from standard entry",
      "Limited capacity per time slot — books out earlier than standard entry",
      "Best light for photos: early morning or the hour before sunset",
    ],
    ctaButtonText: "See Tours with Tower Access",
    ctaHref: "#tours",
    images: [
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
    ],
  },
  practical: {
    hoursHeading: "Opening Hours (2026)",
    hours: [
      { range: "November – February", time: "9:00 AM – 6:00 PM" },
      { range: "March", time: "9:00 AM – 7:00 PM" },
      { range: "April – September", time: "9:00 AM – 8:00 PM" },
      { range: "October", time: "9:00 AM – 7:00 PM" },
    ],
    addressHeading: "Address",
    address: "Carrer de Mallorca, 401\n08013 Barcelona, Spain",
    metro: "Metro: L2 / L5 — Sagrada Família station",
    bestTimeHeading: "Best Time for a Guided Tour",
    bestTimeBody:
      "Morning tours catch the warm-toned stained glass on the Nativity side; late-afternoon tours catch the cooler-toned Passion side. Book autumn or winter dates for smaller groups — April through August is peak season.",
  },
  price: {
    heading: "Compare & Choose Your Tours & Ticket",
    subheading:
      "All three options side by side — pick the one that fits your trip, then book straight from the table.",
    note: "Children under 11 typically enter free; students, seniors, and youth-card holders get reduced rates — check each ticket's booking page for exact tiers.",
    itemLabel: "Ticket Type",
    priceLabel: "Price",
    column1Label: "Live Guide",
    column2Label: "Tower Access",
    bestForLabel: "Best For",
  },
};

// Used only if the `homepage` table is empty or unreachable (e.g. before
// `node scripts/setup-db.mjs` has been run) — a real image rather than an
// empty string so the hero section never renders broken/blank.
const DEFAULT_HOMEPAGE_CONTENT: HomepageContent = {
  heroBadge: "Certified guides · Skip the line",
  heroHeading: "Sagrada Familia Guided Tours",
  heroSubheading: "Book a certified local guide and skip the line.",
  heroImage:
    "https://images.unsplash.com/photo-1735424325493-7dec695219c4?q=80&w=2400&auto=format&fit=crop",
  heroImageAlt: "Sunlight pouring through stained glass and tree-like columns inside the Sagrada Familia basilica",
  heroGallery: DEFAULT_GALLERY,
  heroCtaPrimaryText: "Compare Guided Tours",
  heroCtaPrimaryHref: "#tours",
  heroCtaSecondaryText: "See Tour Prices",
  heroCtaSecondaryHref: "#prices",
  ratingValue: "4.8 / 5",
  ratingCount: "",
  showFeaturedTour: false,
  featuredTourId: "",
  featuredBadgeLabel: "Recommended",
  featuredUrgencyText: "",
  featuredReasons: [],
  sections: DEFAULT_SECTIONS,
  header: DEFAULT_HEADER,
  footer: DEFAULT_FOOTER,
  theme: DEFAULT_THEME,
  metaTitle: "",
  metaDescription: "",
  focusKeyword: "",
  noIndex: false,
  noFollow: false,
  canonicalUrl: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
};

function parseReasons(value: unknown): string[] {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

// Generic "parse a JSONB column, fall back to a default object if it's
// missing/empty/malformed" helper — every *_json column on the homepage
// row (sections, header, footer, theme) goes through this, deep-merged
// with its default so adding a new field later never breaks a site that
// was already customized before that field existed.
function parseJsonWithDefault<T extends object>(value: unknown, fallback: T): T {
  let parsed: unknown = value;
  if (typeof value === "string") {
    try {
      parsed = JSON.parse(value);
    } catch {
      parsed = null;
    }
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return fallback;
  return { ...fallback, ...(parsed as Partial<T>) };
}

function rowToHomepage(row: any): HomepageContent {
  const sectionsRaw = parseJsonWithDefault<HomepageSections>(row.sections_json, DEFAULT_SECTIONS);
  return {
    heroBadge: row.hero_badge || "",
    heroHeading: row.hero_heading || "",
    heroSubheading: row.hero_subheading || "",
    heroImage: row.hero_image || "",
    heroImageAlt: row.hero_image_alt || "",
    heroGallery: (() => {
      const g = parseReasons(row.hero_gallery);
      return g.length ? (g as unknown as GalleryImage[]) : DEFAULT_GALLERY;
    })(),
    heroCtaPrimaryText: row.hero_cta_primary_text || DEFAULT_HOMEPAGE_CONTENT.heroCtaPrimaryText,
    heroCtaPrimaryHref: row.hero_cta_primary_href || DEFAULT_HOMEPAGE_CONTENT.heroCtaPrimaryHref,
    heroCtaSecondaryText: row.hero_cta_secondary_text || DEFAULT_HOMEPAGE_CONTENT.heroCtaSecondaryText,
    heroCtaSecondaryHref: row.hero_cta_secondary_href || DEFAULT_HOMEPAGE_CONTENT.heroCtaSecondaryHref,
    ratingValue: row.rating_value || "",
    ratingCount: row.rating_count || "",
    showFeaturedTour: !!row.show_featured_tour,
    featuredTourId: row.featured_tour_id || "",
    featuredBadgeLabel: row.featured_badge_label || "",
    featuredUrgencyText: row.featured_urgency_text || "",
    featuredReasons: parseReasons(row.featured_reasons),
    sections: {
      why: { ...DEFAULT_SECTIONS.why, ...sectionsRaw.why },
      tower: { ...DEFAULT_SECTIONS.tower, ...sectionsRaw.tower },
      practical: { ...DEFAULT_SECTIONS.practical, ...sectionsRaw.practical },
      price: { ...DEFAULT_SECTIONS.price, ...sectionsRaw.price },
    },
    header: parseJsonWithDefault<HeaderContent>(row.header_json, DEFAULT_HEADER),
    footer: parseJsonWithDefault<FooterContent>(row.footer_json, DEFAULT_FOOTER),
    theme: parseJsonWithDefault<ThemeColors>(row.theme_json, DEFAULT_THEME),
    metaTitle: row.meta_title || "",
    metaDescription: row.meta_description || "",
    focusKeyword: row.focus_keyword || "",
    noIndex: !!row.no_index,
    noFollow: !!row.no_follow,
    canonicalUrl: row.canonical_url || "",
    ogTitle: row.og_title || "",
    ogDescription: row.og_description || "",
    ogImage: row.og_image || "",
  };
}

export async function getHomepageContent(): Promise<HomepageContent> {
  try {
    const rows = await sql`SELECT * FROM homepage WHERE id = 1 LIMIT 1`;
    return rows.length ? rowToHomepage(rows[0]) : DEFAULT_HOMEPAGE_CONTENT;
  } catch {
    return DEFAULT_HOMEPAGE_CONTENT;
  }
}

// Lightweight version of the above for Header/Footer/RootLayout, which
// render on every single page (not just the homepage) and only need the
// three site-wide columns — avoids pulling the full hero/sections payload
// on every page load just to read the navbar.
export async function getSiteChrome(): Promise<{ header: HeaderContent; footer: FooterContent; theme: ThemeColors }> {
  try {
    const rows = await sql`SELECT header_json, footer_json, theme_json FROM homepage WHERE id = 1 LIMIT 1`;
    if (!rows.length) return { header: DEFAULT_HEADER, footer: DEFAULT_FOOTER, theme: DEFAULT_THEME };
    const row = rows[0] as any;
    return {
      header: parseJsonWithDefault<HeaderContent>(row.header_json, DEFAULT_HEADER),
      footer: parseJsonWithDefault<FooterContent>(row.footer_json, DEFAULT_FOOTER),
      theme: parseJsonWithDefault<ThemeColors>(row.theme_json, DEFAULT_THEME),
    };
  } catch {
    return { header: DEFAULT_HEADER, footer: DEFAULT_FOOTER, theme: DEFAULT_THEME };
  }
}

// The Homepage admin page (/admin/homepage) is now one tabbed form, but
// still deliberately only ever PUTs the columns it owns — NOT
// featured_tour_* (owned by /admin/recommended) and NOT no_index/no_follow
// (owned by /admin/indexing) — so those two pages can never be clobbered
// by a stale snapshot sitting in this form, no matter which was saved most
// recently. See setHomepageIndexing/saveRecommendedTour below for the
// other two column-scoped save functions this splits against.
export async function saveHomepageCopy(data: {
  heroBadge: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  heroImageAlt: string;
  heroGallery: GalleryImage[];
  heroCtaPrimaryText: string;
  heroCtaPrimaryHref: string;
  heroCtaSecondaryText: string;
  heroCtaSecondaryHref: string;
  ratingValue: string;
  ratingCount: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}): Promise<void> {
  await sql`
    INSERT INTO homepage (
      id, hero_badge, hero_heading, hero_subheading, hero_image, hero_image_alt,
      hero_gallery, hero_cta_primary_text, hero_cta_primary_href,
      hero_cta_secondary_text, hero_cta_secondary_href,
      rating_value, rating_count, meta_title, meta_description, focus_keyword,
      canonical_url, og_title, og_description, og_image
    ) VALUES (
      1, ${data.heroBadge}, ${data.heroHeading}, ${data.heroSubheading}, ${data.heroImage},
      ${data.heroImageAlt}, ${JSON.stringify(data.heroGallery || [])}::jsonb,
      ${data.heroCtaPrimaryText || ""}, ${data.heroCtaPrimaryHref || ""},
      ${data.heroCtaSecondaryText || ""}, ${data.heroCtaSecondaryHref || ""},
      ${data.ratingValue}, ${data.ratingCount},
      ${data.metaTitle || ""}, ${data.metaDescription || ""}, ${data.focusKeyword || ""},
      ${data.canonicalUrl || ""}, ${data.ogTitle || ""}, ${data.ogDescription || ""}, ${data.ogImage || ""}
    )
    ON CONFLICT (id) DO UPDATE SET
      hero_badge = EXCLUDED.hero_badge,
      hero_heading = EXCLUDED.hero_heading,
      hero_subheading = EXCLUDED.hero_subheading,
      hero_image = EXCLUDED.hero_image,
      hero_image_alt = EXCLUDED.hero_image_alt,
      hero_gallery = EXCLUDED.hero_gallery,
      hero_cta_primary_text = EXCLUDED.hero_cta_primary_text,
      hero_cta_primary_href = EXCLUDED.hero_cta_primary_href,
      hero_cta_secondary_text = EXCLUDED.hero_cta_secondary_text,
      hero_cta_secondary_href = EXCLUDED.hero_cta_secondary_href,
      rating_value = EXCLUDED.rating_value,
      rating_count = EXCLUDED.rating_count,
      meta_title = EXCLUDED.meta_title,
      meta_description = EXCLUDED.meta_description,
      focus_keyword = EXCLUDED.focus_keyword,
      canonical_url = EXCLUDED.canonical_url,
      og_title = EXCLUDED.og_title,
      og_description = EXCLUDED.og_description,
      og_image = EXCLUDED.og_image
  `;
}

// Touches ONLY the indexing columns — used by the centralized "Indexing"
// admin tab (/admin/indexing) so flipping this page's Index/Follow toggle
// there can never clobber the Homepage form's content or vice versa,
// no matter which was saved most recently.
export async function setHomepageIndexing(noIndex: boolean, noFollow: boolean): Promise<void> {
  await sql`
    INSERT INTO homepage (id, no_index, no_follow)
    VALUES (1, ${!!noIndex}, ${!!noFollow})
    ON CONFLICT (id) DO UPDATE SET
      no_index = EXCLUDED.no_index,
      no_follow = EXCLUDED.no_follow
  `;
}

// Mirror image of saveHomepageCopy above — only touches the Recommended
// Tour widget's own columns, leaving the Homepage page's hero copy alone.
export async function saveRecommendedTour(data: {
  showFeaturedTour: boolean;
  featuredTourId: string;
  featuredBadgeLabel: string;
  featuredUrgencyText: string;
  featuredReasons: string[];
}): Promise<void> {
  await sql`
    INSERT INTO homepage (
      id, show_featured_tour, featured_tour_id, featured_badge_label,
      featured_urgency_text, featured_reasons
    ) VALUES (
      1, ${!!data.showFeaturedTour}, ${data.featuredTourId}, ${data.featuredBadgeLabel},
      ${data.featuredUrgencyText}, ${JSON.stringify(data.featuredReasons || [])}::jsonb
    )
    ON CONFLICT (id) DO UPDATE SET
      show_featured_tour = EXCLUDED.show_featured_tour,
      featured_tour_id = EXCLUDED.featured_tour_id,
      featured_badge_label = EXCLUDED.featured_badge_label,
      featured_urgency_text = EXCLUDED.featured_urgency_text,
      featured_reasons = EXCLUDED.featured_reasons
  `;
}

// Touches ONLY sections_json — the "Why a Guided Tour" / "Tower Access" /
// "Practical Info" / "Price Comparison" content.
export async function saveHomepageSections(sections: HomepageSections): Promise<void> {
  await sql`
    INSERT INTO homepage (id, sections_json)
    VALUES (1, ${JSON.stringify(sections)}::jsonb)
    ON CONFLICT (id) DO UPDATE SET sections_json = EXCLUDED.sections_json
  `;
}

// Touches ONLY header_json — the site-wide navbar (logo, nav links, CTA
// button). Renders on every page, edited from the Homepage admin tab.
export async function saveSiteHeader(header: HeaderContent): Promise<void> {
  await sql`
    INSERT INTO homepage (id, header_json)
    VALUES (1, ${JSON.stringify(header)}::jsonb)
    ON CONFLICT (id) DO UPDATE SET header_json = EXCLUDED.header_json
  `;
}

// Touches ONLY footer_json — the site-wide footer.
export async function saveSiteFooter(footer: FooterContent): Promise<void> {
  await sql`
    INSERT INTO homepage (id, footer_json)
    VALUES (1, ${JSON.stringify(footer)}::jsonb)
    ON CONFLICT (id) DO UPDATE SET footer_json = EXCLUDED.footer_json
  `;
}

// Touches ONLY theme_json — the site-wide brand colors.
export async function saveSiteTheme(theme: ThemeColors): Promise<void> {
  await sql`
    INSERT INTO homepage (id, theme_json)
    VALUES (1, ${JSON.stringify(theme)}::jsonb)
    ON CONFLICT (id) DO UPDATE SET theme_json = EXCLUDED.theme_json
  `;
}
