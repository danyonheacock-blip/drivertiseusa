# Content Machine (Insights) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Insights section — stylesheet, hub page, and all 12 blog posts — as a fully static HTML section that deploys June 3 with all content live from day one.

**Architecture:** Static HTML files in an `insights/` directory. One shared stylesheet (`insights/insights.css`). Hub page (`insights/index.html`) lists all 12 posts in a card grid. Each post is a self-contained HTML file with SEO head, nav (copied from root with `../` paths), article body, CTA section, and footer. All post content is fully written in the spec — this plan wraps it in HTML and saves files.

**Tech Stack:** Static HTML, CSS (existing base.css + components.css + new insights.css), Google Fonts (Syne + DM Sans — already loaded via existing pages)

---

## File Map

| File | Action |
|---|---|
| `insights/insights.css` | Create — shared stylesheet for all insight pages + hub |
| `insights/index.html` | Create — hub page with 12 post cards |
| `insights/mobile-advertising-utah-county.html` | Create — Post 1 |
| `insights/vehicle-wrap-advertising-vs-facebook-ads.html` | Create — Post 2 |
| `insights/local-impressions-without-big-ad-budget.html` | Create — Post 3 |
| `insights/mobile-billboard-advertising-lehi-utah.html` | Create — Post 4 |
| `insights/cost-of-advertising-utah-county.html` | Create — Post 5 |
| `insights/neighborhood-deal-passport-direct-mail.html` | Create — Post 6 |
| `insights/advertising-mistakes-utah-small-business.html` | Create — Post 7 |
| `insights/advertising-saratoga-springs-eagle-mountain.html` | Create — Post 8 |
| `insights/brand-awareness-vs-lead-generation.html` | Create — Post 9 |
| `insights/electric-billboard-advertising-utah-county.html` | Create — Post 10 |
| `insights/advertising-highland-alpine-utah.html` | Create — Post 11 |
| `insights/baader-meinhof-effect-advertising.html` | Create — Post 12 |

---

### Task 1: Create `insights/` directory and `insights/insights.css`

**Files:**
- Create: `insights/insights.css`

- [ ] **Step 1: Create the `insights/` directory**

```bash
mkdir "D:\Projects\Drivertiseusa\insights"
```

- [ ] **Step 2: Create `insights/insights.css`**

