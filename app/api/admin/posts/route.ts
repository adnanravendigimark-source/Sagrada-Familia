import { NextResponse } from "next/server";
import { getPosts, savePosts, type Post } from "@/lib/posts";
import { dbErrorMessage } from "@/lib/db";

export async function GET() {
  return NextResponse.json(await getPosts());
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as Post | null;
    if (!body) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    if (!body.slug || !body.title) {
      return NextResponse.json({ error: "Slug and title are required." }, { status: 400 });
    }
    const slugOk = /^[a-z0-9-]+$/.test(body.slug);
    if (!slugOk) {
      return NextResponse.json(
        { error: "Slug can only contain lowercase letters, numbers, and hyphens." },
        { status: 400 }
      );
    }

    const posts = await getPosts();
    if (posts.some((p) => p.slug === body.slug)) {
      return NextResponse.json({ error: "A post with this slug already exists." }, { status: 400 });
    }

    posts.push({ ...body, content: body.content || [] });
    await savePosts(posts);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: dbErrorMessage(err) }, { status: 500 });
  }
}
