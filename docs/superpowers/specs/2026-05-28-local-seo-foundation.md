# Local SEO Foundation — Design Spec

**Date:** 2026-05-28
**Scope:** Technical SEO changes to all existing pages + 6 city landing pages + Insights section architecture + sitemap + robots.txt

---

## Problem

The site has titles and meta descriptions but nothing else Google needs to trust and rank a local business. No structured data, no Open Graph tags, no sitemap, no city-specific content. A search for "mobile advertising Lehi Utah" returns nothing from drivertiseusa.com — not because the service doesn't exist there, but because the site has never told Google it does.

---

## Decision

Build the complete technical SEO foundation in one deployment. No new dependencies. No CMS. All static HTML. Everything ships June 3 alongside Batches 3 and 4.

---

## Files Modified / Created

| File | Type | Change |
|---|---|---|
| index.html | Modify | OG tags, Twitter cards, canonical, LocalBusiness schema, title optimize |
| services.html | Modify | OG tags, Twitter cards, canonical, Service schemas, title optimize |
| pricing.html | Modify | OG tags, Twitter cards, canonical, LocalBusiness schema, title optimize |
| faq.html | Modify | OG tags, Twitter cards, canonical, FAQPage schema, title optimize |
| about.html | Modify | OG tags, Twitter cards, canonical, LocalBusiness schema, title optimize |
| contact.html | Modify | OG tags, Twitter cards, canonical, LocalBusiness schema, title optimize |
| zones.html | Modify | OG tags, Twitter cards, canonical, LocalBusiness schema, title optimize |
| sitemap.xml | Create | All public pages listed with lastmod dates |
| robots.txt | Create | Allow all, point to sitemap |
| cities/lehi.html | Create | City landing page |
| cities/saratoga-springs.html | Create | City landing page |
| cities/american-fork.html | Create | City landing page |
| cities/alpine-highland.html | Create | City landing page (Alpine + Highland combined) |
| cities/sandy-draper.html | Create | City landing page (Sandy + Draper combined) |
| cities/bluffdale-riverton.html | Create | City landing page (Bluffdale + Riverton combined) |
| insights/index.html | Create | Insights hub page (see content playbook spec) |
| css/base.css or components.css | Modify | Any shared nav/footer changes for nav link addition |
| All HTML pages | Modify | Add "Insights" to nav between FAQ and About |

**No new CDN dependencies. No JavaScript changes. All additions are `<head>` metadata and static HTML pages.**

---

## Section 1: Open Graph + Twitter Card Tags

Add to every page's `<head>`, immediately after the existing `<meta name="description">` tag.

### Template (customize per page)

```html
<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="Drivertise USA">
<meta property="og:title" content="[PAGE TITLE]">
<meta property="og:description" content="[PAGE META DESCRIPTION — same as meta description]">
<meta property="og:url" content="https://drivertiseusa.com/[page].html">
<meta property="og:image" content="https://drivertiseusa.com/assets/images/og-default.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[PAGE TITLE]">
<meta name="twitter:description" content="[PAGE META DESCRIPTION]">
<meta name="twitter:image" content="https://drivertiseusa.com/assets/images/og-default.jpg">

<!-- Canonical -->
<link rel="canonical" href="https://drivertiseusa.com/[page].html">
```

### OG image

`assets/images/og-default.jpg` — a 1200×630px image showing the branded Drivertise car against a Utah County backdrop or the logo on dark background. This is a **Danyon manual task** — create this image in Canva or Figma before June 3. Until it exists, OG still works (just no image preview on shares).

### Per-page values

| Page | og:title | og:url |
|---|---|---|
| index.html | Drivertise USA — Mobile Advertising for Utah County Businesses | https://drivertiseusa.com/ |
| services.html | Mobile Advertising Services in Utah County — Drivertise USA | https://drivertiseusa.com/services.html |
| pricing.html | Mobile Advertising Pricing — Utah County \| Drivertise USA | https://drivertiseusa.com/pricing.html |
| faq.html | Mobile Advertising FAQ — Drivertise USA | https://drivertiseusa.com/faq.html |
| about.html | About Drivertise USA — Mobile Advertising in Utah County | https://drivertiseusa.com/about.html |
| contact.html | Get a Demo — Mobile Advertising Utah County \| Drivertise USA | https://drivertiseusa.com/contact.html |
| zones.html | Direct Mail Advertising Zones — Utah County \| Drivertise USA | https://drivertiseusa.com/zones.html |

