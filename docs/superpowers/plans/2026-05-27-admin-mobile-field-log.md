# Admin Mobile Field Log Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build two dedicated mobile-optimized admin pages (`admin-log-drop.html` and `admin-log-route.html`) that Danyon can bookmark to his phone's home screen for logging card drops mid-delivery and KML routes at end of drive.

**Architecture:** Two fully self-contained HTML files — no shared CSS or JS files. Each page has its own PIN check (using `sessionStorage` for cross-page session sharing), Supabase client, form, and success state. A PWA manifest + Apple Touch Icon meta tags make them installable as home screen app shortcuts with the Drivertise D-logo icon.

**Tech Stack:** Vanilla HTML/CSS/JS, Supabase JS SDK v2 (CDN), no frameworks, no build step. PWA Web App Manifest for home screen installation.

---

## File Structure

```
D:\Projects\Drivertiseusa\
├── admin-log-drop.html          ← New: card drop field logger
├── admin-log-route.html         ← New: KML route field logger
├── field-log-manifest.json      ← New: PWA manifest for both pages
└── assets/
    └── icons/
        ├── field-log-icon-512.png   ← User provides (save from conversation)
        └── field-log-icon-192.png   ← Copy of 512px (or resize)
```

**No changes to `admin.html`.** These are additive files only.

---

### Task 1: Save App Icon + Create PWA Manifest

**Files:**
- Create: `D:\Projects\Drivertiseusa\assets\icons\` (directory)
- Create: `D:\Projects\Drivertiseusa\assets\icons\field-log-icon-512.png` (manual)
- Create: `D:\Projects\Drivertiseusa\assets\icons\field-log-icon-192.png` (copy)
- Create: `D:\Projects\Drivertiseusa\field-log-manifest.json`

- [ ] **Step 1: Create the icons directory**

```bash
mkdir -p D:/Projects/Drivertiseusa/assets/icons
```

- [ ] **Step 2: Save the icon image**

The Drivertise D-logo icon was provided in the brainstorming conversation (grey square background, yellow bold "D" with speed lines, yellow-green border). Save it manually:

1. Locate the image in the Claude conversation
2. Right-click → Save Image As
3. Save as: `D:\Projects\Drivertiseusa\assets\icons\field-log-icon-512.png`
4. Copy the same file as the 192px variant:

```bash
cp D:/Projects/Drivertiseusa/assets/icons/field-log-icon-512.png \
   D:/Projects/Drivertiseusa/assets/icons/field-log-icon-192.png
