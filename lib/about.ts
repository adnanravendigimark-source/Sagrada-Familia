import { sql } from "./db";

// One "why us" trust card. `icon` is a key into the fixed ICON_OPTIONS map
// (see components/admin/IconPicker.tsx) rather than a component reference
// — the DB stores plain JSON, it can't store a React component.
export interface AboutReason {
  icon: string;
  title: string;
  body: string;
}

export interface AboutPageContent {
  heroEyebrow: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  heroImageAlt: string;
  introHeading: string;
  introParagraph1: string;
  introParagraph2: string;
  introImage: string;
  introImageAlt: string;
  reasonsHeading: string;
  reasonsSubheading: string;
  reasons: AboutReason[];
  disclosureHeading: string;
  disclosureBody: string;
  ctaText: string;
  ctaButtonLabel: string;
  // SEO fields — every one editable from /admin/about, all optional except
  // metaTitle/metaDescription (auto-generate to the hero heading/subheading
  // if left blank so the page always has something reasonable).
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  noIndex: boolean;
  noFollow: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

const DEFAULT_ABOUT: AboutPageContent = {
  heroEyebrow: "About Us",
  heroHeading: "Your Independent Guide to Sagrada Familia Tickets & Guided Tours",
  heroSubheading:
    "We help travelers book the right Sagrada Familia guided tour or skip-the-line ticket online — curated from certified, licensed operators, explained in plain language.",
  heroImage: "https://images.unsplash.com/photo-1567437890326-0084ea9d99e9?q=80&w=2000&auto=format&fit=crop",
  heroImageAlt: "Sagrada Familia basilica facade in Barcelona",
  introHeading: "Why We Built a Sagrada Familia Tour & Ticket Guide",
  introParagraph1:
    "We built this site around one belief: a guide is worth more than a bare entry ticket. Sagrada Familia has almost no on-site signage explaining what you're looking at — the symbolism in the façades, why the columns lean like trees, what each tower represents. A skip-the-line ticket gets you through the door. A good guided tour is the difference between seeing a beautiful building and actually understanding Gaudí's design.",
  introParagraph2:
    "We're an independent Sagrada Familia tickets and tours guide — not the official venue website. We compare guided tours, skip-the-line tickets, and tower-access options from licensed, established operators, currently via GetYourGuide, and point you to the ones worth your time and money.",
  introImage: "https://images.unsplash.com/photo-1728249960363-13079cc2c6f6?q=80&w=1000&auto=format&fit=crop",
  introImageAlt: "Sagrada Familia spires with apostle statues",
  reasonsHeading: "How We Pick Our Sagrada Familia Guided Tours",
  reasonsSubheading: "Every guided tour and ticket listed on this site is screened against four criteria before it earns a spot.",
  reasons: [
    { icon: "ShieldCheckIcon", title: "Certified, Licensed Guides", body: "Every guided tour we list uses certified local guides — not fast-track entry resold as a \"tour.\"" },
    { icon: "StarIcon", title: "Real Review Volume", body: "We only list tours with verifiable review counts and ratings, not cherry-picked testimonials." },
    { icon: "LockIcon", title: "Transparent Pricing", body: "The price you see on the tour card is the price you pay — no hidden fees added at checkout." },
    { icon: "HeadsetIcon", title: "Honest, Clear Info", body: "We tell you exactly what's included — and what isn't, like tower access, which is often separate." },
  ],
  disclosureHeading: "A Note on How We Earn",
  disclosureBody:
    "When you book a Sagrada Familia guided tour or ticket through a link on this site, we earn a small commission from the operator at no extra cost to you. This is how we keep the site free and independently written — it doesn't affect which tours we recommend or how we rank them.",
  ctaText: "Ready to book your Sagrada Familia guided tour?",
  ctaButtonLabel: "Compare Sagrada Familia Guided Tours",
  metaTitle: "About Us | Sagrada Familia Guided Tour & Ticket Booking Guide",
  metaDescription:
    "Who curates our Sagrada Familia guided tours and skip-the-line tickets online, how we pick certified guides, and why a guided tour beats a bare entry ticket.",
  canonicalUrl: "",
  noIndex: false,
  noFollow: false,
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
};

function parseReasons(value: unknown): AboutReason[] {
  if (Array.isArray(value)) return value as AboutReason[];
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

function rowToAbout(row: any): AboutPageContent {
  return {
    heroEyebrow: row.hero_eyebrow ?? DEFAULT_ABOUT.heroEyebrow,
    heroHeading: row.hero_heading ?? DEFAULT_ABOUT.heroHeading,
    heroSubheading: row.hero_subheading ?? DEFAULT_ABOUT.heroSubheading,
    heroImage: row.hero_image ?? DEFAULT_ABOUT.heroImage,
    heroImageAlt: row.hero_image_alt ?? DEFAULT_ABOUT.heroImageAlt,
    introHeading: row.intro_heading ?? DEFAULT_ABOUT.introHeading,
    introParagraph1: row.intro_paragraph_1 ?? DEFAULT_ABOUT.introParagraph1,
    introParagraph2: row.intro_paragraph_2 ?? DEFAULT_ABOUT.introParagraph2,
    introImage: row.intro_image ?? DEFAULT_ABOUT.introImage,
    introImageAlt: row.intro_image_alt ?? DEFAULT_ABOUT.introImageAlt,
    reasonsHeading: row.reasons_heading ?? DEFAULT_ABOUT.reasonsHeading,
    reasonsSubheading: row.reasons_subheading ?? DEFAULT_ABOUT.reasonsSubheading,
    reasons: parseReasons(row.reasons).length ? parseReasons(row.reasons) : DEFAULT_ABOUT.reasons,
    disclosureHeading: row.disclosure_heading ?? DEFAULT_ABOUT.disclosureHeading,
    disclosureBody: row.disclosure_body ?? DEFAULT_ABOUT.disclosureBody,
    ctaText: row.cta_text ?? DEFAULT_ABOUT.ctaText,
    ctaButtonLabel: row.cta_button_label ?? DEFAULT_ABOUT.ctaButtonLabel,
    metaTitle: row.meta_title || DEFAULT_ABOUT.metaTitle,
    metaDescription: row.meta_description || DEFAULT_ABOUT.metaDescription,
    canonicalUrl: row.canonical_url || "",
    noIndex: !!row.no_index,
    noFollow: !!row.no_follow,
    ogTitle: row.og_title || "",
    ogDescription: row.og_description || "",
    ogImage: row.og_image || "",
  };
}

export async function getAboutPage(): Promise<AboutPageContent> {
  try {
    const rows = await sql`SELECT * FROM about_page WHERE id = 1 LIMIT 1`;
    return rows.length ? rowToAbout(rows[0]) : DEFAULT_ABOUT;
  } catch {
    return DEFAULT_ABOUT;
  }
}

export async function saveAboutPage(data: AboutPageContent): Promise<void> {
  await sql`
    INSERT INTO about_page (
      id, hero_eyebrow, hero_heading, hero_subheading, hero_image, hero_image_alt,
      intro_heading, intro_paragraph_1, intro_paragraph_2, intro_image, intro_image_alt,
      reasons_heading, reasons_subheading, reasons,
      disclosure_heading, disclosure_body, cta_text, cta_button_label,
      meta_title, meta_description, canonical_url, no_index, no_follow,
      og_title, og_description, og_image
    ) VALUES (
      1, ${data.heroEyebrow}, ${data.heroHeading}, ${data.heroSubheading}, ${data.heroImage}, ${data.heroImageAlt},
      ${data.introHeading}, ${data.introParagraph1}, ${data.introParagraph2}, ${data.introImage}, ${data.introImageAlt},
      ${data.reasonsHeading}, ${data.reasonsSubheading}, ${JSON.stringify(data.reasons || [])}::jsonb,
      ${data.disclosureHeading}, ${data.disclosureBody}, ${data.ctaText}, ${data.ctaButtonLabel},
      ${data.metaTitle}, ${data.metaDescription}, ${data.canonicalUrl || ""}, ${!!data.noIndex}, ${!!data.noFollow},
      ${data.ogTitle || ""}, ${data.ogDescription || ""}, ${data.ogImage || ""}
    )
    ON CONFLICT (id) DO UPDATE SET
      hero_eyebrow = EXCLUDED.hero_eyebrow,
      hero_heading = EXCLUDED.hero_heading,
      hero_subheading = EXCLUDED.hero_subheading,
      hero_image = EXCLUDED.hero_image,
      hero_image_alt = EXCLUDED.hero_image_alt,
      intro_heading = EXCLUDED.intro_heading,
      intro_paragraph_1 = EXCLUDED.intro_paragraph_1,
      intro_paragraph_2 = EXCLUDED.intro_paragraph_2,
      intro_image = EXCLUDED.intro_image,
      intro_image_alt = EXCLUDED.intro_image_alt,
      reasons_heading = EXCLUDED.reasons_heading,
      reasons_subheading = EXCLUDED.reasons_subheading,
      reasons = EXCLUDED.reasons,
      disclosure_heading = EXCLUDED.disclosure_heading,
      disclosure_body = EXCLUDED.disclosure_body,
      cta_text = EXCLUDED.cta_text,
      cta_button_label = EXCLUDED.cta_button_label,
      meta_title = EXCLUDED.meta_title,
      meta_description = EXCLUDED.meta_description,
      canonical_url = EXCLUDED.canonical_url,
      no_index = EXCLUDED.no_index,
      no_follow = EXCLUDED.no_follow,
      og_title = EXCLUDED.og_title,
      og_description = EXCLUDED.og_description,
      og_image = EXCLUDED.og_image
  `;
}
