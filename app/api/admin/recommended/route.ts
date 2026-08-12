import { NextResponse } from "next/server";
import { getHomepageContent, saveRecommendedTour, type HomepageContent } from "@/lib/homepage";
import { dbErrorMessage } from "@/lib/db";

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
