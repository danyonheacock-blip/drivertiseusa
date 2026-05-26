# Route Maps Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the screenshot-based route gallery with a KML-powered interactive Leaflet map system — including an upgraded admin upload flow and a redesigned client portal with weekly dropdowns, monthly summary, business card drops, and sidebar enhancements.

**Architecture:** KML files are parsed entirely in the browser using DOMParser. Parsed coordinates are stored as JSONB in Supabase `route_maps`. The client portal renders Leaflet polyline maps from those coordinates, grouped into weekly accordion dropdowns with lazy initialization on expand. No server-side processing required.

**Tech Stack:** Leaflet.js 1.9.4 (CDN), CartoDB Dark Matter tiles (free, no API key), Supabase JS SDK v2, vanilla JS/HTML/CSS.

---

## File Map

| File | What Changes |
|---|---|
| `admin.html` | Replace image upload form with KML upload + DOMParser + Leaflet preview map. Add business card drop upload form. Update recent uploads grid to show area/hours. Add Leaflet CSS/JS. |
| `client-portal.html` | Add Leaflet CSS/JS. Add monthly summary bar. Replace flat routes grid with weekly accordion dropdowns containing Leaflet map cards. Add business card drops section. Add renewal countdown bar. Add message Danyon quick link. Convert lightbox from image to Leaflet map. |

---

## Task 1: Add Leaflet to admin.html and replace upload form HTML

**Files:**
- Modify: `D:/Projects/Drivertiseusa/admin.html`

- [ ] **Step 1: Add Leaflet CSS to `<head>`**

Find the existing `<head>` block in admin.html. It currently has Supabase SDK linked. Add the Leaflet CSS after the existing `<link>` tags but before `</head>`:

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
```

- [ ] **Step 2: Add Leaflet JS before `</body>`**

admin.html has a large `<script>` block at the end. Add the Leaflet JS CDN tag immediately before that `<script>` tag:

```html
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
```

- [ ] **Step 3: Replace the Route Maps upload card HTML**

Find and replace the entire `<div class="card">` block that contains "Upload Route Screenshot" (lines ~393–424). Replace with:

```html
<div class="card">
  <div class="card-title">Upload KML Route</div>
  <div class="page-sub" style="margin-bottom:20px;">Export from Google Maps → Timeline → select day → ··· → Export this day</div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
    <div class="form-group">
      <label style="display:block;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--muted);margin-bottom:6px;">Client</label>
      <select id="rm-client-select" onchange="loadClientRoutes()" style="width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);padding:10px 14px;border-radius:8px;font-size:13px;">
        <option value="">— Select Client —</option>
      </select>
    </div>
    <div class="form-group">
      <label style="display:block;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--muted);margin-bottom:6px;">Route Date</label>
      <input type="date" id="rm-date" style="width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);padding:10px 14px;border-radius:8px;font-size:13px;" />
    </div>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
    <div class="form-group">
      <label style="display:block;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--muted);margin-bottom:6px;">Area Name</label>
      <input type="text" id="rm-area" placeholder="e.g. Lehi / Alpine Corridor" style="width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);padding:10px 14px;border-radius:8px;font-size:13px;" />
    </div>
    <div class="form-group">
      <label style="display:block;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--muted);margin-bottom:6px;">Hours Out</label>
      <input type="number" id="rm-hours" min="0.5" step="0.5" placeholder="e.g. 4.5" style="width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);padding:10px 14px;border-radius:8px;font-size:13px;" />
    </div>
  </div>

  <div class="form-group" style="margin-bottom:16px;">
    <label style="display:block;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--muted);margin-bottom:6px;">KML File</label>
    <input type="file" id="rm-file" accept=".kml" onchange="handleKMLSelect(this)" style="background:var(--card);border:1px solid var(--border);color:var(--text);padding:10px 14px;border-radius:8px;font-size:13px;width:100%;cursor:pointer;" />
    <div id="rm-parse-error" style="display:none;color:#e07070;font-size:12px;margin-top:6px;"></div>
  </div>

  <!-- KML preview map — hidden until file parsed -->
  <div id="rm-preview-map-wrap" style="display:none;margin-bottom:16px;">
    <div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--muted);margin-bottom:6px;">Route Preview</div>
    <div id="rm-preview-map" style="height:240px;border-radius:10px;overflow:hidden;border:1px solid var(--border);"></div>
    <div id="rm-parse-info" style="font-size:12px;color:var(--muted);margin-top:6px;"></div>
  </div>

  <div class="form-group" style="margin-bottom:20px;">
    <label style="display:block;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--muted);margin-bottom:6px;">Notes (internal only)</label>
    <textarea id="rm-notes" rows="2" placeholder="Optional internal notes..." style="width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);padding:10px 14px;border-radius:8px;font-size:13px;resize:vertical;font-family:'DM Sans',sans-serif;"></textarea>
  </div>

  <button id="rm-save-btn" onclick="saveRouteMap()" disabled style="background:var(--amber);color:#0A0D12;border:none;padding:12px 28px;border-radius:8px;font-family:'Syne',sans-serif;font-size:13px;font-weight:700;cursor:pointer;transition:opacity 0.2s;opacity:0.4;" onmouseover="if(!this.disabled)this.style.opacity='0.85'" onmouseout="if(!this.disabled)this.style.opacity='1'">
    Save Route
  </button>
  <span id="rm-upload-msg" style="margin-left:16px;font-size:13px;color:var(--muted);"></span>