```

*(Both sizes point to the same image — browsers and OS scale it. A future improvement is resizing properly.)*

- [ ] **Step 3: Create the PWA manifest**

Create `D:\Projects\Drivertiseusa\field-log-manifest.json`:

```json
{
  "name": "Drivertise Field Log",
  "short_name": "Field Log",
  "description": "Log card drops and routes from the field",
  "start_url": "/admin-log-drop.html",
  "display": "standalone",
  "background_color": "#0A0D12",
  "theme_color": "#C8973A",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/assets/icons/field-log-icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/assets/icons/field-log-icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

- [ ] **Step 4: Verify icon file exists**

```bash
ls D:/Projects/Drivertiseusa/assets/icons/
```

Expected output:
```
field-log-icon-192.png
field-log-icon-512.png
```

- [ ] **Step 5: Commit**

```bash
cd D:/Projects/Drivertiseusa
git add assets/icons/ field-log-manifest.json
git commit -m "feat: add PWA manifest and app icon for mobile field log"
```

---

### Task 2: Build admin-log-drop.html

**Files:**
- Create: `D:\Projects\Drivertiseusa\admin-log-drop.html`

- [ ] **Step 1: Create the file**

Create `D:\Projects\Drivertiseusa\admin-log-drop.html` with the following complete content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Log Drop">
<meta name="mobile-web-app-capable" content="yes">
<meta name="theme-color" content="#C8973A">
<link rel="manifest" href="/field-log-manifest.json">
<link rel="apple-touch-icon" href="/assets/icons/field-log-icon-512.png">
<title>Log Drop — Drivertise</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<style>
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
:root{
  --ink:#0A0D12;--ink2:#111820;--amber:#C8973A;--amber-lt:#E8B84B;
  --green:#1E8C5C;--green-lt:#4DE8A0;--red:#B83020;--red-lt:#FF7B6B;
  --text:rgba(255,255,255,0.88);--muted:rgba(255,255,255,0.38);
  --border:rgba(255,255,255,0.08);--card:rgba(255,255,255,0.05);
}
html,body{height:100%;background:var(--ink);color:var(--text);font-family:'DM Sans',sans-serif;}
body{display:flex;flex-direction:column;}

/* PIN LOCK */
#lock{position:fixed;inset:0;background:var(--ink);z-index:999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;padding:40px 24px;}
.pin-logo{font-family:'Syne',sans-serif;font-size:24px;font-weight:800;color:white;}
.pin-logo span{color:var(--amber);}
.pin-sub{font-size:13px;color:var(--muted);text-align:center;}
#pin-input{padding:16px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:14px;color:white;font-size:20px;text-align:center;width:220px;letter-spacing:6px;outline:none;-webkit-text-security:disc;}
#pin-input:focus{border-color:rgba(200,151,58,0.4);}
#pin-btn{padding:14px 48px;background:var(--amber);color:var(--ink);border:none;border-radius:14px;font-family:'Syne',sans-serif;font-size:15px;font-weight:800;cursor:pointer;width:220px;}
#pin-err{color:var(--red-lt);font-size:13px;display:none;}

/* APP SHELL */
#app{display:none;flex-direction:column;min-height:100vh;}

/* HEADER */
.field-header{background:rgba(10,13,18,0.97);border-bottom:1px solid rgba(200,151,58,0.15);padding:14px 20px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:10;}
.header-logo{font-family:'Syne',sans-serif;font-size:16px;font-weight:800;color:white;text-decoration:none;}
.header-logo span{color:var(--amber);}
.header-tag{font-family:'Syne',sans-serif;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(200,151,58,0.8);background:rgba(200,151,58,0.1);border:1px solid rgba(200,151,58,0.25);padding:5px 12px;border-radius:20px;}

/* FORM VIEW */
#form-view{flex:1;display:flex;flex-direction:column;gap:16px;padding:20px 16px 40px;overflow-y:auto;}
.page-title{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:white;line-height:1.2;}
.page-sub{font-size:12px;color:var(--muted);margin-top:4px;}
.field{display:flex;flex-direction:column;gap:7px;}
.field-label{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--muted);}
.field-input{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:14px 16px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:16px;width:100%;outline:none;-webkit-appearance:none;appearance:none;min-height:52px;}
.field-input:focus{border-color:rgba(200,151,58,0.45);background:rgba(200,151,58,0.04);}
.field-input::placeholder{color:rgba(255,255,255,0.22);}
select.field-input{color:var(--text);}
select.field-input option{background:#1B2B3A;}

/* CAMERA BUTTON */
.camera-zone{background:rgba(200,151,58,0.06);border:1.5px dashed rgba(200,151,58,0.3);border-radius:14px;padding:22px 16px;display:flex;flex-direction:column;align-items:center;gap:8px;cursor:pointer;position:relative;overflow:hidden;}
.camera-zone input[type=file]{position:absolute;inset:0;opacity:0;cursor:pointer;font-size:0;}
.camera-icon{font-size:30px;line-height:1;}
.camera-label{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:var(--amber);}
.camera-sub{font-size:11px;color:var(--muted);}
#photo-preview{background:rgba(30,140,92,0.1);border:1px solid rgba(30,140,92,0.3);border-radius:12px;padding:14px 16px;display:none;align-items:center;gap:12px;}
#photo-preview .check{font-size:20px;}
#photo-filename{font-size:13px;color:var(--green-lt);word-break:break-all;}

/* SUBMIT */
.submit-btn{background:var(--amber);color:var(--ink);border:none;border-radius:14px;padding:18px 24px;font-family:'Syne',sans-serif;font-size:16px;font-weight:800;width:100%;cursor:pointer;margin-top:4px;letter-spacing:0.3px;}
.submit-btn:disabled{opacity:0.45;cursor:not-allowed;}
.error-msg{color:var(--red-lt);font-size:13px;display:none;margin-top:-8px;}

/* FOOTER LINKS */
.footer-links{display:flex;flex-direction:column;align-items:center;gap:8px;padding-top:8px;}
.footer-link{font-size:12px;color:rgba(200,151,58,0.5);text-decoration:none;}
.install-hint{font-size:11px;color:rgba(255,255,255,0.18);text-align:center;line-height:1.6;}

/* SUCCESS VIEW */
#success-view{display:none;flex:1;flex-direction:column;align-items:center;justify-content:center;gap:20px;padding:40px 24px;text-align:center;}
.success-check{width:80px;height:80px;background:rgba(30,140,92,0.12);border:2px solid rgba(30,140,92,0.35);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:34px;color:var(--green-lt);}
.success-title{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:white;}
.success-summary{font-size:14px;color:var(--muted);line-height:1.8;}
.success-summary strong{color:var(--text);}
.btn-again{background:rgba(200,151,58,0.12);border:1px solid rgba(200,151,58,0.3);border-radius:12px;padding:16px 32px;font-family:'Syne',sans-serif;font-size:14px;font-weight:700;color:var(--amber);cursor:pointer;margin-top:8px;}
</style>
</head>
<body>

<!-- PIN LOCK -->
<div id="lock">
  <div class="pin-logo">Driver<span>tise</span></div>
  <div class="pin-sub">Enter your admin PIN to continue</div>
  <input type="password" id="pin-input" placeholder="••••" inputmode="numeric" pattern="[0-9]*" />
  <button id="pin-btn" onclick="checkPin()">Unlock</button>
  <div id="pin-err">Incorrect PIN — try again.</div>
</div>

<!-- APP -->
<div id="app">
  <header class="field-header">
    <a class="header-logo" href="admin.html">Driver<span>tise</span></a>
    <div class="header-tag">Field Log</div>
  </header>

  <!-- FORM -->
  <main id="form-view">
    <div>
      <div class="page-title">Log Card Drop</div>
      <div class="page-sub">Cards delivered this stop</div>
    </div>

    <div class="field">
      <div class="field-label">Client</div>
      <select id="client" class="field-input">
        <option value="">— Select Client —</option>
      </select>
    </div>

    <div class="field">
      <div class="field-label">Date</div>
      <input type="date" id="date" class="field-input" />
    </div>

    <div class="field">
      <div class="field-label">Neighborhood</div>
      <input type="text" id="neighborhood" class="field-input" placeholder="e.g. Saratoga Springs Zone 1" autocomplete="off" />
    </div>

    <div class="field">
      <div class="field-label">Cards Delivered</div>
      <input type="number" id="cards" class="field-input" placeholder="e.g. 12" min="1" inputmode="numeric" />
    </div>

    <div class="field">
      <div class="field-label">Verification Photo</div>
      <div class="camera-zone">
        <input type="file" id="photo" accept="image/*" capture="environment" />
        <div id="camera-prompt">
          <div class="camera-icon">📷</div>
          <div class="camera-label">Tap to Open Camera</div>
          <div class="camera-sub">Opens back camera directly</div>
        </div>
      </div>
      <div id="photo-preview">
        <span class="check">✅</span>
        <span id="photo-filename"></span>
      </div>
    </div>

    <div id="drop-error" class="error-msg"></div>
    <button id="submit-btn" class="submit-btn" onclick="submitDrop()">Log This Drop →</button>

    <div class="footer-links">
      <a class="footer-link" href="admin-log-route.html">Switch to Route Logger →</a>
      <a class="footer-link" href="admin.html">Open Full Dashboard →</a>
      <div class="install-hint">
        iPhone: Share → Add to Home Screen → "Log Drop"<br>
        Android: ··· menu → Add to Home Screen
      </div>
    </div>
  </main>

  <!-- SUCCESS -->
  <div id="success-view">
    <div class="success-check">✓</div>
    <div class="success-title">Drop Logged</div>
    <div class="success-summary">
      <strong id="s-client"></strong><br>
      <span id="s-cards"></span> cards · <span id="s-neighborhood"></span><br>
      <span id="s-date"></span>
    </div>
    <button class="btn-again" onclick="logAnother()">+ Log Another Drop</button>
    <a class="footer-link" href="admin.html">Open Full Dashboard →</a>
  </div>
</div>

<script>
const SUPABASE_URL = 'https://dwwgavyzgogmhjaerevg.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3d2dhdnl6Z29nbWhqYWVyZXZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0MDgwNjAsImV4cCI6MjA5MDk4NDA2MH0.4ulbzEw-AM2bIBXDyIgBMuIEjQDTOxGaHfaquG2sTaY';
const ADMIN_PIN = '1234'; // Change this before going live
const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

// ── PIN ──────────────────────────────────────────
function checkPin() {
  if (document.getElementById('pin-input').value === ADMIN_PIN) {
    sessionStorage.setItem('drivertise_admin_unlocked', '1');
    document.getElementById('lock').style.display = 'none';
    document.getElementById('app').style.display = 'flex';
    init();
  } else {
    document.getElementById('pin-err').style.display = 'block';
    document.getElementById('pin-input').value = '';
  }
}
document.getElementById('pin-input').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') checkPin();
});

