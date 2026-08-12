import { NextResponse } from "next/server";
import { getFaqs, saveFaqs, type FAQ } from "@/lib/data";
import { dbErrorMessage } from "@/lib/db";

// Force this route to always run as a live serverless function rather than
// get statically optimized at build time — Next.js can otherwise pre-render
// a GET-only static response for a route handler like this and silently drop
// every other exported method (PUT/POST/DELETE), returning 405 for all of
// them in production even though the code is correct.
export const dynamic = "force-dynamic";

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
