# Sagrada Familia Guided Tours — Homepage (Next.js)

A tour-first rebuild of the homepage, per the SEO/content analysis
(`sagrada-familia-tour-site-analysis.md` in the parent folder). Leads with
guided tours instead of the base entry ticket, targets "guided tour,"
"tower access," and "tour price" in the title/H1/meta (not just "tickets"),
and includes FAQPage + Product schema for rich results.

## 1. Install & run locally

Requires Node.js 18.17+.

```bash
cd sagrada-familia-tours
npm install
npm run dev
```

Open http://localhost:3000.

## 2. Add your real affiliate partner ID

Open `lib/data.ts` and replace:

```ts
export const PARTNER_ID = "YOUR_PARTNER_ID";
```

with your actual GetYourGuide partner ID (or adapt the `gygLink()` helper
if you're using Viator, Tiqets, or Headout instead — each has a different
URL/query-param format for partner tracking). Every "Book Now" button reads
from this one constant.

## 3. Photography

The hero now uses real photos of the Sagrada Familia (interior, facade,
towers, skyline) hotlinked from Unsplash — all free-to-use under the
[Unsplash License](https://unsplash.com/license) (commercial use OK, no
attribution required, credits are in a code comment at the top of
`components/Hero.tsx` anyway). The tower-access section still uses styled
placeholder blocks since I didn't have confirmed real photos of the
elevator/staircase specifically.

Two things worth doing before this goes live for real:
- **Self-host the images** instead of hotlinking `images.unsplash.com` —
  download them, run through `next/image`'s local optimization, and store
  in `/public`. Hotlinking is fine for review/prototyping but isn't meant
  for production traffic.
- **Swap in your own or licensed photos** where you have them — nothing
  beats real photos of your actual guides and tours.

## 4. What's built vs. what's next

**Built:** homepage only — hero, trust badges, guided-tour-first product
grid, "what you get on a guided tour" section, tower access explainer,
price comparison table, combo offers, practical info, FAQ with schema.

**Not yet built** (per the analysis doc's recommended silo structure —
build these next, one at a time, once the homepage is approved):
- `/guided-tours` — dedicated landing page for that exact keyword
- `/tower-access` — dedicated landing page
- `/tour-price` or full price-comparison page
- `/opening-hours`, `/dress-code`, `/history` — supporting content pages

## 5. Deploying

This is a standard Next.js App Router project — deploys as-is to Vercel,
Netlify, or any Node host. `npm run build && npm run start` for a
production build.
# Sagrada-Familia
