/* ══════════════════════════════════════════════════
   DRIVERTISE USA — Interactive Zone Map
   Leaflet.js + CartoDB Dark Matter tiles
   6 Mailer Delivery Zones across Utah & SL Counties
   ══════════════════════════════════════════════════ */

(function () {
  'use strict';

  // Wait for DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    var mapEl = document.getElementById('leaflet-zone-map');
    if (!mapEl) return;

    // Initialize map centered on Utah/SL County boundary
    var map = L.map('leaflet-zone-map', {
      center: [40.40, -111.88],
      zoom: 10,
      zoomControl: true,
      scrollWheelZoom: false
    });

    // CartoDB Dark Matter tiles — matches dark brand aesthetic
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Zone data — 6 mailer delivery zones
    var ZONES = [
      {
        name: 'Saratoga Springs & Eagle Mountain',
        county: 'Utah County',
        households: '~27,500',
        anchors: 'Costco Saratoga Springs, SR-68 corridor, Redwood Rd',
        color: 'utah',
        coords: [
          [40.375, -111.895],
          [40.375, -112.005],
          [40.285, -112.005],
          [40.285, -111.895]
        ]
      },
      {
        name: 'Lehi',
        county: 'Utah County',
        households: '~30,000',
        anchors: 'Costco Traverse Mountain, Silicon Slopes, Thanksgiving Point',
        color: 'utah',
        coords: [
          [40.435, -111.815],
          [40.435, -111.935],
          [40.355, -111.935],
          [40.355, -111.815]
        ]
      },
      {
        name: 'American Fork & Pleasant Grove',
        county: 'Utah County',
        households: '~26,500',
        anchors: "Smith's, Macey's, State St corridor, I-15 interchange",
        color: 'utah',
        coords: [
          [40.455, -111.725],
          [40.455, -111.835],
          [40.375, -111.835],
          [40.375, -111.725]
        ]
      },
      {
        name: 'Highland & Alpine',
        county: 'Utah County',
        households: '~9,300',
        anchors: 'Established affluent community, high disposable income',
        color: 'utah',
        coords: [
          [40.505, -111.775],
          [40.505, -111.875],
          [40.445, -111.875],
          [40.445, -111.775]
        ]
      },
      {
        name: 'Sandy & Draper',
        county: 'Salt Lake County',
        households: '~56,000',
        anchors: 'Costco 123rd S, South Towne Mall, State St / 123rd corridor',
        color: 'slco',
        coords: [
          [40.640, -111.815],
          [40.640, -111.950],
          [40.530, -111.950],
          [40.530, -111.815]
        ]
      },
      {
        name: 'Bluffdale & Riverton',
        county: 'Salt Lake County',
        households: '~22,500',
        anchors: 'Jordan Landing retail corridor, Riverton Costco',
        color: 'slco',
        coords: [
          [40.530, -111.870],
          [40.530, -111.980],
          [40.455, -111.980],
          [40.455, -111.870]
        ]
      }
    ];

    // Style helpers
    var STYLE_UTAH = {
      fillColor: '#4DE8A0',
      color: '#1DB870',
      weight: 2,
      opacity: 0.9,
      fillOpacity: 0.35
    };

    var STYLE_SLCO = {
      fillColor: '#C8973A',
      color: '#A07020',
      weight: 2,
      opacity: 0.9,
      fillOpacity: 0.40
    };

    var STYLE_HOVER_UTAH = {
      fillOpacity: 0.60,
      weight: 3
    };

    var STYLE_HOVER_SLCO = {
      fillOpacity: 0.65,
      weight: 3
    };

    // Draw each zone polygon
    ZONES.forEach(function (zone) {
      var style = zone.color === 'utah' ? STYLE_UTAH : STYLE_SLCO;
      var hoverStyle = zone.color === 'utah' ? STYLE_HOVER_UTAH : STYLE_HOVER_SLCO;

      var polygon = L.polygon(zone.coords, style).addTo(map);

      // Popup content
      var popupContent =
        '<div style="font-family:\'DM Sans\',sans-serif; min-width:200px;">' +
        '<div style="font-size:10px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:' +
        (zone.color === 'utah' ? '#4DE8A0' : '#C8973A') +
        '; margin-bottom:6px;">' + zone.county + '</div>' +
        '<div style="font-size:15px; font-weight:800; color:#F7F5F1; margin-bottom:8px; line-height:1.3;">' + zone.name + '</div>' +
        '<div style="font-size:12px; color:rgba(255,255,255,0.60); margin-bottom:4px;">📍 ' + zone.households + ' total households</div>' +
        '<div style="font-size:12px; color:rgba(255,255,255,0.60); margin-bottom:8px;">📬 10,000 homes targeted per drop</div>' +
        '<div style="font-size:11px; color:rgba(255,255,255,0.45); margin-bottom:10px; line-height:1.5;">Anchors: ' + zone.anchors + '</div>' +
        '<div style="display:inline-flex; align-items:center; gap:5px; background:rgba(77,232,160,0.15); border:1px solid rgba(77,232,160,0.30); border-radius:20px; padding:3px 10px; font-size:11px; font-weight:700; color:#4DE8A0; margin-bottom:10px;">' +
        '<span style="width:6px;height:6px;border-radius:50%;background:#4DE8A0;display:inline-block;"></span> Available</div><br>' +
        '<a href="contact.html?zone=' + encodeURIComponent(zone.name) + '" style="display:inline-block; background:#E6DF1A; color:#0A0D12; font-size:12px; font-weight:700; padding:7px 14px; border-radius:6px; text-decoration:none;">Add This Zone →</a>' +
        '</div>';

      polygon.bindPopup(popupContent, {
        maxWidth: 260,
        className: 'drivertise-popup'
      });

      // Hover effects
      polygon.on('mouseover', function () {
        this.setStyle(hoverStyle);
      });

      polygon.on('mouseout', function () {
        this.setStyle(style);
      });

      polygon.on('click', function () {
        this.openPopup();
      });
    });

    // Custom popup styling injected into the page
    var style = document.createElement('style');
    style.textContent = [
      '.drivertise-popup .leaflet-popup-content-wrapper {',
      '  background: #0E1219;',
      '  border: 1px solid rgba(255,255,255,0.10);',
      '  border-radius: 12px;',
      '  box-shadow: 0 20px 60px rgba(0,0,0,0.70);',
      '}',
      '.drivertise-popup .leaflet-popup-tip {',
      '  background: #0E1219;',
      '}',
      '.drivertise-popup .leaflet-popup-close-button {',
      '  color: rgba(255,255,255,0.40) !important;',
      '  font-size: 18px !important;',
      '}',
      '.leaflet-control-zoom a {',
      '  background: #0E1219 !important;',
      '  color: rgba(255,255,255,0.70) !important;',
      '  border-color: rgba(255,255,255,0.10) !important;',
      '}',
      '.leaflet-control-zoom a:hover {',
      '  background: #1B2B3A !important;',
      '  color: #fff !important;',
      '}'
    ].join('\n');
    document.head.appendChild(style);

  });

}());
