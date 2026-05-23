/**
 * car-zones.js — Interactive Ad Zone Builder
 * Drivertise USA
 *
 * Handles zone selection, logo upload, and the drag/resize/rotate
 * logo editor with full touch support. No external libraries.
 */

/* ─────────────────────────────────────────────
   ZONE DATA
───────────────────────────────────────────── */
const ZONES = {
  'driver-door': {
    id: 'driver-door',
    label: 'Front Left',
    name: 'Driver Door',
    desc: 'Prime real estate. This panel faces oncoming traffic at every intersection, stop sign, and red light — close-up, eye level, unavoidable.',
    dims: 'Approx. 36" × 22"',
    visibility: 'Oncoming traffic, intersections, parking lots',
    editorImg: 'assets/zone-front-door-close.png',
    contactParam: 'Driver Door',
  },
  'rear-driver-door': {
    id: 'rear-driver-door',
    label: 'Rear Left',
    name: 'Rear Driver Door',
    desc: 'Paired with the driver door for complete left-side coverage. Highly visible to trailing vehicles and cross-traffic at every light.',
    dims: 'Approx. 36" × 22"',
    visibility: 'Trailing traffic, traffic lights, crosswalks',
    editorImg: 'assets/zone-rear-door-close.png',
    contactParam: 'Rear Driver Door',
  },
  'passenger-door': {
    id: 'passenger-door',
    label: 'Front Right',
    name: 'Passenger Door',
    desc: 'The curb-side panel — pedestrians, riders, and parking lot foot traffic get a close-up, personal view of your brand every time.',
    dims: 'Approx. 36" × 22"',
    visibility: 'Pedestrians, curb-side, parking areas',
    editorImg: 'assets/zone-door-panel.png',
    contactParam: 'Passenger Door',
  },
  'rear-passenger-door': {
    id: 'rear-passenger-door',
    label: 'Rear Right',
    name: 'Rear Passenger Door',
    desc: 'Completes full four-door coverage on the passenger side. The full side package is the highest-impression option on the vehicle.',
    dims: 'Approx. 36" × 22"',
    visibility: 'Trailing traffic, parking areas, curb-side',
    editorImg: 'assets/zone-rear-door-close.png',
    contactParam: 'Rear Passenger Door',
  },
  'hood': {
    id: 'hood',
    label: 'Top Front',
    name: 'Hood',
    desc: 'A massive flat surface visible from elevated angles — parking structures, overpasses, hills, and anywhere someone looks down. Hard to miss.',
    dims: 'Approx. 52" × 44"',
    visibility: 'Elevated angles, parking garages, hillside roads',
    editorImg: 'assets/zone-top-view.png',
    contactParam: 'Hood',
  },
  'rear-window': {
    id: 'rear-window',
    label: 'Perforated Vinyl',
    name: 'Rear Window',
    desc: 'Full-color perforated vinyl wrap — opaque from the outside, see-through from inside. Every car following us for any distance sees your brand.',
    dims: 'Approx. 48" × 20"',
    visibility: 'Trailing vehicles, highway, stop-and-go traffic',
    editorImg: 'assets/zone-top-view.png',
    contactParam: 'Rear Window',
  },
  'billboard': {
    id: 'billboard',
    label: 'Roof LED Display',
    name: 'Electric Billboard',
    desc: 'Dynamic full-color LED panel mounted on the roof — visible day and night from a distance. Run animations, update your creative anytime remotely.',
    dims: 'Approx. 24" × 12" (LED panel)',
    visibility: 'All angles day & night, long-range visibility',
    editorImg: null, // no template image — uses placeholder
    contactParam: 'Electric Billboard',
  },
};

/* ─────────────────────────────────────────────
   DOM REFS
───────────────────────────────────────────── */
const zonePicker      = document.getElementById('zone-picker');
const workspace       = document.getElementById('editor-workspace');
const placeholder     = document.getElementById('editor-placeholder');
const editorLayout    = document.getElementById('editor-layout');
const editorNameBar   = document.getElementById('editor-zone-name-bar');
const zoneBgImg       = document.getElementById('zone-bg-img');
const canvasArea      = document.getElementById('canvas-area');
const dropHint        = document.getElementById('canvas-drop-hint');
const ctrlLabel       = document.getElementById('ctrl-zone-label');
const ctrlName        = document.getElementById('ctrl-zone-name');
const ctrlDesc        = document.getElementById('ctrl-zone-desc');
const ctrlDims        = document.getElementById('ctrl-dims');
const ctrlVisibility  = document.getElementById('ctrl-visibility');
const ctrlQuoteBtn    = document.getElementById('ctrl-quote-btn');
const logoUpload      = document.getElementById('logo-upload');
const logoControls    = document.getElementById('logo-controls');
const btnCenter       = document.getElementById('btn-center');
const btnResetRot     = document.getElementById('btn-reset-rotation');
const btnClearLogo    = document.getElementById('btn-clear-logo');

