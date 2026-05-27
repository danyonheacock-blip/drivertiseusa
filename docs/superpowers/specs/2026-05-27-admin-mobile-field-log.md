# Admin Mobile Field Log — Design Spec

**Date:** 2026-05-27
**Scope:** Two dedicated mobile-optimized pages for logging card drops and KML routes from Danyon's phone mid-delivery

---

## Problem

The admin dashboard (`admin.html`) is desktop-only — no responsive CSS, fixed 2-column sidebar layout, complex grids. Danyon pulls his phone out mid-delivery to log card drops in real time. He also uploads KML route files at the end of each drive from his phone. The current admin is unusable for either task on mobile.

---

## Solution

Two dedicated lightweight HTML pages, each with one job. No sidebar. No dashboard complexity. Bookmarkable to the phone home screen as app shortcuts. Same PIN protection and Supabase connection as the main admin. Desktop admin left completely untouched.

---

## Pages

| File | Purpose | When Used |
|---|---|---|
| `admin-log-drop.html` | Log business card drops | Mid-delivery, on the porch |
| `admin-log-route.html` | Upload KML route file | End of drive, still on phone |

---

## Page 1: admin-log-drop.html

### Layout

- Minimal sticky header: `DRIVERTISE·` logo + `FIELD LOG` amber chip
- Single-column form, no sidebar
- Footer: "Open Full Dashboard →" link + "Add to Home Screen for one-tap access" hint
- Small cross-link: "Switch to Route Logger →"

### Form Fields

All inputs: `min-height: 52px`, `font-size: 16px` (prevents iOS auto-zoom), large tap targets.

| # | Field | Type | Behavior |
|---|---|---|---|
| 1 | Client | `<select>` | Pre-loaded from Supabase `profiles` table on page load. Remembers last selection after each submission — does not reset |
| 2 | Date | `<input type="date">` | Auto-filled to today's date on page load. Editable |
| 3 | Neighborhood | `<input type="text">` | Placeholder: "e.g. Saratoga Springs Zone 1" |
| 4 | Cards Delivered | `<input type="number" inputmode="numeric">` | Min: 1. Numeric keyboard on mobile |
| 5 | Verification Photo | `<input type="file" accept="image/*" capture="environment">` | Opens back camera directly — no file picker navigation. Shows filename confirmation after capture |
| 6 | Submit | `<button>` | Full-width, gold fill, "Log This Drop →". Always enabled once client is selected |

**No notes field** — keeps the form to 5 fields. Notes can be added from the desktop admin if needed.

### Submission Flow

1. Client posts to Supabase `card_drops` table: `{ client_id, drop_date, neighborhood, cards_delivered, photo_url, notes: null }`
2. If photo selected: upload to `card-drop-photos` storage bucket first, then get public URL via `sb.storage.from('card-drop-photos').getPublicUrl(path).data.publicUrl` — this call is synchronous, no `await` needed. Include URL in insert
3. On success: show success screen
4. On error: show red error message inline, keep form filled so nothing is lost

### Success Screen

Replaces the form entirely. Contains:
- Large green checkmark circle
- "Drop Logged" heading (Syne, 20px, white)
- Summary: `[Client Name] · [N] cards · [Neighborhood] · [Date]`
- "Log Another Drop" button — clears neighborhood, cards, and photo fields; **keeps client dropdown on last selection**; returns to form
- "Open Full Dashboard →" small link

---

## Page 2: admin-log-route.html

### Layout

- Same header as card drop logger: `DRIVERTISE·` logo + `FIELD LOG` chip
- Single-column form, no sidebar
- Footer: same "Open Full Dashboard →" link + home screen hint
- Small cross-link: "Switch to Card Drop Logger →"

### Form Fields

| # | Field | Type | Behavior |
|---|---|---|---|
| 1 | Client | `<select>` | Same as card drop — pre-loaded, remembers last selection |
| 2 | Route Date | `<input type="date">` | Auto-filled to today |
| 3 | Area Name | `<input type="text">` | Placeholder: "e.g. Lehi / Alpine Corridor" |
| 4 | Hours Out | `<input type="number" step="0.5" min="0.5">` | Decimal keyboard |
| 5 | KML File | `<input type="file" accept=".kml">` | No camera capture. On select: parse immediately, show coordinate count confirmation or error |
| 6 | Submit | `<button>` | "Save Route →". Disabled until KML parsed successfully |

**No Leaflet map preview** — too slow and too small to be useful on a phone. The coordinate count confirmation is sufficient.

### KML Parse Behavior

