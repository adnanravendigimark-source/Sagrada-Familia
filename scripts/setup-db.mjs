// One-time (and safe-to-re-run) database setup for the admin CMS.
//
// What it does:
//   1. Creates every table the app needs, if they don't already exist.
//   2. If a table is empty, seeds it from the matching file in /data
//      (the content that was previously stored as flat JSON files) so you
//      don't lose the tours/posts/FAQs/homepage copy already written.
//
// How to run it:
//   1. Add DATABASE_URL to your .env file — get it from your Neon project
//      dashboard → Connection Details → "Pooled connection".
//   2. Also add the same DATABASE_URL to your Vercel project's
//      Settings → Environment Variables (for Production, Preview, and
//      Development) — the deployed app reads it the same way.
//   3. From the project root, run:
//        npm install
//        node scripts/setup-db.mjs
//   4. Redeploy (push to git, or `vercel --prod`).
//
// Safe to run again later — it only creates tables that don't exist yet,
// and only seeds a table if it's currently empty, so it will never
// overwrite content you've since edited through the live admin panel.

import fs from "fs";
import path from "path";
import { neon } from "@neondatabase/serverless";

function loadDotEnv() {
  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadDotEnv();

if (!process.env.DATABASE_URL) {
  console.error(
    "DATABASE_URL is not set. Add it to your .env file (see the comment at the top of this script), then re-run."
  );
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const dataDir = path.join(process.cwd(), "data");

function readJsonFile(name) {
  const filePath = path.join(dataDir, name);
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return null;
  }
}

async function createTables() {
  console.log("Creating tables (if they don't already exist)...");

  await sql`
    CREATE TABLE IF NOT EXISTS tours (
      id TEXT PRIMARY KEY,
      badge TEXT NOT NULL,
      ribbon TEXT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      includes JSONB NOT NULL DEFAULT '[]',
      duration TEXT,
      rating NUMERIC NOT NULL DEFAULT 5,
      reviews INTEGER NOT NULL DEFAULT 0,
      price INTEGER NOT NULL DEFAULT 0,
      original_price INTEGER,
      image TEXT NOT NULL,
      image_alt TEXT NOT NULL,
      href_path TEXT NOT NULL,
      href_extra TEXT,
      featured BOOLEAN NOT NULL DEFAULT false,
      best_for TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS combo_offers (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      href_path TEXT NOT NULL,
      href_extra TEXT,
      sort_order INTEGER NOT NULL DEFAULT 0
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      slug TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      meta_title TEXT NOT NULL,
      meta_description TEXT NOT NULL,
      category TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      quick_answer TEXT NOT NULL,
      read_time TEXT NOT NULL,
      date TEXT NOT NULL,
      image TEXT NOT NULL,
      image_alt TEXT NOT NULL,
      recommended_tour_id TEXT NOT NULL DEFAULT '',
      recommended_tour_after_block INTEGER,
      content JSONB NOT NULL DEFAULT '[]',
      sort_order INTEGER NOT NULL DEFAULT 0
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS homepage (
      id INTEGER PRIMARY KEY DEFAULT 1,
      hero_badge TEXT NOT NULL DEFAULT '',
      hero_heading TEXT NOT NULL DEFAULT '',
      hero_subheading TEXT NOT NULL DEFAULT '',
      hero_image TEXT NOT NULL DEFAULT '',
      hero_image_alt TEXT NOT NULL DEFAULT '',
      rating_value TEXT NOT NULL DEFAULT '',
      rating_count TEXT NOT NULL DEFAULT '',
      show_featured_tour BOOLEAN NOT NULL DEFAULT false,
      featured_tour_id TEXT NOT NULL DEFAULT '',
      featured_badge_label TEXT NOT NULL DEFAULT '',
      featured_urgency_text TEXT NOT NULL DEFAULT '',
      featured_reasons JSONB NOT NULL DEFAULT '[]',
      CONSTRAINT homepage_singleton CHECK (id = 1)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS faqs (
      id SERIAL PRIMARY KEY,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL,
      pages JSONB NOT NULL DEFAULT '[]',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  console.log("Tables ready.");
}

async function seedTours() {
  const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM tours`;
  if (count > 0) {
    console.log(`tours: already has ${count} row(s) — skipping seed.`);
    return;
  }
  const tours = readJsonFile("tours.json");
  if (!tours || tours.length === 0) {
    console.log("tours: no data/tours.json to seed from — skipping.");
    return;
  }
  for (let i = 0; i < tours.length; i++) {
    const t = tours[i];
    await sql`
      INSERT INTO tours (
        id, badge, ribbon, title, description, includes, duration, rating,
        reviews, price, original_price, image, image_alt, href_path,
        href_extra, featured, best_for, sort_order
      ) VALUES (
        ${t.id}, ${t.badge}, ${t.ribbon || null}, ${t.title}, ${t.description},
        ${JSON.stringify(t.includes || [])}::jsonb, ${t.duration || null},
        ${t.rating ?? 5}, ${t.reviews ?? 0}, ${t.price ?? 0}, ${t.originalPrice ?? null},
        ${t.image}, ${t.imageAlt}, ${t.hrefPath}, ${t.hrefExtra || null},
        ${!!t.featured}, ${t.bestFor || ""}, ${i}
      )
      ON CONFLICT (id) DO NOTHING
    `;
  }
  console.log(`tours: seeded ${tours.length} row(s).`);
}

async function seedComboOffers() {
  const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM combo_offers`;
  if (count > 0) {
    console.log(`combo_offers: already has ${count} row(s) — skipping seed.`);
    return;
  }
  const offers = readJsonFile("combo-offers.json");
  if (!offers || offers.length === 0) {
    console.log("combo_offers: no data/combo-offers.json to seed from — skipping.");
    return;
  }
  for (let i = 0; i < offers.length; i++) {
    const o = offers[i];
    await sql`
      INSERT INTO combo_offers (id, title, description, href_path, href_extra, sort_order)
      VALUES (${o.id}, ${o.title}, ${o.description}, ${o.hrefPath}, ${o.hrefExtra || null}, ${i})
      ON CONFLICT (id) DO NOTHING
    `;
  }
  console.log(`combo_offers: seeded ${offers.length} row(s).`);
}

async function seedPosts() {
  const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM posts`;
  if (count > 0) {
    console.log(`posts: already has ${count} row(s) — skipping seed.`);
    return;
  }
  const posts = readJsonFile("posts.json");
  if (!posts || posts.length === 0) {
    console.log("posts: no data/posts.json to seed from — skipping.");
    return;
  }
  for (let i = 0; i < posts.length; i++) {
    const p = posts[i];
    await sql`
      INSERT INTO posts (
        slug, title, meta_title, meta_description, category, excerpt,
        quick_answer, read_time, date, image, image_alt,
        recommended_tour_id, recommended_tour_after_block, content, sort_order
      ) VALUES (
        ${p.slug}, ${p.title}, ${p.metaTitle}, ${p.metaDescription}, ${p.category},
        ${p.excerpt}, ${p.quickAnswer}, ${p.readTime}, ${p.date}, ${p.image}, ${p.imageAlt},
        ${p.recommendedTourId || ""}, ${p.recommendedTourAfterBlock ?? null},
        ${JSON.stringify(p.content || [])}::jsonb, ${i}
      )
      ON CONFLICT (slug) DO NOTHING
    `;
  }
  console.log(`posts: seeded ${posts.length} row(s).`);
}

async function seedHomepage() {
  const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM homepage`;
  if (count > 0) {
    console.log("homepage: already configured — skipping seed.");
    return;
  }
  const h = readJsonFile("homepage.json");
  if (!h) {
    console.log("homepage: no data/homepage.json to seed from — inserting defaults.");
    await sql`INSERT INTO homepage (id) VALUES (1) ON CONFLICT (id) DO NOTHING`;
    return;
  }
  await sql`
    INSERT INTO homepage (
      id, hero_badge, hero_heading, hero_subheading, hero_image, hero_image_alt,
      rating_value, rating_count, show_featured_tour, featured_tour_id,
      featured_badge_label, featured_urgency_text, featured_reasons
    ) VALUES (
      1, ${h.heroBadge || ""}, ${h.heroHeading || ""}, ${h.heroSubheading || ""},
      ${h.heroImage || ""}, ${h.heroImageAlt || ""}, ${h.ratingValue || ""}, ${h.ratingCount || ""},
      ${!!h.showFeaturedTour}, ${h.featuredTourId || ""}, ${h.featuredBadgeLabel || ""},
      ${h.featuredUrgencyText || ""}, ${JSON.stringify(h.featuredReasons || [])}::jsonb
    )
    ON CONFLICT (id) DO NOTHING
  `;
  console.log("homepage: seeded from data/homepage.json.");
}

async function seedFaqs() {
  const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM faqs`;
  if (count > 0) {
    console.log(`faqs: already has ${count} row(s) — skipping seed.`);
    return;
  }
  const faqs = readJsonFile("faqs.json");
  if (!faqs || faqs.length === 0) {
    console.log("faqs: no data/faqs.json to seed from — skipping.");
    return;
  }
  for (let i = 0; i < faqs.length; i++) {
    const f = faqs[i];
    await sql`
      INSERT INTO faqs (question, answer, sort_order) VALUES (${f.question}, ${f.answer}, ${i})
    `;
  }
  console.log(`faqs: seeded ${faqs.length} row(s).`);
}

// Users are NOT seeded from data/users.json on purpose — that file may
// contain stale/placeholder password hashes from before the DB migration.
// Create real users from the live admin panel (Users page) instead; the
// .env ADMIN_EMAIL/ADMIN_PASSWORD owner account keeps working regardless.

async function main() {
  await createTables();
  await seedTours();
  await seedComboOffers();
  await seedPosts();
  await seedHomepage();
  await seedFaqs();
  console.log("\nDone. Your database is ready.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("\nSetup failed:", err);
    process.exit(1);
  });
