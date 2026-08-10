import { neon } from "@neondatabase/serverless";

// Neon's HTTP-based driver — each `sql` call is a single stateless HTTP
// request, which is what makes it safe to use from serverless functions
// (Vercel) without exhausting a connection pool the way a normal
// long-lived Postgres client would.
//
// Requires a DATABASE_URL env var pointing at your Neon connection string
// (Neon dashboard → Connection Details → "Pooled connection" string).
// Set it in .env locally, and in your Vercel project's Settings →
// Environment Variables for production.
if (!process.env.DATABASE_URL) {
  console.warn(
    "[db] DATABASE_URL is not set — every content read/write will fail until it's configured."
  );
}

export const sql = neon(process.env.DATABASE_URL || "postgres://unset");

// Shown to the admin (instead of a raw crash) when a save fails because
// the database couldn't be reached or rejected the query — e.g. DATABASE_URL
// missing/wrong, or the Neon project is paused/unreachable.
export const DB_ERROR_MESSAGE =
  "Couldn't save — the database couldn't be reached. Check that DATABASE_URL is set correctly (and that your Neon project is active), then try again.";
