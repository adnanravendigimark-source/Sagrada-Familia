import { NextResponse } from "next/server";
import { getFaqs, saveFaqs, type FAQ } from "@/lib/data";

export async function GET() {
  return NextResponse.json(getFaqs());
}

export async function PUT(req: Request) {
  const body = (await req.json()) as FAQ[];
  if (!Array.isArray(body)) {
    return NextResponse.json({ error: "Expected an array of FAQs." }, { status: 400 });
  }
  saveFaqs(body);
  return NextResponse.json({ ok: true });
}
