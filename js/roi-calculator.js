/* ══════════════════════════════════════════════════
   DRIVERTISE USA — ROI CALCULATOR
   ══════════════════════════════════════════════════ */

(function () {
  'use strict';

  // Business type data: { conversionRate, avgTicket, googleCPL, frequency }
  const BUSINESS_TYPES = {
    hvac:       { rate: 0.007, ticket: 250,  googleCPL: 65,  freq: 1.5, label: 'HVAC / Plumbing' },
    dental:     { rate: 0.005, ticket: 320,  googleCPL: 45,  freq: 2,   label: 'Dental / Medical' },
    restaurant: { rate: 0.004, ticket: 35,   googleCPL: 30,  freq: 6,   label: 'Restaurant / Food' },
    realestate: { rate: 0.003, ticket: 4500, googleCPL: 120, freq: 1,   label: 'Real Estate' },
    retail:     { rate: 0.004, ticket: 65,   googleCPL: 25,  freq: 4,   label: 'Retail / Shop' },
    beauty:     { rate: 0.006, ticket: 85,   googleCPL: 40,  freq: 3,   label: 'Beauty / Salon' },
    auto:       { rate: 0.005, ticket: 180,  googleCPL: 55,  freq: 2,   label: 'Auto Services' },
    fitness:    { rate: 0.004, ticket: 60,   googleCPL: 35,  freq: 4,   label: 'Fitness / Wellness' },
    other:      { rate: 0.004, ticket: 150,  googleCPL: 50,  freq: 2,   label: 'Other Business' },
  };

  // Zone options: impressions per month
  const ZONE_IMPRESSIONS = {
    1: 50000,
    2: 95000,
    3: 135000,
  };

  // Pricing per zone per month
  const PRICE_PER_ZONE = 300;

  function fmt(n, prefix = '', suffix = '') {
    if (n >= 1000) return prefix + n.toLocaleString('en-US', { maximumFractionDigits: 0 }) + suffix;
    return prefix + n.toFixed(0) + suffix;
  }

  function fmtDollar(n) {
    return '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
  }

  function calculate() {
    const bizType  = document.getElementById('calc-biz')?.value || 'other';
    const zones    = parseInt(document.getElementById('calc-zones')?.value || '1');
    const data     = BUSINESS_TYPES[bizType] || BUSINESS_TYPES['other'];

    const monthlyImpressions = ZONE_IMPRESSIONS[zones] || ZONE_IMPRESSIONS[1];
    const weeklyImpressions  = Math.round(monthlyImpressions / 4.3);
    const monthlyLeads       = Math.round(monthlyImpressions * data.rate);
    const monthlyRevenue     = monthlyLeads * data.ticket * data.freq;
    const monthlySpend       = zones * PRICE_PER_ZONE;
    const costPerLead        = monthlyLeads > 0 ? (monthlySpend / monthlyLeads) : 0;
    const roi                = monthlySpend > 0 ? ((monthlyRevenue - monthlySpend) / monthlySpend * 100) : 0;
    const googleCPLCompare   = data.googleCPL;
    const savings            = monthlyLeads > 0 ? ((googleCPLCompare - costPerLead) * monthlyLeads) : 0;

    // Update display elements
    setEl('calc-impressions',   fmt(weeklyImpressions, '', '+'));
    setEl('calc-monthly-imp',   fmt(monthlyImpressions, '', '+'));
    setEl('calc-leads',         fmt(monthlyLeads, '', ''));
    setEl('calc-cpl',           fmtDollar(costPerLead));
    setEl('calc-google-cpl',    fmtDollar(googleCPLCompare));
    setEl('calc-spend',         fmtDollar(monthlySpend));
    setEl('calc-revenue',       fmtDollar(Math.round(monthlyRevenue)));
    setEl('calc-roi',           roi.toFixed(0) + '%');
    setEl('calc-savings',       savings > 0 ? fmtDollar(Math.round(savings)) + ' saved vs. Google Ads' : '—');

    // Savings color
    const savingsEl = document.getElementById('calc-savings');
    if (savingsEl) {
      savingsEl.style.color = savings > 0 ? 'var(--green)' : 'var(--w38)';
    }

    // Highlight the main output
    const mainVal = document.getElementById('calc-main-value');
    if (mainVal) {
      mainVal.textContent = fmt(monthlyLeads, '', '') + (monthlyLeads === 1 ? ' lead' : ' leads') + '/mo';
    }

    // Show ROI note
    const roiNote = document.getElementById('calc-roi-note');
    if (roiNote) {
      if (roi > 200) {
        roiNote.textContent = '🟢 Strong ROI — estimated ' + roi.toFixed(0) + '% return on ad spend';
        roiNote.style.color = 'var(--green)';
      } else if (roi > 50) {
        roiNote.textContent = '🟡 Positive ROI — estimated ' + roi.toFixed(0) + '% return on ad spend';
        roiNote.style.color = 'var(--yellow)';
      } else {
        roiNote.textContent = 'Estimates based on industry averages. Results vary by market and creative.';
        roiNote.style.color = 'var(--w38)';
      }
    }
  }

  function setEl(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function init() {
    const bizSel   = document.getElementById('calc-biz');
    const zonesSel = document.getElementById('calc-zones');

    if (!bizSel && !zonesSel) return; // Calculator not on this page

    [bizSel, zonesSel].forEach(el => {
      if (el) el.addEventListener('change', calculate);
    });

    // Run immediately
    calculate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