// ── INIT ─────────────────────────────────────────
async function init() {
  document.getElementById('date').value = new Date().toISOString().split('T')[0];
  await loadClients();
  const lastClient = localStorage.getItem('drivertise_last_client');
  if (lastClient) document.getElementById('client').value = lastClient;
}

async function loadClients() {
  const { data } = await sb.from('profiles').select('id, business_name, name').order('business_name');
  if (!data) return;
  const sel = document.getElementById('client');
  data.forEach(function(c) {
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = c.business_name || c.name || c.id;
    sel.appendChild(opt);
  });
}

// ── PHOTO PREVIEW ─────────────────────────────────
document.getElementById('photo').addEventListener('change', function() {
  const file = this.files[0];
  if (file) {
    document.getElementById('photo-filename').textContent = file.name;
    document.getElementById('photo-preview').style.display = 'flex';
    document.getElementById('camera-prompt').style.display = 'none';
  }
});

// ── SUBMIT ────────────────────────────────────────
async function submitDrop() {
  const clientId = document.getElementById('client').value;
  const dropDate = document.getElementById('date').value;
  const neighborhood = document.getElementById('neighborhood').value.trim();
  const cardsDelivered = parseInt(document.getElementById('cards').value) || 0;
  const photoFile = document.getElementById('photo').files[0];
  const errEl = document.getElementById('drop-error');
  const btn = document.getElementById('submit-btn');

  errEl.style.display = 'none';
  if (!clientId)       { errEl.textContent = 'Select a client.'; errEl.style.display = 'block'; return; }
  if (!neighborhood)   { errEl.textContent = 'Enter a neighborhood.'; errEl.style.display = 'block'; return; }
  if (!cardsDelivered) { errEl.textContent = 'Enter the number of cards delivered.'; errEl.style.display = 'block'; return; }

  btn.textContent = 'Saving...';
  btn.disabled = true;

  var photoUrl = null;
  if (photoFile) {
    var ext = photoFile.name.split('.').pop();
    var path = clientId + '/' + dropDate + '-' + Date.now() + '.' + ext;
    var { error: uploadError } = await sb.storage.from('card-drop-photos').upload(path, photoFile, { upsert: false });
    if (uploadError) {
      errEl.textContent = 'Photo upload failed: ' + uploadError.message;
      errEl.style.display = 'block';
      btn.textContent = 'Log This Drop →';
      btn.disabled = false;
      return;
    }
    photoUrl = sb.storage.from('card-drop-photos').getPublicUrl(path).data.publicUrl;
  }

  var { error } = await sb.from('card_drops').insert({
    client_id: clientId,
    drop_date: dropDate,
    neighborhood: neighborhood,
    cards_delivered: cardsDelivered,
    photo_url: photoUrl,
    notes: null
  });

  if (error) {
    errEl.textContent = 'Save failed: ' + error.message;
    errEl.style.display = 'block';
    btn.textContent = 'Log This Drop →';
    btn.disabled = false;
    return;
  }

  localStorage.setItem('drivertise_last_client', clientId);

  document.getElementById('s-client').textContent = document.getElementById('client').selectedOptions[0].text;
  document.getElementById('s-cards').textContent = cardsDelivered;
  document.getElementById('s-neighborhood').textContent = neighborhood;
  document.getElementById('s-date').textContent = dropDate;
  document.getElementById('form-view').style.display = 'none';
  document.getElementById('success-view').style.display = 'flex';
}