let activeZoneId   = null;
let logoEditor     = null;   // LogoEditor instance

/* ─────────────────────────────────────────────
   ZONE SELECTION
───────────────────────────────────────────── */
function selectZone(zoneId) {
  if (!ZONES[zoneId]) return;

  const zone = ZONES[zoneId];

  // Mark cards
  document.querySelectorAll('.zone-card').forEach(c => {
    c.classList.toggle('active', c.dataset.zone === zoneId);
  });

  activeZoneId = zoneId;

  // Show workspace
  workspace.classList.add('open');

  // Switch from placeholder to editor
  placeholder.style.display = 'none';
  editorLayout.style.display = 'grid';

  // Populate toolbar + controls panel
  editorNameBar.textContent = zone.name;
  ctrlLabel.textContent     = zone.label;
  ctrlName.textContent      = zone.name;
  ctrlDesc.textContent      = zone.desc;
  ctrlDims.textContent      = zone.dims;
  ctrlVisibility.textContent = zone.visibility;

  // Update quote button URL
  const param = encodeURIComponent(zone.contactParam);
  ctrlQuoteBtn.href = `contact.html?zone=${param}`;

  // Swap background image
  if (zone.editorImg) {
    zoneBgImg.src = zone.editorImg;
    zoneBgImg.alt = `${zone.name} zone template`;
    zoneBgImg.style.display = 'block';
  } else {
    // Billboard — no image; show placeholder content
    zoneBgImg.style.display = 'none';
  }

  // Clear any existing logo when switching zones
  clearLogo();

  // Smooth scroll editor into view
  workspace.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* Zone card clicks + keyboard */
zonePicker.addEventListener('click', e => {
  const card = e.target.closest('.zone-card');
  if (card) selectZone(card.dataset.zone);
});

zonePicker.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    const card = e.target.closest('.zone-card');
    if (card) { e.preventDefault(); selectZone(card.dataset.zone); }
  }
});

/* ─────────────────────────────────────────────
   LOGO UPLOAD
───────────────────────────────────────────── */
logoUpload.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file || !file.type.startsWith('image/')) return;

  const reader = new FileReader();
  reader.onload = evt => injectLogo(evt.target.result);
  reader.readAsDataURL(file);

  // Reset input so same file can be re-uploaded
  logoUpload.value = '';
});

/* Drag-and-drop onto canvas */
canvasArea.addEventListener('dragover', e => {
  e.preventDefault();
  canvasArea.classList.add('drag-over');
});
canvasArea.addEventListener('dragleave', () => {
  canvasArea.classList.remove('drag-over');
});
canvasArea.addEventListener('drop', e => {
  e.preventDefault();
  canvasArea.classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (!file || !file.type.startsWith('image/')) return;
  const reader = new FileReader();
  reader.onload = evt => injectLogo(evt.target.result);
  reader.readAsDataURL(file);
});

function injectLogo(dataUrl) {
  // Remove existing logo
  clearLogo(false);

  // Create wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'logo-wrapper';
  wrapper.id = 'logo-wrapper';

  // Initial size + centered position
  const area   = canvasArea.getBoundingClientRect();
  const initW  = Math.min(160, area.width * 0.35);
  const initH  = initW;                // square default — editor can resize
  const initX  = (area.width  - initW) / 2;
  const initY  = (area.height - initH) / 2;

  wrapper.style.width  = initW + 'px';
  wrapper.style.height = initH + 'px';
  wrapper.style.left   = initX + 'px';
  wrapper.style.top    = initY + 'px';
  wrapper.style.transform = 'rotate(0deg)';

  // Logo image
  const img = document.createElement('img');
  img.src = dataUrl;
  img.alt = 'Your logo';
  wrapper.appendChild(img);

  // Corner resize handles
  ['tl','tr','bl','br'].forEach(pos => {
    const h = document.createElement('div');
    h.className = `lw-handle lw-handle-${pos}`;
    h.dataset.handle = pos;
    wrapper.appendChild(h);
  });

  // Rotate handle
  const rh = document.createElement('div');
  rh.className = 'lw-handle-rotate';
  rh.title = 'Rotate';
  rh.innerHTML = '↻';
  wrapper.appendChild(rh);

  canvasArea.appendChild(wrapper);

  // Show controls, hide drop hint
  dropHint.classList.add('has-logo');
  logoControls.classList.add('visible');

  // Attach editor
  logoEditor = new LogoEditor(wrapper, canvasArea);
}

