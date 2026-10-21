import fs from "fs";
import path from "path";
import { neon } from "@neondatabase/serverless";

// Load .env
if (!process.env.DATABASE_URL) {
  const envPath = path.resolve(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf8");
    for (const line of envContent.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx > 0) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

const heroImageUrl = "https://igmhiytmxdd0kk18.public.blob.vercel-storage.com/uploads/best-time-to-visit-sagrada-familia-hero-ah5CttZ5xxvEckhTAuwuWfOYUhNZm7.jpg";
const interiorImageUrl = "https://igmhiytmxdd0kk18.public.blob.vercel-storage.com/uploads/sagrada-familia-stained-glass-interior-sXNolQCdtsoM0aJ32rf6eUtznzB8EF.jpg";

const articleContent = `<p>Choosing the <strong>best time to visit Sagrada Familia</strong> can transform your experience of Antoni Gaudí’s masterwork from a crowded sightseeing stop into an unforgettable encounter. Because the basilica is designed around natural illumination and celestial geometry, your experience varies dramatically depending on the hour of the day and month of the year you arrive.</p>

<h2>Best Time of Day for Stained Glass and Lighting</h2>
<p>The interior of the basilica relies entirely on daylight passing through hundreds of stained glass windows designed by Catalan artist Joan Vila-Grau. Gaudí arranged the windows with meticulous purpose: the eastern Nativity façade features cool blues, emerald greens, and soft turquoises, while the western Passion façade glows with fiery oranges, deep ambers, and radiant ruby reds.</p>
<p>If you want soft, serene illumination and the crispest photographs of the altar, visit between <strong>9:00 AM and 10:30 AM</strong> as morning sunshine floods the Nativity transept. Conversely, visiting between <strong>3:00 PM and 5:00 PM</strong> (or up to 6:00 PM in summer) reveals the basilica at its most theatrical. During late afternoon, low sun beams strike the western glass, painting the nave’s fluted stone columns in a dazzling kaleidoscopic sunset.</p>

<figure>
  <img src="${interiorImageUrl}" alt="Vibrant warm stained glass sunlight streaming across the massive tree-like stone columns inside the Sagrada Família basilica in Barcelona" />
  <figcaption>Afternoon sunlight streams through the warm-toned stained glass windows on the Passion façade, bathing the stone forest in amber and crimson light.</figcaption>
</figure>

<h2>Best Months and Seasons to Avoid Crowds</h2>
<p>Barcelona experiences heavy tourist influxes throughout the summer. July and August bring intense heat, high humidity, and long queues, with daytime temperatures frequently exceeding 30°C (86°F). Tower stairwells are narrow and lack air conditioning, making midday climbs exhausting during peak summer.</p>
<p>The undisputed sweet spot for visiting is the <strong>spring shoulder season (late March through May)</strong> or <strong>autumn (mid-September through November)</strong>. During these months, daytime temperatures hover pleasantly around 18°C to 23°C (64°F to 73°F), queues move swiftly, and ticket availability is far more forgiving. Winter (December through February) is the quietest season of all, offering intimate visits with minimal crowds, though shorter daylight hours mean afternoon light fades earlier.</p>

<h2>Crowd Levels Throughout the Week</h2>
<p>Peak crowd density consistently occurs between <strong>11:00 AM and 2:30 PM</strong>, when regional day-trippers and tour buses arrive simultaneously. To enjoy the basilica with breathing room, reserve the first morning slot at 9:00 AM or a late afternoon entry after 4:00 PM. Weekdays—especially Tuesday, Wednesday, and Thursday—see noticeably fewer tour groups than Saturdays and Sundays.</p>

<h2>Practical Tips for Planning Your Visit</h2>
<p>To make the most of the best time to visit Sagrada Familia, keep these essential planning tips in mind:</p>
<ul>
  <li><strong>Book timed tickets 2 to 4 weeks in advance:</strong> Same-day tickets at the entrance kiosks are no longer sold; all visits require an advance digital reservation.</li>
  <li><strong>Budget at least two hours:</strong> Allow 90 minutes to two hours to explore the central nave, crypt, museum gallery, and outdoor façades without feeling rushed.</li>
  <li><strong>Choose your tower wisely:</strong> If booking tower access, choose the Nativity Tower for historic Gaudí stonework or the Passion Tower for panoramic skyline views over Barcelona.</li>
  <li><strong>Note Sunday mass restrictions:</strong> Sunday mornings feature an international mass at 9:00 AM; while entry is free on a first-come basis, general tourist sightseeing is paused during service.</li>
</ul>

<p>Ultimately, the <strong>best time to visit Sagrada Familia</strong> is a weekday morning at 9:00 AM in April, May, October, or November. You will bypass the heaviest tour crowds, enjoy pleasant Mediterranean temperatures, and witness Gaudí’s architectural symphony bathed in peaceful, radiant light.</p>`;

const postData = {
  slug: "when-is-the-best-time-to-visit-sagrada-familia",
  title: "Best Time to Visit Sagrada Família: Seasons, Months & Hours",
  metaTitle: "Best Time to Visit Sagrada Família: Seasons, Hours & Crowds",
  metaDescription: "Discover the best time to visit Sagrada Familia for crowd-free entry, radiant stained-glass light, and ideal weather. Complete season, month, and hourly guide.",
  category: "Trip Planning",
  excerpt: "Discover the best time to visit Sagrada Familia for magical stained-glass light, manageable crowd levels, and pleasant Mediterranean weather across every season.",
  quickAnswer: "The overall best time to visit Sagrada Familia is weekday mornings between 9:00 AM and 10:30 AM during the spring (April–May) or autumn (September–November) shoulder seasons. You will avoid the peak midday tour bus crowds, enjoy comfortable weather, and experience vibrant morning sunlight illuminating the Nativity façade's stained glass windows.",
  readTime: "4 min read",
  date: "2026-10-21",
  updatedAt: "2026-10-21T06:00:00Z",
  image: heroImageUrl,
  imageAlt: "Sagrada Família exterior in Barcelona illuminated by warm golden morning sunlight reflected in the Plaça de Gaudí pool",
  recommendedTourId: "fast-track-guided-tour",
  recommendedTourAfterBlock: 1,
  content: articleContent,
  sortOrder: 0,
  noIndex: false,
  noFollow: false,
  canonicalUrl: "https://www.sagradafamiliatours.com/blog/when-is-the-best-time-to-visit-sagrada-familia",
  ogTitle: "Best Time to Visit Sagrada Família: Seasons, Hours & Crowds",
  ogDescription: "Discover the best time to visit Sagrada Familia for crowd-free entry, radiant stained-glass light, and ideal weather. Complete season, month, and hourly guide.",
  ogImage: heroImageUrl,
  focusKeyword: "best time to visit Sagrada Familia",
  ctaHeading: "Ready to visit Sagrada Família?",
  ctaBody: "Compare official fast-track guided tours and tower access tickets on our homepage to guarantee your preferred time slot.",
  ctaButtonText: "Compare Sagrada Família Tours & Tickets",
  ctaButtonHref: "/#prices",
};

async function seed() {
  console.log("1. Recording images in media_library...");
  await sql`
    INSERT INTO media_library (url, filename, content_type, size_bytes)
    VALUES
      (${heroImageUrl}, 'best-time-to-visit-sagrada-familia-hero.jpg', 'image/jpeg', 1012429),
      (${interiorImageUrl}, 'sagrada-familia-stained-glass-interior.jpg', 'image/jpeg', 1050149)
    ON CONFLICT (url) DO NOTHING
  `;
  console.log("✓ Images recorded in media_library table.");

  console.log("2. Upserting post into posts table in Neon DB...");
  await sql`
    INSERT INTO posts (
      slug, title, meta_title, meta_description, category, excerpt,
      quick_answer, read_time, date, updated_at, image, image_alt,
      recommended_tour_id, recommended_tour_after_block, content, sort_order,
      no_index, no_follow, canonical_url, og_title, og_description, og_image,
      focus_keyword, cta_heading, cta_body, cta_button_text, cta_button_href
    ) VALUES (
      ${postData.slug}, ${postData.title}, ${postData.metaTitle}, ${postData.metaDescription},
      ${postData.category}, ${postData.excerpt}, ${postData.quickAnswer}, ${postData.readTime},
      ${postData.date}, ${postData.updatedAt}, ${postData.image}, ${postData.imageAlt},
      ${postData.recommendedTourId}, ${postData.recommendedTourAfterBlock},
      ${JSON.stringify(postData.content)}::jsonb, ${postData.sortOrder},
      ${postData.noIndex}, ${postData.noFollow}, ${postData.canonicalUrl},
      ${postData.ogTitle}, ${postData.ogDescription}, ${postData.ogImage},
      ${postData.focusKeyword}, ${postData.ctaHeading}, ${postData.ctaBody},
      ${postData.ctaButtonText}, ${postData.ctaButtonHref}
    )
    ON CONFLICT (slug) DO UPDATE SET
      title = EXCLUDED.title,
      meta_title = EXCLUDED.meta_title,
      meta_description = EXCLUDED.meta_description,
      category = EXCLUDED.category,
      excerpt = EXCLUDED.excerpt,
      quick_answer = EXCLUDED.quick_answer,
      read_time = EXCLUDED.read_time,
      date = EXCLUDED.date,
      updated_at = EXCLUDED.updated_at,
      image = EXCLUDED.image,
      image_alt = EXCLUDED.image_alt,
      recommended_tour_id = EXCLUDED.recommended_tour_id,
      recommended_tour_after_block = EXCLUDED.recommended_tour_after_block,
      content = EXCLUDED.content,
      sort_order = EXCLUDED.sort_order,
      no_index = EXCLUDED.no_index,
      no_follow = EXCLUDED.no_follow,
      canonical_url = EXCLUDED.canonical_url,
      og_title = EXCLUDED.og_title,
      og_description = EXCLUDED.og_description,
      og_image = EXCLUDED.og_image,
      focus_keyword = EXCLUDED.focus_keyword,
      cta_heading = EXCLUDED.cta_heading,
      cta_body = EXCLUDED.cta_body,
      cta_button_text = EXCLUDED.cta_button_text,
      cta_button_href = EXCLUDED.cta_button_href;
  `;
  console.log("✓ Post successfully upserted into Neon posts table.");

  console.log("3. Syncing data/posts.json with Neon DB...");
  const rows = await sql`SELECT * FROM posts ORDER BY date DESC, sort_order ASC;`;
  console.log(`Fetched ${rows.length} posts from Neon DB.`);

  const jsonPosts = rows.map((r) => ({
    slug: r.slug,
    title: r.title,
    metaTitle: r.meta_title,
    metaDescription: r.meta_description,
    category: r.category,
    excerpt: r.excerpt,
    quickAnswer: r.quick_answer,
    readTime: r.read_time,
    date: r.date,
    updatedAt: r.updated_at ? new Date(r.updated_at).toISOString().slice(0, 10) : r.date,
    image: r.image,
    imageAlt: r.image_alt,
    recommendedTourId: r.recommended_tour_id || "",
    recommendedTourAfterBlock: r.recommended_tour_after_block === null ? undefined : Number(r.recommended_tour_after_block),
    content: typeof r.content === "string" ? r.content : r.content,
    sortOrder: r.sort_order,
    ctaHeading: r.cta_heading,
    ctaBody: r.cta_body,
    ctaButtonText: r.cta_button_text,
    ctaButtonHref: r.cta_button_href,
    focusKeyword: r.focus_keyword,
    noIndex: !!r.no_index,
    noFollow: !!r.no_follow,
    canonicalUrl: r.canonical_url,
    ogTitle: r.og_title,
    ogDescription: r.og_description,
    ogImage: r.og_image,
  }));

  const postsJsonPath = path.resolve(process.cwd(), "data/posts.json");
  fs.writeFileSync(postsJsonPath, JSON.stringify(jsonPosts, null, 2), "utf8");
  console.log(`✓ Updated data/posts.json with all ${jsonPosts.length} posts!`);
}

seed().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
