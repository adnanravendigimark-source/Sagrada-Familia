import { NextResponse } from "next/server";
import { getHomepageContent, saveRecommendedTour, type HomepageContent } from "@/lib/homepage";
import { dbErrorMessage } from "@/lib/db";

// Force this route to always run as a live serverless function rather than
// get statically optimized at build time — Next.js can otherwise pre-render
// a GET-only static response for a route handler like this and silently drop
// every other exported method (PUT/POST/DELETE), returning 405 for all of
// them in production even though the code is correct.
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getHomepageContent());
}

// Only saves the Recommended Tour widget's own fields — the Homepage
// page's hero copy is saved separately by PUT /api/admin/homepage, and is
// deliberately left untouched here even though the client still posts the
// full HomepageContent shape (harmless — see saveRecommendedTour's comment
// in lib/homepage.ts for why this split exists).
export async function PUT(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as HomepageContent | null;
    if (!body) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }
    await saveRecommendedTour({
      showFeaturedTour: body.showFeaturedTour,
      featuredTourId: body.featuredTourId,
      featuredBadgeLabel: body.featuredBadgeLabel,
      featuredUrgencyText: body.featuredUrgencyText,
      featuredReasons: body.featuredReasons,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: dbErrorMessage(err) }, { status: 500 });
  }
}