```css
/* ═══════════════════════════════════════════
   INSIGHTS — Shared stylesheet
   Used by: insights/index.html + all 12 posts
   Depends on: ../css/base.css, ../css/components.css
═══════════════════════════════════════════ */

/* ── ARTICLE HERO ── */
.article-hero {
  background: var(--bg2);
  border-bottom: 1px solid var(--border);
  padding: 80px 0 60px;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.back-link {
  color: var(--gold);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: opacity 0.2s;
}
.back-link:hover { opacity: 0.75; }

.article-date {
  font-size: 0.8rem;
  color: var(--w50);
  font-family: 'DM Sans', sans-serif;
}

.article-title {
  font-family: 'Syne', sans-serif;
  font-size: clamp(1.8rem, 4vw, 2.75rem);
  font-weight: 900;
  color: var(--cream);
  line-height: 1.15;
  max-width: 760px;
  margin-bottom: 20px;
}

.article-deck {
  font-size: 1.1rem;
  color: var(--w70);
  max-width: 640px;
  line-height: 1.65;
  margin: 0;
}

/* ── ARTICLE BODY ── */
.article-body {
  max-width: 720px;
  padding-top: 56px;
  padding-bottom: 80px;
}

.article-body h2 {
  font-family: 'Syne', sans-serif;
  font-size: 1.45rem;
  font-weight: 700;
  color: var(--cream);
  margin-top: 48px;
  margin-bottom: 16px;
  line-height: 1.3;
}

.article-body h3 {
  font-family: 'Syne', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--gold);
  margin-top: 32px;
  margin-bottom: 10px;
}

.article-body p {
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  color: var(--w80);
  line-height: 1.85;
  margin-bottom: 20px;
}

.article-body ul,
.article-body ol {
  font-family: 'DM Sans', sans-serif;
  color: var(--w80);
  line-height: 1.8;
  padding-left: 24px;
  margin-bottom: 20px;
}

.article-body li { margin-bottom: 8px; }

.article-body strong { color: var(--cream); font-weight: 600; }
.article-body em { font-style: italic; }

.article-body blockquote {
  border-left: 3px solid var(--gold);
  margin: 32px 0;
  padding: 16px 24px;
  background: var(--bg3);
  border-radius: 0 8px 8px 0;
}

.article-body blockquote p {
  font-style: italic;
  color: var(--w70);
  margin: 0;
}

.article-body .callout {
  background: rgba(200,151,58,0.07);
  border: 1px solid rgba(200,151,58,0.20);
  border-radius: 12px;
  padding: 20px 24px;
  margin: 32px 0;
}

.article-body .callout p { margin: 0; }
.article-body .callout strong { color: var(--gold); }

/* ── ARTICLE CTA ── */
.article-cta {
  border-top: 1px solid var(--border);
  background: var(--bg2);
  padding: 64px 0;
}

.article-cta .cta-card {
  max-width: 580px;
  margin: 0 auto;
  text-align: center;
}

.article-cta h2 {
  font-family: 'Syne', sans-serif;
  font-size: 1.7rem;
  font-weight: 900;
  color: var(--cream);
  margin-bottom: 16px;
  line-height: 1.2;
}

.article-cta p {
  font-family: 'DM Sans', sans-serif;
  color: var(--w70);
  margin-bottom: 28px;
  line-height: 1.7;
  font-size: 1rem;
}

/* ── HUB HEADER ── */
.insights-hub-header {
  padding: 80px 0 48px;
  border-bottom: 1px solid var(--border);
  background: var(--bg2);
}

.insights-hub-header h1 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  color: var(--cream);
  margin-bottom: 12px;
}

.insights-hub-header p {
  font-size: 1.05rem;
  color: var(--w60);
  max-width: 480px;
  margin: 0;
}

/* ── POST GRID (hub page) ── */
.insights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  padding: 56px 0 80px;
}

.insight-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--bg3);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 28px 24px 24px;
  text-decoration: none;
  transition: border-color 0.2s, transform 0.2s;
}

.insight-card:hover {
  border-color: rgba(200,151,58,0.35);
  transform: translateY(-4px);
}

.insight-card-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gold);
}

.insight-card h2 {
  font-family: 'Syne', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--cream);
  line-height: 1.3;
  margin: 0;
}

.insight-card p {
  font-size: 0.9rem;
  color: var(--w60);
  line-height: 1.6;
  margin: 0;
  flex: 1;
}

.insight-read-more {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--gold);
  margin-top: 8px;
}

/* ── RESPONSIVE ── */
@media (max-width: 640px) {
  .article-hero { padding: 56px 0 44px; }
  .article-body { padding-top: 40px; padding-bottom: 56px; }
  .article-cta { padding: 48px 0; }
  .insights-hub-header { padding: 56px 0 36px; }
  .insights-grid { padding: 40px 0 56px; gap: 16px; }
}
```

- [ ] **Step 3: Commit**

```bash
git add insights/insights.css
git commit -m "feat(insights): add insights.css shared stylesheet"
```

---

### Task 2: Create `insights/index.html` Hub Page

**Files:**
- Create: `insights/index.html`

The hub lists all 12 posts as cards. Post links use relative paths (same directory). Nav uses `../` paths to root pages.