</div>
```

- [ ] **Step 4: Commit**

```bash
git add admin.html
git commit -m "feat: admin route upload form — KML fields + preview map container"
```

---

## Task 2: KML parse logic + Leaflet preview map in admin.html

**Files:**
- Modify: `D:/Projects/Drivertiseusa/admin.html` (JS section)

- [ ] **Step 1: Add `parseKML` and `handleKMLSelect` functions**

Find the `uploadRouteMap()` function (around line 1051) and replace the entire function with the following block. This replaces the old image-upload flow with KML parsing:

```javascript
// ── KML ROUTE UPLOAD ────────────────────────────
let rmParsedCoords = [];
let rmPreviewMap = null;

function parseKML(fileText) {
  const parser = new DOMParser();
  const kml = parser.parseFromString(fileText, 'text/xml');
  const coordNodes = kml.querySelectorAll('LineString coordinates, coordinates');
  const coords = [];
  coordNodes.forEach(function(node) {
    const raw = node.textContent.trim();
    raw.split(/\s+/).forEach(function(triplet) {
      const parts = triplet.split(',');
      if (parts.length >= 2) {
        const lng = parseFloat(parts[0]);
        const lat = parseFloat(parts[1]);
        if (!isNaN(lat) && !isNaN(lng)) coords.push([lat, lng]);
      }
    });
  });
  return coords; // [[lat, lng], ...]
}

function handleKMLSelect(input) {
  const errorEl = document.getElementById('rm-parse-error');
  const previewWrap = document.getElementById('rm-preview-map-wrap');
  const parseInfo = document.getElementById('rm-parse-info');
  const saveBtn = document.getElementById('rm-save-btn');

  errorEl.style.display = 'none';
  errorEl.textContent = '';
  previewWrap.style.display = 'none';
  saveBtn.disabled = true;
  saveBtn.style.opacity = '0.4';
  rmParsedCoords = [];

  if (!input.files || !input.files[0]) return;

  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    const coords = parseKML(e.target.result);

    if (coords.length < 2) {
      errorEl.textContent = 'No route coordinates found in this file — make sure you exported a KML from Google Timeline.';
      errorEl.style.display = 'block';
      return;
    }

    rmParsedCoords = coords;

    // Show preview map
    previewWrap.style.display = 'block';
    parseInfo.textContent = coords.length + ' GPS points loaded.';

    // Destroy previous map instance if any
    if (rmPreviewMap) {
      rmPreviewMap.remove();
      rmPreviewMap = null;
    }

    rmPreviewMap = L.map('rm-preview-map', { zoomControl: true, scrollWheelZoom: false });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap © CARTO',
      maxZoom: 18
    }).addTo(rmPreviewMap);

    const polyline = L.polyline(coords, { color: '#C8973A', weight: 3, opacity: 0.9 }).addTo(rmPreviewMap);
    rmPreviewMap.fitBounds(polyline.getBounds(), { padding: [16, 16] });

    // Start/end markers
    L.circleMarker(coords[0], { radius: 6, fillColor: '#1DB870', color: '#fff', weight: 2, fillOpacity: 1 }).addTo(rmPreviewMap);
    L.circleMarker(coords[coords.length - 1], { radius: 6, fillColor: '#e07070', color: '#fff', weight: 2, fillOpacity: 1 }).addTo(rmPreviewMap);

    // Enable save
    saveBtn.disabled = false;
    saveBtn.style.opacity = '1';
  };
  reader.readAsText(file);
}

async function saveRouteMap() {
  const clientId = document.getElementById('rm-client-select').value;
  const routeDate = document.getElementById('rm-date').value;
  const areaName = document.getElementById('rm-area').value.trim();
  const hoursOut = parseFloat(document.getElementById('rm-hours').value) || null;
  const notes = document.getElementById('rm-notes').value.trim();
  const msg = document.getElementById('rm-upload-msg');
  const saveBtn = document.getElementById('rm-save-btn');

  if (!clientId) { alert('Select a client.'); return; }
  if (!routeDate) { alert('Select a route date.'); return; }
  if (!rmParsedCoords.length) { alert('No KML parsed yet. Select a KML file first.'); return; }

  saveBtn.disabled = true;
  saveBtn.style.opacity = '0.4';
  msg.textContent = 'Saving...';

  // Store coords as array of {lat, lng} objects for Supabase JSONB
  const coordsForDB = rmParsedCoords.map(function(c) { return { lat: c[0], lng: c[1] }; });

  const { error } = await sb.from('route_maps').insert({
    client_id: clientId,
    route_date: routeDate,
    area_name: areaName || null,
    hours_out: hoursOut,
    route_coordinates: coordsForDB,
    image_url: null,
    notes: notes || null
  });

  if (error) {
    msg.textContent = 'Save failed: ' + error.message;
    saveBtn.disabled = false;
    saveBtn.style.opacity = '1';
    return;
  }

  const clientName = document.getElementById('rm-client-select').selectedOptions[0]?.text || '';
  msg.textContent = '✓ Route saved for ' + clientName + ' — ' + routeDate;

  // Reset form
  document.getElementById('rm-file').value = '';
  document.getElementById('rm-area').value = '';
  document.getElementById('rm-hours').value = '';
  document.getElementById('rm-notes').value = '';
  document.getElementById('rm-preview-map-wrap').style.display = 'none';
  document.getElementById('rm-parse-error').style.display = 'none';
  rmParsedCoords = [];
  if (rmPreviewMap) { rmPreviewMap.remove(); rmPreviewMap = null; }
  saveBtn.disabled = true;
  saveBtn.style.opacity = '0.4';

  setTimeout(function() { msg.textContent = ''; }, 4000);
  loadClientRoutes();
}
```

- [ ] **Step 2: Update `loadClientRoutes` to show area/hours instead of image thumbnails**

Find the `loadClientRoutes` function (around line 1010). Replace the `grid.innerHTML = data.map(...)` block inside it with:

```javascript
  grid.innerHTML = data.map(function(r) {
    return '<div style="border:1px solid var(--border);border-radius:10px;background:var(--card);padding:12px 14px;">' +
      '<div style="font-size:12px;font-weight:700;color:var(--amber);margin-bottom:4px;">' + r.route_date + '</div>' +
      '<div style="font-size:13px;color:var(--text);">' + (r.area_name || 'No area label') + '</div>' +
      (r.hours_out ? '<div style="font-size:11px;color:var(--muted);margin-top:4px;">' + r.hours_out + ' hrs</div>' : '') +
      '</div>';
  }).join('');
