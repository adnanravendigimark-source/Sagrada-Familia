import { readJson, writeJson } from "./cms";

// A post's body is a simple list of typed blocks rather than raw HTML/
// Markdown — easy for a non-technical content writer to edit in the admin
// UI (one field per block) and easy to render safely without a parser.
export type ContentBlockType = "paragraph" | "heading" | "list";

export interface ContentBlock {
  type: ContentBlockType;
  text?: string; // paragraph / heading
  items?: string[]; // list
}

export interface Post {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  excerpt: string;
  quickAnswer: string;
  readTime: string;
  date: string;
  image: string;
  imageAlt: string;
  recommendedTourId: string;
  // 1-indexed: the "Recommended Tour" widget renders right after this many
  // content blocks. Leave unset/0 to not show it inline.
  recommendedTourAfterBlock?: number;
  content: ContentBlock[];
}

export function getPosts(): Post[] {
  return readJson<Post[]>("posts.json");
}

export function savePosts(posts: Post[]): void {
  writeJson("posts.json", posts);
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, count = 2): Post[] {
  return getPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, count);
}