- [ ] **Step 1: Create `insights/index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Advertising strategy, local business marketing tips, and Utah County market insight from Drivertise. Free resources for Utah County small business owners.">
  <title>Insights — Advertising Strategy for Utah County Businesses | Drivertise</title>
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Drivertise USA">
  <meta property="og:title" content="Insights — Advertising Strategy for Utah County Businesses | Drivertise">
  <meta property="og:description" content="Advertising strategy, local business marketing tips, and Utah County market insight from Drivertise.">
  <meta property="og:url" content="https://drivertiseusa.com/insights/index.html">
  <meta property="og:image" content="https://drivertiseusa.com/assets/og-default.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="canonical" href="https://drivertiseusa.com/insights/index.html">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/base.css">
  <link rel="stylesheet" href="../css/components.css">
  <link rel="stylesheet" href="insights.css">
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
      <a href="index.html" aria-current="page">Insights</a>
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
  <a href="index.html">Insights</a>
  <a href="../about.html">About</a>
  <a href="../contact.html" class="btn btn-primary btn-lg">Book a 15-Min Call</a>
</nav>

<div style="margin-top: var(--nav-h);">

  <div class="insights-hub-header">
    <div class="container">
      <span class="eyebrow">Drivertise</span>
      <h1>Insights</h1>
      <p>Advertising strategy and local marketing guidance for Utah County business owners. Free resources, no opt-in required.</p>
    </div>
  </div>

  <div class="container">
    <div class="insights-grid">

      <a href="mobile-advertising-utah-county.html" class="insight-card">
        <div class="insight-card-label">Mobile Advertising</div>
        <h2>Mobile Advertising in Utah County: What Local Business Owners Actually Need to Know</h2>
        <p>Before you book a billboard or pour money into Google Ads, here's an honest look at what mobile advertising is, how it performs in this market, and whether it makes sense for your business.</p>
        <span class="insight-read-more">Read →</span>
      </a>

      <a href="vehicle-wrap-advertising-vs-facebook-ads.html" class="insight-card">
        <div class="insight-card-label">Strategy</div>
        <h2>Vehicle Wrap Advertising vs. Facebook Ads: An Honest Comparison for Utah Small Businesses</h2>
        <p>This isn't a "Facebook Ads are dead" take. It's a real comparison of two formats that do completely different jobs — and why smart local businesses use both.</p>
        <span class="insight-read-more">Read →</span>
      </a>

      <a href="local-impressions-without-big-ad-budget.html" class="insight-card">
        <div class="insight-card-label">Brand Awareness</div>
        <h2>How to Get 50,000+ Local Impressions Per Month Without a Massive Ad Budget</h2>
        <p>Impressions don't require massive ad spend. They require being in the right place, consistently, in front of the right people. Here's how small local businesses can do exactly that.</p>
        <span class="insight-read-more">Read →</span>
      </a>

      <a href="mobile-billboard-advertising-lehi-utah.html" class="insight-card">
        <div class="insight-card-label">Local Markets</div>
        <h2>Mobile Billboard Advertising in Lehi, Utah: Everything Local Businesses Need to Know</h2>
        <p>Lehi is one of the fastest-growing cities in America. Here's how mobile advertising works in this specific market and why the timing matters for local businesses right now.</p>
        <span class="insight-read-more">Read →</span>
      </a>

      <a href="cost-of-advertising-utah-county.html" class="insight-card">
        <div class="insight-card-label">Pricing</div>
        <h2>The Real Cost of Advertising in Utah County (And What Actually Works)</h2>
        <p>Most advertising comparisons are written by people trying to sell you something. This one breaks down the real numbers across every major format available to Utah County businesses.</p>
        <span class="insight-read-more">Read →</span>
      </a>

      <a href="neighborhood-deal-passport-direct-mail.html" class="insight-card">
        <div class="insight-card-label">Direct Mail</div>
        <h2>Why the Neighborhood Deal Passport Gets Opened (And What That Means for Your Business)</h2>
        <p>Most direct mail gets recycled in thirty seconds. The Neighborhood Deal Passport is designed around the specific behaviors of Utah County families — here's why the format works.</p>
        <span class="insight-read-more">Read →</span>
      </a>

      <a href="advertising-mistakes-utah-small-business.html" class="insight-card">
        <div class="insight-card-label">Strategy</div>
        <h2>5 Advertising Mistakes Utah County Small Businesses Keep Making</h2>
        <p>After talking to dozens of Utah County business owners, the same five mistakes keep showing up. They're fixable — but only if you can see them clearly.</p>
        <span class="insight-read-more">Read →</span>
      </a>

      <a href="advertising-saratoga-springs-eagle-mountain.html" class="insight-card">
        <div class="insight-card-label">Local Markets</div>
        <h2>Advertising in Saratoga Springs and Eagle Mountain: What Business Owners Need to Know</h2>
        <p>Two of Utah's fastest-growing cities. A demographic that's still forming brand loyalties. Here's why this market is one of the best local advertising opportunities in the state.</p>
        <span class="insight-read-more">Read →</span>
      </a>

      <a href="brand-awareness-vs-lead-generation.html" class="insight-card">
        <div class="insight-card-label">Strategy</div>
        <h2>Brand Awareness vs. Lead Generation: Which Should Your Utah Business Focus On First?</h2>
        <p>These are two different jobs that require different tools and different timelines. Confusing them is the single most common reason local advertising budgets produce disappointing results.</p>
        <span class="insight-read-more">Read →</span>
      </a>

      <a href="electric-billboard-advertising-utah-county.html" class="insight-card">
        <div class="insight-card-label">Billboard</div>
        <h2>Electric Billboard Advertising in Utah County: How It Works and Who It's For</h2>
        <p>A roof-mounted LED billboard that drives through your market every day. Here's the honest breakdown of what electric billboard advertising does, what it costs, and which businesses should use it.</p>
        <span class="insight-read-more">Read →</span>
      </a>

      <a href="advertising-highland-alpine-utah.html" class="insight-card">
        <div class="insight-card-label">Local Markets</div>
        <h2>Advertising in Highland and Alpine, Utah: Why These Neighborhoods Are a Hidden Gem</h2>
        <p>Small population, high incomes, strong community ties, and less advertising clutter than Lehi or Saratoga Springs. The most underrated advertising market in Utah County.</p>
        <span class="insight-read-more">Read →</span>
      </a>

      <a href="baader-meinhof-effect-advertising.html" class="insight-card">
        <div class="insight-card-label">Brand Science</div>
        <h2>The Baader-Meinhof Effect: Why Your Ad Works Even When Nobody Clicks It</h2>
        <p>You've experienced this: you learn a new word and suddenly hear it everywhere. That's the Baader-Meinhof effect — and it's the mechanism that makes brand awareness advertising work.</p>
        <span class="insight-read-more">Read →</span>
      </a>

    </div>
  </div>

</div>

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
      <a href="index.html">Insights</a>
      <a href="../faq.html">FAQ</a>
      <a href="../contact.html">Contact / Demo</a>
    </div>
  </div>
  <div class="footer-serving">
    <div class="container">
      <span class="footer-serving-label">Serving:</span>
      <a href="../cities/lehi.html">Lehi</a>
      <span class="footer-serving-sep">·</span>
      <a href="../cities/saratoga-springs.html">Saratoga Springs</a>
      <span class="footer-serving-sep">·</span>
      <a href="../cities/american-fork.html">American Fork</a>
      <span class="footer-serving-sep">·</span>
      <a href="../cities/alpine-highland.html">Alpine &amp; Highland</a>
      <span class="footer-serving-sep">·</span>
      <a href="../cities/sandy-draper.html">Sandy &amp; Draper</a>
      <span class="footer-serving-sep">·</span>
      <a href="../cities/bluffdale-riverton.html">Bluffdale &amp; Riverton</a>
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

- [ ] **Step 2: Commit**

```bash
git add insights/index.html
git commit -m "feat(insights): add hub page with 12 post cards"
```

---

### Task 3: Blog Posts 1–4

**Files:**
- Create: `insights/mobile-advertising-utah-county.html`
- Create: `insights/vehicle-wrap-advertising-vs-facebook-ads.html`
- Create: `insights/local-impressions-without-big-ad-budget.html`
- Create: `insights/mobile-billboard-advertising-lehi-utah.html`

Each post uses the same HTML shell. The nav and footer are identical across all posts — copy them from the hub page (`insights/index.html`). The head, article-hero, and article-body differ per post.

**Shared post shell (apply to all 4 posts — substitute `{VALUES}` per post):**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{META_DESCRIPTION}">
  <title>{POST_TITLE} | Drivertise Insights</title>
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Drivertise">
  <meta property="og:title" content="{POST_TITLE}">
  <meta property="og:description" content="{META_DESCRIPTION}">
  <meta property="og:url" content="https://drivertiseusa.com/insights/{SLUG}.html">
  <meta property="og:image" content="https://drivertiseusa.com/assets/og-default.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="canonical" href="https://drivertiseusa.com/insights/{SLUG}.html">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "{POST_TITLE}",
    "description": "{META_DESCRIPTION}",
    "author": {"@type": "Person", "name": "Danyon", "url": "https://drivertiseusa.com/about.html"},
    "publisher": {"@type": "Organization", "name": "Drivertise", "url": "https://drivertiseusa.com"},
    "datePublished": "2026-06-03",
    "url": "https://drivertiseusa.com/insights/{SLUG}.html",
    "mainEntityOfPage": "https://drivertiseusa.com/insights/{SLUG}.html"
  }
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;900&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/base.css">
  <link rel="stylesheet" href="../css/components.css">
  <link rel="stylesheet" href="insights.css">
</head>
<body>

<!-- NAV: copy verbatim from insights/index.html — all hrefs use ../ prefix -->

<div style="margin-top: var(--nav-h);">
  <article class="insights-article">
    <header class="article-hero">
      <div class="container">
        <div class="article-meta">
          <a href="index.html" class="back-link">← Insights</a>
          <span class="article-date">June 3, 2026</span>
        </div>
        <h1 class="article-title">{POST_TITLE}</h1>
        <p class="article-deck">{POST_DECK}</p>
      </div>
    </header>

    <div class="article-body container">
      {ARTICLE_BODY_HTML}
    </div>

    <aside class="article-cta">
      <div class="container">
        <div class="cta-card">
          <h2>Ready to put your brand in front of Utah County?</h2>
          <p>Founding rates are still available. Book a 15-minute call — no pressure, just a real conversation about your business and whether this is a fit.</p>
          <a href="../contact.html" class="btn btn-primary">Book a 15-Min Call →</a>
        </div>
      </div>
    </aside>
  </article>
</div>

<!-- FOOTER: copy verbatim from insights/index.html -->

<script src="../js/main.js"></script>
</body>
</html>
```

