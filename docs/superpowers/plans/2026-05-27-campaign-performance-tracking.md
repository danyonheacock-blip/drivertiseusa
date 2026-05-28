# Campaign Performance Tracking Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove false QR tracking promises from the website, reframe around honest brand awareness positioning, and add a real monthly campaign summary + trend chart + printable tally sheet to the client portal.

**Architecture:** Four files touched. No new Supabase tables. No new CDN dependencies. Haversine miles calculation from existing `route_coordinates` JSONB. Pure CSS bars for trend chart. `@media print` for tally sheet.

**Tech Stack:** Vanilla HTML/CSS/JS, Supabase JS v2 (already loaded), existing brand tokens (`--bg4`, `--gold`/`#C8973A`, `--cream`/`#F7F5F1`)

---

### Task 1: faq.html — Remove QR Promises & Add Timeline FAQ

**Files:**
- Modify: `D:\Projects\Drivertiseusa\faq.html`

**Exact strings to find and replace (in order):**

- [ ] **Step 1: Remove "setting up your QR/promo code tracking" from quick-start answer**

Find (line ~152):
```
setting up your QR/promo code tracking, and confirming your zone routes.
```
Replace with:
```
confirming your zone routes.
```

- [ ] **Step 2: Replace the "How do I measure if my ad is working?" answer entirely**

Find:
```html
            <button class="faq-question">How do I measure if my ad is working?<span class="faq-icon">+</span></button>
            <div class="faq-answer"><div class="faq-answer-inner">Three ways: (1) <strong style="color:var(--cream);">QR code</strong> — we set up a unique trackable QR code for your ad. Every scan is logged. (2) <strong style="color:var(--cream);">Promo code</strong> — include a unique code (e.g. "WRAP10") in your offer. Every redemption is attributable to your campaign. (3) <strong style="color:var(--cream);">Ask new customers</strong> — "How'd you hear about us?" is still one of the most reliable tracking methods. Many clients keep a simple tally. We recommend using at least two of these methods from day one.</div></div>
```
Replace with:
```html
            <button class="faq-question">How do I measure if my ad is working?<span class="faq-icon">+</span></button>
            <div class="faq-answer"><div class="faq-answer-inner">Vehicle advertising is a brand awareness channel — the same category as billboards, transit ads, and fleet wraps. You're building recognition over time, not tracking clicks. The most reliable signal: ask every new customer "how'd you hear about us?" and keep a tally for 90 days. Clients who do this consistently are often surprised by how often the car comes up. We also provide a monthly campaign summary in your client portal showing routes driven, miles covered, and estimated impressions — so you always know what you're getting.</div></div>
```

- [ ] **Step 3: Update "How long before I see results?" — remove QR scan reference**

Find:
```
In the first 2–4 weeks you're in the "building" phase — impressions are accumulating even if you don't see direct responses yet. If you're using a QR code or promo code, you may see scans in week 1. If you're building general awareness, expect to see inquiries increase between weeks 4–8.
```
Replace with:
```
In the first 2–4 weeks you're in the "building" phase — impressions are accumulating even if you don't see direct responses yet. Brand awareness doesn't register in week one — most people need to see a brand 3–7 times before it sticks. Expect to see inquiries increase between weeks 4–8.
```

- [ ] **Step 4: Update "What if I'm not seeing results after 30 days?" — remove QR data reference**

Find:
```
We'll look at your creative, your offer, your QR code data, and your zone traffic together.
```
Replace with:
```
We'll look at your creative, your offer, your messaging, and your route coverage together.
```

- [ ] **Step 5: Update "Can I change my creative after my campaign starts?" — remove QR digital elements**

Find:
```
For digital elements (QR codes, landing pages, promo codes): update anytime at no charge. For physical wrap changes: minor updates (swapping a promo, changing a phone number) can sometimes be done inexpensively — contact Danyon. Major redesigns involve reprinting costs that depend on the panel size and material. 6-month plan clients get one creative refresh at the 3-month mark included in their plan.
```
Replace with:
```
For physical wrap changes: minor updates (changing a phone number, swapping a promo) can sometimes be done inexpensively — contact Danyon. Major redesigns involve reprinting costs that depend on the panel size and material. 6-month plan clients get one creative refresh at the 3-month mark included in their plan.
```

- [ ] **Step 6: Update "Is mobile advertising proven to work?" — remove trackable offer language**

Find:
```
The key is pairing your wrap with a trackable offer (QR code, promo code) so you can measure what's converting, and giving it 4–8 weeks to build recognition before evaluating ROI.
```
Replace with:
```
The key is giving it 4–8 weeks to build recognition before evaluating ROI, and tracking on your end by asking new customers how they heard about you.
```

- [ ] **Step 7: Update "What happens when my zone expires or I cancel?" — remove QR deactivation**

