import { NextResponse } from "next/server";
import { getToursRaw, saveTours, type TourRecord } from "@/lib/data";
import { getSession } from "@/lib/session";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const tour = getToursRaw().find((t) => t.id === params.id);
  if (!tour) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(tour);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = (await req.json()) as TourRecord;
  const tours = getToursRaw();
  const idx = tours.findIndex((t) => t.id === params.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  tours[idx] = { ...body, id: params.id };
  saveTours(tours);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Only admins can delete." }, { status: 403 });
  }

  const tours = getToursRaw();
  const next = tours.filter((t) => t.id !== params.id);
  if (next.length === tours.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  saveTours(next);
  return NextResponse.json({ ok: true });
}