- [ ] **Step 1: Create `insights/mobile-advertising-utah-county.html`**

Use the shared post shell above. Values:
- `{SLUG}`: `mobile-advertising-utah-county`
- `{POST_TITLE}`: `Mobile Advertising in Utah County: What Local Business Owners Actually Need to Know`
- `{META_DESCRIPTION}`: `Mobile advertising in Utah County puts your brand in front of 50,000+ local residents per month. Here's how the model works, what it costs, and who it's right for.`
- `{POST_DECK}`: `Before you book a billboard or pour money into Google Ads, here's an honest look at what mobile advertising is, how it performs in this market, and whether it makes sense for your business.`

`{ARTICLE_BODY_HTML}` — paste verbatim from the spec file `docs/superpowers/specs/2026-05-28-content-machine-playbook.md`, Section 2, Post 1 body content. The body begins with `<p>If you've been in business in Utah County...` and ends with `...just a direct conversation.</p>`.

- [ ] **Step 2: Create `insights/vehicle-wrap-advertising-vs-facebook-ads.html`**

Use the shared post shell. Values:
- `{SLUG}`: `vehicle-wrap-advertising-vs-facebook-ads`
- `{POST_TITLE}`: `Vehicle Wrap Advertising vs. Facebook Ads: An Honest Comparison for Utah Small Businesses`
- `{META_DESCRIPTION}`: `Vehicle wrap advertising and Facebook Ads serve different purposes. Here's an honest breakdown of what each does well for Utah County small businesses — and how to use both.`
- `{POST_DECK}`: `This isn't a "Facebook Ads are dead" take. It's a real comparison of two formats that do completely different jobs — and why smart local businesses use both.`