function clearLogo(resetInput = true) {
  const existing = document.getElementById('logo-wrapper');
  if (existing) existing.remove();
  if (logoEditor) { logoEditor.destroy(); logoEditor = null; }
  dropHint.classList.remove('has-logo');
  logoControls.classList.remove('visible');
  if (resetInput) logoUpload.value = '';
}

/* ─────────────────────────────────────────────
   LOGO EDITOR CLASS
   Handles drag / corner-resize / rotate
   with both mouse and touch events
───────────────────────────────────────────── */
class LogoEditor {
  constructor(wrapper, container) {
    this.wrapper   = wrapper;
    this.container = container;

    // Current state
    this.x      = parseFloat(wrapper.style.left);
    this.y      = parseFloat(wrapper.style.top);
    this.w      = parseFloat(wrapper.style.width);
    this.h      = parseFloat(wrapper.style.height);
    this.angle  = 0;  // degrees

    // Drag state
    this._mode         = null;  // 'drag' | 'resize-tl' | etc. | 'rotate'
    this._startX       = 0;
    this._startY       = 0;
    this._startW       = 0;
    this._startH       = 0;
    this._startElX     = 0;
    this._startElY     = 0;
    this._rotateCenter = null;
    this._startAngle   = 0;
    this._startPointer = 0;

    this._onMouseDown  = this._onMouseDown.bind(this);
    this._onMouseMove  = this._onMouseMove.bind(this);
    this._onMouseUp    = this._onMouseUp.bind(this);
    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchMove  = this._onTouchMove.bind(this);
    this._onTouchEnd   = this._onTouchEnd.bind(this);

    wrapper.addEventListener('mousedown',  this._onMouseDown);
    wrapper.addEventListener('touchstart', this._onTouchStart, { passive: false });
    document.addEventListener('mousemove', this._onMouseMove);
    document.addEventListener('mouseup',   this._onMouseUp);
    document.addEventListener('touchmove', this._onTouchMove,  { passive: false });
    document.addEventListener('touchend',  this._onTouchEnd);
  }

  destroy() {
    this.wrapper.removeEventListener('mousedown',  this._onMouseDown);
    this.wrapper.removeEventListener('touchstart', this._onTouchStart);
    document.removeEventListener('mousemove', this._onMouseMove);
    document.removeEventListener('mouseup',   this._onMouseUp);
    document.removeEventListener('touchmove', this._onTouchMove);
    document.removeEventListener('touchend',  this._onTouchEnd);
  }

  /* ── Coordinate helpers ── */
  _containerRect() {
    return this.container.getBoundingClientRect();
  }

  _relPos(clientX, clientY) {
    const r = this._containerRect();
    return { x: clientX - r.left, y: clientY - r.top };
  }

  /* ── Apply current state to DOM ── */
  _commit() {
    const w = this.wrapper;
    w.style.left      = this.x + 'px';
    w.style.top       = this.y + 'px';
    w.style.width     = this.w + 'px';
    w.style.height    = this.h + 'px';
    w.style.transform = `rotate(${this.angle}deg)`;
  }

  /* ── Determine interaction mode from target ── */
  _resolveMode(target) {
    if (target.classList.contains('lw-handle-rotate')) return 'rotate';
    if (target.dataset.handle) return 'resize-' + target.dataset.handle;
    return 'drag';
  }

  /* ── Mouse events ── */
  _onMouseDown(e) {
    // Ignore right-click
    if (e.button !== 0) return;
    e.preventDefault();
    this._beginInteraction(e.target, e.clientX, e.clientY);
  }

  _onMouseMove(e) {
    if (!this._mode) return;
    e.preventDefault();
    this._updateInteraction(e.clientX, e.clientY);
  }

  _onMouseUp() {
    this._mode = null;
  }

  /* ── Touch events ── */
  _onTouchStart(e) {
    if (e.touches.length !== 1) return;
    e.preventDefault();
    const t = e.touches[0];
    this._beginInteraction(e.target, t.clientX, t.clientY);
  }

  _onTouchMove(e) {
    if (!this._mode || e.touches.length !== 1) return;
    e.preventDefault();
    const t = e.touches[0];
    this._updateInteraction(t.clientX, t.clientY);
  }

