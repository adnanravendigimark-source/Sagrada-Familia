import { readJson, writeJson } from "./cms";

export interface HomepageContent {
  heroBadge: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  heroImageAlt: string;
  ratingValue: string;
  ratingCount: string;
  // "Featured/Recommended Tour" widget — a compact sticky bar on mobile,
  // a richer showcase card on desktop. Which tour it promotes and its
  // copy are both editable from /admin/homepage.
  showFeaturedTour: boolean;
  featuredTourId: string;
  featuredBadgeLabel: string;
  featuredUrgencyText: string;
  featuredReasons: string[];
}

export function getHomepageContent(): HomepageContent {
  return readJson<HomepageContent>("homepage.json");
}

export function saveHomepageContent(data: HomepageContent): void {
  writeJson("homepage.json", data);
}
