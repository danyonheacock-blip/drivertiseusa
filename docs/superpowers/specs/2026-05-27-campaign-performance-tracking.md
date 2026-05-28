# Campaign Performance Tracking — Design Spec

**Date:** 2026-05-27
**Scope:** Brand awareness positioning across the website + campaign summary, trend chart, and tally sheet in the client portal

---

## Problem

The site currently makes tracking promises it can't keep ("we set up a unique trackable QR code. Every scan is logged.") and has no infrastructure to back them up. Meanwhile, the real objection clients will have isn't "show me a dashboard" — it's "I don't know if this is working, so I might cancel." The fix is honest positioning around brand awareness (what mobile advertising actually is) combined with proof of execution that clients can see every month.

---

## Decision

**No QR redirect tracking. No call tracking. No click dashboards.**

Mobile advertising is a brand awareness channel — the same model as billboards, transit ads, and fleet wraps. Fortune 500 companies buy these without measuring individual conversions. The retention problem is solved by:
1. Setting honest expectations upfront (website positioning)
2. Proving that Danyon shows up every month (campaign summary)
3. Giving clients a simple tool to track on their own end (tally sheet)

---

## Impression Estimate Formula

**Total miles driven × 400 = estimated impressions**

- Miles calculated via haversine formula from GPS coordinates already stored in `route_maps.route_coordinates`
- Rate of 400 per mile is conservative for Utah County mixed-route driving (arterial traffic averages 8,000–20,000 vehicles/day; residential 500–2,000/day; blended and discounted for direction/visibility)
- Always disclosed as an estimate: *"Est. impressions — based on route distance and local traffic averages"*
- Rate constant (`IMPRESSIONS_PER_MILE = 400`) isolated in one place in the JS so it can be adjusted without touching layout code

---

## Files Modified

| File | Change type |
|---|---|
| `faq.html` | Content — remove QR promise, rewrite Results & Tracking section |
| `pricing.html` | Content — add "What to Expect" timeline below magnetic pricing cards |
| `services.html` | Content — reframe magnetic ad description around brand awareness |
| `client-portal.html` | Feature — monthly summary card, trend chart, tally sheet |

**No new files. No new Supabase tables. No new CDN dependencies.**

---

## Section 1: Website Positioning Changes

### faq.html — Results & Tracking Section

**Remove entirely:**
- *"we set up a unique trackable QR code for your ad. Every scan is logged."*
- Any reference to QR code deactivation at cancellation
- *"setting up your QR/promo code tracking"* from the onboarding timeline answer

**Rewrite "How do I measure if my ad is working?":**

> Vehicle advertising is a brand awareness channel — the same category as billboards, transit ads, and fleet wraps. You're building recognition over time, not tracking clicks. The most reliable signal: ask every new customer "how'd you hear about us?" and keep a tally for 90 days. Clients who do this consistently are often surprised by how many people mention the car. We also provide a monthly campaign summary in your client portal showing routes driven, miles covered, and estimated impressions — so you always know what you're getting.

**Add new FAQ entry — "What should I realistically expect, and when?":**

> **Month 1:** Impressions accumulating, seeds being planted. Don't evaluate yet — brand awareness doesn't register in week one.
>
> **Months 2–3:** Familiarity building. People start recognizing your brand in the area. The Baader-Meinhof effect kicks in — once they've seen the car a few times, they start noticing it everywhere.
>
> **Month 3+:** This is where recall converts to action. Clients who've asked "how'd you hear about us?" start seeing the car mentioned regularly. This is also when month-over-month impression data in your portal starts telling a clear story.

**Update "What happens at cancellation?" answer:**
Remove reference to QR codes and tracking links being deactivated. Replace with: *"Your creative is removed from the vehicle and your zone category is released back to the available pool. Your client portal access remains active so you can reference your campaign history."*

---

### pricing.html — "What to Expect" Timeline

Add a timeline block **below the magnetic pricing cards**, above the payment note.

**Heading:** "What to Expect From Your Campaign"

**Three phases displayed as a horizontal timeline (desktop) / vertical stack (mobile):**

| Phase | Label | Copy |
|---|---|---|
| Weeks 1–4 | Planting Seeds | Impressions accumulating. Your brand is hitting the road. Don't evaluate yet — awareness doesn't register in week one. |
| Months 2–3 | Building Recognition | Familiarity kicks in. People who've seen the car begin to remember your brand. This is when "how'd you hear about us?" starts returning answers. |
| Month 3+ | Recall & Action | Repeated exposure converts to trust. Inquiries from people who "just knew" your brand. Your portal trend chart starts showing the compounding story. |

**Note below timeline:** *"This is the same model every recognizable local brand is built on. It requires patience — and it works."*

---

### services.html — Magnetic Ad Section

**Replace** any zone-tracking or measurement promise language in the magnetic/car wrap service description.

**Add to description:**
> "We operate daily through Saratoga Springs, Lehi, Alpine, and Highland from 6AM–9PM — your brand moves with us through Utah County's fastest-growing corridor. This is brand awareness advertising — the same model that built every recognizable local brand you can name. Your monthly campaign summary in the client portal shows exactly where we drove and how many impressions your brand earned."

**Remove** any reference to Drivertise managing QR codes or tracking links.

---

## Section 2: Monthly Campaign Summary (Client Portal)

### Placement
Full-width card below the existing hero stat grid. The existing hero grid is modified: **remove "Routes This Month"** (now redundant — it lives in the summary card). Keep **Campaign Status** (pulse dot, subscription active/paused/pending) and **Next Renewal** date. The summary card sits immediately below the 2-stat hero row as a full-width section.

