import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SafeImage from "@/components/SafeImage";
import { getPosts } from "@/lib/posts";
import { getPageIndexingSettings } from "@/lib/settings";
import { resolveRobots } from "@/lib/seo";

// Posts now live in /data/posts.json, editable from /admin/posts — render
// dynamically so new/edited posts show up without a rebuild.
export const dynamic = "force-dynamic";

const TITLE = "Sagrada Familia Travel Guide & Tips | Guided Tour Blog";
const DESCRIPTION =
  "Practical Sagrada Familia guides: best time to visit, whether tower access is worth it, and guided tour vs. audio guide — written to help you book the right ticket.";

// Static title/description/OG/keywords kept exactly as before — only
// `robots` is resolved dynamically now, per the admin-editable toggle at
// /admin/pages, so this had to move from a static `metadata` export to
// `generateMetadata`.
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPageIndexingSettings();
  return {
    title: TITLE,
    description: DESCRIPTION,
    keywords: [
      "Sagrada Familia travel guide",
      "Sagrada Familia tips",
      "best time to visit Sagrada Familia",
      "Sagrada Familia tower access worth it",
      "Sagrada Familia guided tour vs audio guide",
      "Nativity tower vs Passion tower",
    ],
    alternates: { canonical: "/blog" },
    robots: resolveRobots(settings.blogNoIndex),
    openGraph: { title: TITLE, description: DESCRIPTION, url: "/blog", type: "website" },
  };
}

export default async function BlogIndexPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-basilica-teal">
            Guided Tour Blog
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold text-stone-900 sm:text-4xl">
            Sagrada Familia Travel Guide
          </h1>
          <p className="mx-auto mt-3 max-w-md text-stone-900/60">
            Practical guides to help you plan your visit and pick the right ticket.
          </p>
        </div>

        {!featured && (
          <p className="mt-14 rounded-3xl border border-dashed border-stone-300 p-10 text-center text-sm text-stone-500">
            No articles published yet — check back soon.
          </p>
        )}

        {/* Featured post */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group mt-14 grid gap-0 overflow-hidden rounded-3xl border border-stone-900/10 bg-white shadow-sm transition hover:shadow-xl md:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto">
              <SafeImage
                src={featured.image}
                alt={featured.imageAlt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <span className="inline-flex w-fit rounded-full bg-basilica-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-basilica-teal">
                {featured.category}
              </span>
              <h2 className="mt-4 font-display text-2xl font-bold text-stone-900 group-hover:text-basilica-terracotta">
                {featured.title}
              </h2>
              <p className="mt-3 text-stone-900/70">{featured.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-basilica-terracotta">
                Read the guide <span className="transition group-hover:translate-x-0.5">→</span>
              </span>
            </div>
          </Link>
        )}

        {/* Remaining posts */}
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-2xl border border-stone-900/10 bg-white shadow-sm transition hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <SafeImage
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(min-width: 640px) 45vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex rounded-full bg-basilica-teal/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-basilica-teal">
                    {post.category}
                  </span>
                  <span className="text-xs text-stone-900/40">{post.readTime}</span>
                </div>
                <h2 className="mt-3 font-display text-lg font-semibold text-stone-900 group-hover:text-basilica-terracotta">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-stone-900/60">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 rounded-3xl bg-basilica-teal/5 p-10 text-center">
          <p className="font-display text-xl font-semibold text-stone-900">
            Ready to book your Sagrada Familia guided tour?
          </p>
          <a
            href="/#tours"
            className="rounded-full bg-basilica-terracotta px-6 py-3 text-sm font-semibold text-white transition hover:bg-basilica-terracotta/90"
          >
            Compare Sagrada Familia Guided Tours &amp; Tickets →
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