  _onTouchEnd() {
    this._mode = null;
  }

  /* ── Core interaction logic ── */
  _beginInteraction(target, clientX, clientY) {
    this._mode = this._resolveMode(target);

    this._startX   = clientX;
    this._startY   = clientY;
    this._startW   = this.w;
    this._startH   = this.h;
    this._startElX = this.x;
    this._startElY = this.y;

    if (this._mode === 'rotate') {
      // Compute center of wrapper in container coords
      const cr = this._containerRect();
      const wr = this.wrapper.getBoundingClientRect();
      const cx = wr.left + wr.width  / 2 - cr.left;
      const cy = wr.top  + wr.height / 2 - cr.top;
      this._rotateCenter = { x: cx, y: cy };

      // Angle from center to current pointer
      const { x: px, y: py } = this._relPos(clientX, clientY);
      this._startPointer = Math.atan2(py - cy, px - cx);
      this._startAngle   = this.angle;
    }
  }

  _updateInteraction(clientX, clientY) {
    const dx = clientX - this._startX;
    const dy = clientY - this._startY;
    const MIN = 48; // minimum size in px

    switch (this._mode) {
      case 'drag':
        this.x = this._startElX + dx;
        this.y = this._startElY + dy;
        break;

      case 'resize-br':
        this.w = Math.max(MIN, this._startW + dx);
        this.h = Math.max(MIN, this._startH + dy);
        break;

      case 'resize-bl':
        this.w = Math.max(MIN, this._startW - dx);
        this.h = Math.max(MIN, this._startH + dy);
        this.x = this._startElX + (this._startW - this.w);
        break;

      case 'resize-tr':
        this.w = Math.max(MIN, this._startW + dx);
        this.h = Math.max(MIN, this._startH - dy);
        this.y = this._startElY + (this._startH - this.h);
        break;

      case 'resize-tl':
        this.w = Math.max(MIN, this._startW - dx);
        this.h = Math.max(MIN, this._startH - dy);
        this.x = this._startElX + (this._startW - this.w);
        this.y = this._startElY + (this._startH - this.h);
        break;

      case 'rotate': {
        const { x: px, y: py } = this._relPos(clientX, clientY);
        const cx = this._rotateCenter.x;
        const cy = this._rotateCenter.y;
        const currentAngle = Math.atan2(py - cy, px - cx);
        const delta = (currentAngle - this._startPointer) * (180 / Math.PI);
        this.angle = this._startAngle + delta;
        break;
      }
    }

    this._commit();
  }

  /* ── Public helpers ── */
  centerInContainer() {
    const cr = this._containerRect();
    this.x = (cr.width  - this.w) / 2;
    this.y = (cr.height - this.h) / 2;
    this._commit();
  }

  resetRotation() {
    this.angle = 0;
    this._commit();
  }
}

/* ─────────────────────────────────────────────
   HELPER BUTTONS
───────────────────────────────────────────── */
btnCenter.addEventListener('click', () => {
  if (logoEditor) logoEditor.centerInContainer();
});

btnResetRot.addEventListener('click', () => {
  if (logoEditor) logoEditor.resetRotation();
});

btnClearLogo.addEventListener('click', () => {
  clearLogo();
});

/* ─────────────────────────────────────────────
   CONTACT FORM PREFILL
   If contact.html receives ?zone=Driver+Door
   this block auto-populates the zone field.
   (Add matching code to contact.html if needed)
───────────────────────────────────────────── */
(function prefillContactFromParams() {
  if (!window.location.pathname.endsWith('contact.html')) return;
  const params = new URLSearchParams(window.location.search);
  const zone   = params.get('zone');
  if (!zone) return;

  // Try to find a "zone" or "message" field and prefill it
  const zoneField = document.querySelector('[name="zone"], #zone, [name="message"], #message');
  if (zoneField) {
    if (zoneField.tagName === 'SELECT') {
      // Try to match option
      for (const opt of zoneField.options) {
        if (opt.value.toLowerCase().includes(zone.toLowerCase())) {
          opt.selected = true;
          break;
        }
      }
    } else {
      zoneField.value = zoneField.value
        ? `${zoneField.value}\n\nInterested in: ${zone}`
        : `Interested in: ${zone}`;
    }
  }

  // Also update page heading if present
  const heading = document.querySelector('.contact-zone-interest, #contact-zone-interest');
  if (heading) {
    heading.textContent = `Inquiry about: ${zone}`;
    heading.style.display = 'block';
  }
})();
