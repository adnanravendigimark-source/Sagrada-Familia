import { sql } from "./db";

// The About page body used to be many small structured fields (intro
// paragraphs, a reasons array, disclosure fields, CTA text, a contact
// prompt). It's now one flowing rich-text `content` field — edited as a
// single article in the admin (see components/admin/AboutForm.tsx), the
// same way a blog post's body is edited. This keeps the page flexible
// (any heading order, any number of paragraphs/lists) without a form field
// for every possible section.
//
// The now-unused legacy columns (intro_heading, reasons, disclosure_body,
// cta_text, contact_prompt_html, etc.) are deliberately left in the
// database — only this TypeScript interface and the read/write code below
// were simplified. Dropping the columns isn't necessary and would make
// this change harder to revert.
export interface AboutPageContent {
  heroEyebrow: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  heroImageAlt: string;
  // Single rich-text field holding the entire page body below the hero —
  // written/edited as one article (see TiptapArticleEditor in AboutForm).
  content: string;
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
  content: `<h2>Our Mission</h2>
<p>We built this site around one belief: a guide is worth more than a bare entry ticket. Sagrada Familia has almost no on-site signage explaining what you're looking at — the symbolism in the façades, why the columns lean like trees, what each tower represents. A skip-the-line ticket gets you through the door. A good guided tour is the difference between seeing a beautiful building and actually understanding Gaudí's design.</p>
<p>We're an independent Sagrada Familia tickets and tours guide — not the official venue website. We compare guided tours, skip-the-line tickets, and tower-access options from licensed, established operators, and point you to the ones worth your time and money.</p>
<h2>How We Choose Our Sagrada Familia Guided Tours</h2>
<p>Every guided tour and ticket listed on this site is screened against four criteria before it earns a spot.</p>
<ul>
<li><strong>Certified, Licensed Guides —</strong> Every guided tour we list uses certified local guides — not fast-track entry resold as a "tour."</li>
<li><strong>Real Review Volume —</strong> We only list tours with verifiable review counts and ratings, not cherry-picked testimonials.</li>
<li><strong>Transparent Pricing —</strong> The price you see on the tour card is the price you pay — no hidden fees added at checkout.</li>
<li><strong>Honest, Clear Info —</strong> We tell you exactly what's included — and what isn't, like tower access, which is often separate.</li>
</ul>
<h2>Independent Sagrada Familia Guide</h2>
<p>This is an independent affiliate website, not the official Sagrada Familia ticketing authority or a tour operator ourselves. When you book through a link on this site, the booking itself is completed on GetYourGuide, our trusted third-party booking partner, and is subject to their terms, pricing, and cancellation policies.</p>
<h2>Our Content</h2>
<p>We try to write practical, honest guides rather than oversold marketing copy — what's actually worth booking, what tower access does and doesn't include, and when a skip-the-line ticket is enough on its own. Details like pricing, availability, and included stops can change, so always check the booking page for the current, accurate information before you buy.</p>
<h2>Affiliate Disclosure</h2>
<p>When you book a Sagrada Familia guided tour or ticket through a link on this site, we earn a small commission from the operator at no extra cost to you. This is how we keep the site free and independently written — it doesn't affect which tours we recommend or how we rank them.</p>
<p>We aim to be transparent about how this site works and how we make our recommendations. Have questions before you book? Reach out via our <a href="/contact">contact page</a>.</p>`,
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

function rowToAbout(row: any): AboutPageContent {
  return {
    heroEyebrow: row.hero_eyebrow ?? DEFAULT_ABOUT.heroEyebrow,
    heroHeading: row.hero_heading ?? DEFAULT_ABOUT.heroHeading,
    heroSubheading: row.hero_subheading ?? DEFAULT_ABOUT.heroSubheading,
    heroImage: row.hero_image ?? DEFAULT_ABOUT.heroImage,
    heroImageAlt: row.hero_image_alt ?? DEFAULT_ABOUT.heroImageAlt,
    content: row.content || DEFAULT_ABOUT.content,
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

// Touches ONLY the indexing columns — used by the centralized "Indexing"
// admin tab (/admin/indexing).
export async function setAboutIndexing(noIndex: boolean, noFollow: boolean): Promise<void> {
  await sql`
    INSERT INTO about_page (id, no_index, no_follow)
    VALUES (1, ${!!noIndex}, ${!!noFollow})
    ON CONFLICT (id) DO UPDATE SET
      no_index = EXCLUDED.no_index,
      no_follow = EXCLUDED.no_follow
  `;
}

export async function saveAboutPage(data: AboutPageContent): Promise<void> {
  await sql`
    INSERT INTO about_page (
      id, hero_eyebrow, hero_heading, hero_subheading, hero_image, hero_image_alt,
      content,
      meta_title, meta_description, canonical_url, no_index, no_follow,
      og_title, og_description, og_image
    ) VALUES (
      1, ${data.heroEyebrow}, ${data.heroHeading}, ${data.heroSubheading}, ${data.heroImage}, ${data.heroImageAlt},
      ${data.content || ""},
      ${data.metaTitle}, ${data.metaDescription}, ${data.canonicalUrl || ""}, ${!!data.noIndex}, ${!!data.noFollow},
      ${data.ogTitle || ""}, ${data.ogDescription || ""}, ${data.ogImage || ""}
    )
    ON CONFLICT (id) DO UPDATE SET
      hero_eyebrow = EXCLUDED.hero_eyebrow,
      hero_heading = EXCLUDED.hero_heading,
      hero_subheading = EXCLUDED.hero_subheading,
      hero_image = EXCLUDED.hero_image,
      hero_image_alt = EXCLUDED.hero_image_alt,
      content = EXCLUDED.content,
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
