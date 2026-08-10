import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuickAnswer from "@/components/QuickAnswer";
import BlogPostBody from "@/components/BlogPostBody";
import BlogSidebar from "@/components/BlogSidebar";
import SafeImage from "@/components/SafeImage";
import { getPost } from "@/lib/posts";

const slug = "best-time-to-visit-sagrada-familia";

// Content lives in /data/posts.json, editable from /admin/posts — render
// dynamically so edits show up without a rebuild.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: [
      "best time to visit Sagrada Familia",
      "Sagrada Familia morning vs afternoon",
      "when to visit Sagrada Familia",
      "Sagrada Familia crowds",
    ],
  };
}

export default async function Post() {
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-4xl px-4 pt-12 sm:px-6">
          <Link href="/blog" className="text-sm font-medium text-basilica-teal">← All guides</Link>
          <div className="mt-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-basilica-teal">
            <span>{post.category}</span>
            <span className="h-1 w-1 rounded-full bg-stone-900/20" />
            <span className="text-stone-900/40">{post.readTime}</span>
          </div>
          <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-stone-900 sm:text-4xl">
            {post.title}
          </h1>
          <div className="relative mt-8 aspect-[21/9] w-full overflow-hidden rounded-2xl">
            <SafeImage
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              sizes="(min-width: 896px) 896px, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:grid-cols-3 lg:gap-14">
          <div className="lg:col-span-2">
            <QuickAnswer>{post.quickAnswer}</QuickAnswer>

            <BlogPostBody
              blocks={post.content}
              recommendedTourId={post.recommendedTourId}
              recommendedTourAfterBlock={post.recommendedTourAfterBlock}
            />

            <div className="mt-10 rounded-2xl border border-basilica-teal/20 bg-basilica-teal/5 p-6">
              <p className="text-sm font-semibold text-stone-900">Ready to book?</p>
              <p className="mt-1 text-sm text-stone-900/70">
                See guided tour times and tower-access availability on the homepage.
              </p>
              <Link
                href="/#tours"
                className="mt-4 inline-flex rounded-full bg-basilica-terracotta px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-basilica-terracotta/90"
              >
                Compare Guided Tours
              </Link>
            </div>
          </div>

          <div className="mt-12 lg:mt-0">
            <BlogSidebar slug={post.slug} recommendedTourId={post.recommendedTourId} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