// ── LOG ANOTHER ───────────────────────────────────
function logAnother() {
  document.getElementById('neighborhood').value = '';
  document.getElementById('cards').value = '';
  document.getElementById('photo').value = '';
  document.getElementById('photo-preview').style.display = 'none';
  document.getElementById('camera-prompt').style.display = 'flex';
  document.getElementById('drop-error').style.display = 'none';
  document.getElementById('submit-btn').textContent = 'Log This Drop →';
  document.getElementById('submit-btn').disabled = false;
  // Restore last client
  var lastClient = localStorage.getItem('drivertise_last_client');
  if (lastClient) document.getElementById('client').value = lastClient;
  document.getElementById('success-view').style.display = 'none';
  document.getElementById('form-view').style.display = 'flex';
}

// ── SESSION CHECK ─────────────────────────────────
if (sessionStorage.getItem('drivertise_admin_unlocked')) {
  document.getElementById('lock').style.display = 'none';
  document.getElementById('app').style.display = 'flex';
  init();
}
</script>
</body>
</html>
```

- [ ] **Step 2: Open in browser on desktop to verify layout**

Open `D:\Projects\Drivertiseusa\admin-log-drop.html` in Chrome.

Expected:
- PIN screen appears — enter `1234` — unlocks
- Form shows with 5 fields: Client, Date (today pre-filled), Neighborhood, Cards Delivered, photo camera zone
- Client dropdown loads from Supabase (may be empty if no profiles yet — that's fine)
- Tap photo zone — should trigger file picker (on desktop) or camera (on phone)
- Fill all fields and submit — success screen shows with correct summary
- "Log Another Drop" returns to form with client still selected

- [ ] **Step 3: Commit**

```bash
cd D:/Projects/Drivertiseusa
git add admin-log-drop.html
git commit -m "feat: admin-log-drop.html — mobile card drop field logger"
```

---

### Task 3: Build admin-log-route.html

**Files:**
- Create: `D:\Projects\Drivertiseusa\admin-log-route.html`

- [ ] **Step 1: Create the file**

Create `D:\Projects\Drivertiseusa\admin-log-route.html` with the following complete content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Log Route">
<meta name="mobile-web-app-capable" content="yes">
<meta name="theme-color" content="#C8973A">
<link rel="manifest" href="/field-log-manifest.json">
<link rel="apple-touch-icon" href="/assets/icons/field-log-icon-512.png">
<title>Log Route — Drivertise</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<style>
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
:root{
  --ink:#0A0D12;--amber:#C8973A;--amber-lt:#E8B84B;
  --green:#1E8C5C;--green-lt:#4DE8A0;--red:#B83020;--red-lt:#FF7B6B;
  --text:rgba(255,255,255,0.88);--muted:rgba(255,255,255,0.38);
  --border:rgba(255,255,255,0.08);--card:rgba(255,255,255,0.05);
}
html,body{height:100%;background:var(--ink);color:var(--text);font-family:'DM Sans',sans-serif;}
body{display:flex;flex-direction:column;}
#lock{position:fixed;inset:0;background:var(--ink);z-index:999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;padding:40px 24px;}
.pin-logo{font-family:'Syne',sans-serif;font-size:24px;font-weight:800;color:white;}
.pin-logo span{color:var(--amber);}
.pin-sub{font-size:13px;color:var(--muted);text-align:center;}
#pin-input{padding:16px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:14px;color:white;font-size:20px;text-align:center;width:220px;letter-spacing:6px;outline:none;-webkit-text-security:disc;}
#pin-input:focus{border-color:rgba(200,151,58,0.4);}
#pin-btn{padding:14px 48px;background:var(--amber);color:var(--ink);border:none;border-radius:14px;font-family:'Syne',sans-serif;font-size:15px;font-weight:800;cursor:pointer;width:220px;}
#pin-err{color:var(--red-lt);font-size:13px;display:none;}
#app{display:none;flex-direction:column;min-height:100vh;}
.field-header{background:rgba(10,13,18,0.97);border-bottom:1px solid rgba(200,151,58,0.15);padding:14px 20px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:10;}
.header-logo{font-family:'Syne',sans-serif;font-size:16px;font-weight:800;color:white;text-decoration:none;}
.header-logo span{color:var(--amber);}
.header-tag{font-family:'Syne',sans-serif;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(200,151,58,0.8);background:rgba(200,151,58,0.1);border:1px solid rgba(200,151,58,0.25);padding:5px 12px;border-radius:20px;}
#form-view{flex:1;display:flex;flex-direction:column;gap:16px;padding:20px 16px 40px;overflow-y:auto;}
.page-title{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:white;line-height:1.2;}
.page-sub{font-size:12px;color:var(--muted);margin-top:4px;line-height:1.6;}
.field{display:flex;flex-direction:column;gap:7px;}
.field-label{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--muted);}
.field-input{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:14px 16px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:16px;width:100%;outline:none;-webkit-appearance:none;appearance:none;min-height:52px;}
.field-input:focus{border-color:rgba(200,151,58,0.45);background:rgba(200,151,58,0.04);}
.field-input::placeholder{color:rgba(255,255,255,0.22);}
select.field-input option{background:#1B2B3A;}
.file-zone{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:14px 16px;display:flex;align-items:center;gap:12px;min-height:52px;position:relative;overflow:hidden;cursor:pointer;}
.file-zone input[type=file]{position:absolute;inset:0;opacity:0;cursor:pointer;font-size:0;}
.file-zone-icon{font-size:20px;}
.file-zone-label{font-size:15px;color:rgba(255,255,255,0.4);}
#parse-success{background:rgba(30,140,92,0.1);border:1px solid rgba(30,140,92,0.3);border-radius:12px;padding:14px 16px;display:none;align-items:center;gap:12px;}
#parse-success .ps-icon{font-size:18px;}
.ps-title{font-size:13px;font-weight:600;color:var(--green-lt);}
.ps-sub{font-size:11px;color:var(--muted);margin-top:2px;}
#parse-error{color:var(--red-lt);font-size:13px;display:none;}
.submit-btn{background:var(--amber);color:var(--ink);border:none;border-radius:14px;padding:18px 24px;font-family:'Syne',sans-serif;font-size:16px;font-weight:800;width:100%;cursor:pointer;margin-top:4px;}
.submit-btn:disabled{opacity:0.4;cursor:not-allowed;}
.error-msg{color:var(--red-lt);font-size:13px;display:none;margin-top:-8px;}
.footer-links{display:flex;flex-direction:column;align-items:center;gap:8px;padding-top:8px;}
.footer-link{font-size:12px;color:rgba(200,151,58,0.5);text-decoration:none;}
.install-hint{font-size:11px;color:rgba(255,255,255,0.18);text-align:center;line-height:1.6;}
#success-view{display:none;flex:1;flex-direction:column;align-items:center;justify-content:center;gap:20px;padding:40px 24px;text-align:center;}
.success-check{width:80px;height:80px;background:rgba(30,140,92,0.12);border:2px solid rgba(30,140,92,0.35);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:34px;color:var(--green-lt);}
.success-title{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:white;}
.success-summary{font-size:14px;color:var(--muted);line-height:1.8;}
.success-summary strong{color:var(--text);}
.btn-again{background:rgba(200,151,58,0.12);border:1px solid rgba(200,151,58,0.3);border-radius:12px;padding:16px 32px;font-family:'Syne',sans-serif;font-size:14px;font-weight:700;color:var(--amber);cursor:pointer;margin-top:8px;}
</style>
</head>
<body>

<div id="lock">
  <div class="pin-logo">Driver<span>tise</span></div>
  <div class="pin-sub">Enter your admin PIN to continue</div>
  <input type="password" id="pin-input" placeholder="••••" inputmode="numeric" pattern="[0-9]*" />
  <button id="pin-btn" onclick="checkPin()">Unlock</button>
  <div id="pin-err">Incorrect PIN — try again.</div>
</div>

<div id="app">
  <header class="field-header">
    <a class="header-logo" href="admin.html">Driver<span>tise</span></a>
    <div class="header-tag">Field Log</div>
  </header>

  <main id="form-view">
    <div>
      <div class="page-title">Log Route</div>
      <div class="page-sub">Export from Google Maps → Timeline → select day → ··· → Export this day</div>
    </div>

    <div class="field">
      <div class="field-label">Client</div>
      <select id="client" class="field-input">
        <option value="">— Select Client —</option>
      </select>
    </div>

    <div class="field">
      <div class="field-label">Route Date</div>
      <input type="date" id="date" class="field-input" />
    </div>

    <div class="field">
      <div class="field-label">Area Name</div>
      <input type="text" id="area" class="field-input" placeholder="e.g. Lehi / Alpine Corridor" autocomplete="off" />
    </div>

    <div class="field">
      <div class="field-label">Hours Out</div>
      <input type="number" id="hours" class="field-input" placeholder="e.g. 4.5" min="0.5" step="0.5" inputmode="decimal" />
    </div>

    <div class="field">
      <div class="field-label">KML File</div>
      <div class="file-zone">
        <input type="file" id="kml-file" accept=".kml" onchange="handleKMLSelect(this)" />
        <span class="file-zone-icon">📂</span>
        <span class="file-zone-label" id="file-label">Tap to select KML file</span>
      </div>
      <div id="parse-success">
        <span class="ps-icon">✓</span>
        <div>
          <div class="ps-title" id="parse-title">Route parsed</div>
          <div class="ps-sub" id="parse-sub"></div>
        </div>
      </div>
      <div id="parse-error"></div>
    </div>

    <div id="route-error" class="error-msg"></div>
    <button id="submit-btn" class="submit-btn" onclick="submitRoute()" disabled>Save Route →</button>

    <div class="footer-links">
      <a class="footer-link" href="admin-log-drop.html">Switch to Card Drop Logger →</a>
      <a class="footer-link" href="admin.html">Open Full Dashboard →</a>
      <div class="install-hint">
        iPhone: Share → Add to Home Screen → "Log Route"<br>
        Android: ··· menu → Add to Home Screen
      </div>
    </div>
  </main>

  <div id="success-view">
    <div class="success-check">✓</div>
    <div class="success-title">Route Saved</div>
    <div class="success-summary">
      <strong id="s-client"></strong><br>
      <span id="s-area"></span> · <span id="s-hours"></span> hrs<br>
      <span id="s-date"></span>
    </div>
    <button class="btn-again" onclick="logAnother()">+ Log Another Route</button>
    <a class="footer-link" href="admin.html">Open Full Dashboard →</a>
  </div>
</div>

<script>
const SUPABASE_URL = 'https://dwwgavyzgogmhjaerevg.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3d2dhdnl6Z29nbWhqYWVyZXZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0MDgwNjAsImV4cCI6MjA5MDk4NDA2MH0.4ulbzEw-AM2bIBXDyIgBMuIEjQDTOxGaHfaquG2sTaY';
const ADMIN_PIN = '1234'; // Change this before going live
const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);
var parsedCoords = [];

// ── PIN ──────────────────────────────────────────
function checkPin() {
  if (document.getElementById('pin-input').value === ADMIN_PIN) {
    sessionStorage.setItem('drivertise_admin_unlocked', '1');
    document.getElementById('lock').style.display = 'none';
    document.getElementById('app').style.display = 'flex';
    init();
  } else {
    document.getElementById('pin-err').style.display = 'block';
    document.getElementById('pin-input').value = '';
  }
}
document.getElementById('pin-input').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') checkPin();
});

// ── INIT ─────────────────────────────────────────
async function init() {
  document.getElementById('date').value = new Date().toISOString().split('T')[0];
  await loadClients();
  var lastClient = localStorage.getItem('drivertise_last_client');
  if (lastClient) document.getElementById('client').value = lastClient;
}

async function loadClients() {
  var { data } = await sb.from('profiles').select('id, business_name, name').order('business_name');
  if (!data) return;
  var sel = document.getElementById('client');
  data.forEach(function(c) {
    var opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = c.business_name || c.name || c.id;
    sel.appendChild(opt);
  });
}

// ── KML PARSE ─────────────────────────────────────
// Copied verbatim from admin.html
function parseKML(fileText) {
  var parser = new DOMParser();
  var kml = parser.parseFromString(fileText, 'text/xml');
  var coordNodes = kml.querySelectorAll('LineString coordinates, coordinates');
  var coords = [];
  coordNodes.forEach(function(node) {
    var raw = node.textContent.trim();
    raw.split(/\s+/).forEach(function(triplet) {
      var parts = triplet.split(',');
      if (parts.length >= 2) {
        var lng = parseFloat(parts[0]);
        var lat = parseFloat(parts[1]);
        if (!isNaN(lat) && !isNaN(lng)) coords.push([lat, lng]);
      }
    });
  });
  return coords;
}

function handleKMLSelect(input) {
  var successEl = document.getElementById('parse-success');
  var errorEl = document.getElementById('parse-error');
  var submitBtn = document.getElementById('submit-btn');
  var fileLabel = document.getElementById('file-label');

  successEl.style.display = 'none';
  errorEl.style.display = 'none';
  submitBtn.disabled = true;
  parsedCoords = [];

  if (!input.files || !input.files[0]) return;
  var file = input.files[0];
  fileLabel.textContent = file.name;

  var reader = new FileReader();
  reader.onload = function(e) {
    var coords = parseKML(e.target.result);
    if (coords.length < 2) {
      errorEl.textContent = 'No route coordinates found — make sure you exported a KML from Google Timeline.';
      errorEl.style.display = 'block';
      return;
    }
    parsedCoords = coords;
    document.getElementById('parse-title').textContent = '✓ Route parsed — ' + coords.length + ' coordinates';
    document.getElementById('parse-sub').textContent = file.name;
    successEl.style.display = 'flex';
    submitBtn.disabled = false;
  };
  reader.onerror = function() {
    errorEl.textContent = 'Could not read file. Please try again.';
    errorEl.style.display = 'block';
  };
  reader.readAsText(file);
}

// ── SUBMIT ────────────────────────────────────────
async function submitRoute() {
  var clientId = document.getElementById('client').value;
  var routeDate = document.getElementById('date').value;
  var areaName = document.getElementById('area').value.trim();
  var hoursOut = parseFloat(document.getElementById('hours').value) || null;
  var errEl = document.getElementById('route-error');
  var btn = document.getElementById('submit-btn');

  errEl.style.display = 'none';
  if (!clientId)           { errEl.textContent = 'Select a client.'; errEl.style.display = 'block'; return; }
  if (!routeDate)          { errEl.textContent = 'Select a route date.'; errEl.style.display = 'block'; return; }
  if (!parsedCoords.length){ errEl.textContent = 'No KML parsed yet. Select a KML file first.'; errEl.style.display = 'block'; return; }

  btn.textContent = 'Saving...';
  btn.disabled = true;

  // Convert [[lat, lng]] → [{lat, lng}] for Supabase JSONB (matches admin.html format)
  var coordsForDB = parsedCoords.map(function(c) { return { lat: c[0], lng: c[1] }; });

  var { error } = await sb.from('route_maps').insert({
    client_id: clientId,
    route_date: routeDate,
    area_name: areaName || null,
    hours_out: hoursOut,
    route_coordinates: coordsForDB,
    image_url: null,
    notes: null
  });

  if (error) {
    errEl.textContent = 'Save failed: ' + error.message;
    errEl.style.display = 'block';
    btn.textContent = 'Save Route →';
    btn.disabled = false;
    return;
  }

  localStorage.setItem('drivertise_last_client', clientId);

  document.getElementById('s-client').textContent = document.getElementById('client').selectedOptions[0].text;
  document.getElementById('s-area').textContent = areaName || 'No area label';
  document.getElementById('s-hours').textContent = hoursOut || '—';
  document.getElementById('s-date').textContent = routeDate;
  document.getElementById('form-view').style.display = 'none';
  document.getElementById('success-view').style.display = 'flex';
}

// ── LOG ANOTHER ───────────────────────────────────
function logAnother() {
  document.getElementById('area').value = '';
  document.getElementById('hours').value = '';
  document.getElementById('kml-file').value = '';
  document.getElementById('file-label').textContent = 'Tap to select KML file';
  document.getElementById('parse-success').style.display = 'none';
  document.getElementById('parse-error').style.display = 'none';
  document.getElementById('route-error').style.display = 'none';
  document.getElementById('submit-btn').textContent = 'Save Route →';
  document.getElementById('submit-btn').disabled = true;
  parsedCoords = [];
  var lastClient = localStorage.getItem('drivertise_last_client');
  if (lastClient) document.getElementById('client').value = lastClient;
  document.getElementById('success-view').style.display = 'none';
  document.getElementById('form-view').style.display = 'flex';
}

// ── SESSION CHECK ─────────────────────────────────
if (sessionStorage.getItem('drivertise_admin_unlocked')) {
  document.getElementById('lock').style.display = 'none';
  document.getElementById('app').style.display = 'flex';
  init();
}
</script>
</body>
</html>
```