`{ARTICLE_BODY_HTML}` — paste verbatim from spec Post 2 body. Begins with `<p>Every few months a new piece of content goes around...` and ends with `...sequenced correctly, is what actually scales a local brand.</p>`.

- [ ] **Step 3: Create `insights/local-impressions-without-big-ad-budget.html`**

Use the shared post shell. Values:
- `{SLUG}`: `local-impressions-without-big-ad-budget`
- `{POST_TITLE}`: `How to Get 50,000+ Local Impressions Per Month Without a Massive Ad Budget`
- `{META_DESCRIPTION}`: `Most Utah County small businesses can't afford to compete with large advertisers on digital platforms. Here's how to build local brand awareness on a realistic budget.`
- `{POST_DECK}`: `Impressions don't require a massive ad spend. They require being in the right place, consistently, in front of the right people. Here's how small local businesses can do exactly that.`

`{ARTICLE_BODY_HTML}` — paste verbatim from spec Post 3 body. Begins with `<p>Here's the uncomfortable truth about digital advertising...` and ends with `...where local businesses have always won. Mobile advertising just makes you impossible to scroll past.</p>` (inside the callout div).

- [ ] **Step 4: Create `insights/mobile-billboard-advertising-lehi-utah.html`**

Use the shared post shell. Values:
- `{SLUG}`: `mobile-billboard-advertising-lehi-utah`
- `{POST_TITLE}`: `Mobile Billboard Advertising in Lehi, Utah: Everything Local Businesses Need to Know`
- `{META_DESCRIPTION}`: `Mobile billboard advertising in Lehi, Utah gives local businesses daily exposure across Silicon Slopes, Traverse Mountain, and Lehi's fastest-growing residential corridors.`
- `{POST_DECK}`: `Lehi is one of the fastest-growing cities in America. Here's how mobile advertising works in this specific market and why the timing matters for local businesses right now.`