---

## Section 2: Title Tag Optimization

Current titles are too generic. Rewrite to lead with the keyword.

| Page | Current Title | New Title |
|---|---|---|
| index.html | Drivertise USA — Mobile Advertising for Utah County Businesses | Drivertise USA — Mobile Advertising for Utah County Businesses *(already good, keep)* |
| services.html | Services — Drivertise USA | Mobile Advertising Services in Utah County — Drivertise USA |
| pricing.html | Pricing — Drivertise USA | Mobile Advertising Pricing in Utah County — Drivertise USA |
| faq.html | FAQ — Drivertise USA | Mobile Advertising FAQ — Honest Answers \| Drivertise USA |
| about.html | About — Drivertise USA | About Drivertise USA — Mobile Advertising, Utah County |
| contact.html | Contact & Demo — Drivertise USA | Book a Demo — Mobile Advertising Utah County \| Drivertise USA |
| zones.html | Mailer Delivery Zones — Drivertise USA | Direct Mail Advertising Zones — Utah County \| Drivertise USA |

---

## Section 3: Structured Data (JSON-LD)

Add a `<script type="application/ld+json">` block to the `<head>` of each page, immediately before `</head>`.

### LocalBusiness Schema (every page)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Drivertise USA",
  "description": "Mobile advertising company serving Utah County and southern Salt Lake County. Magnetic zone ads, electric billboard, and direct mail co-op starting at $199/month.",
  "url": "https://drivertiseusa.com",
  "telephone": "+13852046561",
  "email": "hello@drivertiseusa.com",
  "founder": {
    "@type": "Person",
    "name": "Danyon"
  },
  "areaServed": [
    {"@type": "City", "name": "Lehi", "sameAs": "https://en.wikipedia.org/wiki/Lehi,_Utah"},
    {"@type": "City", "name": "Saratoga Springs", "sameAs": "https://en.wikipedia.org/wiki/Saratoga_Springs,_Utah"},
    {"@type": "City", "name": "American Fork", "sameAs": "https://en.wikipedia.org/wiki/American_Fork,_Utah"},
    {"@type": "City", "name": "Alpine", "sameAs": "https://en.wikipedia.org/wiki/Alpine,_Utah"},
    {"@type": "City", "name": "Highland", "sameAs": "https://en.wikipedia.org/wiki/Highland,_Utah"},
    {"@type": "City", "name": "Eagle Mountain"},
    {"@type": "City", "name": "Sandy", "sameAs": "https://en.wikipedia.org/wiki/Sandy,_Utah"},
    {"@type": "City", "name": "Draper", "sameAs": "https://en.wikipedia.org/wiki/Draper,_Utah"},
    {"@type": "City", "name": "Bluffdale"},
    {"@type": "City", "name": "Riverton"}
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Mobile Advertising Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Magnetic Zone Ads",
          "description": "Branded magnetic panels on vehicle doors. Routes driven daily through Utah County."
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "199",
          "priceCurrency": "USD",
          "unitText": "month"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Electric Roof Billboard",
          "description": "LED billboard mounted on vehicle roof. Dynamic digital ads seen across Utah County."
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "179",
          "priceCurrency": "USD",
          "unitText": "month"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Direct Mail Co-op",
          "description": "Co-op mailer delivered to 10,000 homes per zone per drop. Category exclusivity included."
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "399",
          "priceCurrency": "USD",
          "unitText": "drop"
        }
      }
    ]
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "06:00",
    "closes": "21:00"
  },
  "sameAs": [
    "https://www.instagram.com/drivertiseusa",
    "https://www.youtube.com/@drivertiseusa",
    "https://www.linkedin.com/company/drivertiseusa"
  ]
}
```

### FAQPage Schema (faq.html only — add alongside LocalBusiness schema)

Pull the top 6 FAQ questions and answers and encode them. This makes answers appear directly in Google search results as expandable "People Also Ask" entries.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I measure if my ad is working?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vehicle advertising is a brand awareness channel — the same category as billboards, transit ads, and fleet wraps. The most reliable signal: ask every new customer 'how'd you hear about us?' and keep a tally for 90 days. We also provide a monthly campaign summary in your client portal showing routes driven, miles covered, and estimated impressions."
      }
    },
    {
      "@type": "Question",
      "name": "How long before I see results?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Brand awareness takes 4–8 weeks to build meaningfully. Most people need to see a brand 3–7 times before it registers. Expect to see inquiries increase between weeks 4–8."
      }
    },
    {
      "@type": "Question",
      "name": "Do you guarantee a certain number of impressions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We don't guarantee a specific daily impression count because traffic conditions vary. What we do commit to: driving designated routes every active day, providing GPS-verified route logs in your monthly client portal report, and prorating any days where driving didn't occur."
      }
    },
    {
      "@type": "Question",
      "name": "How is this different from Google or Facebook ads?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Google and Facebook reach people when they're staring at a screen. Drivertise reaches people when they're out in the real world — driving, shopping, running errands. Vehicle advertising builds brand familiarity passively over time so that when someone needs what you offer, your name comes to mind first."
      }
    },
    {
      "@type": "Question",
      "name": "What happens when I cancel?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your creative is removed from the vehicle and your ad spot category is released back to the available pool. Your client portal access remains active so you can reference your campaign history. There's no obligation on either side after the campaign ends."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to commit to a long contract to try this?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. The month-to-month plan requires no long-term commitment — you can cancel with 30 days notice. The 6-month plan is paid upfront in exchange for a discounted rate, but there's no auto-renewal or lock-in beyond that."
      }
    }
  ]
}
```

