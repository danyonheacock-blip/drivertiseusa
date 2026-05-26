# Client Portal — Route Maps Redesign & Portal Feature Expansion

**Date:** 2026-05-26  
**Project:** Drivertiseusa.com  
**Scope:** Route map viewer overhaul (KML-based interactive maps), client portal feature additions, admin upload flow upgrade

---

## Context

The current client portal displays route maps as raw Google Timeline screenshots uploaded manually by Danyon. This is functional but underwhelming — clients see an informal phone screenshot with no context, no branding, and no data. The goal is to turn the route gallery into a genuine accountability dashboard: verifiable, professional, and organized in a way that makes clients feel the value of what they're paying for every month.

---

## Decisions Locked

**Route data source:** Google Timeline per-day KML export. From Google Maps app → Timeline → select day → "..." → "Export this day." Takes ~30 seconds per route. File is parsed in the browser — no server required.

**Map rendering:** Leaflet.js (already used on zones.html). CartoDB Dark Matter tiles for brand consistency. Gold (`#C8973A`) polyline, 3px width. Route auto-fits to fill the card bounds. Start dot (green) and end dot (red) markers optional but included.

**Impression estimates:** Not shown anywhere on the client portal. The driving time includes time parked inside stores — no accurate impression count is possible, and showing an estimated number invites skepticism rather than trust. The honest metric is routes logged and hours of coverage. That's what clients see.

**Organization:** Weekly dropdowns. Most recent week expanded by default, all others collapsed. Monthly summary bar always visible above the dropdowns.

**Monthly summary:** `22 routes · 61 hrs of coverage` — two honest numbers Danyon can stand behind. No impression math.

**Business card drops:** A separate section in the portal below route maps. Complimentary service for magnetic clients. Each entry: date, neighborhood, cards delivered count, verification photo. Monthly total shown.

**Admin preview:** After uploading a KML file, the admin dashboard renders a live preview of the parsed route on a mini map before saving. Danyon confirms it looks correct, then saves. No blind uploads.

---

## Database Changes

Run in Supabase SQL Editor before deploy:

```sql
-- Add new columns to route_maps table
alter table route_maps add column if not exists area_name text;
alter table route_maps add column if not exists hours_out numeric(4,1);
alter table route_maps add column if not exists route_coordinates jsonb;

-- image_url is no longer required (screenshots replaced by coordinates)
alter table route_maps alter column image_url drop not null;
alter table route_maps alter column image_url set default null;

-- Business card drops table
create table if not exists card_drops (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  client_id uuid references profiles(id) not null,
  drop_date date not null,
  neighborhood text not null,
  cards_delivered integer not null default 0,
  photo_url text,
  notes text
);

alter table card_drops enable row level security;

-- Clients can read their own drops
create policy "own_card_drops" on card_drops for select
  using (client_id = (select id from profiles where user_id = auth.uid()));

-- Admin (authenticated) can do everything
create policy "admin_card_drops" on card_drops for all
  using (auth.role() = 'authenticated');
```

---

## File 1: admin.html — Route Upload Upgrade

### Current State
Basic form: client dropdown, date, file upload, optional notes. Uploads image to Supabase Storage. No preview.

### New State

The Route Maps section in admin.html gets a full upload upgrade.

**Upload form fields:**
1. **Client** — dropdown from `profiles` table
2. **Route date** — date picker, defaults to today
3. **Area name** — text input with placeholder "e.g. Lehi / Alpine Corridor" — this is the human-readable label clients see
4. **Hours out** — number input (step: 0.5, min: 0.5) — e.g. `4.5`
5. **KML file** — file input, accepts `.kml` only
6. **Notes** — optional textarea (internal, not shown to client)

**On KML file select (before submit):**
- Parse the KML in the browser using the DOM parser
- Extract all `<coordinates>` text from `<LineString>` elements
- Split into lat/lng pairs, build a coordinates array
- Render a live preview: small Leaflet map appears below the file input showing the gold polyline
- If parse fails (wrong file format, no coordinates found): show inline error "No route coordinates found in this file — make sure you exported a KML from Google Timeline."
- Submit button stays disabled until a valid parse succeeds

