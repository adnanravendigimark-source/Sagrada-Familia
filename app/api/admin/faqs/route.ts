import { NextResponse } from "next/server";
import { getFaqs, saveFaqs, type FAQ } from "@/lib/data";
import { dbErrorMessage } from "@/lib/db";

export async function GET() {
  return NextResponse.json(await getFaqs());
}

export async function PUT(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as FAQ[] | null;
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Expected an array of FAQs." }, { status: 400 });
    }
    await saveFaqs(body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: dbErrorMessage(err) }, { status: 500 });
  }
}