Copy the `parseKML()` function verbatim from `admin.html` — these pages are self-contained, no shared JS files. The function:
- Parse returns `[[lat, lng], ...]` array
- **Success:** Show green confirmation: `"✓ Route parsed — [N] coordinates"` + filename. Enable submit button
- **Failure (< 2 coordinates or parse error):** Show red message: `"No route coordinates found — make sure you exported a KML from Google Timeline."` Submit stays disabled

### Submission Flow

1. Converts parsed `[[lat, lng]]` to `[{lat, lng}]` for Supabase JSONB storage (consistent with admin.html)
2. Inserts to `route_maps`: `{ client_id, route_date, area_name, hours_out, route_coordinates, image_url: null, notes: null }`
3. On success: show success screen
4. On error: inline red message, form preserved

### Success Screen

- Large green checkmark
- "Route Saved" heading
- Summary: `[Client Name] · [Area Name] · [N] hrs · [Date]`
- "Log Another Route" button — clears area, hours, KML file fields; keeps client selected
- "Open Full Dashboard →" link

---

## Shared Technical Details

### PIN Protection

Same PIN check as `admin.html`. On page load:

```javascript
const unlocked = sessionStorage.getItem('drivertise_admin_unlocked');
if (!unlocked) {
  // Show PIN overlay, same logic as admin.html
  // On correct PIN: sessionStorage.setItem('drivertise_admin_unlocked', '1')
}
```

If already unlocked in the same browser session (e.g. admin.html was opened first), PIN overlay is skipped automatically.

### Supabase

Same anon key and project URL as `admin.html`. On page load:
1. Initialize Supabase client
2. Query `profiles` table, populate client dropdown
3. Set date fields to today: `new Date().toISOString().split('T')[0]`

### Client Dropdown Memory

After each successful submission, store the selected client ID:

```javascript
localStorage.setItem('drivertise_last_client', clientSelect.value);
```

On "Log Another" — restore from localStorage:

```javascript
const lastClient = localStorage.getItem('drivertise_last_client');
if (lastClient) clientSelect.value = lastClient;
```

Uses `localStorage` (not `sessionStorage`) so it persists across page opens — if Danyon closes and reopens the page, his last client is still pre-selected.

### Styling

Self-contained `<style>` block in each page — no external CSS files. Brand tokens:
- `--ink: #0A0D12` — background
- `--amber: #C8973A` — primary action color
- `--green: #1E8C5C` — success states
- `--red: #B83020` — error states
- `--text: rgba(255,255,255,0.88)` — body text
- Font: `Syne` (headings, buttons, labels) + `DM Sans` (inputs, body)

Input font-size must be `16px` or larger to prevent iOS Safari from zooming on focus.

### No Changes to admin.html

Zero modifications to the existing desktop admin dashboard. These are additive new files only.

---

## File Structure

```
D:\Projects\Drivertiseusa\
├── admin-log-drop.html      ← New: card drop field logger
├── admin-log-route.html     ← New: KML route field logger
└── mockup-mobile-admin.html ← Reference mockup (can be deleted post-build)
```

---

## How to Add to Home Screen

**iPhone (Safari):**
1. Open `drivertiseusa.com/admin-log-drop.html`
2. Tap Share → "Add to Home Screen"
3. Name it "Log Drop" → Add
4. Repeat for `admin-log-route.html` → name it "Log Route"

**Android (Chrome):**
1. Open the URL
2. Tap ··· menu → "Add to Home Screen"

Both icons will appear on the home screen and open directly to the form with no browser chrome.

---

## Verification Steps

1. **Card drop — full flow:** Open `admin-log-drop.html` on phone → enter PIN → select client → fill neighborhood + card count → tap photo button → camera opens → take photo → submit → success screen shows correct summary
2. **Card drop — remember client:** After success, tap "Log Another Drop" → client dropdown stays on previous client
3. **Card drop — localStorage persistence:** Submit a drop, close the page, reopen → client dropdown pre-selects last client
4. **Route — KML parse success:** Select a real Google Timeline KML → green confirmation shows coordinate count → submit enabled → save → success screen
5. **Route — KML parse failure:** Select a non-KML file → red error shows → submit stays disabled
6. **PIN skip:** Open `admin.html`, unlock PIN, then open `admin-log-drop.html` in same tab → PIN not required again
7. **Desktop admin unchanged:** Open `admin.html` on desktop → all existing functionality intact, no visual regressions
8. **Cross-links:** "Switch to Route Logger" on drop page navigates to route page and vice versa
9. **Full dashboard link:** "Open Full Dashboard →" navigates to `admin.html`
10. **iOS zoom test:** Tap any input on iPhone — page must not zoom in (font-size 16px enforced)