`{ARTICLE_BODY_HTML}` — paste verbatim from spec Post 4 body. Begins with `<p>Lehi, Utah isn't what it was five years ago...` and ends with `...For a growth market, locking in low rates while the opportunity is early is straightforward math.</p>` (inside the callout div).

- [ ] **Step 5: Commit**

```bash
git add insights/mobile-advertising-utah-county.html insights/vehicle-wrap-advertising-vs-facebook-ads.html insights/local-impressions-without-big-ad-budget.html insights/mobile-billboard-advertising-lehi-utah.html
git commit -m "feat(insights): add blog posts 1-4"
```

---

### Task 4: Blog Posts 5–8

**Files:**
- Create: `insights/cost-of-advertising-utah-county.html`
- Create: `insights/neighborhood-deal-passport-direct-mail.html`
- Create: `insights/advertising-mistakes-utah-small-business.html`
- Create: `insights/advertising-saratoga-springs-eagle-mountain.html`

Use the shared post shell from Task 3 for each. Nav and footer are identical to the hub page — copy verbatim.

- [ ] **Step 1: Create `insights/cost-of-advertising-utah-county.html`**

Values:
- `{SLUG}`: `cost-of-advertising-utah-county`
- `{POST_TITLE}`: `The Real Cost of Advertising in Utah County (And What Actually Works)`
- `{META_DESCRIPTION}`: `What does advertising actually cost in Utah County? A transparent breakdown of digital, print, outdoor, and mobile options — with honest assessments of what each delivers.`
- `{POST_DECK}`: `Most advertising comparisons are written by people trying to sell you something. This one breaks down the real numbers across every major format available to Utah County businesses.`

`{ARTICLE_BODY_HTML}` — paste verbatim from spec Post 5 body. Begins with `<p>If you ask an advertising salesperson...` and ends with `...Brand awareness multiplies the return on every other format you run. Start there.</p>` (inside the callout div).

- [ ] **Step 2: Create `insights/neighborhood-deal-passport-direct-mail.html`**

Values:
- `{SLUG}`: `neighborhood-deal-passport-direct-mail`
- `{POST_TITLE}`: `Why the Neighborhood Deal Passport Gets Opened (And What That Means for Your Business)`
- `{META_DESCRIPTION}`: `The Drivertise Neighborhood Deal Passport is a co-op direct mail format built for Utah County families. Here's the design philosophy and why it outperforms standard mailers.`
- `{POST_DECK}`: `Most direct mail gets recycled in thirty seconds. The Neighborhood Deal Passport is designed around the specific behaviors of Utah County families — here's why the format works.`

`{ARTICLE_BODY_HTML}` — paste verbatim from spec Post 6 body. Begins with `<p>Anyone who's worked in direct mail knows the rule...` and ends with `...when Utah County families are actively thinking about these services.</p>` (inside the callout div).