### Service Schema (services.html only — one per service, all three in one block)

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Mobile Advertising Services — Utah County",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Service",
        "name": "Magnetic Zone Ads — Utah County",
        "description": "Branded magnetic door panels driven daily through Saratoga Springs, Lehi, Alpine, and Highland from 6AM–9PM. From $199/month with category exclusivity.",
        "provider": {"@type": "LocalBusiness", "name": "Drivertise USA"},
        "areaServed": "Utah County, Utah"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Service",
        "name": "Electric Roof Billboard — Utah County",
        "description": "LED digital billboard mounted on vehicle roof. Rotating ads visible to traffic across Utah County. From $179/month.",
        "provider": {"@type": "LocalBusiness", "name": "Drivertise USA"},
        "areaServed": "Utah County, Utah"
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Service",
        "name": "Direct Mail Co-op — Utah County",
        "description": "Co-op mailer delivered to 10,000 targeted homes per zone per quarterly drop. Category exclusivity. From $399/drop.",
        "provider": {"@type": "LocalBusiness", "name": "Drivertise USA"},
        "areaServed": "Utah County, Utah"
      }
    }
  ]
}
```

---

## Section 4: sitemap.xml

Create at project root: `D:\Projects\Drivertiseusa\sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://drivertiseusa.com/</loc><lastmod>2026-05-28</lastmod><priority>1.0</priority></url>
  <url><loc>https://drivertiseusa.com/services.html</loc><lastmod>2026-05-28</lastmod><priority>0.9</priority></url>
  <url><loc>https://drivertiseusa.com/pricing.html</loc><lastmod>2026-05-28</lastmod><priority>0.9</priority></url>
  <url><loc>https://drivertiseusa.com/zones.html</loc><lastmod>2026-05-28</lastmod><priority>0.8</priority></url>
  <url><loc>https://drivertiseusa.com/faq.html</loc><lastmod>2026-05-28</lastmod><priority>0.8</priority></url>
  <url><loc>https://drivertiseusa.com/about.html</loc><lastmod>2026-05-28</lastmod><priority>0.7</priority></url>
  <url><loc>https://drivertiseusa.com/contact.html</loc><lastmod>2026-05-28</lastmod><priority>0.8</priority></url>
  <url><loc>https://drivertiseusa.com/cities/lehi.html</loc><lastmod>2026-05-28</lastmod><priority>0.8</priority></url>
  <url><loc>https://drivertiseusa.com/cities/saratoga-springs.html</loc><lastmod>2026-05-28</lastmod><priority>0.8</priority></url>
  <url><loc>https://drivertiseusa.com/cities/american-fork.html</loc><lastmod>2026-05-28</lastmod><priority>0.7</priority></url>
  <url><loc>https://drivertiseusa.com/cities/alpine-highland.html</loc><lastmod>2026-05-28</lastmod><priority>0.7</priority></url>
  <url><loc>https://drivertiseusa.com/cities/sandy-draper.html</loc><lastmod>2026-05-28</lastmod><priority>0.7</priority></url>
  <url><loc>https://drivertiseusa.com/cities/bluffdale-riverton.html</loc><lastmod>2026-05-28</lastmod><priority>0.7</priority></url>
  <url><loc>https://drivertiseusa.com/insights/</loc><lastmod>2026-05-28</lastmod><priority>0.8</priority></url>
  <url><loc>https://drivertiseusa.com/insights/vehicle-wrap-advertising-utah-county/</loc><lastmod>2026-05-28</lastmod><priority>0.7</priority></url>
  <url><loc>https://drivertiseusa.com/insights/mobile-advertising-vs-facebook-ads/</loc><lastmod>2026-05-28</lastmod><priority>0.7</priority></url>
  <url><loc>https://drivertiseusa.com/insights/how-much-does-advertising-cost-utah-county/</loc><lastmod>2026-05-28</lastmod><priority>0.7</priority></url>
  <url><loc>https://drivertiseusa.com/insights/does-vehicle-wrap-advertising-work/</loc><lastmod>2026-05-28</lastmod><priority>0.7</priority></url>
  <url><loc>https://drivertiseusa.com/insights/best-ways-to-advertise-lehi-utah/</loc><lastmod>2026-05-28</lastmod><priority>0.7</priority></url>
  <url><loc>https://drivertiseusa.com/insights/brand-awareness-7-touchpoints/</loc><lastmod>2026-05-28</lastmod><priority>0.7</priority></url>
  <url><loc>https://drivertiseusa.com/insights/direct-mail-advertising-utah-county/</loc><lastmod>2026-05-28</lastmod><priority>0.7</priority></url>
  <url><loc>https://drivertiseusa.com/insights/mobile-advertising-30-days-utah-county/</loc><lastmod>2026-05-28</lastmod><priority>0.7</priority></url>
  <url><loc>https://drivertiseusa.com/insights/how-to-measure-brand-awareness/</loc><lastmod>2026-05-28</lastmod><priority>0.7</priority></url>
  <url><loc>https://drivertiseusa.com/insights/local-business-advertising-lehi/</loc><lastmod>2026-05-28</lastmod><priority>0.7</priority></url>
  <url><loc>https://drivertiseusa.com/insights/baader-meinhof-effect-advertising/</loc><lastmod>2026-05-28</lastmod><priority>0.6</priority></url>
  <url><loc>https://drivertiseusa.com/insights/advertising-cpm-utah-small-business/</loc><lastmod>2026-05-28</lastmod><priority>0.6</priority></url>
