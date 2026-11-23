// "Last checked" dates for facts copied from third parties (ratings, review
// counts, durations, prices). Stored as Postgres DATE; accepted from the
// admin only as YYYY-MM-DD so a malformed value can never reach the DB.
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function toIsoDate(value: unknown): string | undefined {
  // The Neon driver turns a DATE into local midnight, so read the local parts:
  // toISOString() would shift it to the previous day east of UTC.
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}`;
  }
  if (typeof value !== "string") return undefined;
  const v = value.trim().slice(0, 10);
  if (!ISO_DATE.test(v)) return undefined;
  return Number.isNaN(new Date(`${v}T00:00:00Z`).getTime()) ? undefined : v;
}

// "20 Nov 2026" — fixed locale and UTC so server and client always agree.
export function formatCheckedDate(iso?: string): string {
  const v = toIsoDate(iso);
  if (!v) return "";
  return new Date(`${v}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

// "Nov 2026"
export function formatCheckedMonth(iso?: string): string {
  const v = toIsoDate(iso);
  if (!v) return "";
  return new Date(`${v}T00:00:00Z`).toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });
}