- [ ] **Step 2: Open in browser on desktop to verify**

Open `D:\Projects\Drivertiseusa\admin-log-route.html` in Chrome.

Expected:
- PIN screen → enter `1234` → unlocks
- Form shows: Client, Date (today), Area Name, Hours Out, KML file picker
- Select a `.kml` file → green parse success message appears with coordinate count → Submit button enables
- Select a non-KML file → red error, submit stays disabled
- Fill all fields and submit → success screen shows correct summary
- "Log Another Route" clears area/hours/KML, keeps client selected

- [ ] **Step 3: Commit**

```bash
cd D:/Projects/Drivertiseusa
git add admin-log-route.html
git commit -m "feat: admin-log-route.html — mobile KML route field logger"
```

---

### Task 4: Install on Phone + Final Verification

**Files:** None — this is a verification and setup task.

- [ ] **Step 1: Deploy to Netlify**

The pages only work as home screen apps when served over HTTPS. Push to GitHub → Netlify deploys:

```bash
cd D:/Projects/Drivertiseusa
git push origin main
```

Wait for Netlify deploy to complete (check netlify.com dashboard).

- [ ] **Step 2: Install "Log Drop" on iPhone**

1. Open Safari on iPhone
2. Navigate to `https://drivertiseusa.com/admin-log-drop.html`
3. Tap the **Share** button (box with arrow pointing up)
4. Scroll down → tap **"Add to Home Screen"**
5. Change name to **"Log Drop"** → tap **Add**
6. The Drivertise D-logo icon now appears on your home screen

