import { NextResponse } from "next/server";
import { getHomepageContent, saveHomepageCopy, type HomepageContent } from "@/lib/homepage";
import { dbErrorMessage } from "@/lib/db";

export async function GET() {
  return NextResponse.json(await getHomepageContent());
}

// Only saves the Homepage page's own fields (hero copy, rating, SEO
// toggle) — the Recommended Tour widget's fields are saved separately by
// PUT /api/admin/recommended, and are deliberately left untouched here even
// though the client still posts the full HomepageContent shape (harmless —
// see saveHomepageCopy's comment for why this split exists).
export async function PUT(req: Request) {
  // Whole handler wrapped in one try/catch — not just the DB call — so a
  // malformed body or any unexpected error still comes back as a real JSON
  // error the admin UI can show, instead of a platform error page that
  // fails to parse client-side and silently falls back to a generic
  // "Save failed" message with no indication of what actually went wrong.
  try {
    const body = (await req.json().catch(() => null)) as HomepageContent | null;
    if (!body) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }
    await saveHomepageCopy({
      heroBadge: body.heroBadge,
      heroHeading: body.heroHeading,
      heroSubheading: body.heroSubheading,
      heroImage: body.heroImage,
      heroImageAlt: body.heroImageAlt,
      ratingValue: body.ratingValue,
      ratingCount: body.ratingCount,
      noIndex: body.noIndex,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: dbErrorMessage(err) }, { status: 500 });
  }
}