```

Also update the grid container styles since we no longer show image thumbnails. Find the `rm-preview-grid` div definition in the HTML (the `repeat(4,1fr)` grid) and change the grid-template-columns to `repeat(3,1fr)`.

- [ ] **Step 3: Verify in browser**

Open `admin.html`, enter PIN, navigate to Route Maps. Confirm:
- New form shows Area Name and Hours Out fields
- KML file input shows error when non-KML selected
- Valid KML shows preview map with gold polyline
- Save button enabled only after valid parse
- After save: confirmation message, form resets, recent uploads shows area/hours text cards

- [ ] **Step 4: Commit**

```bash
git add admin.html
git commit -m "feat: admin KML parse + Leaflet preview map for route upload"
```

---

## Task 3: Business card drop upload form in admin.html

**Files:**
- Modify: `D:/Projects/Drivertiseusa/admin.html`

- [ ] **Step 1: Add the card drop form HTML after the route maps page div**

Find the closing `</div>` of `id="page-route-maps"` (the line after the `rm-preview-card` div). Insert a new section immediately after the main upload card but before the `rm-preview-card`:

```html
<!-- BUSINESS CARD DROPS -->
<div class="card" style="margin-top:24px;">
  <div class="card-title">Business Card Drop Log</div>
  <div class="page-sub" style="margin-bottom:20px;">Log each delivery — client sees date, neighborhood, count, and photo in their portal.</div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
    <div class="form-group">
      <label style="display:block;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--muted);margin-bottom:6px;">Client</label>
      <select id="cd-client-select" style="width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);padding:10px 14px;border-radius:8px;font-size:13px;">
        <option value="">— Select Client —</option>
      </select>
    </div>
    <div class="form-group">
      <label style="display:block;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--muted);margin-bottom:6px;">Drop Date</label>
      <input type="date" id="cd-date" style="width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);padding:10px 14px;border-radius:8px;font-size:13px;" />
    </div>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
    <div class="form-group">
      <label style="display:block;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--muted);margin-bottom:6px;">Neighborhood</label>
      <input type="text" id="cd-neighborhood" placeholder="e.g. Saratoga Springs Zone 1" style="width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);padding:10px 14px;border-radius:8px;font-size:13px;" />
    </div>
    <div class="form-group">
      <label style="display:block;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--muted);margin-bottom:6px;">Cards Delivered</label>
      <input type="number" id="cd-cards" min="1" placeholder="e.g. 12" style="width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);padding:10px 14px;border-radius:8px;font-size:13px;" />
    </div>
  </div>

  <div class="form-group" style="margin-bottom:16px;">
    <label style="display:block;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--muted);margin-bottom:6px;">Verification Photo (optional)</label>
    <input type="file" id="cd-photo" accept="image/*" style="background:var(--card);border:1px solid var(--border);color:var(--text);padding:10px 14px;border-radius:8px;font-size:13px;width:100%;cursor:pointer;" />
  </div>

  <div class="form-group" style="margin-bottom:20px;">
    <label style="display:block;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--muted);margin-bottom:6px;">Notes (optional)</label>
    <textarea id="cd-notes" rows="2" placeholder="Optional notes..." style="width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);padding:10px 14px;border-radius:8px;font-size:13px;resize:vertical;font-family:'DM Sans',sans-serif;"></textarea>
  </div>

  <button onclick="saveCardDrop()" style="background:var(--amber);color:#0A0D12;border:none;padding:12px 28px;border-radius:8px;font-family:'Syne',sans-serif;font-size:13px;font-weight:700;cursor:pointer;transition:opacity 0.2s;" onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">
    Log Card Drop
  </button>
  <span id="cd-msg" style="margin-left:16px;font-size:13px;color:var(--muted);"></span>
</div>
```

- [ ] **Step 2: Populate `cd-client-select` when route maps page loads**

In `loadRouteMapClients()`, after it populates `rm-client-select`, add the same population for `cd-client-select`:

```javascript
  const cdSelect = document.getElementById('cd-client-select');
  if (cdSelect) {
    cdSelect.innerHTML = '<option value="">— Select Client —</option>' +
      clients.map(function(c) {
        return '<option value="' + c.id + '">' + (c.business_name || c.name || 'Unknown') + '</option>';
      }).join('');
  }
```

Also set the default date for `cd-date` to today inside `setDefaults()` or inside `loadRouteMapClients()`:

```javascript
  const cdDateEl = document.getElementById('cd-date');
  if (cdDateEl && !cdDateEl.value) cdDateEl.value = new Date().toISOString().split('T')[0];
