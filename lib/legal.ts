import { sql } from "./db";
import type { ContentBlock } from "./posts";

export interface PrivacyPolicy {
  title: string;
  lastUpdated: string;
  content: ContentBlock[];
  // Search Engine Indexing toggle (admin-editable). false (default) =
  // indexable (index, follow). true = noindex, nofollow. See lib/seo.ts.
  noIndex: boolean;
  noFollow: boolean;
  canonicalUrl: string;
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

function parseContent(value: unknown): ContentBlock[] {
  if (Array.isArray(value)) return value as ContentBlock[];
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

// Fallback shown if the database is unreachable or hasn't been seeded yet
// (`node scripts/setup-db.mjs`) — same generic starter text as
// data/privacy-policy.json. This is a starting template, not legal advice;
// have a lawyer review it (especially for GDPR/CCPA) before relying on it.
const DEFAULT_PRIVACY_POLICY: PrivacyPolicy = {
  title: "Privacy Policy",
  lastUpdated: new Date().toISOString().slice(0, 10),
  content: [
    {
      type: "paragraph",
      text:
        "Welcome to Sagrada Familia Guided Tours (\"we,\" \"our,\" or \"us\"). We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.",
    },
    { type: "paragraph", text: "By using our website, you agree to the practices described in this Privacy Policy." },
    { type: "heading", text: "1. Who We Are" },
    {
      type: "paragraph",
      text:
        "Sagrada Familia Guided Tours is an independent travel information website that provides guides, visitor information, travel tips, and recommendations related to La Sagrada Família in Barcelona, Spain.",
    },
    { type: "paragraph", text: "We do not sell tickets directly." },
    {
      type: "paragraph",
      text:
        "We participate in affiliate marketing programs. When you click certain links and make a purchase through our affiliate partners, we may earn a commission at no additional cost to you.",
    },
    { type: "heading", text: "2. Information We Collect" },
    { type: "heading", text: "Information You Voluntarily Provide" },
    {
      type: "list",
      items: ["Name", "Email address", "Information submitted through contact forms", "Any information you voluntarily send us"],
    },
    { type: "heading", text: "Automatically Collected Information" },
    {
      type: "list",
      items: [
        "IP address",
        "Browser type",
        "Device information",
        "Operating system",
        "Pages visited",
        "Time spent on pages",
        "Referring website",
        "Date and time of your visit",
      ],
    },
    { type: "heading", text: "3. Cookies" },
    {
      type: "paragraph",
      text:
        "Our website uses cookies and similar technologies to remember preferences, improve website performance, analyze website traffic, measure marketing effectiveness, and support affiliate tracking.",
    },
    { type: "heading", text: "4. Affiliate Links" },
    {
      type: "paragraph",
      text: "Some links on our website are affiliate links. If you purchase through these links, we may earn a commission at no additional cost to you.",
    },
    { type: "paragraph", text: "Affiliate partners may include:" },
    { type: "list", items: ["GetYourGuide", "Viator", "Headout", "Tiqets", "Other travel booking platforms"] },
    { type: "heading", text: "5. Analytics" },
    {
      type: "paragraph",
      text: "We may use analytics services such as Google Analytics or similar tools to understand how visitors use our website.",
    },
    { type: "heading", text: "6. Advertising" },
    { type: "paragraph", text: "We may display advertisements from third-party advertising partners." },
    { type: "heading", text: "7. Third-Party Websites" },
    {
      type: "paragraph",
      text: "Our website contains links to third-party websites. We encourage you to review their privacy policies.",
    },
    { type: "heading", text: "8. How We Use Your Information" },
    { type: "paragraph", text: "We use information to:" },
    {
      type: "list",
      items: [
        "Operate our website",
        "Respond to inquiries",
        "Improve user experience",
        "Analyze website performance",
        "Detect fraud and security issues",
        "Comply with legal obligations",
        "Support affiliate tracking and reporting",
      ],
    },
    { type: "heading", text: "9. Sharing Your Information" },
    {
      type: "paragraph",
      text:
        "We do not sell your personal information. Information may be shared with analytics providers, affiliate partners, hosting providers, technical service providers, or legal authorities when required by law.",
    },
    { type: "heading", text: "10. Data Security" },
    {
      type: "paragraph",
      text: "We implement reasonable measures to protect your information, although no method of transmission over the internet is completely secure.",
    },
    { type: "heading", text: "11. Data Retention" },
    { type: "paragraph", text: "We retain personal information only as long as necessary for legal and operational purposes." },
    { type: "heading", text: "12. Your Rights" },
    {
      type: "paragraph",
      text:
        "Depending on your location, you may have rights to access, correct, delete, restrict processing, object to processing, request data portability, and withdraw consent.",
    },
    { type: "heading", text: "13. Children's Privacy" },
    { type: "paragraph", text: "Our website is not directed toward children under 13 years of age." },
    { type: "heading", text: "14. International Visitors" },
    { type: "paragraph", text: "Your information may be processed in countries with different data protection laws." },
    { type: "heading", text: "15. Changes to This Privacy Policy" },
    {
      type: "paragraph",
      text: "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.",
    },
    { type: "heading", text: "16. Contact Us" },
    { type: "paragraph", text: "Questions about this Privacy Policy? Email us at livetravelpartner@gmail.com." },
    {
      type: "paragraph",
      text:
        "Affiliate Disclosure: Sagrada Familia Guided Tours is an independent travel guide and is not affiliated with, endorsed by, sponsored by, or operated by the Basílica de la Sagrada Família, its management, or any official tourism authority. Some links are affiliate links, meaning we may earn a commission if you make a purchase through them at no additional cost to you.",
    },
  ],
  noIndex: false,
  noFollow: false,
  canonicalUrl: "",
  metaTitle: "Privacy Policy | Sagrada Familia Guided Tours",
  metaDescription: "Privacy Policy for Sagrada Familia Guided Tours — how we collect, use, and protect your information.",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
};

export async function getPrivacyPolicy(): Promise<PrivacyPolicy> {
  try {
    const rows = await sql`SELECT * FROM privacy_policy WHERE id = 1 LIMIT 1`;
    if (!rows.length) return DEFAULT_PRIVACY_POLICY;
    const row = rows[0] as any;
    return {
      title: row.title || DEFAULT_PRIVACY_POLICY.title,
      lastUpdated: row.last_updated || DEFAULT_PRIVACY_POLICY.lastUpdated,
      content: parseContent(row.content),
      noIndex: !!row.no_index,
      noFollow: !!row.no_follow,
      canonicalUrl: row.canonical_url || "",
      metaTitle: row.meta_title || DEFAULT_PRIVACY_POLICY.metaTitle,
      metaDescription: row.meta_description || DEFAULT_PRIVACY_POLICY.metaDescription,
      ogTitle: row.og_title || "",
      ogDescription: row.og_description || "",
      ogImage: row.og_image || "",
    };
  } catch {
    return DEFAULT_PRIVACY_POLICY;
  }
}

// Touches ONLY the indexing columns — used by the centralized "Indexing"
// admin tab (/admin/indexing).
export async function setPrivacyIndexing(noIndex: boolean, noFollow: boolean): Promise<void> {
  await sql`
    INSERT INTO privacy_policy (id, no_index, no_follow)
    VALUES (1, ${!!noIndex}, ${!!noFollow})
    ON CONFLICT (id) DO UPDATE SET
      no_index = EXCLUDED.no_index,
      no_follow = EXCLUDED.no_follow
  `;
}

export async function savePrivacyPolicy(data: {
  title: string;
  content: ContentBlock[];
  noIndex: boolean;
  noFollow: boolean;
  canonicalUrl: string;
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}): Promise<void> {
  const lastUpdated = new Date().toISOString().slice(0, 10);
  await sql`
    INSERT INTO privacy_policy (
      id, title, last_updated, content, no_index, no_follow, canonical_url,
      meta_title, meta_description, og_title, og_description, og_image
    )
    VALUES (
      1, ${data.title}, ${lastUpdated}, ${JSON.stringify(data.content || [])}::jsonb, ${!!data.noIndex}, ${!!data.noFollow},
      ${data.canonicalUrl || ""}, ${data.metaTitle || ""}, ${data.metaDescription || ""},
      ${data.ogTitle || ""}, ${data.ogDescription || ""}, ${data.ogImage || ""}
    )
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      last_updated = EXCLUDED.last_updated,
      content = EXCLUDED.content,
      no_index = EXCLUDED.no_index,
      no_follow = EXCLUDED.no_follow,
      canonical_url = EXCLUDED.canonical_url,
      meta_title = EXCLUDED.meta_title,
      meta_description = EXCLUDED.meta_description,
      og_title = EXCLUDED.og_title,
      og_description = EXCLUDED.og_description,
      og_image = EXCLUDED.og_image
  `;
}
