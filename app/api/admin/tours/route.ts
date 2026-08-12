import { NextResponse } from "next/server";
import { getToursRaw, saveTours, type TourRecord } from "@/lib/data";
import { dbErrorMessage } from "@/lib/db";

// Force this route to always run as a live serverless function rather than
// get statically optimized at build time — Next.js can otherwise pre-render
// a GET-only static response for a route handler like this and silently drop
// every other exported method (PUT/POST/DELETE), returning 405 for all of
// them in production even though the code is correct.
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getToursRaw());
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as TourRecord | null;
    if (!body) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    if (!body.id || !body.title) {
      return NextResponse.json({ error: "ID and title are required." }, { status: 400 });
    }

    const tours = await getToursRaw();
    if (tours.some((t) => t.id === body.id)) {
      return NextResponse.json({ error: "A tour with this ID already exists." }, { status: 400 });
    }

    tours.push(body);
    await saveTours(tours);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: dbErrorMessage(err) }, { status: 500 });
  }
}
