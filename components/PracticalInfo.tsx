import { getHomepageContent } from "@/lib/homepage";
import { formatCheckedDate } from "@/lib/checkedDate";

// Content editable from /admin/homepage → Content tab (see
// lib/homepage.ts's PracticalSection / DEFAULT_SECTIONS.practical).
export default async function PracticalInfo() {
  const { sections } = await getHomepageContent();
  const s = sections.practical;

  return (
    <section id="hours" className="scroll-mt-20 bg-white py-12 sm:py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-stone-900">{s.hoursHeading}</h3>
          <table className="mt-4 w-full text-sm">
            <tbody>
              {s.hours.map((row, i) => (
                <tr key={row.range + i} className="border-b border-stone-900/5">
                  <td className="py-2 text-stone-900/70">{row.range}</td>
                  <td className="whitespace-pre-line py-2 text-right font-medium text-stone-900">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {(safeHttps(s.hoursSourceUrl) || formatCheckedDate(s.hoursChecked)) && (
            <p className="mt-3 text-xs text-stone-900/65">
              {safeHttps(s.hoursSourceUrl) ? (
                <a href={safeHttps(s.hoursSourceUrl)} target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-stone-900">
                  Official hours
                </a>
              ) : (
                "Hours"
              )}
              {formatCheckedDate(s.hoursChecked) && <> · checked {formatCheckedDate(s.hoursChecked)}</>}
              {" · may change for special events"}
            </p>
          )}
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-stone-900">{s.addressHeading}</h3>
          <p className="mt-4 whitespace-pre-line text-sm text-stone-900/70">{s.address}</p>
          <p className="mt-3 text-sm text-stone-900/70">{s.metro}</p>
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-stone-900">{s.bestTimeHeading}</h3>
          <p
            className="rich-content mt-4 text-sm text-stone-900/70"
            dangerouslySetInnerHTML={{ __html: s.bestTimeBody }}
          />
        </div>
      </div>
    </section>
  );
}

// Admin-entered link: only render real https URLs (never javascript: etc.).
function safeHttps(url?: string): string | undefined {
  try {
    const u = new URL((url || "").trim());
    return u.protocol === "https:" ? u.toString() : undefined;
  } catch {
    return undefined;
  }
}