**On submit:**
1. Insert row to `route_maps`:
   ```javascript
   {
     client_id: selectedClientId,
     route_date: dateValue,
     area_name: areaNameValue,
     hours_out: hoursValue,
     route_coordinates: parsedCoordinatesArray, // [{lat, lng}, ...]
     image_url: null,
     notes: notesValue || null
   }
   ```
2. Show success: "Route saved for [Client Name] — [Date]"
3. Reset form, clear preview map

**KML parse logic (JavaScript):**
```javascript
function parseKML(fileText) {
  const parser = new DOMParser();
  const kml = parser.parseFromString(fileText, 'text/xml');
  const coordNodes = kml.querySelectorAll('LineString coordinates, coordinates');
  const coords = [];
  coordNodes.forEach(node => {
    const raw = node.textContent.trim();
    raw.split(/\s+/).forEach(triplet => {
      const parts = triplet.split(',');
      if (parts.length >= 2) {
        const lng = parseFloat(parts[0]);
        const lat = parseFloat(parts[1]);
        if (!isNaN(lat) && !isNaN(lng)) coords.push({ lat, lng });
      }
    });
  });
  return coords; // [{lat, lng}, ...]
}
```

**Preview map:**
- Leaflet instance, CartoDB Dark Matter tiles
- Gold polyline from parsed coordinates
- `map.fitBounds(polyline.getBounds(), { padding: [16, 16] })`
- Green circle marker at first coordinate, red at last
- Fixed height: 240px, full width of form panel

**Recent uploads grid (below form):**
Shows last 8 route entries for the selected client — date, area name, hours. Same as current behavior but updated to pull `area_name` and `hours_out` instead of showing image thumbnails.

---

### Business Card Drop Upload (new sub-section in admin)

Separate form below the route upload:

