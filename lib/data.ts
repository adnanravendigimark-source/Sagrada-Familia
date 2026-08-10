import { readJson, writeJson } from "./cms";

// ---------------------------------------------------------------------------
// AFFILIATE / PARTNER IDS
// ---------------------------------------------------------------------------
// Replace this with your real GetYourGuide (or Viator / Tiqets / Headout)
// partner ID once you have it — either directly here, or via a
// GYG_PARTNER_ID environment variable. Every booking link reads from here,
// so you only need to change it in one place.
export const PARTNER_ID = process.env.GYG_PARTNER_ID || "YOUR_PARTNER_ID";

function gygLink(path: string, extra = "") {
  return `https://www.getyourguide.com/${path}?partner_id=${PARTNER_ID}&utm_medium=online_publisher&cmp=sagrada${extra}`;
}

export type TourType = "guided" | "self-guided" | "combo";

// The record shape stored in data/tours.json (and edited via /admin) — the
// affiliate link is stored as two plain parts (hrefPath/hrefExtra) so the
// CMS never has to touch the partner-ID query string directly.
export interface TourRecord {
  id: string;
  badge: TourType;
  ribbon?: string;
  title: string;
  description: string;
  includes: string[];
  duration?: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice?: number;
  image: string;
  imageAlt: string;
  hrefPath: string;
  hrefExtra?: string;
  featured?: boolean;
  bestFor: string;
}

// The shape components actually render — same as TourRecord but with a
// ready-to-use `href` instead of the raw path pieces.
export interface Tour extends Omit<TourRecord, "hrefPath" | "hrefExtra"> {
  href: string;
}

export function getToursRaw(): TourRecord[] {
  return readJson<TourRecord[]>("tours.json");
}

export function saveTours(records: TourRecord[]): void {
  writeJson("tours.json", records);
}

export function getTours(): Tour[] {
  return getToursRaw().map(({ hrefPath, hrefExtra, ...rest }) => ({
    ...rest,
    href: gygLink(hrefPath, hrefExtra || ""),
  }));
}

export function getTour(id: string): Tour | undefined {
  return getTours().find((t) => t.id === id);
}

export interface ComboOfferRecord {
  id: string;
  title: string;
  description: string;
  hrefPath: string;
  hrefExtra?: string;
}

export interface ComboOffer {
  id: string;
  title: string;
  description: string;
  href: string;
}

export function getComboOffersRaw(): ComboOfferRecord[] {
  return readJson<ComboOfferRecord[]>("combo-offers.json");
}

export function saveComboOffers(records: ComboOfferRecord[]): void {
  writeJson("combo-offers.json", records);
}

export function getComboOffers(): ComboOffer[] {
  return getComboOffersRaw().map(({ hrefPath, hrefExtra, ...rest }) => ({
    ...rest,
    href: gygLink(hrefPath, hrefExtra || ""),
  }));
}

export interface FAQ {
  question: string;
  answer: string;
}

export function getFaqs(): FAQ[] {
  return readJson<FAQ[]>("faqs.json");
}

export function saveFaqs(faqs: FAQ[]): void {
  writeJson("faqs.json", faqs);
}