</urlset>
```

---

## Section 5: robots.txt

Create at project root: `D:\Projects\Drivertiseusa\robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://drivertiseusa.com/sitemap.xml
```

---

## Section 6: City Landing Pages

Six pages under `cities/` directory. Each follows the same template but with city-specific copy.

### Template structure (same design as existing pages — dark theme, full nav/footer)

```
<head>
  title: "Mobile Advertising in [City], Utah — Drivertise USA"
  meta description: "Mobile advertising for [City], Utah businesses. Your brand moves through [City]'s busiest corridors — from $199/month. Book a free 15-min call with Danyon."
  All OG tags, Twitter cards, canonical
  LocalBusiness schema with areaServed limited to this city
</head>

<body>
  Nav (same as all pages, with "Insights" added)

  Hero section:
    eyebrow: "Mobile Advertising · [City], Utah"
    H1: "Put Your Brand in Front of [City] Every Day"
    Subhead: "Your ad moves through [City]'s neighborhoods, shopping corridors, and commute routes — reaching local residents repeatedly, where they live and work."
    CTA: "Get a Free Demo →" (→ contact.html)

  Why [City] section:
    3 bullets specific to that city's demographics, traffic, business density
    Pull real local context: population, household income, major corridors, anchor stores

  Services overview:
    3 service cards (same as homepage) — links to services.html

  Impression estimate:
    "Estimated monthly impressions in [City]: [X]+"
    Based on route miles × 400

  CTA band:
    "Ready to put your brand in front of [City] residents?"
    Button → contact.html

  Footer (same as all pages)