- [ ] **Step 3: Install "Log Route" on iPhone**

1. Navigate to `https://drivertiseusa.com/admin-log-route.html`
2. Share → Add to Home Screen → name it **"Log Route"** → Add

- [ ] **Step 4: Full mobile flow test (card drop)**

On phone, tap the "Log Drop" home screen icon. Verify:
- [ ] Opens directly to PIN screen (no browser chrome — looks like an app)
- [ ] Enter PIN → form appears
- [ ] Client dropdown populates from Supabase
- [ ] Date is pre-filled to today
- [ ] Tap photo zone → back camera opens directly (not file picker)
- [ ] Take photo → filename confirmation appears
- [ ] Fill neighborhood + card count → tap "Log This Drop →"
- [ ] Success screen appears with correct summary
- [ ] "Log Another Drop" → form returns with same client selected
- [ ] Open `admin-log-drop.html` again in same browser tab → PIN already skipped

- [ ] **Step 5: Full mobile flow test (route logger)**

On phone, tap the "Log Route" home screen icon. Verify:
- [ ] Unlocks (PIN already set from Step 4)
- [ ] Export a KML from Google Maps (Timeline → ··· → Export this day) → share to Files or save
- [ ] In Log Route form: select KML file from Files app → green parse confirmation with coordinate count
- [ ] Fill area name + hours → Save Route
- [ ] Row appears in Supabase `route_maps` table with `route_coordinates` populated
- [ ] Client portal for the same client shows the new route in their weekly dropdown