```

- [ ] **Step 3: Add `saveCardDrop` function to admin.html JS**

Add after the `saveRouteMap` function:

```javascript
async function saveCardDrop() {
  const clientId = document.getElementById('cd-client-select').value;
  const dropDate = document.getElementById('cd-date').value;
  const neighborhood = document.getElementById('cd-neighborhood').value.trim();
  const cardsDelivered = parseInt(document.getElementById('cd-cards').value) || 0;
  const photoFile = document.getElementById('cd-photo').files[0];
  const notes = document.getElementById('cd-notes').value.trim();
  const msg = document.getElementById('cd-msg');

  if (!clientId) { alert('Select a client.'); return; }
  if (!dropDate) { alert('Select a drop date.'); return; }
  if (!neighborhood) { alert('Enter a neighborhood.'); return; }
  if (!cardsDelivered) { alert('Enter the number of cards delivered.'); return; }

  msg.textContent = 'Saving...';

  let photoUrl = null;
  if (photoFile) {
    const ext = photoFile.name.split('.').pop();
    const path = clientId + '/' + dropDate + '-' + Date.now() + '.' + ext;
    const { error: uploadErr } = await sb.storage.from('card-drop-photos').upload(path, photoFile, { upsert: false });
    if (uploadErr) {
      msg.textContent = 'Photo upload failed: ' + uploadErr.message;
      return;
    }
    const { data: urlData } = sb.storage.from('card-drop-photos').getPublicUrl(path);
    photoUrl = urlData.publicUrl;
  }

  const { error } = await sb.from('card_drops').insert({
    client_id: clientId,
    drop_date: dropDate,
    neighborhood: neighborhood,
    cards_delivered: cardsDelivered,
    photo_url: photoUrl,
    notes: notes || null
  });

  if (error) {
    msg.textContent = 'Save failed: ' + error.message;
    return;
  }

  msg.textContent = '✓ Drop logged — ' + cardsDelivered + ' cards in ' + neighborhood;
  document.getElementById('cd-neighborhood').value = '';
  document.getElementById('cd-cards').value = '';
  document.getElementById('cd-photo').value = '';
  document.getElementById('cd-notes').value = '';
  setTimeout(function() { msg.textContent = ''; }, 4000);
}
```

- [ ] **Step 4: Verify in browser**

Navigate to Route Maps in admin. Confirm card drop form is visible below the KML upload card. Fill it in without a photo and save — row should appear in Supabase `card_drops` table with `photo_url = null`. Try with a photo — verify `photo_url` is populated.

- [ ] **Step 5: Commit**

```bash
git add admin.html
git commit -m "feat: admin business card drop log form with photo upload"
```

---

## Task 4: Add Leaflet + monthly summary bar to client-portal.html

**Files:**
- Modify: `D:/Projects/Drivertiseusa/client-portal.html`

- [ ] **Step 1: Add Leaflet CSS to `<head>`**

In `client-portal.html`, find the `</head>` tag. Add before it:

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
```

- [ ] **Step 2: Add Leaflet JS before the closing `</script>` tag**

Find the `<script>` block near the bottom of client-portal.html. Add the Leaflet JS before it:

```html
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
```

- [ ] **Step 3: Add monthly summary bar CSS**

In the `<style>` block of client-portal.html, add:

```css
.monthly-summary {
  display: flex;
  align-items: center;
  gap: 32px;
  background: rgba(200,151,58,0.06);
  border: 1px solid rgba(200,151,58,0.20);
  border-radius: 12px;
  padding: 16px 24px;
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
  color: var(--gold, #C8973A);
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

- [ ] **Step 4: Add monthly summary bar HTML**

Find the Route Maps section in client-portal.html:

```html
      <!-- ROUTE MAPS -->
      <div class="section">
```

Replace the section opening with:

```html
      <!-- ROUTE MAPS -->
      <div class="section">
        <div class="section-header">
          <h2 class="section-title">Route Reports</h2>
        </div>
        <p class="section-sub">Your ad in the field — every route logged and mapped.</p>

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

Also remove the old section header and sub text that was already there (the `<div class="section-header">` and `<p class="section-sub">` lines).

- [ ] **Step 5: Add `loadMonthlySummary` function**

In the JS section, add after the `renderInvoices` function:

```javascript
function loadMonthlySummary(routes) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthRoutes = routes.filter(function(r) {
    const d = new Date(r.route_date + 'T12:00:00');
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const totalHours = monthRoutes.reduce(function(sum, r) {
    return sum + (parseFloat(r.hours_out) || 0);
  }, 0);

  document.getElementById('summary-routes').textContent = monthRoutes.length;
  document.getElementById('summary-hours').textContent = totalHours % 1 === 0 ? totalHours : totalHours.toFixed(1);
  document.getElementById('summary-month').textContent = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}
```

- [ ] **Step 6: Call `loadMonthlySummary` from the routes load**

Find the line `renderRoutes(routes || []);` in the data loading section. Replace with:

```javascript
      renderRoutes(routes || []);
      loadMonthlySummary(routes || []);
```

- [ ] **Step 7: Commit**

```bash
git add client-portal.html
git commit -m "feat: client portal Leaflet setup + monthly summary bar"
```

---

## Task 5: Weekly dropdowns + route map cards in client-portal.html

**Files:**
- Modify: `D:/Projects/Drivertiseusa/client-portal.html`

- [ ] **Step 1: Add week group CSS**

In the `<style>` block, add:

```css
/* Weekly accordion */
.weeks-container { display: flex; flex-direction: column; gap: 8px; }
.week-group { border: 1px solid rgba(247,245,241,0.08); border-radius: 12px; overflow: hidden; }
.week-toggle {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  background: rgba(247,245,241,0.03);
  border: none;
  color: var(--cream, #F7F5F1);
  cursor: pointer;
  font-family: 'Syne', sans-serif;
  font-size: 13px;
  font-weight: 700;
  text-align: left;
  transition: background 0.2s;
}
.week-toggle:hover { background: rgba(247,245,241,0.06); }
.week-label { flex: 1; }
.week-count { font-size: 11px; color: rgba(247,245,241,0.40); font-weight: 400; font-family: 'DM Sans', sans-serif; }
.week-chevron { font-size: 10px; color: rgba(247,245,241,0.35); transition: transform 0.2s; }
.week-toggle.open .week-chevron { transform: rotate(180deg); }
.week-routes {
  display: none;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 16px;
  background: rgba(0,0,0,0.15);
}
.week-routes.open { display: grid; }

/* Route map card */
.route-map-card {
  border: 1px solid rgba(247,245,241,0.08);
  border-radius: 10px;
  overflow: hidden;
  background: rgba(247,245,241,0.03);
  cursor: pointer;
  transition: border-color 0.2s;
}
.route-map-card:hover { border-color: rgba(200,151,58,0.40); }
.route-map-canvas {
  height: 180px;
  background: #0d1117;
}
.route-card-info {
  padding: 10px 12px;
}
.route-card-area {
  font-size: 12px;
  font-weight: 700;
  color: #C8973A;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.route-card-meta {
  font-size: 11px;
  color: rgba(247,245,241,0.45);
}

/* Map lightbox */
#map-lightbox {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 9000;
  background: rgba(0,0,0,0.92);
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#map-lightbox.open { display: flex; }
#map-lightbox-inner {
  position: relative;
  width: min(900px, 94vw);
  height: min(600px, 80vh);
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(200,151,58,0.30);
}
#map-lightbox-map { width: 100%; height: 100%; }
#map-lightbox-caption {
  margin-top: 14px;
  font-size: 13px;
  color: rgba(247,245,241,0.60);
  text-align: center;
}
.map-lightbox-close {
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  color: rgba(247,245,241,0.70);
  font-size: 28px;
  cursor: pointer;
  z-index: 9100;
  line-height: 1;
}
.map-lightbox-close:hover { color: white; }

@media (max-width: 700px) {
  .week-routes { grid-template-columns: 1fr; }
}
```

- [ ] **Step 2: Replace routes-grid div with weeks-container**

Find this in client-portal.html:

```html
        <div class="routes-grid" id="routes-grid">
          <!-- populated by JS -->
        </div>
      </div>
```

Replace with:

```html
        <div class="weeks-container" id="weeks-container">
          <!-- populated by JS -->
        </div>
      </div>
```

- [ ] **Step 3: Add map lightbox HTML**

Find the existing lightbox HTML:

```html
  <!-- LIGHTBOX -->
  <div id="lightbox" role="dialog" aria-modal="true">
    <button class="lightbox-close" onclick="closeLightbox()" aria-label="Close">&times;</button>
    <div class="lightbox-overlay" onclick="closeLightbox()"></div>
    <img id="lightbox-img" src="" alt="Route map full size" />
    <p id="lightbox-caption"></p>
  </div>
```

Replace with:

```html
  <!-- MAP LIGHTBOX -->
  <div id="map-lightbox" role="dialog" aria-modal="true">
    <button class="map-lightbox-close" onclick="closeMapLightbox()" aria-label="Close">&times;</button>
    <div id="map-lightbox-inner">
      <div id="map-lightbox-map"></div>
    </div>
    <p id="map-lightbox-caption"></p>
  </div>
```

- [ ] **Step 4: Replace `renderRoutes` function and add week/map helpers**

Find the `renderRoutes(routes)` function in the JS section. Replace the entire function with:

```javascript
function getWeekKey(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(d);
  monday.setDate(diff);
  return monday.toISOString().split('T')[0]; // YYYY-MM-DD of that Monday
}

function fmtDate(dateStr) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function fmtWeekLabel(mondayStr) {
  const monday = new Date(mondayStr + 'T12:00:00');
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const opts = { month: 'short', day: 'numeric' };
  return 'Week of ' + monday.toLocaleDateString('en-US', opts) + ' – ' + sunday.toLocaleDateString('en-US', opts);
}

function renderRoutes(routes) {
  const container = document.getElementById('weeks-container');
  if (!container) return;

  if (!routes.length) {
    container.innerHTML = '<p style="color:rgba(247,245,241,0.35);padding:32px 0;">No routes logged yet — check back after your campaign launches.</p>';
    return;
  }

  // Group by week key (Monday date)
  const weekMap = {};
  routes.forEach(function(r) {
    const key = getWeekKey(r.route_date);
    if (!weekMap[key]) weekMap[key] = [];
    weekMap[key].push(r);
  });

  // Sort weeks newest first
  const sortedKeys = Object.keys(weekMap).sort(function(a, b) { return b.localeCompare(a); });

  container.innerHTML = sortedKeys.map(function(key, idx) {
    const weekRoutes = weekMap[key];
    const isOpen = idx === 0;
    const cardsHTML = weekRoutes.map(function(r) {
      const coordsAttr = r.route_coordinates ? JSON.stringify(r.route_coordinates) : '';
      const dateLabel = fmtDate(r.route_date);
      const area = r.area_name || 'Route';
      const hours = r.hours_out ? r.hours_out + ' hrs' : '';
      return '<div class="route-map-card" data-coords=\'' + coordsAttr.replace(/'/g, '&#39;') + '\' data-label="' + area + '" data-date="' + r.route_date + '" data-initialized="false" onclick="openMapLightbox(this)">' +
        '<div class="route-map-canvas" id="map-' + r.id + '"></div>' +
        '<div class="route-card-info">' +
          '<div class="route-card-area">' + area + '</div>' +
          '<div class="route-card-meta">' + dateLabel + (hours ? ' · ' + hours : '') + '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    return '<div class="week-group">' +
      '<button class="week-toggle' + (isOpen ? ' open' : '') + '" onclick="toggleWeek(this)">' +
        '<span class="week-label">' + fmtWeekLabel(key) + '</span>' +
        '<span class="week-count">' + weekRoutes.length + ' route' + (weekRoutes.length !== 1 ? 's' : '') + '</span>' +
        '<span class="week-chevron">▼</span>' +
      '</button>' +
      '<div class="week-routes' + (isOpen ? ' open' : '') + '">' + cardsHTML + '</div>' +
    '</div>';
  }).join('');

  // Initialize maps for the first (open) week immediately
  const firstWeekRoutes = container.querySelector('.week-routes.open');
  if (firstWeekRoutes) initWeekMaps(firstWeekRoutes);
}

function toggleWeek(btn) {
  btn.classList.toggle('open');
  const routesEl = btn.nextElementSibling;
  routesEl.classList.toggle('open');
  // Lazy-init maps when week opens
  if (routesEl.classList.contains('open')) {
    initWeekMaps(routesEl);
  }
}

function initWeekMaps(weekEl) {
  const cards = weekEl.querySelectorAll('.route-map-card[data-initialized="false"]');
  cards.forEach(function(card) {
    card.dataset.initialized = 'true';
    const coordsRaw = card.dataset.coords;
    if (!coordsRaw) return;
    let coords;
    try { coords = JSON.parse(coordsRaw); } catch(e) { return; }
    if (!coords || !coords.length) return;

    // Find the canvas div inside this card
    const canvas = card.querySelector('.route-map-canvas');
    if (!canvas) return;

    const latlngs = coords.map(function(c) { return [c.lat, c.lng]; });
    const map = L.map(canvas, {
      zoomControl: false,
      scrollWheelZoom: false,
      dragging: false,
      touchZoom: false,
      doubleClickZoom: false,
      attributionControl: false
    });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 18 }).addTo(map);
    const polyline = L.polyline(latlngs, { color: '#C8973A', weight: 3, opacity: 0.9 }).addTo(map);
    map.fitBounds(polyline.getBounds(), { padding: [8, 8] });
    L.circleMarker(latlngs[0], { radius: 5, fillColor: '#1DB870', color: '#fff', weight: 2, fillOpacity: 1 }).addTo(map);
    L.circleMarker(latlngs[latlngs.length - 1], { radius: 5, fillColor: '#e07070', color: '#fff', weight: 2, fillOpacity: 1 }).addTo(map);

    // Store map instance on the element for cleanup
    card._leafletMap = map;
  });
}
```