</body>
```

### Per-city context (for copy generation)

| City | Population | Key Corridors | Anchor Locations |
|---|---|---|---|
| Lehi | ~82,000 | SR-92 (Triumph Blvd), Main St, Redwood Rd | Costco Traverse Mountain, Silicon Slopes tech corridor, Thanksgiving Point |
| Saratoga Springs | ~38,000 | Redwood Rd, Pioneer Crossing, Pony Express Pkwy | Costco Saratoga Springs, Smith's, new retail along SR-68 |
| American Fork | ~35,000 | State St, SR-145, 100 N | Macey's, Smith's, American Fork Canyon gateway |
| Alpine & Highland | ~22,000 | Alpine Hwy, Highland Blvd, Canyon Rd | High household income ($120K+ median), established residential |
| Sandy & Draper | ~135,000 | 123rd S, Bangerter Hwy, Lone Peak Pkwy | South Towne Mall, Costco Sandy, Draper tech corridor |
| Bluffdale & Riverton | ~55,000 | Bangerter Hwy, 12600 S, Mountain View Corridor | Jordan Landing retail, newer residential growth |

---

## Section 7: Nav Update

Add "Insights" to nav on every page, between FAQ and About.

Find in every HTML file (the nav list):
- Current pattern: `FAQ` link → `About` link
- Insert `<a href="/insights/">Insights</a>` (or `insights/index.html` for relative paths) between them

Also add city pages to footer (simple text links, not primary nav):
```
Serving: Lehi · Saratoga Springs · American Fork · Alpine & Highland · Sandy & Draper · Bluffdale & Riverton
```
Each city name links to its landing page.

---

## Danyon Manual Tasks (Cannot Be Automated)

| Task | Instructions | Priority |
|---|---|---|
| Create og-default.jpg | 1200×630px. Dark background, Drivertise logo or car photo. Save to assets/images/og-default.jpg | Before June 3 |
| Set up Google Business Profile | go.google.com/business → Add business → Service area business → Select "Advertising Agency" + "Marketing Consultant" → Set service area to Utah County cities → Hide home address → Verify via postcard or phone | Week of June 3 |
| Submit sitemap to Google Search Console | search.google.com/search-console → Add property → drivertiseusa.com → Verify via DNS or HTML tag → Sitemaps → Submit sitemap.xml URL | Day of June 3 deploy |
| Create social handles | Instagram: @drivertiseusa · YouTube: @drivertiseusa · LinkedIn: drivertiseusa — consistent everywhere | Before June 3 |
| Get 5 GBP reviews | Ask 5 people (family, friends) to leave an honest Google review. This unlocks map pack eligibility. | Weeks 1–2 after GBP live |

---

## Verification Steps

1. **Structured data:** Paste any page URL into Google's Rich Results Test (search.google.com/test/rich-results). Should show LocalBusiness entity with all fields. faq.html should show FAQPage entity.
2. **OG tags:** Paste any URL into opengraph.xyz. Should show title, description, image preview.
3. **Sitemap:** Load drivertiseusa.com/sitemap.xml in browser — valid XML, all pages listed.
4. **robots.txt:** Load drivertiseusa.com/robots.txt — shows Allow: / and sitemap URL.
5. **City pages:** Open each cities/*.html in browser. Full nav/footer present, city name in H1, CTA links work.
6. **Nav:** Open any page, confirm "Insights" appears between FAQ and About in nav.
7. **Footer city links:** Present on all pages, each links to correct city page.
8. **No broken links:** Click every new internal link — city pages, insights index, nav — all resolve.
