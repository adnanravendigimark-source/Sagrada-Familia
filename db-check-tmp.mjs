import { neon } from "@neondatabase/serverless";
import fs from "fs";

const envContent = fs.readFileSync(".env", "utf8");
const match = envContent.match(/DATABASE_URL=(.+)/);
if (!match) { console.log("No DATABASE_URL found"); process.exit(1); }
const url = match[1].trim();
console.log("Host:", new URL(url).host);

const sql = neon(url);
try {
  const cols = await sql`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'homepage' ORDER BY ordinal_position`;
  console.log("homepage columns:", JSON.stringify(cols, null, 2));
} catch (e) {
  console.log("ERROR:", e.message);
}