- [ ] **Step 5: Update `openLightbox` to `openMapLightbox` and add `closeMapLightbox`**

Find the existing `openLightbox` and `closeLightbox` functions. Replace them with:

```javascript
let lightboxMapInstance = null;

function openMapLightbox(cardEl) {
  const coordsRaw = cardEl.dataset.coords;
  const label = cardEl.dataset.label || 'Route';
  const date = cardEl.dataset.date || '';
  if (!coordsRaw) return;

  let coords;
  try { coords = JSON.parse(coordsRaw); } catch(e) { return; }
  if (!coords || !coords.length) return;

  const lb = document.getElementById('map-lightbox');
  const caption = document.getElementById('map-lightbox-caption');
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';

  const dateStr = date ? new Date(date + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';
  caption.textContent = label + (dateStr ? ' — ' + dateStr : '');

  // Destroy previous lightbox map
  if (lightboxMapInstance) { lightboxMapInstance.remove(); lightboxMapInstance = null; }

  const latlngs = coords.map(function(c) { return [c.lat, c.lng]; });
  lightboxMapInstance = L.map('map-lightbox-map', { zoomControl: true, scrollWheelZoom: true, attributionControl: false });
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 18 }).addTo(lightboxMapInstance);
  const polyline = L.polyline(latlngs, { color: '#C8973A', weight: 4, opacity: 0.95 }).addTo(lightboxMapInstance);
  lightboxMapInstance.fitBounds(polyline.getBounds(), { padding: [24, 24] });
  L.circleMarker(latlngs[0], { radius: 7, fillColor: '#1DB870', color: '#fff', weight: 2, fillOpacity: 1 }).addTo(lightboxMapInstance);
  L.circleMarker(latlngs[latlngs.length - 1], { radius: 7, fillColor: '#e07070', color: '#fff', weight: 2, fillOpacity: 1 }).addTo(lightboxMapInstance);
}

function closeMapLightbox() {
  document.getElementById('map-lightbox').classList.remove('open');
  document.body.style.overflow = '';
  if (lightboxMapInstance) { lightboxMapInstance.remove(); lightboxMapInstance = null; }
}
```

- [ ] **Step 6: Update Escape key handler**

Find:
```javascript
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
```

Replace with:
```javascript
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeMapLightbox();
    });
```

- [ ] **Step 7: Remove stale `routes-count` span reference**

Find and remove this line in the HTML (it referenced the old routes count display):
```html
          <span style="color:rgba(255,255,255,0.35);font-size:14px;">(<span id="routes-count">0</span> total)</span>
```

- [ ] **Step 8: Verify in browser**

Open client-portal.html via magic link. Confirm:
- Monthly summary shows route count and hours
- Most recent week expanded, others collapsed
- Each route card shows a small Leaflet map with gold polyline (or dark placeholder if no coordinates)
- Expanding a collapsed week loads its maps
- Clicking a card opens the map lightbox with full interactive map
- Escape closes the lightbox
- Mobile (375px): cards stack to 1 column

- [ ] **Step 9: Commit**

```bash
git add client-portal.html
git commit -m "feat: client portal weekly dropdowns + lazy Leaflet route map cards + map lightbox"
```

---

## Task 6: Business card drops section in client-portal.html

**Files:**
- Modify: `D:/Projects/Drivertiseusa/client-portal.html`

- [ ] **Step 1: Add card drops section CSS**

In the `<style>` block, add:

```css
.card-drops-section { margin-top: 48px; }
.card-drop-entry {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid rgba(247,245,241,0.06);
}
.card-drop-entry:last-child { border-bottom: none; }
.card-drop-photo {
  width: 72px;
  height: 72px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid rgba(247,245,241,0.10);
  flex-shrink: 0;
  cursor: pointer;
}
.card-drop-photo-placeholder {
  width: 72px;
  height: 72px;
  border-radius: 8px;
  background: rgba(247,245,241,0.04);
  border: 1px solid rgba(247,245,241,0.08);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}
.card-drop-info { flex: 1; }
.card-drop-meta {
  font-size: 11px;
  color: rgba(247,245,241,0.40);
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.card-drop-neighborhood {
  font-size: 14px;
  font-weight: 700;
  color: #F7F5F1;
  margin-bottom: 2px;
}
.card-drop-count {
  font-size: 13px;
  color: #C8973A;
}
.card-drops-total {
  margin-top: 16px;
  font-size: 13px;
  color: rgba(247,245,241,0.50);
  border-top: 1px solid rgba(247,245,241,0.08);
  padding-top: 14px;
}
.card-drops-total strong { color: #C8973A; }
```

- [ ] **Step 2: Add card drops section HTML**

Find the closing `</div>` of the Quick Links section and the closing `</main>` tag. Insert between them:

```html
      <!-- BUSINESS CARD DROPS -->
      <div class="card-drops-section" id="card-drops-section" style="display:none;">
        <div class="section-label">Business Card Drops</div>
        <h2 class="section-title" style="margin-bottom:6px;">Cards Delivered This Month</h2>
        <p class="section-sub">Delivered directly to homes on your behalf.</p>
        <div id="card-drops-list"></div>
      </div>
```

- [ ] **Step 3: Add `loadCardDrops` and `renderCardDrops` functions**

In the JS section, after `loadMonthlySummary`, add:

```javascript
async function loadCardDrops(clientId) {
  const now = new Date();
  const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
  const lastOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];

  const { data: drops } = await sb
    .from('card_drops')
    .select('*')
    .eq('client_id', clientId)
    .gte('drop_date', firstOfMonth)
    .lte('drop_date', lastOfMonth)
    .order('drop_date', { ascending: false });

  renderCardDrops(drops || []);
}

function renderCardDrops(drops) {
  const section = document.getElementById('card-drops-section');
  const list = document.getElementById('card-drops-list');
  if (!section || !list) return;

  if (!drops.length) {
    section.style.display = 'none';
    return;
  }

  section.style.display = 'block';

  const totalCards = drops.reduce(function(sum, d) { return sum + (d.cards_delivered || 0); }, 0);

  list.innerHTML = drops.map(function(d) {
    const dateStr = new Date(d.drop_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const photoHTML = d.photo_url
      ? '<img src="' + d.photo_url + '" class="card-drop-photo" alt="Verification photo" onclick="openDropPhoto(\'' + d.photo_url + '\')" />'
      : '<div class="card-drop-photo-placeholder">🃏</div>';
    return '<div class="card-drop-entry">' +
      photoHTML +
      '<div class="card-drop-info">' +
        '<div class="card-drop-meta">' + dateStr + '</div>' +
        '<div class="card-drop-neighborhood">' + d.neighborhood + '</div>' +
        '<div class="card-drop-count">' + d.cards_delivered + ' cards delivered</div>' +
      '</div>' +
    '</div>';
  }).join('') +
  '<div class="card-drops-total"><strong>' + totalCards + ' business cards</strong> delivered this month</div>';
}

function openDropPhoto(url) {
  // Reuse map lightbox container as an image lightbox for drop photos
  const lb = document.getElementById('map-lightbox');
  const inner = document.getElementById('map-lightbox-inner');
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
  inner.innerHTML = '<img src="' + url + '" style="width:100%;height:100%;object-fit:contain;border-radius:14px;" />';
  document.getElementById('map-lightbox-caption').textContent = 'Verification photo';
}
```

- [ ] **Step 4: Call `loadCardDrops` in the data loading section**

Find the line `renderInvoices(invoices || []);` in the data loading block. Add after it:

```javascript
      loadCardDrops(profile?.id);
```

- [ ] **Step 5: Verify in browser**

With no card drops in Supabase: card drops section should be completely hidden. Add a test row to `card_drops` in Supabase (insert via SQL editor using a valid `client_id`). Reload portal — section should appear with the entry. Upload a real drop with photo in admin — verify photo thumbnail appears and opens in lightbox.

- [ ] **Step 6: Commit**

```bash
git add client-portal.html
git commit -m "feat: client portal business card drops section"
```

---

## Task 7: Sidebar enhancements — renewal countdown + message link

**Files:**
- Modify: `D:/Projects/Drivertiseusa/client-portal.html`

- [ ] **Step 1: Add renewal countdown CSS**

In the `<style>` block, add:

```css
.renewal-bar-wrap {
  margin-top: 10px;
}
.renewal-bar-label {
  font-size: 11px;
  color: rgba(247,245,241,0.40);
  margin-bottom: 5px;
}
.renewal-bar-track {
  height: 4px;
  background: rgba(247,245,241,0.08);
  border-radius: 4px;
  overflow: hidden;
}
.renewal-bar-fill {
  height: 100%;
  background: #C8973A;
  border-radius: 4px;
  transition: width 0.6s ease;
}
.renewal-bar-fill.urgent { background: #e09020; }
```

- [ ] **Step 2: Add renewal bar HTML in the zone card**

Find the renewal zone-field in the HTML:

```html
        <div class="zone-field">
          <label>Next Renewal</label>
          <div class="zone-value"><span id="zone-renewal">—</span></div>
        </div>
```

Replace with:

```html
        <div class="zone-field">
          <label>Next Renewal</label>
          <div class="zone-value"><span id="zone-renewal">—</span></div>
          <div class="renewal-bar-wrap" id="renewal-bar-wrap" style="display:none;">
            <div class="renewal-bar-label" id="renewal-bar-label"></div>
            <div class="renewal-bar-track">
              <div class="renewal-bar-fill" id="renewal-bar-fill" style="width:0%;"></div>
            </div>
          </div>
        </div>
```