- [ ] **Step 3: Create `insights/advertising-mistakes-utah-small-business.html`**

Values:
- `{SLUG}`: `advertising-mistakes-utah-small-business`
- `{POST_TITLE}`: `5 Advertising Mistakes Utah County Small Businesses Keep Making`
- `{META_DESCRIPTION}`: `The same advertising mistakes show up repeatedly in Utah County small businesses. Here's what they are, why they happen, and what to do instead.`
- `{POST_DECK}`: `After talking to dozens of Utah County business owners, the same five mistakes keep showing up. They're fixable — but only if you can see them clearly.`

`{ARTICLE_BODY_HTML}` — paste verbatim from spec Post 7 body. Begins with `<p>Local business owners in Utah County are not unsophisticated...` and ends with the closing `</blockquote>` and callout div ending with `...The tactics matter less than the consistency.</p>`.

- [ ] **Step 4: Create `insights/advertising-saratoga-springs-eagle-mountain.html`**

Values:
- `{SLUG}`: `advertising-saratoga-springs-eagle-mountain`
- `{POST_TITLE}`: `Advertising in Saratoga Springs and Eagle Mountain: What Business Owners Need to Know`
- `{META_DESCRIPTION}`: `Saratoga Springs and Eagle Mountain are among Utah's fastest-growing cities. Here's what makes advertising in this specific market different — and how to capture it.`
- `{POST_DECK}`: `Two of Utah's fastest-growing cities. A demographic that's still forming brand loyalties. Here's why Saratoga Springs and Eagle Mountain are one of the best local advertising opportunities in the state.`

`{ARTICLE_BODY_HTML}` — paste verbatim from spec Post 8 body. Begins with `<p>Saratoga Springs and Eagle Mountain sit at the western edge...` and ends with `...the first HVAC company reserves it.</p>` (inside the callout div).

- [ ] **Step 5: Commit**

```bash
git add insights/cost-of-advertising-utah-county.html insights/neighborhood-deal-passport-direct-mail.html insights/advertising-mistakes-utah-small-business.html insights/advertising-saratoga-springs-eagle-mountain.html
git commit -m "feat(insights): add blog posts 5-8"
```

---

### Task 5: Blog Posts 9–12

**Files:**
- Create: `insights/brand-awareness-vs-lead-generation.html`
- Create: `insights/electric-billboard-advertising-utah-county.html`
- Create: `insights/advertising-highland-alpine-utah.html`
- Create: `insights/baader-meinhof-effect-advertising.html`

Use the shared post shell from Task 3. Nav and footer identical to hub page — copy verbatim.

- [ ] **Step 1: Create `insights/brand-awareness-vs-lead-generation.html`**

Values:
- `{SLUG}`: `brand-awareness-vs-lead-generation`
- `{POST_TITLE}`: `Brand Awareness vs. Lead Generation: Which Should Your Utah Business Focus On First?`
- `{META_DESCRIPTION}`: `Utah County small businesses often confuse brand awareness with lead generation. Here's how to know which one you actually need right now — and how to sequence them correctly.`
- `{POST_DECK}`: `These are two different jobs that require different tools and different timelines. Confusing them is the single most common reason local advertising budgets produce disappointing results.`

`{ARTICLE_BODY_HTML}` — paste verbatim from spec Post 9 body. Begins with `<p>If you've ever tried to figure out which type of advertising to run...` and ends with `...Brand awareness multiplies the return on every other format you run. Invest there first, then layer the lead generation tools on top.</p>` (inside the callout div).

- [ ] **Step 2: Create `insights/electric-billboard-advertising-utah-county.html`**

Values:
- `{SLUG}`: `electric-billboard-advertising-utah-county`
- `{POST_TITLE}`: `Electric Billboard Advertising in Utah County: How It Works and Who It's For`
- `{META_DESCRIPTION}`: `Electric billboard advertising in Utah County gives businesses dynamic, rotating ad space on a moving vehicle. Here's how the format works and what it delivers.`
- `{POST_DECK}`: `A roof-mounted LED billboard that drives through your market every day. Here's the honest breakdown of what electric billboard advertising does, what it costs, and which businesses should use it.`

