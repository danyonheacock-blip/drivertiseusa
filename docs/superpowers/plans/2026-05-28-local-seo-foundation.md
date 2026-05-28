# Local SEO Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add all technical SEO metadata to existing pages, create sitemap.xml + robots.txt, add "Insights" to nav on all public pages with footer city links, and build 6 city landing pages — all deploying June 3.

**Architecture:** Pure static HTML modifications. No new dependencies, no JavaScript changes. Every change is `<head>` metadata injection, nav/footer edits, or new HTML files. All city pages live in a `cities/` subdirectory and use `../` relative paths back to root resources.

**Tech Stack:** Static HTML, Schema.org JSON-LD, Open Graph meta tags

---

## File Map

| File | Action | What Changes |
|---|---|---|
| `index.html` | Modify | OG tags, canonical, LocalBusiness schema |
| `services.html` | Modify | OG tags, canonical, title fix, LocalBusiness + Service schemas |
| `pricing.html` | Modify | OG tags, canonical, title fix, LocalBusiness schema |
| `faq.html` | Modify | OG tags, canonical, title fix, LocalBusiness + FAQPage schemas |
| `about.html` | Modify | OG tags, canonical, title fix, LocalBusiness schema |
| `contact.html` | Modify | OG tags, canonical, title fix, LocalBusiness schema |
| `zones.html` | Modify | OG tags, canonical, title fix, LocalBusiness schema |
| `privacy.html` | Modify | Nav "Insights" link only |
| `terms.html` | Modify | Nav "Insights" link only |
| `sitemap.xml` | Create | All public URLs with priorities |
| `robots.txt` | Create | Allow all + sitemap pointer |
| `cities/lehi.html` | Create | City landing page |
| `cities/saratoga-springs.html` | Create | City landing page |
| `cities/american-fork.html` | Create | City landing page |
| `cities/alpine-highland.html` | Create | City landing page |
| `cities/sandy-draper.html` | Create | City landing page |
| `cities/bluffdale-riverton.html` | Create | City landing page |

---

### Task 1: OG Tags + Title Updates on All 7 Core Pages

**Files:**
- Modify: `index.html`, `services.html`, `pricing.html`, `faq.html`, `about.html`, `contact.html`, `zones.html`

This task adds Open Graph, Twitter Card, and canonical tags to every core page. It also updates the `<title>` tags that are currently too generic. No schema yet — that's Task 2.

The OG image (`assets/og-default.jpg`) must be created by Danyon manually in Canva (1200×630px, dark background, Drivertise logo). Until it exists, OG still works — shares just won't show an image preview. Do not block deployment on this.

- [ ] **Step 1: Update `index.html` head**

In `index.html`, the `<title>` is already well-optimized — keep it. Insert the following block immediately after the existing `<meta name="description">` tag (line 6):

```html
  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Drivertise USA">
  <meta property="og:title" content="Drivertise USA — Mobile Advertising for Utah County Businesses">
  <meta property="og:description" content="Mobile advertising for Utah County & southern Salt Lake County businesses. 15,000+ daily impressions via magnetic zone ads, electric billboard, and direct mail. Transparent pricing starting at $199/month.">
  <meta property="og:url" content="https://drivertiseusa.com/">
  <meta property="og:image" content="https://drivertiseusa.com/assets/og-default.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Drivertise USA — Mobile Advertising for Utah County Businesses">
  <meta name="twitter:description" content="Mobile advertising for Utah County & southern Salt Lake County businesses. Transparent pricing starting at $199/month.">
  <meta name="twitter:image" content="https://drivertiseusa.com/assets/og-default.jpg">
  <!-- Canonical -->
  <link rel="canonical" href="https://drivertiseusa.com/">
```

- [ ] **Step 2: Update `services.html` head**

Change `<title>Services — Drivertise USA</title>` to:
```html
<title>Mobile Advertising Services in Utah County — Drivertise USA</title>
```

Insert after `<meta name="description">`:
```html
  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Drivertise USA">
  <meta property="og:title" content="Mobile Advertising Services in Utah County — Drivertise USA">
  <meta property="og:description" content="Magnetic zone ads, electric billboard, and direct mail co-op for Utah County businesses. Category exclusivity. Routes driven daily through Saratoga Springs, Lehi, Alpine, and Highland.">
  <meta property="og:url" content="https://drivertiseusa.com/services.html">
  <meta property="og:image" content="https://drivertiseusa.com/assets/og-default.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Mobile Advertising Services in Utah County — Drivertise USA">
  <meta name="twitter:description" content="Magnetic zone ads, electric billboard, and direct mail co-op for Utah County businesses. Category exclusivity included.">
  <meta name="twitter:image" content="https://drivertiseusa.com/assets/og-default.jpg">
  <!-- Canonical -->
  <link rel="canonical" href="https://drivertiseusa.com/services.html">
```

- [ ] **Step 3: Update `pricing.html` head**

Change title to:
```html
<title>Mobile Advertising Pricing in Utah County — Drivertise USA</title>
```

Insert after `<meta name="description">`:
```html
  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Drivertise USA">
  <meta property="og:title" content="Mobile Advertising Pricing in Utah County — Drivertise USA">
  <meta property="og:description" content="Transparent mobile advertising pricing for Utah County businesses. Magnetic zone ads from $199/month. Electric billboard from $179/month. Direct mail from $399/drop.">
  <meta property="og:url" content="https://drivertiseusa.com/pricing.html">
  <meta property="og:image" content="https://drivertiseusa.com/assets/og-default.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Mobile Advertising Pricing in Utah County — Drivertise USA">
  <meta name="twitter:description" content="Transparent pricing for Utah County mobile advertising. Zone ads from $199/month, billboard from $179/month, direct mail from $399/drop.">
  <meta name="twitter:image" content="https://drivertiseusa.com/assets/og-default.jpg">
  <!-- Canonical -->
  <link rel="canonical" href="https://drivertiseusa.com/pricing.html">
```

- [ ] **Step 4: Update `faq.html` head**

Change title to:
```html
<title>Mobile Advertising FAQ — Honest Answers | Drivertise USA</title>
```