- [ ] **Step 3: Add `renderRenewalCountdown` function**

In the JS section, add after `renderCardDrops`:

```javascript
function renderRenewalCountdown(startDateStr, renewalDateStr) {
  const wrap = document.getElementById('renewal-bar-wrap');
  const label = document.getElementById('renewal-bar-label');
  const fill = document.getElementById('renewal-bar-fill');
  if (!wrap || !label || !fill) return;
  if (!startDateStr || !renewalDateStr) return;

  const start = new Date(startDateStr + 'T00:00:00');
  const renewal = new Date(renewalDateStr + 'T00:00:00');
  const now = new Date();

  const totalDays = Math.round((renewal - start) / (1000 * 60 * 60 * 24));
  const daysElapsed = Math.round((now - start) / (1000 * 60 * 60 * 24));
  const daysLeft = Math.round((renewal - now) / (1000 * 60 * 60 * 24));

  if (totalDays <= 0 || daysLeft < 0) return;

  const pct = Math.min(100, Math.max(0, (daysElapsed / totalDays) * 100));
  const urgent = daysLeft <= 7;

  fill.style.width = pct + '%';
  if (urgent) fill.classList.add('urgent');
  label.textContent = 'Renews in ' + daysLeft + ' day' + (daysLeft !== 1 ? 's' : '');
  wrap.style.display = 'block';
}
```

- [ ] **Step 4: Call `renderRenewalCountdown` when subscription loads**

Find the block where `zone-renewal` is set:

```javascript
          document.getElementById('zone-renewal').textContent = sub.next_renewal ?
            new Date(sub.next_renewal).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '—';
```

Add immediately after:

```javascript
          if (sub.start_date && sub.next_renewal) {
            renderRenewalCountdown(sub.start_date, sub.next_renewal);
          }
```

- [ ] **Step 5: Add Message Danyon to quick links**

Find the quick links section:

```html
          <a href="contact.html" class="quick-link">
            <span class="quick-link-icon">✉</span> Contact Support
          </a>
```

Add after it:

```html
          <a href="mailto:danyon@drivertiseusa.com?subject=Client%20Portal%20Message" class="quick-link">
            <span class="quick-link-icon">📩</span> Message Danyon
          </a>
```

- [ ] **Step 6: Verify in browser**

In Supabase, set a test subscription row with `start_date` and `next_renewal` values. Confirm renewal bar appears, fills proportionally, and turns amber when ≤ 7 days remain. Confirm "Message Danyon" link opens mail client with correct pre-filled subject.

- [ ] **Step 7: Commit**

```bash
git add client-portal.html
git commit -m "feat: client portal renewal countdown bar + message Danyon quick link"
```

---

## Task 8: Final verification and push

**Files:** All modified files

- [ ] **Step 1: Full end-to-end check**

Open admin.html:
- Route Maps tab: upload a real KML file → preview renders → save → Supabase row has `route_coordinates`
- Card Drop tab: log a drop with photo → Supabase `card_drops` row created → photo in `card-drop-photos` bucket

Open client-portal.html (via magic link or test session):
- Monthly summary shows correct routes and hours for current month
- Weekly dropdowns group correctly. Most recent open, others collapsed
- Opening a collapsed week initializes its maps
- Route card maps render gold polyline on dark tiles
- Click card → map lightbox opens, Escape closes it
- Card drops section visible only if drops exist in current month
- Renewal bar visible if subscription has `start_date` and `next_renewal`
- Message Danyon link in quick links

Mobile (resize to 375px):
- Route cards stack to 1 column
- Weekly toggles are tappable
- Map lightbox fits viewport

- [ ] **Step 2: Run git status to confirm only intended files modified**

```bash
git status
git log --oneline -8
```

Expected: 5 commits from this feature branch (Tasks 1–4 and 6–7), all clean.

- [ ] **Step 3: Push to GitHub**

```bash
git push origin main
```

Netlify auto-deploys. Verify live URL after deploy completes.

---

## Self-Review Checklist

**Spec coverage:**
- ✅ KML upload with DOMParser (Task 2)
- ✅ Live preview map before save (Task 2)
- ✅ Parse error handling (Task 2)
- ✅ Save disabled until valid parse (Task 2)
- ✅ `area_name`, `hours_out`, `route_coordinates` stored (Task 2)
- ✅ Recent uploads grid updated to show area/hours (Task 2)
- ✅ Business card drop form in admin (Task 3)
- ✅ Photo upload to `card-drop-photos` bucket (Task 3)
- ✅ Monthly summary bar — routes + hours, no impressions (Task 4)
- ✅ Weekly dropdowns (Task 5)
- ✅ Lazy map initialization on week expand (Task 5)
- ✅ Route map cards with Leaflet polyline (Task 5)
- ✅ Start/end markers (Task 5)
- ✅ Map lightbox (Task 5)
- ✅ Empty state when no routes (Task 5)
- ✅ Business card drops section hidden when empty (Task 6)
- ✅ Monthly total card count (Task 6)
- ✅ Photo thumbnail in drops (Task 6)
- ✅ Renewal countdown bar, amber at ≤ 7 days (Task 7)
- ✅ Message Danyon quick link (Task 7)

**Type consistency:**
- `rmParsedCoords` is `[[lat, lng], ...]` in admin (Task 2), converted to `[{lat, lng}]` for Supabase insert ✅
- `route_coordinates` stored as `[{lat, lng}, ...]` in Supabase, read back and converted to `[[lat, lng]]` via `.map(c => [c.lat, c.lng])` in portal (Task 5) ✅
- `lightboxMapInstance` declared once (Task 5), reused in `openDropPhoto` which replaces inner HTML instead of creating a new Leaflet instance ✅
- `initWeekMaps` called from `renderRoutes` (first week) and `toggleWeek` (on expand) ✅