**Fields:**
1. Client (dropdown)
2. Drop date (date picker)
3. Neighborhood (text — "Saratoga Springs, Zone 1")
4. Cards delivered (number)
5. Verification photo (file input — image/*)
6. Notes (optional)

**On submit:**
1. If photo selected: upload to Supabase Storage bucket `card-drop-photos` → get public URL
2. Insert row to `card_drops` table
3. Show success confirmation

---

## File 2: client-portal.html — Route Gallery Redesign

### Monthly Summary Bar

Fixed bar below the hero stats grid. Always visible regardless of which week is expanded.

```
22 routes  ·  61 hrs of coverage  ·  May 2026
```

- Pulled by counting `route_maps` rows for `client_id` where `route_date` in current month
- `hours_out` summed for total hours
- Month label auto-formats from current date
- If no routes yet: "No routes logged this month yet — check back after your first drive."

### Weekly Dropdowns

Routes grouped by ISO week. JavaScript groups the fetched `route_maps` array by week on the client side — no extra Supabase query needed.

**Group logic:**
```javascript
function getWeekLabel(dateStr) {
  const d = new Date(dateStr);
  // Get Monday of that week
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(d.setDate(diff));
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return `Week of ${fmt(monday)} – ${fmt(sunday)}`; // "Week of May 19 – May 25"
}
```

**Dropdown structure:**
```html
<div class="week-group">
  <button class="week-toggle" onclick="toggleWeek(this)">
    <span class="week-label">Week of May 19 – May 25</span>
    <span class="week-count">7 routes</span>
    <span class="week-chevron">▼</span>
  </button>
  <div class="week-routes">
    <!-- route cards -->
  </div>
</div>
```

Most recent week: expanded by default (`week-routes` visible). All others: collapsed.

### Route Map Card

Each card inside a weekly group:

```
┌────────────────────────────────────────┐
│  [Interactive Leaflet map — 220px tall] │
│   Gold polyline on dark tiles           │
│   Green start dot · Red end dot         │
├────────────────────────────────────────┤
│  Lehi / Alpine Corridor    May 25       │
│  4.5 hrs on the road                   │
└────────────────────────────────────────┘
```

**Map rendering:**
- Each card gets its own Leaflet map instance (small, non-interactive by default — scroll zoom disabled, drag disabled)
- On card click → lightbox opens with full-size interactive map (zoom/pan enabled)
- Coordinates loaded from `route_coordinates` JSONB column
- Same gold polyline + dark tiles styling

**Performance note:** Rendering 30 Leaflet maps on page load would be slow. Use **lazy initialization** — maps render only when their week group is expanded (or when they enter the viewport via IntersectionObserver). Collapsed weeks do not initialize their maps until opened.

**Empty state (no routes yet):**
```
No routes logged yet — check back after your campaign launches.
```

### Business Card Drops Section

Below the route gallery. Only renders if `card_drops` has rows for this client.

**Section heading:** "Business Card Drops This Month"

**Each entry:**
```
May 23  ·  Saratoga Springs  ·  12 cards delivered
[Verification photo thumbnail — click to enlarge]
```

**Monthly total line:**
```
47 business cards delivered this month
```

No section at all if zero drops — don't show an empty state, just hide the section entirely.

---

## File 3: Additional Portal Features

These are lower-effort additions that complete the portal experience.

### Ad Creative on File

In the right sidebar (below Active Plan card):

**"Your Ad"** card — shows the client's current ad design file if one has been uploaded by Danyon. Simple image display. If none uploaded: card doesn't render.

Requires: `ad_creative_url text` column on `profiles` table. Admin can upload an image and save the URL to the client's profile row.

### Renewal Countdown

In the Active Plan card (already exists in sidebar), below the renewal date:

```
Renews in 12 days  [████████░░] 
```

Progress bar fills as the billing period progresses. At 7 days or fewer: bar turns amber. Subtle, not alarming — just keeps them aware.

### Direct Message Button

In Quick Links card (already exists):

Add: `📩 Message Danyon` → `mailto:danyon@drivertiseusa.com?subject=Client%20Portal%20Message`

Simple. No new infrastructure. Clients feel like they have a direct line.

### Milestone Badges (stretch goal — implement after everything else)

Small amber chip badges on the portal header:

- `🗓 30 Days Active` — when `subscriptions.start_date` is 30+ days ago
- `📍 First Route Logged` — when `route_maps` count ≥ 1
- `🃏 100 Cards Delivered` — when sum of `card_drops.cards_delivered` ≥ 100

Rendered as small inline chips. Purely cosmetic — no new tables needed, just computed from existing data on load.

---

## Implementation Order

1. **Supabase SQL** — run schema changes (route_maps columns + card_drops table)
2. **admin.html** — KML upload with live preview map + business card drop upload form
3. **client-portal.html** — monthly summary + weekly dropdowns + lazy-loaded route map cards
4. **client-portal.html** — business card drops section
5. **client-portal.html** — renewal countdown + direct message button + ad creative card
6. **Milestone badges** — after everything else is working

---

## Verification Steps

1. **KML upload (admin):** Upload a real Google Timeline KML export → preview map renders with gold route line → save → row appears in Supabase `route_maps` with `route_coordinates` populated
2. **Wrong file upload:** Upload a non-KML file or an empty KML → error message appears, submit stays disabled
3. **Client portal — monthly summary:** Correct route count and hours sum for current month
4. **Weekly dropdowns:** Routes grouped correctly by week. Most recent week expanded, others collapsed. Expanding a collapsed week loads its maps
5. **Route card maps:** Gold polyline renders correctly on dark tiles. Start/end markers present. Click opens lightbox with interactive map
6. **Lazy loading:** Open browser DevTools → Network tab → confirm map tiles only load when a week is expanded, not on page load for collapsed weeks
7. **Business card drops:** Upload a drop in admin → appears in client portal with photo and count. Monthly total correct. Section hidden entirely if no drops exist for this client
8. **Renewal countdown:** Bar fills correctly based on start date and renewal date. Turns amber at ≤ 7 days
9. **Empty states:** Client with no routes sees correct empty message. Client with no card drops sees no card drops section at all
10. **Mobile:** Weekly dropdowns, map cards, and sidebar all render correctly on 375px viewport
