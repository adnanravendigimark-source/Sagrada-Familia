import { getHomepageContent } from "@/lib/homepage";
import { formatCheckedDate } from "@/lib/checkedDate";

const safeHttps = (url: string) => (/^https:\/\//i.test(url.trim()) ? url.trim() : "");

// "Official ticket or a guided tour?" — the basilica's own prices next to
// what a tour booked here adds. Honest on purpose: the official ticket is
// cheaper, and the page says so. Editable from /admin/homepage → Content
// (lib/homepage.ts → sections.official).
export default async function OfficialVsTour() {
  const { sections } = await getHomepageContent();
  const s = sections.official;
  if (!s.heading.trim() || s.rows.length === 0) return null;
  const source = safeHttps(s.sourceUrl);
  const checked = formatCheckedDate(s.checked);

  return (
    <section id="official-tickets" className="scroll-mt-20 border-t border-stone-900/10 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-bold text-stone-900 sm:text-4xl">{s.heading}</h2>
        <div className="rich-content mt-3 max-w-2xl text-stone-900/75" dangerouslySetInnerHTML={{ __html: s.intro }} />

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-stone-900/10 bg-white p-6">
            <h3 className="font-display text-xl font-semibold text-stone-900">{s.officialHeading}</h3>
            <dl className="mt-4 divide-y divide-stone-900/10">
              {s.rows.map((row) => (
                <div key={row.name} className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="text-sm text-stone-900/80">{row.name}</dt>
                  <dd className="shrink-0 font-semibold text-stone-900">{row.price}</dd>
                </div>
              ))}
            </dl>
            {(source || checked) && (
              <p className="mt-3 text-xs text-stone-900/65">
                {source && (
                  <>
                    Source:{" "}
                    <a href={source} target="_blank" rel="noopener" className="font-semibold text-basilica-teal underline underline-offset-2">
                      official Sagrada Família website
                    </a>
                    .{" "}
                  </>
                )}
                {checked && <>Checked {checked}. Prices can change.</>}
              </p>
            )}
          </div>

          <div className="flex flex-col rounded-3xl bg-basilica-teal p-6 text-white">
            <h3 className="font-display text-xl font-semibold">{s.tourHeading}</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/90">
              {s.tourPoints.map((point) => (
                <li key={point} className="flex gap-3">
                  <span aria-hidden="true" className="text-gold-400">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            {s.ctaButtonText && s.ctaHref && (
              <a
                href={s.ctaHref}
                className="mt-6 inline-flex min-h-[44px] items-center self-start rounded-full bg-white px-6 text-sm font-semibold text-basilica-teal transition-colors duration-150 hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:mt-auto"
              >
                {s.ctaButtonText}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
