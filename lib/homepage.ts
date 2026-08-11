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

export async function saveHomepageContent(data: HomepageContent): Promise<void> {
  await sql`
    INSERT INTO homepage (
      id, hero_badge, hero_heading, hero_subheading, hero_image, hero_image_alt,
      rating_value, rating_count, show_featured_tour, featured_tour_id,
      featured_badge_label, featured_urgency_text, featured_reasons, no_index
    ) VALUES (
      1, ${data.heroBadge}, ${data.heroHeading}, ${data.heroSubheading}, ${data.heroImage},
      ${data.heroImageAlt}, ${data.ratingValue}, ${data.ratingCount}, ${!!data.showFeaturedTour},
      ${data.featuredTourId}, ${data.featuredBadgeLabel}, ${data.featuredUrgencyText},
      ${JSON.stringify(data.featuredReasons || [])}::jsonb, ${!!data.noIndex}
    )
    ON CONFLICT (id) DO UPDATE SET
      hero_badge = EXCLUDED.hero_badge,
      hero_heading = EXCLUDED.hero_heading,
      hero_subheading = EXCLUDED.hero_subheading,
      hero_image = EXCLUDED.hero_image,
      hero_image_alt = EXCLUDED.hero_image_alt,
      rating_value = EXCLUDED.rating_value,
      rating_count = EXCLUDED.rating_count,
      show_featured_tour = EXCLUDED.show_featured_tour,
      featured_tour_id = EXCLUDED.featured_tour_id,
      featured_badge_label = EXCLUDED.featured_badge_label,
      featured_urgency_text = EXCLUDED.featured_urgency_text,
      featured_reasons = EXCLUDED.featured_reasons,
      no_index = EXCLUDED.no_index
  `;
}