Find:
```
Your creative is removed from the vehicle, your QR code and tracking links are deactivated, and your zone is released back to the available pool. Your category exclusivity ends — a competitor in your category could then claim that zone. There's no data retention issue (we don't hold your customer data), and no obligation on either side after the campaign ends.
```
Replace with:
```
Your creative is removed from the vehicle and your ad spot category is released back to the available pool. Your category exclusivity ends — a competitor in your category could then claim that spot. Your client portal access remains active so you can reference your campaign history. There's no obligation on either side after the campaign ends.
```

- [ ] **Step 8: Add "What should I realistically expect, and when?" — insert as new FAQ entry**

Find the closing `</div>` of the Results & Tracking section. The marker is:
```html
          </div>
        </div>
      </div>

      <!-- CREATIVE & LOGISTICS -->
```
Replace with:
```html
          </div>
          <div class="faq-item">
            <button class="faq-question">What should I realistically expect, and when?<span class="faq-icon">+</span></button>
            <div class="faq-answer"><div class="faq-answer-inner">
              <strong style="color:var(--cream);">Month 1:</strong> Impressions accumulating, seeds being planted. Don't evaluate yet — brand awareness doesn't register in week one.<br><br>
              <strong style="color:var(--cream);">Months 2–3:</strong> Familiarity building. People start recognizing your brand in the area. The Baader-Meinhof effect kicks in — once they've seen the car a few times, they start noticing it everywhere.<br><br>
              <strong style="color:var(--cream);">Month 3+:</strong> This is where recall converts to action. Clients who've asked "how'd you hear about us?" start seeing the car mentioned regularly. This is also when month-over-month impression data in your portal starts telling a clear story.
            </div></div>
          </div>
        </div>
      </div>

      <!-- CREATIVE & LOGISTICS -->
```

- [ ] **Step 9: Verify in browser**

Open `faq.html` in browser. Expand every Results & Tracking accordion item:
- "How do I measure if my ad is working?" → brand awareness copy, no QR promise
- "How long before I see results?" → no "QR code scans" text
- "What if I'm not seeing results after 30 days?" → no "QR code data" text
- "What should I realistically expect, and when?" → new entry present, 3 phases visible
- "What happens when I cancel?" → no "QR code and tracking links are deactivated" text

- [ ] **Step 10: Commit**

```bash
git add faq.html
git commit -m "Remove QR tracking promises from FAQ, reframe around brand awareness positioning"
```

---

### Task 2: pricing.html + services.html — Brand Awareness Reframe

**Files:**
- Modify: `D:\Projects\Drivertiseusa\pricing.html`
- Modify: `D:\Projects\Drivertiseusa\services.html`

- [ ] **Step 1: Add "What to Expect" timeline block to pricing.html**

Find (end of magnetic pricing section, lines ~485-491):
```html
    <div style="margin-top:28px; text-align:center;">
      <p style="font-size:13px; color:var(--w55); margin-bottom:8px;">50% due upfront to reserve your exclusive category ad spot and cover production. 50% due at install.</p>
      <p style="font-size:13px; color:var(--w38); margin-bottom:8px;">Rear window perforated vinyl available — <a href="contact.html" style="color:var(--yellow);">contact for quote</a>.</p>
      <p style="font-size:13px; color:var(--w38);">6-month commitment saves 20% — ask Danyon.</p>
    </div>
  </div>
</section>
```
Replace with:
```html
    <div style="margin-top:28px; text-align:center;">
      <p style="font-size:13px; color:var(--w55); margin-bottom:8px;">50% due upfront to reserve your exclusive category ad spot and cover production. 50% due at install.</p>
      <p style="font-size:13px; color:var(--w38); margin-bottom:8px;">Rear window perforated vinyl available — <a href="contact.html" style="color:var(--yellow);">contact for quote</a>.</p>
      <p style="font-size:13px; color:var(--w38);">6-month commitment saves 20% — ask Danyon.</p>
    </div>

    <!-- WHAT TO EXPECT TIMELINE -->
    <div style="margin-top:64px;">
      <h3 style="font-family:'Syne',sans-serif;font-weight:800;font-size:22px;color:#F7F5F1;text-align:center;margin-bottom:8px;">What to Expect From Your Campaign</h3>
      <p style="text-align:center;font-size:14px;color:rgba(247,245,241,0.45);margin-bottom:40px;">Brand awareness compounds. Here's what the timeline looks like.</p>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;">
        <div style="background:rgba(247,245,241,0.03);border:1px solid rgba(247,245,241,0.08);border-radius:16px;padding:28px 24px;position:relative;">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#C8973A;margin-bottom:10px;">Weeks 1–4</div>
          <div style="font-family:'Syne',sans-serif;font-weight:800;font-size:18px;color:#F7F5F1;margin-bottom:10px;">Planting Seeds</div>
          <p style="font-size:14px;color:rgba(247,245,241,0.55);line-height:1.6;margin:0;">Impressions accumulating. Your brand is hitting the road. Don't evaluate yet — awareness doesn't register in week one.</p>
        </div>
        <div style="background:rgba(200,151,58,0.05);border:1px solid rgba(200,151,58,0.20);border-radius:16px;padding:28px 24px;position:relative;">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#C8973A;margin-bottom:10px;">Months 2–3</div>
          <div style="font-family:'Syne',sans-serif;font-weight:800;font-size:18px;color:#F7F5F1;margin-bottom:10px;">Building Recognition</div>
          <p style="font-size:14px;color:rgba(247,245,241,0.55);line-height:1.6;margin:0;">Familiarity kicks in. People who've seen the car begin to remember your brand. This is when "how'd you hear about us?" starts returning answers.</p>
        </div>
        <div style="background:rgba(247,245,241,0.03);border:1px solid rgba(247,245,241,0.08);border-radius:16px;padding:28px 24px;position:relative;">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#C8973A;margin-bottom:10px;">Month 3+</div>
          <div style="font-family:'Syne',sans-serif;font-weight:800;font-size:18px;color:#F7F5F1;margin-bottom:10px;">Recall &amp; Action</div>
          <p style="font-size:14px;color:rgba(247,245,241,0.55);line-height:1.6;margin:0;">Repeated exposure converts to trust. Inquiries from people who "just knew" your brand. Your portal trend chart starts showing the compounding story.</p>
        </div>
      </div>
      <p style="text-align:center;font-size:13px;color:rgba(247,245,241,0.35);margin-top:24px;font-style:italic;">"This is the same model every recognizable local brand is built on. It requires patience — and it works."</p>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Update services.html comparison table — remove QR tracking claim**

Find (line ~504):
```
            <td>QR code + reports</td>
