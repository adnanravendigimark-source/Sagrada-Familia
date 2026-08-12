import { NextResponse } from "next/server";
import { getToursRaw, saveTours, type TourRecord } from "@/lib/data";
import { dbErrorMessage } from "@/lib/db";

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
