import fs from "fs";
import path from "path";

// Every piece of editable site content (tours, blog posts, homepage copy,
// FAQs) lives as JSON under /data. The admin CMS reads and writes these
// same files, so an edit saved in /admin shows up on the live site on the
// next request — no redeploy needed. Pages that read this data set
// `export const dynamic = "force-dynamic"` so Next.js doesn't cache a
// stale, build-time snapshot.
const DATA_DIR = path.join(process.cwd(), "data");

export function readJson<T>(file: string): T {
  const filePath = path.join(DATA_DIR, file);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export function writeJson<T>(file: string, data: T): void {
  const filePath = path.join(DATA_DIR, file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}
