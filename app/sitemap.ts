import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getPosts } from "@/lib/posts";
import { getHomepageContent } from "@/lib/homepage";
import { getPrivacyPolicy } from "@/lib/legal";
import { getBlogSeoSettings } from "@/lib/settings";
import { getAboutPage } from "@/lib/about";
import { getContactPage } from "@/lib/contact";

// Auto-generated at request time (this route is dynamic by nature — it
// reads live blog posts from the database) and served at /sitemap.xml.
// Submit that URL in Google Search Console once the site is live.
//
// A URL only belongs in the sitemap if it's actually indexable — same
// per-page "Search Engine Indexing" toggle the robots meta tag uses (see
// lib/seo.ts). Every page is index/follow by default; a page only drops
// out of the sitemap once its own toggle is switched off.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [homepage, policy, posts, blogSeo, about, contact] = await Promise.all([
    getHomepageContent(),
    getPrivacyPolicy(),
    getPosts(),
    getBlogSeoSettings(),
    getAboutPage(),
    getContactPage(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    ...(homepage.noIndex ? [] : [{ url: `${SITE_URL}/`, changeFrequency: "weekly" as const, priority: 1 }]),
    ...(about.noIndex
      ? []
      : [{ url: `${SITE_URL}/about`, changeFrequency: "monthly" as const, priority: 0.6 }]),
    ...(contact.noIndex
      ? []
      : [{ url: `${SITE_URL}/contact`, changeFrequency: "monthly" as const, priority: 0.5 }]),
    ...(blogSeo.noIndex
      ? []
      : [{ url: `${SITE_URL}/blog`, changeFrequency: "weekly" as const, priority: 0.8 }]),
    ...(policy.noIndex
      ? []
      : [{ url: `${SITE_URL}/privacy-policy`, changeFrequency: "yearly" as const, priority: 0.3 }]),
  ];

  const postRoutes: MetadataRoute.Sitemap = posts
    .filter((post) => !post.noIndex)
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt || post.date ? new Date(post.updatedAt || post.date) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticRoutes, ...postRoutes];
}