Insert after `<meta name="description">`:
```html
  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Drivertise USA">
  <meta property="og:title" content="Mobile Advertising FAQ — Honest Answers | Drivertise USA">
  <meta property="og:description" content="Real answers to the most common questions about mobile advertising in Utah County. Pricing, results timelines, magnetic ad process, direct mail format, and more.">
  <meta property="og:url" content="https://drivertiseusa.com/faq.html">
  <meta property="og:image" content="https://drivertiseusa.com/assets/og-default.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Mobile Advertising FAQ — Honest Answers | Drivertise USA">
  <meta name="twitter:description" content="Real answers about mobile advertising in Utah County. Pricing, results timelines, and how the process works.">
  <meta name="twitter:image" content="https://drivertiseusa.com/assets/og-default.jpg">
  <!-- Canonical -->
  <link rel="canonical" href="https://drivertiseusa.com/faq.html">
```

- [ ] **Step 5: Update `about.html` head**

Change title to:
```html
<title>About Drivertise USA — Mobile Advertising, Utah County</title>
```

Insert after `<meta name="description">`:
```html
  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Drivertise USA">
  <meta property="og:title" content="About Drivertise USA — Mobile Advertising, Utah County">
  <meta property="og:description" content="Drivertise USA is a mobile advertising company serving Utah County and southern Salt Lake County. Founded by Danyon. Vehicle ads, electric billboard, and direct mail co-op.">
  <meta property="og:url" content="https://drivertiseusa.com/about.html">
  <meta property="og:image" content="https://drivertiseusa.com/assets/og-default.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="About Drivertise USA — Mobile Advertising, Utah County">
  <meta name="twitter:description" content="Mobile advertising company serving Utah County and southern Salt Lake County. Founded by Danyon.">
  <meta name="twitter:image" content="https://drivertiseusa.com/assets/og-default.jpg">
  <!-- Canonical -->
  <link rel="canonical" href="https://drivertiseusa.com/about.html">
```

- [ ] **Step 6: Update `contact.html` head**

Change title to:
```html
<title>Book a Demo — Mobile Advertising Utah County | Drivertise USA</title>
```

Insert after `<meta name="description">`:
```html
  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Drivertise USA">
  <meta property="og:title" content="Book a Demo — Mobile Advertising Utah County | Drivertise USA">
  <meta property="og:description" content="Book a free 15-minute call with Danyon. No pitch — just a conversation about your Utah County business and whether mobile advertising is a fit.">
  <meta property="og:url" content="https://drivertiseusa.com/contact.html">
  <meta property="og:image" content="https://drivertiseusa.com/assets/og-default.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Book a Demo — Mobile Advertising Utah County | Drivertise USA">
  <meta name="twitter:description" content="Book a free 15-minute call with Danyon. No pitch, just a real conversation.">
  <meta name="twitter:image" content="https://drivertiseusa.com/assets/og-default.jpg">
  <!-- Canonical -->
  <link rel="canonical" href="https://drivertiseusa.com/contact.html">
```

- [ ] **Step 7: Update `zones.html` head**

Change title to:
```html
<title>Direct Mail Advertising Zones — Utah County | Drivertise USA</title>
```

Insert after `<meta name="description">`:
```html
  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Drivertise USA">
  <meta property="og:title" content="Direct Mail Advertising Zones — Utah County | Drivertise USA">
  <meta property="og:description" content="View Drivertise direct mail zones across Utah County. 10,000 homes per zone per drop. Category exclusivity included. Quarterly drops: January, April, August, November.">
  <meta property="og:url" content="https://drivertiseusa.com/zones.html">
  <meta property="og:image" content="https://drivertiseusa.com/assets/og-default.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Direct Mail Advertising Zones — Utah County | Drivertise USA">
  <meta name="twitter:description" content="View direct mail zones across Utah County. 10,000 homes per zone, category exclusivity, quarterly drops.">
  <meta name="twitter:image" content="https://drivertiseusa.com/assets/og-default.jpg">
  <!-- Canonical -->
  <link rel="canonical" href="https://drivertiseusa.com/zones.html">
```

- [ ] **Step 8: Commit**

```bash
git add index.html services.html pricing.html faq.html about.html contact.html zones.html
git commit -m "seo: add OG tags, Twitter cards, canonical URLs, and title tag optimization"
```

---

### Task 2: LocalBusiness JSON-LD Schema on All 7 Core Pages

**Files:**
- Modify: `index.html`, `services.html`, `pricing.html`, `faq.html`, `about.html`, `contact.html`, `zones.html`

Add the same LocalBusiness JSON-LD block to every core page. Insert it immediately before the closing `</head>` tag on each page.

**IMPORTANT:** Do not modify `sameAs` social URLs until the accounts exist. Leave them as-is — Google ignores sameAs links that 404, it does not penalize for them.

- [ ] **Step 1: Add LocalBusiness schema to `index.html`**

Insert immediately before `</head>`:

```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Drivertise USA",
    "description": "Mobile advertising company serving Utah County and southern Salt Lake County. Magnetic zone ads, electric billboard, and direct mail co-op starting at $199/month.",
    "url": "https://drivertiseusa.com",
    "telephone": "+13852046561",
    "email": "hello@drivertiseusa.com",
    "founder": { "@type": "Person", "name": "Danyon" },
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
  </script>
```

- [ ] **Step 2: Add the same LocalBusiness schema block to `services.html`**

Same JSON-LD block as Step 1. Insert immediately before `</head>`.

- [ ] **Step 3: Add the same LocalBusiness schema block to `pricing.html`**

Same JSON-LD block as Step 1. Insert immediately before `</head>`.

- [ ] **Step 4: Add the same LocalBusiness schema block to `faq.html`**

Same JSON-LD block as Step 1. Insert immediately before `</head>`.

- [ ] **Step 5: Add the same LocalBusiness schema block to `about.html`**

Same JSON-LD block as Step 1. Insert immediately before `</head>`.

- [ ] **Step 6: Add the same LocalBusiness schema block to `contact.html`**

Same JSON-LD block as Step 1. Insert immediately before `</head>`.

- [ ] **Step 7: Add the same LocalBusiness schema block to `zones.html`**

Same JSON-LD block as Step 1. Insert immediately before `</head>`.

- [ ] **Step 8: Commit**

```bash
git add index.html services.html pricing.html faq.html about.html contact.html zones.html
git commit -m "seo: add LocalBusiness JSON-LD structured data to all core pages"
```

