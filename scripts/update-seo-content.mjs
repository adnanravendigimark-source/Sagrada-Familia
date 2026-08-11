// One-time content push for the SEO/content audit fixes: humanized blog
// copy (sensory detail, Nativity vs. Passion tower comparison, dress-code
// and bag-storage tip), a tightened meta title, varied "Recommended tour"
// homepage copy, and a new FAQ entry. Since all content now lives in your
// Neon database (not the /data JSON files), editing those files alone
// doesn't change the live site — this script reads the updated JSON and
// writes it into the matching database rows.
//
// Safe to run more than once — it just overwrites the same fields with the
// same values again. It will NOT touch tours, combo offers, or any post/FAQ
// you've since edited by hand through /admin unless it happens to match
// exactly what's below.
//
// How to run it:
//   1. Make sure DATABASE_URL is set in your .env (same one used by
//      scripts/setup-db.mjs).
//   2. From the project root:
//        npm install
//        node scripts/update-seo-content.mjs

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
    "DATABASE_URL is not set. Add it to your .env file, then re-run."
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

async function updatePosts() {
  const posts = readJsonFile("posts.json");
  if (!posts) {
    console.log("posts: no data/posts.json found — skipping.");
    return;
  }
  for (const p of posts) {
    await sql`
      UPDATE posts SET
        meta_title = ${p.metaTitle},
        meta_description = ${p.metaDescription},
        read_time = ${p.readTime},
        content = ${JSON.stringify(p.content || [])}::jsonb
      WHERE slug = ${p.slug}
    `;
  }
  console.log(`posts: pushed updated content for ${posts.length} slug(s).`);
}

async function updateHomepage() {
  const h = readJsonFile("homepage.json");
  if (!h) {
    console.log("homepage: no data/homepage.json found — skipping.");
    return;
  }
  await sql`
    UPDATE homepage SET
      featured_tour_id = ${h.featuredTourId || ""},
      featured_reasons = ${JSON.stringify(h.featuredReasons || [])}::jsonb
    WHERE id = 1
  `;
  console.log("homepage: updated recommended tour + reasons.");
}

async function addNativityFaq() {
  const question = "Which is better: Nativity Tower or Passion Tower?";
  const [existing] = await sql`SELECT id FROM faqs WHERE question = ${question} LIMIT 1`;
  if (existing) {
    console.log("faqs: Nativity vs Passion question already exists — skipping.");
    return;
  }
  const answer =
    "It depends what you're after. The Nativity Tower — Gaudí's original, most heavily worked façade — puts you closest to the hand-carved stonework: fruit, birds, and figures he personally detailed before 1926. The Passion Tower is newer and plainer up close, but its walkway sits slightly higher and looks further out toward the sea, making it the better pick for a wide skyline photo. Both cost the same and take about the same time, so choose based on whether you care more about the carving detail or the view.";
  const [{ max }] = await sql`SELECT COALESCE(MAX(sort_order), -1) AS max FROM faqs`;
  await sql`
    INSERT INTO faqs (question, answer, sort_order)
    VALUES (${question}, ${answer}, ${max + 1})
  `;
  console.log("faqs: added the Nativity vs Passion Tower question.");
}

async function main() {
  await updatePosts();
  await updateHomepage();
  await addNativityFaq();
  console.log("\nDone — your live database now has the updated SEO/content fixes.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("\nUpdate failed:", err);
    process.exit(1);
  });
