import { NextResponse } from "next/server";
import { getToursRaw, saveTours, type TourRecord } from "@/lib/data";

export async function GET() {
  return NextResponse.json(getToursRaw());
}

export async function POST(req: Request) {
  const body = (await req.json()) as TourRecord;

  if (!body.id || !body.title) {
    return NextResponse.json({ error: "ID and title are required." }, { status: 400 });
  }

  const tours = getToursRaw();
  if (tours.some((t) => t.id === body.id)) {
    return NextResponse.json({ error: "A tour with this ID already exists." }, { status: 400 });
  }

  tours.push(body);
  saveTours(tours);
  return NextResponse.json({ ok: true });
}
