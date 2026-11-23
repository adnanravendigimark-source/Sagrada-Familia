import { SITE_URL } from "./site";

// The site's named editor. Shown as the byline on every guide and as the
// Article author in structured data. Only facts the owner supplied: a name
// and the editorial role on this site. No invented credentials or visits.
export const AUTHOR = {
  name: "John T.",
  role: "Editor",
  path: "/about#editor",
  url: `${SITE_URL}/about#editor`,
} as const;

// Where the editorial / fact-checking policy lives (About page section).
export const EDITORIAL_POLICY_URL = `${SITE_URL}/about#editorial-policy`;