---

### Task 3: Page-Specific Schemas (FAQPage + Service ItemList)

**Files:**
- Modify: `faq.html` (FAQPage schema)
- Modify: `services.html` (Service ItemList schema)

These are additional schema blocks added alongside the LocalBusiness schema from Task 2. Each page gets its specific schema in addition to LocalBusiness — both blocks live before `</head>`.

- [ ] **Step 1: Add FAQPage schema to `faq.html`**

Insert a second `<script type="application/ld+json">` block immediately after the LocalBusiness block added in Task 2 (still before `</head>`):

```html
  <script type="application/ld+json">
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
  </script>
```

- [ ] **Step 2: Add Service ItemList schema to `services.html`**

Insert a second `<script type="application/ld+json">` block immediately after the LocalBusiness block added to services.html in Task 2:

```html
  <script type="application/ld+json">
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
  </script>
```

- [ ] **Step 3: Commit**

```bash
git add faq.html services.html
git commit -m "seo: add FAQPage schema to faq.html and Service ItemList schema to services.html"
```

---

### Task 4: sitemap.xml + robots.txt

**Files:**
- Create: `sitemap.xml` (project root)
- Create: `robots.txt` (project root)

These files are critical for Google indexing. The sitemap uses the correct `.html` slugs from the content machine plan (not trailing-slash directory-style URLs, since this is a static file site with no server-side routing).

- [ ] **Step 1: Create `sitemap.xml`**

Create file at `D:\Projects\Drivertiseusa\sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core pages -->
  <url><loc>https://drivertiseusa.com/</loc><lastmod>2026-06-03</lastmod><priority>1.0</priority></url>
  <url><loc>https://drivertiseusa.com/services.html</loc><lastmod>2026-06-03</lastmod><priority>0.9</priority></url>
  <url><loc>https://drivertiseusa.com/pricing.html</loc><lastmod>2026-06-03</lastmod><priority>0.9</priority></url>
  <url><loc>https://drivertiseusa.com/zones.html</loc><lastmod>2026-06-03</lastmod><priority>0.8</priority></url>
  <url><loc>https://drivertiseusa.com/faq.html</loc><lastmod>2026-06-03</lastmod><priority>0.8</priority></url>
  <url><loc>https://drivertiseusa.com/about.html</loc><lastmod>2026-06-03</lastmod><priority>0.7</priority></url>
  <url><loc>https://drivertiseusa.com/contact.html</loc><lastmod>2026-06-03</lastmod><priority>0.8</priority></url>
  <!-- City landing pages -->
  <url><loc>https://drivertiseusa.com/cities/lehi.html</loc><lastmod>2026-06-03</lastmod><priority>0.8</priority></url>
  <url><loc>https://drivertiseusa.com/cities/saratoga-springs.html</loc><lastmod>2026-06-03</lastmod><priority>0.8</priority></url>
  <url><loc>https://drivertiseusa.com/cities/american-fork.html</loc><lastmod>2026-06-03</lastmod><priority>0.7</priority></url>
  <url><loc>https://drivertiseusa.com/cities/alpine-highland.html</loc><lastmod>2026-06-03</lastmod><priority>0.7</priority></url>
  <url><loc>https://drivertiseusa.com/cities/sandy-draper.html</loc><lastmod>2026-06-03</lastmod><priority>0.7</priority></url>
  <url><loc>https://drivertiseusa.com/cities/bluffdale-riverton.html</loc><lastmod>2026-06-03</lastmod><priority>0.7</priority></url>
  <!-- Insights hub -->
  <url><loc>https://drivertiseusa.com/insights/index.html</loc><lastmod>2026-06-03</lastmod><priority>0.8</priority></url>
  <!-- Insights posts -->
  <url><loc>https://drivertiseusa.com/insights/mobile-advertising-utah-county.html</loc><lastmod>2026-06-03</lastmod><priority>0.7</priority></url>
  <url><loc>https://drivertiseusa.com/insights/vehicle-wrap-advertising-vs-facebook-ads.html</loc><lastmod>2026-06-03</lastmod><priority>0.7</priority></url>
  <url><loc>https://drivertiseusa.com/insights/local-impressions-without-big-ad-budget.html</loc><lastmod>2026-06-03</lastmod><priority>0.7</priority></url>
  <url><loc>https://drivertiseusa.com/insights/mobile-billboard-advertising-lehi-utah.html</loc><lastmod>2026-06-03</lastmod><priority>0.7</priority></url>
  <url><loc>https://drivertiseusa.com/insights/cost-of-advertising-utah-county.html</loc><lastmod>2026-06-03</lastmod><priority>0.7</priority></url>
  <url><loc>https://drivertiseusa.com/insights/neighborhood-deal-passport-direct-mail.html</loc><lastmod>2026-06-03</lastmod><priority>0.7</priority></url>
  <url><loc>https://drivertiseusa.com/insights/advertising-mistakes-utah-small-business.html</loc><lastmod>2026-06-03</lastmod><priority>0.7</priority></url>
  <url><loc>https://drivertiseusa.com/insights/advertising-saratoga-springs-eagle-mountain.html</loc><lastmod>2026-06-03</lastmod><priority>0.7</priority></url>
  <url><loc>https://drivertiseusa.com/insights/brand-awareness-vs-lead-generation.html</loc><lastmod>2026-06-03</lastmod><priority>0.7</priority></url>
  <url><loc>https://drivertiseusa.com/insights/electric-billboard-advertising-utah-county.html</loc><lastmod>2026-06-03</lastmod><priority>0.7</priority></url>
  <url><loc>https://drivertiseusa.com/insights/advertising-highland-alpine-utah.html</loc><lastmod>2026-06-03</lastmod><priority>0.7</priority></url>
  <url><loc>https://drivertiseusa.com/insights/baader-meinhof-effect-advertising.html</loc><lastmod>2026-06-03</lastmod><priority>0.6</priority></url>
</urlset>
```

- [ ] **Step 2: Create `robots.txt`**

Create file at `D:\Projects\Drivertiseusa\robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://drivertiseusa.com/sitemap.xml
```

- [ ] **Step 3: Commit**

```bash
git add sitemap.xml robots.txt
git commit -m "seo: add sitemap.xml and robots.txt"
```

