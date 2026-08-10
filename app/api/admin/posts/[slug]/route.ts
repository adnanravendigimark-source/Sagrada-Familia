import { NextResponse } from "next/server";
import { getPosts, savePosts, type Post } from "@/lib/posts";

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const post = getPosts().find((p) => p.slug === params.slug);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  const body = (await req.json()) as Post;
  const posts = getPosts();
  const idx = posts.findIndex((p) => p.slug === params.slug);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  posts[idx] = { ...body, slug: params.slug, content: body.content || [] };
  savePosts(posts);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: { slug: string } }) {
  const posts = getPosts();
  const next = posts.filter((p) => p.slug !== params.slug);
  if (next.length === posts.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  savePosts(next);
  return NextResponse.json({ ok: true });
}
