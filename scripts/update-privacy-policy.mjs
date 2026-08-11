// Pushes data/privacy-policy.json into the live database, overwriting
// whatever's currently in the `privacy_policy` table. Use this when the
// policy text has been rewritten and the table was already seeded once
// before (scripts/setup-db.mjs only seeds empty tables, so it won't pick
// up content changes on its own).
//
// Run with: node scripts/update-privacy-policy.mjs

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
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadDotEnv();

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set. Add it to your .env file, then re-run.");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const filePath = path.join(process.cwd(), "data", "privacy-policy.json");

if (!fs.existsSync(filePath)) {
  console.error("data/privacy-policy.json not found.");
  process.exit(1);
}

const policy = JSON.parse(fs.readFileSync(filePath, "utf-8"));
const today = new Date().toISOString().slice(0, 10);

async function main() {
  await sql`
    INSERT INTO privacy_policy (id, title, last_updated, content)
    VALUES (1, ${policy.title || "Privacy Policy"}, ${today}, ${JSON.stringify(policy.content || [])}::jsonb)
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      last_updated = EXCLUDED.last_updated,
      content = EXCLUDED.content
  `;
  console.log("privacy_policy: updated from data/privacy-policy.json.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Update failed:", err);
    process.exit(1);
  });