---

### Task 5: Nav "Insights" Link + Footer City Links on All Public Pages

**Files:**
- Modify: `index.html`, `services.html`, `pricing.html`, `faq.html`, `about.html`, `contact.html`, `zones.html`, `privacy.html`, `terms.html`

Two changes per page:
1. Add `<a href="insights/index.html">Insights</a>` between FAQ and About in both the desktop nav (`.nav-links`) and the mobile nav (`.nav-mobile`)
2. Add a footer "Serving" strip with city links before the `footer-bottom` div

Both changes follow an identical pattern on all 9 pages. Show every file.

**Note on `privacy.html` and `terms.html`:** Their nav links use root-relative paths like `faq.html`, same as all other pages — no change to this convention needed.

- [ ] **Step 1: Add Insights to `index.html` nav (desktop + mobile) and footer**

In the `.nav-links` block, find:
```html
      <a href="faq.html">FAQ</a>
      <a href="about.html">About</a>
```

Replace with:
```html
      <a href="faq.html">FAQ</a>
      <a href="insights/index.html">Insights</a>
      <a href="about.html">About</a>
```

In the `.nav-mobile` block, find:
```html
  <a href="faq.html">FAQ</a>
  <a href="about.html">About</a>
```

Replace with:
```html
  <a href="faq.html">FAQ</a>
  <a href="insights/index.html">Insights</a>
  <a href="about.html">About</a>
```

In the footer, find `<div class="footer-bottom">` and insert immediately before it:
```html
  <div class="footer-serving">
    <div class="container">
      <span class="footer-serving-label">Serving:</span>
      <a href="cities/lehi.html">Lehi</a>
      <span class="footer-serving-sep">·</span>
      <a href="cities/saratoga-springs.html">Saratoga Springs</a>
      <span class="footer-serving-sep">·</span>
      <a href="cities/american-fork.html">American Fork</a>
      <span class="footer-serving-sep">·</span>
      <a href="cities/alpine-highland.html">Alpine &amp; Highland</a>
      <span class="footer-serving-sep">·</span>
      <a href="cities/sandy-draper.html">Sandy &amp; Draper</a>
      <span class="footer-serving-sep">·</span>
      <a href="cities/bluffdale-riverton.html">Bluffdale &amp; Riverton</a>
    </div>
  </div>
```

Also add "Insights" to the Company footer column in `index.html`. Find:
```html
      <a href="faq.html">FAQ</a>
      <a href="contact.html">Contact / Demo</a>
```

Replace with:
```html
      <a href="insights/index.html">Insights</a>
      <a href="faq.html">FAQ</a>
      <a href="contact.html">Contact / Demo</a>
```

- [ ] **Step 2: Add CSS for `.footer-serving` to `css/base.css`**

Append to the end of `css/base.css`:

```css
/* ── FOOTER SERVING STRIP ── */
.footer-serving {
  border-top: 1px solid var(--border);
  padding: 16px 0;
  background: var(--bg2);
}

.footer-serving .container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 0.8rem;
}

.footer-serving-label {
  color: var(--w50);
  font-weight: 600;
  letter-spacing: 0.04em;
  margin-right: 4px;
}

.footer-serving a {
  color: var(--w60);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-serving a:hover { color: var(--gold); }

.footer-serving-sep {
  color: var(--w30);
}
```

- [ ] **Step 3: Apply the same nav + footer changes to `services.html`**

Same three changes as Step 1 (desktop nav, mobile nav, footer-serving strip + company footer link). The footer city link hrefs are the same: `cities/lehi.html`, etc.

- [ ] **Step 4: Apply the same nav + footer changes to `pricing.html`**

Same three changes as Step 1.

- [ ] **Step 5: Apply the same nav + footer changes to `faq.html`**

Same three changes as Step 1.

- [ ] **Step 6: Apply the same nav + footer changes to `about.html`**

Same three changes as Step 1.

- [ ] **Step 7: Apply the same nav + footer changes to `contact.html`**

Same three changes as Step 1.

- [ ] **Step 8: Apply the same nav + footer changes to `zones.html`**

Same three changes as Step 1.

- [ ] **Step 9: Add Insights to nav on `privacy.html` (no footer city strip needed)**

`privacy.html` uses the same nav structure. Add `<a href="insights/index.html">Insights</a>` between FAQ and About in both `.nav-links` and `.nav-mobile`. No footer city strip needed on legal pages.

- [ ] **Step 10: Add Insights to nav on `terms.html` (no footer city strip needed)**

Same as Step 9 — Insights nav link only, no footer city strip.

- [ ] **Step 11: Commit**

```bash
git add index.html services.html pricing.html faq.html about.html contact.html zones.html privacy.html terms.html css/base.css
git commit -m "seo: add Insights nav link to all public pages + footer city serving links"
```

---

### Task 6: City Landing Pages — Lehi + Saratoga Springs

**Files:**
- Create: `cities/lehi.html`
- Create: `cities/saratoga-springs.html`

City pages live in `cities/` subdirectory. All resource paths use `../` prefix. Nav and footer are copied from root pages with `../` prefixed on every href. These pages use existing CSS classes from `base.css` and `components.css` — no new stylesheet needed.

- [ ] **Step 1: Create `cities/` directory**

```bash
mkdir "D:\Projects\Drivertiseusa\cities"
```

