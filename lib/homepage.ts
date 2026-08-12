import { sql } from "./db";

export interface HomepageContent {
  heroBadge: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  heroImageAlt: string;
  ratingValue: string;
  ratingCount: string;
  // "Featured/Recommended Tour" widget — a compact sticky bar on mobile,
  // a richer showcase card on desktop. Which tour it promotes and its
  // copy are both editable from /admin/homepage.
  showFeaturedTour: boolean;
  featuredTourId: string;
  featuredBadgeLabel: string;
  featuredUrgencyText: string;
  featuredReasons: string[];
  // Search Engine Indexing toggle (admin-editable). false (default) =
  // indexable (index, follow). true = noindex, nofollow. See lib/seo.ts.
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
  ratingValue: "4.8 / 5",
  ratingCount: "",
  showFeaturedTour: false,
  featuredTourId: "",
  featuredBadgeLabel: "Recommended",
  featuredUrgencyText: "",
  featuredReasons: [],
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

function rowToHomepage(row: any): HomepageContent {
  return {
    heroBadge: row.hero_badge || "",
    heroHeading: row.hero_heading || "",
    heroSubheading: row.hero_subheading || "",
    heroImage: row.hero_image || "",
    heroImageAlt: row.hero_image_alt || "",
    ratingValue: row.rating_value || "",
    ratingCount: row.rating_count || "",
    showFeaturedTour: !!row.show_featured_tour,
    featuredTourId: row.featured_tour_id || "",
    featuredBadgeLabel: row.featured_badge_label || "",
    featuredUrgencyText: row.featured_urgency_text || "",
    featuredReasons: parseReasons(row.featured_reasons),
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

// The Homepage admin page (/admin/homepage) and the Recommended Tour admin
// page (/admin/recommended) both edit different fields of this same single
// `homepage` row, but each is a separate form with its own page-load-time
// snapshot of the full HomepageContent object. If either form saved by
// PUTting its entire snapshot back (as a single saveHomepageContent(data)
// used to), then saving one page after the other had been edited would
// silently overwrite the other page's change with whatever stale value
// happened to be sitting in the first form's state — e.g. editing the hero
// headline and clicking Save would quietly revert any Recommended Tour
// change made since the Homepage page was last loaded, and vice versa.
// Splitting into two column-scoped saves (below) makes each form only ever
// touch the columns it actually owns, so the two pages can no longer clobber
// each other no matter what order they're saved in or how stale either
// form's snapshot of the *other* page's fields is.
export async function saveHomepageCopy(data: {
  heroBadge: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  heroImageAlt: string;
  ratingValue: string;
  ratingCount: string;
  noIndex: boolean;
  noFollow: boolean;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}): Promise<void> {
  await sql`
    INSERT INTO homepage (
      id, hero_badge, hero_heading, hero_subheading, hero_image, hero_image_alt,
      rating_value, rating_count, no_index, no_follow, canonical_url,
      og_title, og_description, og_image
    ) VALUES (
      1, ${data.heroBadge}, ${data.heroHeading}, ${data.heroSubheading}, ${data.heroImage},
      ${data.heroImageAlt}, ${data.ratingValue}, ${data.ratingCount}, ${!!data.noIndex}, ${!!data.noFollow},
      ${data.canonicalUrl || ""}, ${data.ogTitle || ""}, ${data.ogDescription || ""}, ${data.ogImage || ""}
    )
    ON CONFLICT (id) DO UPDATE SET
      hero_badge = EXCLUDED.hero_badge,
      hero_heading = EXCLUDED.hero_heading,
      hero_subheading = EXCLUDED.hero_subheading,
      hero_image = EXCLUDED.hero_image,
      hero_image_alt = EXCLUDED.hero_image_alt,
      rating_value = EXCLUDED.rating_value,
      rating_count = EXCLUDED.rating_count,
      no_index = EXCLUDED.no_index,
      no_follow = EXCLUDED.no_follow,
      canonical_url = EXCLUDED.canonical_url,
      og_title = EXCLUDED.og_title,
      og_description = EXCLUDED.og_description,
      og_image = EXCLUDED.og_image
  `;
}

// Touches ONLY the indexing columns — used by the centralized "Indexing"
// admin tab (/admin/indexing) so flipping this page's Index/Follow toggle
// there can never clobber the Homepage form's hero copy or vice versa,
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