### Data Source
All `route_maps` rows WHERE `client_id` = current client AND `route_date` is within the current calendar month.
All `card_drops` rows WHERE `client_id` = current client AND `drop_date` is within the current calendar month.

### Stats Displayed

| Stat | Calculation | Label shown to client |
|---|---|---|
| Routes This Month | COUNT of route_maps rows | Routes Driven |
| Miles Covered | Haversine sum of all GPS segments across all routes | Miles Covered |
| Estimated Impressions | Total miles × 400 | Est. Impressions † |
| Hours Out | SUM of hours_out | Hours on the Road |
| Neighborhoods | DISTINCT area_names joined with " · " | Areas Covered |
| Card Drops | COUNT of card_drops rows | Card Drops |

**† Footnote:** *"Estimated based on route distance and Utah County traffic averages. Not a measured count."*

### Layout
- Dark card (`--bg4` background), gold 3px top-accent line
- Stats in a 3×2 grid (desktop) / 2×3 (mobile)
- Neighborhoods displayed as a tag row below the grid
- Info icon (ⓘ) next to "Est. Impressions" — hover/tap shows tooltip with methodology explanation
- Month label in card header: "May 2026 Campaign Summary" (current month, auto-updated)

### Empty State
If no routes logged for current month:
> *"Campaign summary updates as routes are logged. Check back after your first week on the road."*

### Haversine Implementation

```javascript
const IMPRESSIONS_PER_MILE = 400;

function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 3958.8; // Earth radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function calcRouteMiles(coordinates) {
  // coordinates: [{lat, lng}, ...]
  let total = 0;
  for (let i = 1; i < coordinates.length; i++) {
    total += haversineDistance(
      coordinates[i-1].lat, coordinates[i-1].lng,
      coordinates[i].lat,   coordinates[i].lng
    );
  }
  return total;
}
```

---

## Section 3: Month-over-Month Trend Chart (Client Portal)

### Placement
Below the monthly summary card, above the route maps grid.

### Data Source
All `route_maps` rows for this client across all time, grouped by calendar month.

### What It Shows
One bar per month. Bar height = estimated impressions that month (miles × 400). X-axis: month abbreviations (May, Jun, Jul…). Y-axis: auto-scaled to max month value.

### Chart Implementation
Pure CSS bars — no additional library.

```
Each bar: <div class="trend-bar" style="height: [%]">
           <span class="trend-label">[month]</span>
           <span class="trend-value">[N] est. impr.</span>
         </div>
```

Height percentage = `(monthImpressions / maxMonthImpressions) * 100`

Hover/tap on a bar shows tooltip: `[Month Year] · [N] routes · [X] miles · [Y] est. impressions`

### Label above chart
*"Your campaign reach over time — impressions accumulate as your brand builds recognition in the area."*

### Visibility Rules
- **Hidden** if client has fewer than 2 months of route data (avoids a confusing single-bar chart)
- **Appears automatically** once Month 2 data exists — no code change needed
- Bars render left-to-right chronologically

---

## Section 4: Campaign Tally Sheet (Client Portal)

### Placement
Bottom of client portal, below route maps and card drops sections. Accessible via anchor link "View Tally Sheet →" in the Quick Links sidebar card.

### Sections

**Header:** "How to Measure Your Campaign"

**The Method:**
> Every time you get a new customer or inquiry, ask: "How'd you hear about us?" Keep a tally below. Do this consistently for 90 days. Most clients are surprised by how often the car comes up.

**Baseline Tip:**
> Before your campaign launches, write down how many new customers you're getting per month right now. That baseline is your comparison point. Without it, you're measuring change without knowing where you started.

**Printable Tally Table:**
12-row bordered table (one row per week, covering a 3-month window):

| Week | Week Of | New Customers | Mentioned the Car | Other Source | Notes |
|---|---|---|---|---|---|
| 1 | ________ | | | | |
| 2 | ________ | | | | |
| … | | | | | |
| 12 | ________ | | | | |

**What to Look For:**
> Don't evaluate week by week. Look at Month 1 vs Month 3. Brand awareness compounds — the 10th time someone sees your car, they remember it. The first time, they don't.

### Print Behavior

"Print Tally Sheet →" button triggers `window.print()`.

Print-specific CSS (`@media print`):
- Hide: nav, monthly summary card, trend chart, route maps grid, card drops section, sidebar, footer
- Show: tally sheet section only
- Apply white background, black text
- Table borders visible in print

---

## Verification Steps

1. **faq.html** — QR tracking promise gone. New "What should I expect?" entry present with 3-phase timeline. Cancellation answer no longer references QR deactivation.
2. **pricing.html** — "What to Expect" timeline visible below magnetic cards. Three phases labeled correctly. Note at bottom present.
3. **services.html** — Corridor coverage statement present. Brand awareness framing present. No QR/tracking promise language.
4. **Client portal — summary card:** Load portal for a client with routes this month. Routes, miles, impressions, hours, neighborhoods, card drops all populate. Impressions footnote visible. Info icon tooltip shows on hover.
5. **Client portal — summary card empty state:** Load portal for client with no routes this month. Empty state message shows instead of stats.
6. **Client portal — trend chart:** Client with 2+ months of route data shows bar chart. Hover shows tooltip. Client with <2 months shows nothing (chart hidden).
7. **Client portal — tally sheet:** Scroll to bottom. Table is visible and readable. "Print Tally Sheet" button triggers print. Print output shows only the tally sheet — nav, stats, route maps all hidden.
8. **Impression calculation:** Manually check a route with known coordinates. Haversine result within reasonable range (~0.5–2 miles for a short residential route). Multiply × 400. Confirm displayed number matches.
9. **No regressions:** Existing route maps grid, card drops section, active plan card, invoices, and quick links all still render correctly.