- [ ] **Step 2: Create `cities/lehi.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Mobile advertising for Lehi, Utah businesses. Your brand moves through Silicon Slopes, Traverse Mountain, and Lehi's busiest corridors — from $199/month. Book a free 15-min call.">
  <title>Mobile Advertising in Lehi, Utah — Drivertise USA</title>
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Drivertise USA">
  <meta property="og:title" content="Mobile Advertising in Lehi, Utah — Drivertise USA">
  <meta property="og:description" content="Mobile advertising for Lehi, Utah businesses. Your brand moves through Silicon Slopes, Traverse Mountain, and Lehi's busiest corridors — from $199/month.">
  <meta property="og:url" content="https://drivertiseusa.com/cities/lehi.html">
  <meta property="og:image" content="https://drivertiseusa.com/assets/og-default.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Mobile Advertising in Lehi, Utah — Drivertise USA">
  <meta name="twitter:description" content="Mobile advertising for Lehi businesses. From $199/month. Category exclusivity. Daily corridor coverage.">
  <meta name="twitter:image" content="https://drivertiseusa.com/assets/og-default.jpg">
  <link rel="canonical" href="https://drivertiseusa.com/cities/lehi.html">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Drivertise USA",
    "description": "Mobile advertising company serving Lehi, Utah. Magnetic zone ads, electric billboard, and direct mail co-op starting at $199/month.",
    "url": "https://drivertiseusa.com",
    "telephone": "+13852046561",
    "email": "hello@drivertiseusa.com",
    "areaServed": {"@type": "City", "name": "Lehi", "sameAs": "https://en.wikipedia.org/wiki/Lehi,_Utah"}
  }
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/base.css">
  <link rel="stylesheet" href="../css/components.css">
</head>
<body>

<header class="nav" id="nav">
  <div class="container nav-inner">
    <a href="../index.html" class="nav-logo">DRIVERTISE<span class="text-yellow">.</span></a>
    <nav class="nav-links" aria-label="Main navigation">
      <a href="../services.html">Services</a>
      <a href="../pricing.html">Pricing</a>
      <a href="../zones.html">Mailer Zones</a>
      <a href="../faq.html">FAQ</a>
      <a href="../insights/index.html">Insights</a>
      <a href="../about.html">About</a>
    </nav>
    <a href="../contact.html" class="btn btn-primary nav-cta">Book a 15-Min Call</a>
    <button class="nav-toggle" aria-label="Open navigation menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
<nav class="nav-mobile" id="nav-mobile" aria-label="Mobile navigation">
  <a href="../services.html">Services</a>
  <a href="../pricing.html">Pricing</a>
  <a href="../zones.html">Mailer Zones</a>
  <a href="../faq.html">FAQ</a>
  <a href="../insights/index.html">Insights</a>
  <a href="../about.html">About</a>
  <a href="../contact.html" class="btn btn-primary btn-lg">Book a 15-Min Call</a>
</nav>

<section style="margin-top:var(--nav-h); padding: 100px 0 80px; background: var(--bg2); border-bottom: 1px solid var(--border);">
  <div class="container">
    <span class="eyebrow">Mobile Advertising · Lehi, Utah</span>
    <h1 style="font-family:'Syne',sans-serif; font-size:clamp(2rem,5vw,3.5rem); font-weight:900; color:var(--cream); line-height:1.1; margin:16px 0 24px; max-width:700px;">
      Put Your Brand in Front of Lehi Every Day
    </h1>
    <p style="font-size:1.1rem; color:var(--w70); max-width:580px; line-height:1.7; margin-bottom:36px;">
      Your ad moves through Lehi's neighborhoods, the Silicon Slopes corridor, and Traverse Mountain's retail zone — reaching local residents repeatedly, where they live and work.
    </p>
    <a href="../contact.html" class="btn btn-primary btn-lg">Get a Free Demo <span class="btn-arrow">→</span></a>
  </div>
</section>

<section class="section-light" style="padding: 80px 0;">
  <div class="container">
    <h2 style="font-family:'Syne',sans-serif; font-size:1.75rem; font-weight:900; color:#0A0D12; margin-bottom:40px;">Why Lehi</h2>
    <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:24px; max-width:900px;">
      <div style="padding:28px; background:#fff; border:1px solid rgba(10,13,18,0.08); border-radius:16px;">
        <h3 style="font-family:'Syne',sans-serif; font-weight:700; font-size:1rem; color:#0A0D12; margin-bottom:10px;">Silicon Slopes & Rapid Growth</h3>
        <p style="font-size:0.92rem; color:rgba(10,13,18,0.65); line-height:1.7; margin:0;">Home to 82,000+ residents and Utah's fastest-growing tech corridor — new families and employees arrive monthly, forming brand loyalties in real time.</p>
      </div>
      <div style="padding:28px; background:#fff; border:1px solid rgba(10,13,18,0.08); border-radius:16px;">
        <h3 style="font-family:'Syne',sans-serif; font-weight:700; font-size:1rem; color:#0A0D12; margin-bottom:10px;">High-Traffic Corridors</h3>
        <p style="font-size:0.92rem; color:rgba(10,13,18,0.65); line-height:1.7; margin:0;">SR-92 (Triumph Blvd), Redwood Road, and the Thanksgiving Point / Costco Traverse Mountain zone generate dense, consistent daily traffic — prime exposure territory.</p>
      </div>
      <div style="padding:28px; background:#fff; border:1px solid rgba(10,13,18,0.08); border-radius:16px;">
        <h3 style="font-family:'Syne',sans-serif; font-weight:700; font-size:1rem; color:#0A0D12; margin-bottom:10px;">First-Mover Window Is Open</h3>
        <p style="font-size:0.92rem; color:rgba(10,13,18,0.65); line-height:1.7; margin:0;">New residents are still auditioning service providers in every category. Establish your name now, before brand loyalties harden — this window doesn't stay open as the city matures.</p>
      </div>
    </div>
  </div>
</section>

<section style="padding: 80px 0; background: var(--bg);">
  <div class="container">
    <h2 style="font-family:'Syne',sans-serif; font-size:1.75rem; font-weight:900; color:var(--cream); margin-bottom:12px; text-align:center;">Three Ways to Reach Lehi</h2>
    <p style="color:var(--w60); text-align:center; max-width:480px; margin:0 auto 48px;">Each format reaches your customers differently. Most businesses start with one and expand.</p>
    <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:24px; max-width:900px; margin:0 auto;">
      <div style="padding:32px; background:var(--bg3); border:1px solid var(--border); border-radius:16px;">
        <h3 style="font-family:'Syne',sans-serif; font-weight:700; color:var(--cream); margin-bottom:10px;">Magnetic Zone Ads</h3>
        <p style="color:var(--w60); font-size:0.9rem; line-height:1.7; margin-bottom:20px;">Branded panels on the vehicle doors. Your brand in front of Lehi every day, same corridors, same audience, repeated exposure. From $199/month.</p>
        <a href="../services.html#magnetic" style="color:var(--gold); font-weight:600; text-decoration:none; font-size:0.9rem;">Learn more →</a>
      </div>
      <div style="padding:32px; background:var(--bg3); border:1px solid var(--border); border-radius:16px;">
        <h3 style="font-family:'Syne',sans-serif; font-weight:700; color:var(--cream); margin-bottom:10px;">Electric Billboard</h3>
        <p style="color:var(--w60); font-size:0.9rem; line-height:1.7; margin-bottom:20px;">LED display on the vehicle roof. Dynamic ads cycling through Lehi's busiest zones. Join the waitlist — $50 deposit holds your spot. From $179/month.</p>
        <a href="../services.html#billboard" style="color:var(--gold); font-weight:600; text-decoration:none; font-size:0.9rem;">Join waitlist →</a>
      </div>
      <div style="padding:32px; background:var(--bg3); border:1px solid var(--border); border-radius:16px;">
        <h3 style="font-family:'Syne',sans-serif; font-weight:700; color:var(--cream); margin-bottom:10px;">Direct Mail Co-op</h3>
        <p style="color:var(--w60); font-size:0.9rem; line-height:1.7; margin-bottom:20px;">Your ad in the Neighborhood Deal Passport, delivered to 10,000 Lehi homes per quarterly drop. Category exclusivity. From $399/drop.</p>
        <a href="../services.html#direct-mail" style="color:var(--gold); font-weight:600; text-decoration:none; font-size:0.9rem;">Learn more →</a>
      </div>
    </div>
  </div>
</section>

<section class="section-light" style="padding: 56px 0; text-align:center;">
  <div class="container">
    <p style="font-size:0.85rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:var(--gold); margin-bottom:8px;">Lehi Coverage</p>
    <p style="font-family:'Syne',sans-serif; font-size:2.5rem; font-weight:900; color:#0A0D12; margin:0 0 8px;">40,000+</p>
    <p style="color:rgba(10,13,18,0.55); font-size:0.95rem;">Estimated monthly impressions in Lehi and surrounding corridor</p>
  </div>
</section>

<section style="padding: 80px 0; background: var(--bg2); text-align:center;">
  <div class="container">
    <h2 style="font-family:'Syne',sans-serif; font-size:2rem; font-weight:900; color:var(--cream); margin-bottom:16px;">Ready to put your brand in front of Lehi residents?</h2>
    <p style="color:var(--w60); max-width:480px; margin:0 auto 32px; line-height:1.7;">Book a 15-minute call with Danyon. No pitch — just a real conversation about your business and whether this is a fit.</p>
    <a href="../contact.html" class="btn btn-primary btn-lg">Book a 15-Min Call <span class="btn-arrow">→</span></a>
  </div>
</section>

<footer class="footer">
  <div class="container footer-inner">
    <div class="footer-brand">
      <a href="../index.html" class="nav-logo" style="margin-bottom:16px; display:inline-block;">DRIVERTISE<span class="text-yellow">.</span></a>
      <p>Mobile advertising for Utah County and southern Salt Lake County businesses. We put your brand everywhere your customers already go.</p>
      <div class="footer-contact" style="margin-top:20px;">
        <a href="tel:+13852046561">(385) 204-6561</a>
        <a href="mailto:hello@drivertiseusa.com">hello@drivertiseusa.com</a>
      </div>
    </div>
    <div class="footer-col">
      <span class="footer-col-title">Services</span>
      <a href="../services.html#magnetic">Magnetic Zone Ads</a>
      <a href="../services.html#billboard">Electric Billboard</a>
      <a href="../services.html#direct-mail">Direct Mail Co-op</a>
      <a href="../pricing.html">View Pricing</a>
    </div>
    <div class="footer-col">
      <span class="footer-col-title">Company</span>
      <a href="../about.html">About Drivertise</a>
      <a href="../insights/index.html">Insights</a>
      <a href="../faq.html">FAQ</a>
      <a href="../contact.html">Contact / Demo</a>
    </div>
  </div>
  <div class="footer-serving">
    <div class="container">
      <span class="footer-serving-label">Serving:</span>
      <a href="lehi.html">Lehi</a>
      <span class="footer-serving-sep">·</span>
      <a href="saratoga-springs.html">Saratoga Springs</a>
      <span class="footer-serving-sep">·</span>
      <a href="american-fork.html">American Fork</a>
      <span class="footer-serving-sep">·</span>
      <a href="alpine-highland.html">Alpine &amp; Highland</a>
      <span class="footer-serving-sep">·</span>
      <a href="sandy-draper.html">Sandy &amp; Draper</a>
      <span class="footer-serving-sep">·</span>
      <a href="bluffdale-riverton.html">Bluffdale &amp; Riverton</a>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="container footer-bottom-inner">
      <p>© 2026 Drivertise USA. All rights reserved. Serving Utah County, Utah.</p>
      <div class="footer-legal">
        <a href="../privacy.html">Privacy Policy</a>
        <a href="../terms.html">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>

<script src="../js/main.js"></script>
</body>
</html>
```