- [ ] **Step 6: Cross-link test**

- [ ] "Switch to Route Logger →" on drop page navigates correctly
- [ ] "Switch to Card Drop Logger →" on route page navigates correctly
- [ ] "Open Full Dashboard →" navigates to `admin.html` on both pages

- [ ] **Step 7: Verify admin.html unchanged**

Open `admin.html` on desktop — all existing tabs, forms, and route uploads still function. Zero regressions.

- [ ] **Step 8: Clean up mockup file**

The mockup file was for brainstorming — remove it before final deploy:

```bash
cd D:/Projects/Drivertiseusa
git rm mockup-mobile-admin.html
git commit -m "chore: remove mobile admin mockup (replaced by real pages)"
```

---

## Verification Checklist

- [ ] `assets/icons/field-log-icon-512.png` exists and is the Drivertise D-logo
- [ ] `field-log-manifest.json` valid JSON, references correct icon paths
- [ ] `admin-log-drop.html` — PIN works, clients load, camera opens, submit saves to `card_drops`, success screen correct, "Log Another" keeps client
- [ ] `admin-log-route.html` — PIN works, clients load, KML parse shows coordinate count, submit saves to `route_maps` with `{lat,lng}` JSONB format, success screen correct
- [ ] Both pages: `sessionStorage` pin skip works across same-tab navigation
- [ ] Both pages: `localStorage` client memory persists across page closes and reopens
- [ ] Home screen icons show Drivertise D-logo (not generic icon)
- [ ] Pages open in standalone mode (no browser address bar) when launched from home screen
- [ ] `admin.html` desktop experience completely unchanged