`{ARTICLE_BODY_HTML}` — paste verbatim from spec Post 10 body. Begins with `<p>When most people hear "billboard advertising"...` and ends with `...You're not taking a risk by joining early.</p>` (inside the callout div).

- [ ] **Step 3: Create `insights/advertising-highland-alpine-utah.html`**

Values:
- `{SLUG}`: `advertising-highland-alpine-utah`
- `{POST_TITLE}`: `Advertising in Highland and Alpine, Utah: Why These Neighborhoods Are a Hidden Gem`
- `{META_DESCRIPTION}`: `Highland and Alpine, Utah have some of the highest household incomes in the state. Here's why these communities are an underrated advertising opportunity for the right local businesses.`
- `{POST_DECK}`: `Small population, high incomes, strong community ties, and less advertising clutter than Lehi or Saratoga Springs. Highland and Alpine are the most underrated advertising market in Utah County.`

`{ARTICLE_BODY_HTML}` — paste verbatim from spec Post 11 body. Begins with `<p>When local businesses think about advertising in Utah County...` and ends with `...That's a position worth securing early.</p>` (inside the callout div).

- [ ] **Step 4: Create `insights/baader-meinhof-effect-advertising.html`**

Values:
- `{SLUG}`: `baader-meinhof-effect-advertising`
- `{POST_TITLE}`: `The Baader-Meinhof Effect: Why Your Ad Works Even When Nobody Clicks It`
- `{META_DESCRIPTION}`: `The Baader-Meinhof effect explains why brand awareness advertising works even without clicks, conversions, or trackable results. Here's what it means for your local business.`
- `{POST_DECK}`: `You've experienced this: you learn a new word and suddenly hear it everywhere. That's the Baader-Meinhof effect — and it's the mechanism that makes brand awareness advertising work for local businesses.`

`{ARTICLE_BODY_HTML}` — paste verbatim from spec Post 12 body. Begins with `<p>In 1994, a man named Terry Mullen wrote a letter...` and ends with `...Give it the time it needs to get there.</p>` (inside the callout div).

- [ ] **Step 5: Commit**

```bash
git add insights/brand-awareness-vs-lead-generation.html insights/electric-billboard-advertising-utah-county.html insights/advertising-highland-alpine-utah.html insights/baader-meinhof-effect-advertising.html
git commit -m "feat(insights): add blog posts 9-12"
```

---

### Task 6: Verification

No code changes — open each file and confirm everything renders correctly.

- [ ] **Step 1: Open `insights/index.html` in browser**

All 12 cards should render. Each card has: category label (gold, small caps), post title, deck text, "Read →" link. Cards hover to gold border and lift. No broken images or missing CSS.

- [ ] **Step 2: Click each card and verify the post loads**

Each post should show: `← Insights` back link in the header, correct title and deck, article body with correct formatting (h2 headings in cream, h3 in gold, blockquotes with gold left border, callout boxes with gold tint), and the CTA section at the bottom.

- [ ] **Step 3: Verify "Book a 15-Min Call →" in CTA links to `../contact.html`**

Click the CTA on any post. Should navigate to the contact page. Verify the `../contact.html` relative path resolves correctly from the `insights/` subdirectory.

- [ ] **Step 4: Verify nav works from inside Insights**

Click "Services," "Pricing," "FAQ" in the nav from a post page. All should resolve correctly via `../` paths. The "Insights" nav link should point to `index.html` (relative, same directory).

- [ ] **Step 5: Verify footer city links from Insights**

Footer serving strip should show all 6 cities. Each links to `../cities/*.html`. Click one — should route to the correct city page (requires Local SEO plan to have run first, or just verify the href values match the city page slugs).

- [ ] **Step 6: Verify all 12 posts appear in sitemap.xml**

Open `sitemap.xml` and confirm all 12 `insights/*.html` URLs are listed. The slugs in the sitemap must match the actual filenames exactly.

- [ ] **Step 7: Final commit if any fixes needed**

```bash
git add -A
git commit -m "feat(insights): verification fixes"
```