- [ ] **Step 3: Create `cities/saratoga-springs.html`**

Same structure as `lehi.html`. Change every instance of "Lehi" to "Saratoga Springs" in the visible copy, and update the following values:

**Head:**
- `<meta name="description" content="Mobile advertising for Saratoga Springs, Utah businesses. Your brand moves through the SR-68 corridor, Costco zone, and Saratoga Springs' growing residential neighborhoods — from $199/month. Book a free 15-min call.">`
- `<title>Mobile Advertising in Saratoga Springs, Utah — Drivertise USA</title>`
- `og:title`: `Mobile Advertising in Saratoga Springs, Utah — Drivertise USA`
- `og:description`: `Mobile advertising for Saratoga Springs businesses. Your brand moves through the SR-68 corridor and 38,000+ households — from $199/month.`
- `og:url`: `https://drivertiseusa.com/cities/saratoga-springs.html`
- `canonical`: `https://drivertiseusa.com/cities/saratoga-springs.html`
- LocalBusiness `areaServed`: `{"@type": "City", "name": "Saratoga Springs", "sameAs": "https://en.wikipedia.org/wiki/Saratoga_Springs,_Utah"}`

**Hero section:**
- eyebrow: `Mobile Advertising · Saratoga Springs, Utah`
- H1: `Put Your Brand in Front of Saratoga Springs Every Day`
- Subhead: `Your ad moves through Saratoga Springs' residential neighborhoods, the SR-68 corridor, and the Costco retail zone — reaching local residents repeatedly, where they live and shop.`