```
Replace with:
```
            <td>Monthly campaign summary</td>
```

- [ ] **Step 3: Verify pricing.html in browser**

Open `pricing.html`, scroll below magnetic pricing cards. Three-column timeline should appear with labels "Weeks 1–4 / Months 2–3 / Month 3+". Middle card has gold border accent. Note at bottom present. On mobile (< 768px) cards should stack vertically.

- [ ] **Step 4: Verify services.html comparison table**

Open `services.html`, scroll to comparison table. "Tracking included" row → Magnetic column now reads "Monthly campaign summary", not "QR code + reports".

- [ ] **Step 5: Commit**

```bash
git add pricing.html services.html
git commit -m "Add campaign timeline to pricing page, replace QR tracking claim in services comparison table"
```

---

### Task 3: client-portal.html — Monthly Campaign Summary Card

**Files:**
- Modify: `D:\Projects\Drivertiseusa\client-portal.html`

This task replaces the simple 2-stat monthly summary with a full 6-stat dark card and adds haversine miles calculation.

- [ ] **Step 1: Replace monthly-summary CSS**

Find the entire monthly-summary CSS block (lines ~443-487):
```css
    /* ── MONTHLY SUMMARY ── */
    .monthly-summary {
      display: flex;
      align-items: center;
      gap: 32px;
```
(Find through to the closing of `@media (max-width: 600px)` for monthly-summary)

The full block to find:
```css
    /* ── MONTHLY SUMMARY ── */
    .monthly-summary {
      display: flex;
      align-items: center;
      gap: 32px;
      background: rgba(200,151,58,0.06);
      border: 1px solid rgba(200,151,58,0.18);
      border-radius: 14px;
      padding: 18px 24px;
      margin-bottom: 32px;
      flex-wrap: wrap;
    }
    .monthly-summary-stat {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .monthly-summary-num {
      font-family: 'Syne', sans-serif;
      font-size: 22px;
      font-weight: 900;
      color: #C8973A;
      line-height: 1;
    }
    .monthly-summary-label {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      color: rgba(247,245,241,0.45);
    }
    .monthly-summary-divider {
      width: 1px;
      height: 36px;
      background: rgba(200,151,58,0.20);
    }
    .monthly-summary-month {
      font-size: 13px;
      color: rgba(247,245,241,0.45);
      margin-left: auto;
    }
    @media (max-width: 600px) {
      .monthly-summary { gap: 20px; padding: 14px 16px; }
      .monthly-summary-month { margin-left: 0; }
    }
```
Replace with:
```css
    /* ── MONTHLY SUMMARY CARD ── */
    .summary-card {
      background: var(--bg4, #141820);
      border: 1px solid rgba(247,245,241,0.07);
      border-top: 3px solid #C8973A;
      border-radius: 16px;
      padding: 28px 28px 20px;
      margin-bottom: 32px;
    }
    .summary-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 8px;
    }
    .summary-card-title {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 15px;
      color: #F7F5F1;
      letter-spacing: 0.02em;
    }
    .summary-card-month {
      font-size: 12px;
      color: rgba(247,245,241,0.40);
      font-weight: 500;
    }
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px 24px;
      margin-bottom: 16px;
    }
    @media (max-width: 640px) {
      .summary-grid { grid-template-columns: repeat(2, 1fr); }
    }
    .summary-stat {}
    .summary-stat-num {
      font-family: 'Syne', sans-serif;
      font-size: 26px;
      font-weight: 900;
      color: #C8973A;
      line-height: 1;
      margin-bottom: 4px;
    }
    .summary-stat-label {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(247,245,241,0.40);
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .summary-stat-label .info-icon {
      cursor: pointer;
      position: relative;
      display: inline-block;
    }
    .summary-stat-label .info-icon::after {
      content: attr(data-tip);
      position: absolute;
      bottom: calc(100% + 6px);
      left: 50%;
      transform: translateX(-50%);
      background: #1e2433;
      border: 1px solid rgba(200,151,58,0.30);
      color: rgba(247,245,241,0.75);
      font-size: 11px;
      font-weight: 400;
      letter-spacing: 0;
      text-transform: none;
      padding: 6px 10px;
      border-radius: 8px;
      white-space: nowrap;
      max-width: 220px;
      white-space: normal;
      width: 200px;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.15s;
      z-index: 10;
    }
    .summary-stat-label .info-icon:hover::after { opacity: 1; }
    .summary-neighborhoods {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding-top: 12px;
      border-top: 1px solid rgba(247,245,241,0.06);
    }
    .summary-neighborhood-tag {
      font-size: 11px;
      color: rgba(247,245,241,0.55);
      background: rgba(247,245,241,0.05);
      border: 1px solid rgba(247,245,241,0.09);
      border-radius: 20px;
      padding: 3px 10px;
    }
    .summary-empty {
      font-size: 13px;
      color: rgba(247,245,241,0.35);
      font-style: italic;
      padding: 8px 0;
    }
    .summary-footnote {
      font-size: 11px;
      color: rgba(247,245,241,0.28);
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid rgba(247,245,241,0.05);
    }
```

- [ ] **Step 2: Replace monthly-summary HTML in the Route Reports section**

Find:
```html
        <!-- Monthly summary -->
        <div class="monthly-summary" id="monthly-summary">
          <div class="monthly-summary-stat">
            <div class="monthly-summary-num" id="summary-routes">—</div>
            <div class="monthly-summary-label">Routes This Month</div>
          </div>
          <div class="monthly-summary-divider"></div>
          <div class="monthly-summary-stat">
            <div class="monthly-summary-num" id="summary-hours">—</div>
            <div class="monthly-summary-label">Hours of Coverage</div>
          </div>
          <div class="monthly-summary-month" id="summary-month"></div>
        </div>
```
Replace with:
```html
        <!-- Monthly summary card -->
        <div class="summary-card" id="monthly-summary">
          <div class="summary-card-header">
            <span class="summary-card-title" id="summary-title">Monthly Campaign Summary</span>
            <span class="summary-card-month" id="summary-month"></span>
          </div>
          <div id="summary-content">
            <!-- Populated by JS — either grid or empty state -->
          </div>
        </div>
```

- [ ] **Step 3: Add haversine helpers and replace loadMonthlySummary in JS**

Find the entire `loadMonthlySummary` function:
```javascript
    function loadMonthlySummary(routes) {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const monthRoutes = routes.filter(r => {
        const d = new Date(r.route_date + 'T12:00:00');
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      });

      const totalHours = monthRoutes.reduce((sum, r) => sum + (parseFloat(r.hours_out) || 0), 0);

      const routesEl = document.getElementById('summary-routes');
      const hoursEl = document.getElementById('summary-hours');
      const monthEl = document.getElementById('summary-month');
      if (routesEl) routesEl.textContent = monthRoutes.length;
      if (hoursEl) hoursEl.textContent = totalHours % 1 === 0 ? String(totalHours) : totalHours.toFixed(1);
      if (monthEl) monthEl.textContent = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
```
Replace with:
```javascript
    // ── HAVERSINE ──────────────────────────────────────
    const IMPRESSIONS_PER_MILE = 400;

    function haversineDistance(lat1, lng1, lat2, lng2) {
      const R = 3958.8;
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLng = (lng2 - lng1) * Math.PI / 180;
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLng/2) * Math.sin(dLng/2);
      return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    }

    function calcRouteMiles(coordinates) {
      if (!coordinates || coordinates.length < 2) return 0;
      let total = 0;
      for (let i = 1; i < coordinates.length; i++) {
        total += haversineDistance(
          coordinates[i-1].lat, coordinates[i-1].lng,
          coordinates[i].lat,   coordinates[i].lng
        );
      }
      return total;
    }

    // ── MONTHLY SUMMARY CARD ───────────────────────────
    async function loadMonthlySummary(routes, clientId) {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const monthRoutes = routes.filter(r => {
        const d = new Date(r.route_date + 'T12:00:00');
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      });

      const monthEl = document.getElementById('summary-month');
      if (monthEl) monthEl.textContent = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

      const titleEl = document.getElementById('summary-title');
      if (titleEl) titleEl.textContent = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) + ' Campaign Summary';

      const contentEl = document.getElementById('summary-content');
      if (!contentEl) return;

      if (!monthRoutes.length) {
        contentEl.innerHTML = '<p class="summary-empty">Campaign summary updates as routes are logged. Check back after your first week on the road.</p>';
        return;
      }

      // Compute stats
      const routeCount = monthRoutes.length;
      const totalHours = monthRoutes.reduce((sum, r) => sum + (parseFloat(r.hours_out) || 0), 0);
      const totalMiles = monthRoutes.reduce((sum, r) => sum + calcRouteMiles(r.route_coordinates || []), 0);
      const totalImpressions = Math.round(totalMiles * IMPRESSIONS_PER_MILE);

      // Distinct neighborhoods
      const neighborhoods = [...new Set(
        monthRoutes.map(r => r.area_name).filter(Boolean)
      )];

      // Card drops this month
      let cardDropCount = 0;
      if (clientId) {
        const firstOfMonth = new Date(currentYear, currentMonth, 1).toISOString().split('T')[0];
        const lastOfMonth = new Date(currentYear, currentMonth + 1, 0).toISOString().split('T')[0];
        const { data: drops } = await sb
          .from('card_drops')
          .select('cards_delivered')
          .eq('client_id', clientId)
          .gte('drop_date', firstOfMonth)
          .lte('drop_date', lastOfMonth);
        if (drops) cardDropCount = drops.reduce((sum, d) => sum + (parseInt(d.cards_delivered) || 0), 0);
      }

      const fmtNum = n => n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : String(n);
      const fmtHours = h => h % 1 === 0 ? String(h) : h.toFixed(1);

      contentEl.innerHTML = `
        <div class="summary-grid">
          <div class="summary-stat">
            <div class="summary-stat-num">${routeCount}</div>
            <div class="summary-stat-label">Routes Driven</div>
          </div>
          <div class="summary-stat">
            <div class="summary-stat-num">${totalMiles.toFixed(1)}</div>
            <div class="summary-stat-label">Miles Covered</div>
          </div>
          <div class="summary-stat">
            <div class="summary-stat-num">${fmtNum(totalImpressions)}</div>
            <div class="summary-stat-label">
              Est. Impressions&nbsp;
              <span class="info-icon" data-tip="Estimated based on route distance and Utah County traffic averages. Not a measured count.">ⓘ</span>
            </div>
          </div>
          <div class="summary-stat">
            <div class="summary-stat-num">${fmtHours(totalHours)}</div>
            <div class="summary-stat-label">Hours on the Road</div>
          </div>
          <div class="summary-stat">
            <div class="summary-stat-num">${neighborhoods.length || '—'}</div>
            <div class="summary-stat-label">Areas Covered</div>
          </div>
          <div class="summary-stat">
            <div class="summary-stat-num">${cardDropCount || '—'}</div>
            <div class="summary-stat-label">Card Drops</div>
          </div>
        </div>
        ${neighborhoods.length ? `
        <div class="summary-neighborhoods">
          ${neighborhoods.map(n => `<span class="summary-neighborhood-tag">${n}</span>`).join('')}
        </div>` : ''}
        <div class="summary-footnote">† Est. Impressions — based on route distance and local traffic averages.</div>
      `;
    }
```

- [ ] **Step 4: Update loadMonthlySummary call in loadPortal to pass clientId**

Find:
```javascript
      loadMonthlySummary(routes || []);
```
Replace with:
```javascript
      loadMonthlySummary(routes || [], profile?.id);
```

- [ ] **Step 5: Verify summary card in browser**

Load client portal for a client with routes this month. Verify:
- Card renders with gold top border
- Month title shows correct month/year
- Routes, Miles, Est. Impressions, Hours, Areas, Card Drops all populate
- ⓘ icon next to Est. Impressions — hover shows tooltip with methodology
- Neighborhood tags appear below grid
- Footnote "† Est. Impressions" visible at bottom
- Client with NO routes this month → empty state message instead of grid

- [ ] **Step 6: Commit**

```bash
git add client-portal.html
git commit -m "Replace monthly summary with full 6-stat campaign summary card, add haversine miles calculation"
```

---

### Task 4: client-portal.html — Trend Chart + Tally Sheet

**Files:**
- Modify: `D:\Projects\Drivertiseusa\client-portal.html`

- [ ] **Step 1: Add trend chart and tally sheet CSS**

Find the existing card drops CSS comment:
```css
    /* ── CARD DROPS ── */
```
Insert the following CSS blocks immediately before that line:
```css
    /* ── TREND CHART ── */
    .trend-section {
      margin-bottom: 56px;
    }
    .trend-label-text {
      font-size: 13px;
      color: rgba(247,245,241,0.40);
      margin-bottom: 20px;
      font-style: italic;
    }
    .trend-bars-wrap {
      display: flex;
      align-items: flex-end;
      gap: 8px;
      height: 120px;
      padding-bottom: 28px;
      border-bottom: 1px solid rgba(247,245,241,0.07);
      position: relative;
    }
    .trend-bar-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      flex: 1;
      min-width: 0;
      height: 100%;
      position: relative;
      cursor: pointer;
    }
    .trend-bar {
      width: 100%;
      max-width: 48px;
      background: rgba(200,151,58,0.35);
      border-radius: 4px 4px 0 0;
      transition: background 0.2s;
      position: relative;
    }
    .trend-bar-col:hover .trend-bar { background: #C8973A; }
    .trend-bar-month {
      font-size: 10px;
      font-weight: 700;
      color: rgba(247,245,241,0.35);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-top: 6px;
      position: absolute;
      bottom: -22px;
      white-space: nowrap;
    }
    .trend-tooltip {
      position: absolute;
      bottom: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
      background: #1e2433;
      border: 1px solid rgba(200,151,58,0.30);
      color: rgba(247,245,241,0.85);
      font-size: 11px;
      padding: 6px 10px;
      border-radius: 8px;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.15s;
      z-index: 10;
    }
    .trend-bar-col:hover .trend-tooltip { opacity: 1; }

    /* ── TALLY SHEET ── */
    .tally-section {
      margin-bottom: 56px;
      border: 1px solid rgba(247,245,241,0.07);
      border-radius: 16px;
      padding: 32px 28px;
    }
    .tally-section h2 {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 20px;
      color: #F7F5F1;
      margin-bottom: 8px;
    }
    .tally-intro {
      font-size: 14px;
      color: rgba(247,245,241,0.55);
      line-height: 1.6;
      margin-bottom: 8px;
    }
    .tally-tip {
      font-size: 13px;
      color: rgba(200,151,58,0.80);
      background: rgba(200,151,58,0.07);
      border: 1px solid rgba(200,151,58,0.18);
      border-radius: 10px;
      padding: 12px 16px;
      margin-bottom: 24px;
      line-height: 1.5;
    }
    .tally-table-wrap {
      overflow-x: auto;
      border-radius: 10px;
      border: 1px solid rgba(247,245,241,0.08);
      margin-bottom: 20px;
    }
    .tally-table {
      width: 100%;
      border-collapse: collapse;
    }
    .tally-table th {
      padding: 11px 14px;
      background: rgba(247,245,241,0.03);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(247,245,241,0.40);
      border-bottom: 1px solid rgba(247,245,241,0.07);
      text-align: left;
    }
    .tally-table td {
      padding: 12px 14px;
      font-size: 13px;
      color: rgba(247,245,241,0.65);
      border-bottom: 1px solid rgba(247,245,241,0.04);
    }
    .tally-table tbody tr:last-child td { border-bottom: none; }
    .tally-table .week-num {
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      color: rgba(200,151,58,0.7);
      font-size: 12px;
    }
    .tally-what-to-look {
      font-size: 13px;
      color: rgba(247,245,241,0.40);
      font-style: italic;
      line-height: 1.6;
      margin-bottom: 20px;
    }
    .btn-print {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(247,245,241,0.05);
      border: 1px solid rgba(247,245,241,0.12);
      color: rgba(247,245,241,0.65);
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      font-weight: 600;
      padding: 10px 20px;
      border-radius: 10px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s, border-color 0.2s;
    }
    .btn-print:hover {
      background: rgba(200,151,58,0.08);
      border-color: rgba(200,151,58,0.30);
      color: #F7F5F1;
    }

    /* ── PRINT ── */
    @media print {
      body * { visibility: hidden; }
      .tally-section, .tally-section * { visibility: visible; }
      .tally-section {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background: #fff;
        color: #000;
        border: none;
        padding: 32px;
      }
      .tally-section h2 { color: #000; }
      .tally-intro, .tally-tip, .tally-what-to-look { color: #333; }
      .tally-table th { color: #000; background: #f5f5f5; border-bottom: 1px solid #ccc; }
      .tally-table td { color: #333; border-bottom: 1px solid #eee; }
      .tally-table .week-num { color: #555; }
      .tally-table-wrap { border-color: #ccc; }
      .btn-print { display: none; }
    }

    /* ── CARD DROPS ── */
```

- [ ] **Step 2: Add trend chart HTML — insert between summary card and weeks-container**

Find:
```html
        <div class="weeks-container" id="weeks-container">
          <!-- populated by JS -->
        </div>
```
Replace with:
```html
        <!-- Trend chart (hidden until 2+ months of data) -->
        <div class="trend-section" id="trend-section" style="display:none;">
          <p class="trend-label-text">Your campaign reach over time — impressions accumulate as your brand builds recognition in the area.</p>
          <div class="trend-bars-wrap" id="trend-bars">
            <!-- populated by JS -->
          </div>
        </div>

        <div class="weeks-container" id="weeks-container">
          <!-- populated by JS -->
        </div>
```

- [ ] **Step 3: Add tally sheet HTML — insert between card drops and quick links**

Find:
```html
      <!-- QUICK LINKS -->
```
Insert immediately before it:
```html
      <!-- TALLY SHEET -->
      <div class="tally-section" id="tally-sheet">
        <h2>How to Measure Your Campaign</h2>
        <p class="tally-intro">Every time you get a new customer or inquiry, ask: <strong style="color:#F7F5F1;">"How'd you hear about us?"</strong> Keep a tally below. Do this consistently for 90 days. Most clients are surprised by how often the car comes up.</p>
        <div class="tally-tip">
          <strong>Baseline tip:</strong> Before your campaign launches, write down how many new customers you're getting per month right now. That baseline is your comparison point. Without it, you're measuring change without knowing where you started.
        </div>
        <div class="tally-table-wrap">
          <table class="tally-table">
            <thead>
              <tr>
                <th>Week</th>
                <th>Week Of</th>
                <th>New Customers</th>
                <th>Mentioned the Car</th>
                <th>Other Source</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="week-num">1</td><td style="color:rgba(247,245,241,0.25);">________</td><td></td><td></td><td></td><td></td></tr>
              <tr><td class="week-num">2</td><td style="color:rgba(247,245,241,0.25);">________</td><td></td><td></td><td></td><td></td></tr>
              <tr><td class="week-num">3</td><td style="color:rgba(247,245,241,0.25);">________</td><td></td><td></td><td></td><td></td></tr>
              <tr><td class="week-num">4</td><td style="color:rgba(247,245,241,0.25);">________</td><td></td><td></td><td></td><td></td></tr>
              <tr><td class="week-num">5</td><td style="color:rgba(247,245,241,0.25);">________</td><td></td><td></td><td></td><td></td></tr>
              <tr><td class="week-num">6</td><td style="color:rgba(247,245,241,0.25);">________</td><td></td><td></td><td></td><td></td></tr>
              <tr><td class="week-num">7</td><td style="color:rgba(247,245,241,0.25);">________</td><td></td><td></td><td></td><td></td></tr>
              <tr><td class="week-num">8</td><td style="color:rgba(247,245,241,0.25);">________</td><td></td><td></td><td></td><td></td></tr>
              <tr><td class="week-num">9</td><td style="color:rgba(247,245,241,0.25);">________</td><td></td><td></td><td></td><td></td></tr>
              <tr><td class="week-num">10</td><td style="color:rgba(247,245,241,0.25);">________</td><td></td><td></td><td></td><td></td></tr>
              <tr><td class="week-num">11</td><td style="color:rgba(247,245,241,0.25);">________</td><td></td><td></td><td></td><td></td></tr>
              <tr><td class="week-num">12</td><td style="color:rgba(247,245,241,0.25);">________</td><td></td><td></td><td></td><td></td></tr>
            </tbody>
          </table>
        </div>
        <p class="tally-what-to-look">Don't evaluate week by week. Look at Month 1 vs Month 3. Brand awareness compounds — the 10th time someone sees your car, they remember it. The first time, they don't.</p>
        <button class="btn-print" onclick="window.print()">🖨 Print Tally Sheet →</button>
      </div>

      <!-- QUICK LINKS -->
```

- [ ] **Step 4: Add "View Tally Sheet" to Quick Links**

Find the quick-links div:
```html
          <a href="mailto:danyon@drivertiseusa.com?subject=Client%20Portal%20Message" class="quick-link">
            <span class="quick-link-icon">📩</span> Message Danyon
          </a>
        </div>
```
Replace with:
```html
          <a href="mailto:danyon@drivertiseusa.com?subject=Client%20Portal%20Message" class="quick-link">
            <span class="quick-link-icon">📩</span> Message Danyon
          </a>
          <a href="#tally-sheet" class="quick-link">
            <span class="quick-link-icon">📋</span> View Tally Sheet
          </a>
        </div>
```

- [ ] **Step 5: Add buildTrendChart function to JS**

Find the existing haversine block added in Task 3 (the line `const IMPRESSIONS_PER_MILE = 400;`). Immediately after the entire `loadMonthlySummary` function, add `buildTrendChart`:

Find:
```javascript
    // ── MONTHLY SUMMARY CARD ───────────────────────────
    async function loadMonthlySummary(routes, clientId) {
```
Insert the `buildTrendChart` function **after** `loadMonthlySummary` ends (after its closing `}`), before `async function signOut()`:

Find:
```javascript
    async function signOut() {
```
Insert immediately before it:
```javascript
    // ── TREND CHART ────────────────────────────────────
    function buildTrendChart(routes) {
      if (!routes || !routes.length) return;

      // Group by YYYY-MM
      const monthMap = {};
      routes.forEach(r => {
        const d = new Date(r.route_date + 'T12:00:00');
        const key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
        if (!monthMap[key]) monthMap[key] = { routes: 0, miles: 0 };
        monthMap[key].routes++;
        monthMap[key].miles += calcRouteMiles(r.route_coordinates || []);
      });

      const months = Object.keys(monthMap).sort();
      if (months.length < 2) return; // hide if fewer than 2 months

      const section = document.getElementById('trend-section');
      const barsEl = document.getElementById('trend-bars');
      if (!section || !barsEl) return;

      const impressionsByMonth = months.map(k => Math.round(monthMap[k].miles * IMPRESSIONS_PER_MILE));
      const maxImpressions = Math.max(...impressionsByMonth);

      const fmtMonthKey = key => {
        const [y, m] = key.split('-');
        return new Date(parseInt(y), parseInt(m) - 1, 1).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      };

      barsEl.innerHTML = months.map((key, i) => {
        const impr = impressionsByMonth[i];
        const pct = maxImpressions > 0 ? Math.max(4, Math.round((impr / maxImpressions) * 100)) : 4;
        const label = fmtMonthKey(key);
        const routeCount = monthMap[key].routes;
        const miles = monthMap[key].miles.toFixed(1);
        const fmtImpr = impr >= 1000 ? (impr/1000).toFixed(1).replace(/\.0$/,'') + 'k' : String(impr);
        return `
          <div class="trend-bar-col">
            <div class="trend-tooltip">${label} · ${routeCount} route${routeCount !== 1 ? 's' : ''} · ${miles} mi · ${fmtImpr} est. impr.</div>
            <div class="trend-bar" style="height:${pct}%"></div>
            <span class="trend-bar-month">${label}</span>
          </div>`;
      }).join('');

      section.style.display = '';
    }

```

- [ ] **Step 6: Call buildTrendChart from loadPortal**

Find:
```javascript
      loadMonthlySummary(routes || [], profile?.id);
```
Replace with:
```javascript
      loadMonthlySummary(routes || [], profile?.id);
      buildTrendChart(routes || []);
```

- [ ] **Step 7: Verify trend chart**

Load client portal for a client with data from 2+ calendar months:
- Bar chart visible between monthly summary and route accordion
- Each bar proportional to its month's estimated impressions
- Hover over bar → tooltip shows "[Month] · N routes · X.X mi · Yk est. impr."
- Most recent months visible
- Client with only 1 month of data → chart section hidden (no single-bar chart)

- [ ] **Step 8: Verify tally sheet**

Scroll to bottom of client portal:
- Tally sheet section visible above Quick Links
- 12 rows with week numbers and blank fill cells
- "Print Tally Sheet →" button present
- Click "View Tally Sheet" in Quick Links → page scrolls to tally section
- Click "Print Tally Sheet →" → browser print dialog opens
- Print preview shows ONLY the tally sheet: no nav, no stats, no route maps — white background, black text, table borders visible

- [ ] **Step 9: Final verification — no regressions**

Open client portal and confirm all of the following still work:
- Route maps accordion expands/collapses
- Leaflet route maps render inside accordion rows
- Map lightbox opens on route card click and closes with ✕ or Escape
- Invoices table renders
- Card drops section shows (if drops exist)
- Quick Links all functional (zones, Calendly, contact, email, tally anchor)
- Campaign Status pulse dot and Next Renewal date still shown in zone card
- Founding rate badge still appears if `founding_client = true`

- [ ] **Step 10: Commit**

```bash
git add client-portal.html
git commit -m "Add month-over-month trend chart (pure CSS bars) and printable tally sheet to client portal"
```

---

## Self-Review

**Spec coverage check:**
- ✅ faq.html — QR tracking promise removed (line 152), "How do I measure" rewritten, "When to expect results" timeline added, cancellation answer updated, promo code references cleaned
- ✅ pricing.html — "What to Expect" 3-phase timeline added below magnetic pricing cards
- ✅ services.html — "QR code + reports" → "Monthly campaign summary" in comparison table
- ✅ Client portal — Hero grid: "Routes This Month" moved into summary card (zone card now has Campaign Status + Next Renewal only — already the case before this plan, no change needed)
- ✅ Client portal — Monthly summary: replaced 2-stat strip with 6-stat dark card (routes, miles, est. impressions, hours, areas, card drops)
- ✅ Client portal — Haversine miles calculation from route_coordinates
- ✅ Client portal — `IMPRESSIONS_PER_MILE = 400` isolated constant
- ✅ Client portal — Est. Impressions footnote + ⓘ tooltip explaining methodology
- ✅ Client portal — Month-over-month trend chart (hidden < 2 months, renders automatically at 2+)
- ✅ Client portal — Tally sheet with 12-week table, print button, @media print CSS
- ✅ Quick Links — "View Tally Sheet →" anchor added

**No placeholders — all code is complete.**

**Type consistency confirmed:** `calcRouteMiles` defined before `loadMonthlySummary` and `buildTrendChart`, both call it. `IMPRESSIONS_PER_MILE` used consistently in both functions. `sb` is the existing Supabase client reference.