**Why section cards:**
- Card 1 — `SR-68 Corridor & Rapid Growth`: "38,000+ residents growing fast along the SR-68 corridor — with a Costco anchor drawing shoppers from across the west side. One of Utah County's highest-traffic residential corridors."
- Card 2 — `Brand Loyalty Still Forming`: "Families who've moved in the last 3 years are still auditioning service providers in every category. The window to claim your category in their minds is open now — and closes as the city matures."
- Card 3 — `Daily Commuter Exposure`: "Every Saratoga Springs commuter heading to Lehi or Orem passes through Pioneer Crossing and SR-68 daily. Your brand follows the same route."

**Impression stat:** `30,000+` / `Estimated monthly impressions in Saratoga Springs and surrounding corridor`

**CTA headline:** `Ready to put your brand in front of Saratoga Springs residents?`

**Footer city links:** Use relative paths `lehi.html`, `saratoga-springs.html`, etc. (same directory, so no `../`)

- [ ] **Step 4: Commit**

```bash
git add cities/
git commit -m "seo: add city landing pages for Lehi and Saratoga Springs"
```

---

### Task 7: City Landing Pages — American Fork + Alpine & Highland

**Files:**
- Create: `cities/american-fork.html`
- Create: `cities/alpine-highland.html`

Same structure as Task 6. Only city-specific values listed below — use the complete HTML from `cities/lehi.html` as the base and substitute these values.

- [ ] **Step 1: Create `cities/american-fork.html`**

Use `cities/lehi.html` as template. Update:

**Head:**
- description: `Mobile advertising for American Fork, Utah businesses. Your brand moves through State Street, SR-145, and American Fork's established retail corridors — from $199/month. Book a free 15-min call.`
- title: `Mobile Advertising in American Fork, Utah — Drivertise USA`
- og:title: `Mobile Advertising in American Fork, Utah — Drivertise USA`
- og:description: `Mobile advertising for American Fork businesses. Daily coverage through State Street and established neighborhoods — from $199/month.`
- og:url: `https://drivertiseusa.com/cities/american-fork.html`
- canonical: `https://drivertiseusa.com/cities/american-fork.html`
- LocalBusiness areaServed: `{"@type": "City", "name": "American Fork", "sameAs": "https://en.wikipedia.org/wiki/American_Fork,_Utah"}`

**Hero:**
- eyebrow: `Mobile Advertising · American Fork, Utah`
- H1: `Put Your Brand in Front of American Fork Every Day`
- Subhead: `Your ad moves through American Fork's State Street corridor, established neighborhoods, and retail anchor zones — reaching the residents who drive your business, day after day.`

**Why section cards:**
- Card 1 — `Established Market, Loyal Customers`: "35,000 residents in a stable, maturing community. Brand loyalty runs deep here — and once earned, it holds. State Street and the retail corridor create consistent high-visibility exposure."
- Card 2 — `Anchor Retail Exposure`: "Macey's, Smith's, and the State Street commercial corridor are high-dwell destinations where a branded vehicle commands attention during shopping trips and errands."
- Card 3 — `Canyon Gateway Demographics`: "Gateway to American Fork Canyon — an active, health-conscious demographic with above-average disposable income and strong community ties."

**Impression stat:** `25,000+` / `Estimated monthly impressions in American Fork and surrounding corridor`

**CTA headline:** `Ready to put your brand in front of American Fork residents?`

- [ ] **Step 2: Create `cities/alpine-highland.html`**

Use `cities/lehi.html` as template. Update:

**Head:**
- description: `Mobile advertising for Alpine and Highland, Utah businesses. Reach Utah County's highest-income households along the Alpine Highway corridor — from $199/month. Book a free 15-min call.`
- title: `Mobile Advertising in Alpine & Highland, Utah — Drivertise USA`
- og:title: `Mobile Advertising in Alpine & Highland, Utah — Drivertise USA`
- og:description: `Mobile advertising reaching Alpine and Highland's $120K+ median income households. Low ad noise, high recall — from $199/month.`
- og:url: `https://drivertiseusa.com/cities/alpine-highland.html`
- canonical: `https://drivertiseusa.com/cities/alpine-highland.html`
- LocalBusiness areaServed: `[{"@type": "City", "name": "Alpine", "sameAs": "https://en.wikipedia.org/wiki/Alpine,_Utah"}, {"@type": "City", "name": "Highland", "sameAs": "https://en.wikipedia.org/wiki/Highland,_Utah"}]`

**Hero:**
- eyebrow: `Mobile Advertising · Alpine & Highland, Utah`
- H1: `Put Your Brand in Front of Alpine & Highland Every Day`
- Subhead: `Your ad moves through Alpine and Highland's established residential neighborhoods and the Alpine Highway corridor — reaching Utah County's highest-income households repeatedly.`

**Why section cards:**
- Card 1 — `Highest-Income Corridor in the Market`: "22,000 residents with $120K+ median household income — the highest-earning demographic in the Drivertise coverage area. Clients spend more per service engagement and stay loyal longer."
- Card 2 — `Low Advertising Noise`: "Major outdoor advertisers don't prioritize Alpine and Highland's smaller market. Your brand stands out in a quieter environment with stronger per-impression recall than busier corridors."
- Card 3 — `Community Word-of-Mouth Network`: "Tight-knit neighborhoods where service recommendations travel fast. One impressed client generates 2–3 referrals. The word-of-mouth multiplier is measurably higher than in more transient communities."

**Impression stat:** `15,000+` / `Estimated monthly impressions in Alpine, Highland, and surrounding corridor`

**CTA headline:** `Ready to put your brand in front of Alpine & Highland residents?`

- [ ] **Step 3: Commit**

```bash
git add cities/american-fork.html cities/alpine-highland.html
git commit -m "seo: add city landing pages for American Fork and Alpine & Highland"
```

---

### Task 8: City Landing Pages — Sandy & Draper + Bluffdale & Riverton

**Files:**
- Create: `cities/sandy-draper.html`
- Create: `cities/bluffdale-riverton.html`

- [ ] **Step 1: Create `cities/sandy-draper.html`**

Use `cities/lehi.html` as template. Update:

**Head:**
- description: `Mobile advertising for Sandy and Draper, Utah businesses. Your brand moves through Bangerter Highway, 123rd South, and South Towne Mall — reaching 135,000+ residents. From $199/month.`
- title: `Mobile Advertising in Sandy & Draper, Utah — Drivertise USA`
- og:title: `Mobile Advertising in Sandy & Draper, Utah — Drivertise USA`
- og:description: `Mobile advertising reaching Sandy and Draper's 135,000+ residents via Bangerter Hwy, 123rd S, and the South Towne corridor. From $199/month.`
- og:url: `https://drivertiseusa.com/cities/sandy-draper.html`
- canonical: `https://drivertiseusa.com/cities/sandy-draper.html`
- LocalBusiness areaServed: `[{"@type": "City", "name": "Sandy", "sameAs": "https://en.wikipedia.org/wiki/Sandy,_Utah"}, {"@type": "City", "name": "Draper", "sameAs": "https://en.wikipedia.org/wiki/Draper,_Utah"}]`

**Hero:**
- eyebrow: `Mobile Advertising · Sandy & Draper, Utah`
- H1: `Put Your Brand in Front of Sandy & Draper Every Day`
- Subhead: `Your ad moves through Salt Lake County's most affluent southern cities — Bangerter Highway, 123rd South, and Draper's tech corridor — reaching 135,000+ residents daily.`

**Why section cards:**
- Card 1 — `Largest Market in the Corridor`: "135,000+ residents across two of Salt Lake County's most established cities. The biggest addressable audience in the full Drivertise coverage area — and still reachable at the same founding rates."
- Card 2 — `Premium Retail Exposure`: "Costco Sandy (123rd S), South Towne Mall, and Draper's Lone Peak Pkwy retail corridor create consistent high-dwell exposure opportunities throughout the operating day."
- Card 3 — `Affluent, Professional Demographics`: "Sandy and Draper attract remote workers, tech employees, and young families with above-average household incomes. Strong spending on home services, dining, fitness, and professional services."

**Impression stat:** `35,000+` / `Estimated monthly impressions in Sandy, Draper, and surrounding corridor`

**CTA headline:** `Ready to put your brand in front of Sandy & Draper residents?`

- [ ] **Step 2: Create `cities/bluffdale-riverton.html`**

Use `cities/lehi.html` as template. Update:

**Head:**
- description: `Mobile advertising for Bluffdale and Riverton, Utah businesses. Your brand reaches 55,000+ residents along Bangerter Highway and the Jordan Landing corridor — from $199/month.`
- title: `Mobile Advertising in Bluffdale & Riverton, Utah — Drivertise USA`
- og:title: `Mobile Advertising in Bluffdale & Riverton, Utah — Drivertise USA`
- og:description: `Mobile advertising for Bluffdale and Riverton businesses. 55,000+ residents, Jordan Landing corridor, Bangerter Highway coverage. From $199/month.`
- og:url: `https://drivertiseusa.com/cities/bluffdale-riverton.html`
- canonical: `https://drivertiseusa.com/cities/bluffdale-riverton.html`
- LocalBusiness areaServed: `[{"@type": "City", "name": "Bluffdale"}, {"@type": "City", "name": "Riverton"}]`

**Hero:**
- eyebrow: `Mobile Advertising · Bluffdale & Riverton, Utah`
- H1: `Put Your Brand in Front of Bluffdale & Riverton Every Day`
- Subhead: `Your ad moves through the Bangerter Highway corridor, Jordan Landing retail zone, and Bluffdale & Riverton's growing residential neighborhoods — reaching 55,000+ residents.`

**Why section cards:**
- Card 1 — `Fast-Growing Residential Market`: "55,000+ residents across two of southern Salt Lake County's fastest-growing cities. Newer residential developments mean brand loyalties are still forming — first-mover positioning is available in most service categories."
- Card 2 — `Jordan Landing Retail Exposure`: "The Jordan Landing retail corridor is one of the highest-traffic commercial zones in southern Salt Lake County — consistent exposure during shopping, dining, and weekend activity."
- Card 3 — `Mountain View Corridor Coverage`: "Bangerter Highway and the Mountain View Corridor connect Bluffdale and Riverton to the rest of the valley — and provide consistent commuter exposure during peak driving hours."

**Impression stat:** `25,000+` / `Estimated monthly impressions in Bluffdale, Riverton, and surrounding corridor`

**CTA headline:** `Ready to put your brand in front of Bluffdale & Riverton residents?`

- [ ] **Step 3: Commit**

```bash
git add cities/sandy-draper.html cities/bluffdale-riverton.html
git commit -m "seo: add city landing pages for Sandy & Draper and Bluffdale & Riverton"
```

---

### Task 9: Verification

No code changes — verify everything works correctly before calling the plan complete.

- [ ] **Step 1: Validate structured data on index.html**

Open: `https://search.google.com/test/rich-results`

Paste the URL `https://drivertiseusa.com/` (after deploy) or use the "URL" tab. Expected result: LocalBusiness entity detected, all fields populated, no errors.

For `faq.html`: FAQPage entity should also appear alongside LocalBusiness.

- [ ] **Step 2: Verify OG tags on any page**

Go to `https://www.opengraph.xyz/`

Enter any page URL. Expected: title, description, and image URL all appear. Image preview requires `assets/og-default.jpg` to exist (Danyon's manual task).

- [ ] **Step 3: Verify sitemap loads**

Open browser to `https://drivertiseusa.com/sitemap.xml`. Expected: valid XML, all 27 URLs listed without errors.

- [ ] **Step 4: Verify robots.txt**

Open browser to `https://drivertiseusa.com/robots.txt`. Expected:
```
User-agent: *
Allow: /

Sitemap: https://drivertiseusa.com/sitemap.xml
```

- [ ] **Step 5: Click-test every city page link**

From any root page, scroll to footer and click each city link in the serving strip. Each should open its `cities/*.html` page. H1 should show the correct city name. Nav should work (all links use `../` paths).

- [ ] **Step 6: Verify Insights nav link**

On every public page, click "Insights" in the nav. Should route to `insights/index.html`. If the Content Machine plan hasn't been executed yet, the link will 404 until that plan runs — this is expected.

- [ ] **Step 7: Final commit if any fixes needed**

```bash
git add -A
git commit -m "seo: verification fixes"
```
