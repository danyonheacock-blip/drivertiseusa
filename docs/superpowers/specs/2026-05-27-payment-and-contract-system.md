# Drivertiseusa — Payment & Contract System

**Date:** 2026-05-27
**Scope:** End-to-end client payment flow, digital service agreements, and recurring billing setup

---

## Overview

Every paying client goes through the same three-phase lifecycle: sign an agreement, pay a deposit, then move to auto-billed monthly subscription. This spec documents every step of that lifecycle, the tools that power it, and the standard operating procedures Danyon follows for each service type.

The goal is a system that is:
- **Professional** — clients experience a modern, trusted payment flow
- **Low-overhead** — Danyon spends minutes per client, not hours
- **Automated** — monthly billing runs without Danyon touching anything

---

## Tools

| Tool | Role | Cost |
|---|---|---|
| **Stripe** | All payments — subscriptions, one-time invoices, payment links | 2.9% + 30¢ per transaction |
| **Dropbox Sign** | E-signatures on service agreements | Free (≤3 docs/month) → $15/month at scale |
| **Mercury** | Business bank account — receives all Stripe deposits | Free |

No other payment tools. Stripe handles every financial transaction. Dropbox Sign handles every signature. Mercury holds the money.

---

## Setup (One-Time, Before First Client)

### Stripe
1. Create account at stripe.com — use the Drivertiseusa business email
2. Connect Mercury bank account for payouts (Stripe dashboard → Settings → Bank accounts)
3. Set payout schedule: daily automatic (money hits Mercury the next business day)
4. Enable automatic emails: Stripe dashboard → Settings → Emails → turn on "Upcoming invoice" (sends 7 days before each subscription charge) and "Receipt" (sends after every payment)
5. Create one reusable **Product** for each package:
   - Single Door — Founding Rate ($199/mo)
   - Single Door — Regular Rate ($299/mo)
   - Front Pair — Founding Rate ($349/mo)
   - Front Pair — Regular Rate ($499/mo)
   - Rear Pair — Founding Rate ($279/mo)
   - Rear Pair — Regular Rate ($399/mo)

### Dropbox Sign
1. Create account at sign.dropbox.com
2. Build the **Service Agreement template** (see template contents below)
3. Mark all variable fields as fill-in fields: Client Name, Business Name, Package, Monthly Price, Start Date, Billing Date
4. Save as a template — reuse for every new client (takes 30 seconds to send)

---

## The Client Payment Flow

### Magnetic Ad Clients (Standard Flow)

**Step 1 — Service Agreement (Day 0)**
- After verbal agreement, Danyon opens Dropbox Sign
- Selects the Service Agreement template
- Fills in: client name, business name, email, package, monthly price, start date
- Hits Send — client receives an email immediately
- Client opens email → clicks link → reads agreement → types their name → done in under 2 minutes
- Both parties automatically receive a signed PDF copy by email
- Danyon saves the PDF in a client folder (Google Drive or local)

**Step 2 — Deposit: 50% Upfront (Day 0–2)**
- Danyon creates a Stripe Payment Link for the deposit amount
- Sends via text: *"Awesome — sign is ordered! Here's your deposit link: [link]. Takes 30 seconds."*
- Client taps link → enters card on Stripe's secure hosted page → pays
- Stripe sends client an automatic receipt
- Danyon gets notified → orders the magnetic sign + sends the spec sheet to client for their design file

**Step 3 — Final Payment: 50% at Install**
- When sign is ready and install is scheduled, Danyon creates a Stripe Invoice for the remaining 50%
- Sends via text or email the day before install: *"We're good to go for tomorrow! Here's your final payment link: [link]"*
- Client pays before install or on install day
- Danyon installs the sign, takes a photo on the car, sends it to the client

**Step 4 — Monthly Subscription Begins**
- Danyon opens Stripe → Customers → finds the client → creates a Subscription
- Selects the correct Product (package + rate tier)
- Sets billing date: **day of install** (e.g. installed on the 14th → billed on the 14th every month). Exception: if install falls on the 29th, 30th, or 31st, set billing date to the 28th to avoid month-end errors in February
- Stripe emails the client: *"Your monthly billing is set up for $X on [date]"*
- Every month thereafter: Stripe charges automatically → sends receipt
- 7 days before each charge: Stripe sends an automatic upcoming invoice email (no action required from Danyon)

**Step 5 — Cancellation**
- Client texts or emails Danyon requesting cancellation — must be at least 7 days before next billing date
- Danyon cancels the Stripe Subscription from the dashboard (10 seconds)
- Final billing period runs, no further charges after that
- Danyon schedules sign removal at a convenient time

---

### Billboard Waitlist ($50 Deposit)

- After client submits the waitlist form on pricing.html, Danyon creates a $50 Stripe Payment Link
- Sends via email within 24 hours: *"You're on the waitlist! Here's the $50 deposit link to lock in your spot: [link]. This applies to your first month when the billboard launches."*
- Client pays → Danyon marks `deposit_paid = true` in the admin dashboard
- When billboard launches: $50 credit applied to first month's invoice

*Future: embed Stripe Checkout on the waitlist success page so deposit is collected automatically — pinned for after first clients.*

---

### Direct Mail Co-op

| Stage | Action |
|---|---|
| Slot reserved | Stripe Invoice for 50% deposit → email to client |
| Proof approved | Stripe Invoice for remaining 50% → client pays before print authorized |
| Drop confirmed | No further charge — drop goes to USPS |

---

## Payment Reference Table

| Service | Trigger | Method |
|---|---|---|
| Magnetic — 50% upfront | Agreement signed | Stripe Payment Link (text/email) |
| Magnetic — 50% at install | Install day | Stripe Invoice (email) |
| Magnetic — monthly recurring | Auto, each billing date | Stripe Subscription |
| Billboard waitlist deposit | Joins waitlist | Stripe Payment Link (email within 24hrs) |
| Direct mail — 50% reserve | Slot confirmed | Stripe Invoice (email) |
| Direct mail — 50% final | Proof approved | Stripe Invoice (email) |

---

## Service Agreement Template Contents

One clean page. Plain language.

---

**DRIVERTISE SERVICE AGREEMENT**

**Client:** [Client Name] — [Business Name]
**Service Package:** [Package Name] (e.g. Front Pair — Founding Rate)
**Monthly Rate:** $[Amount]/month
**Service Start Date:** [Date]
**Monthly Billing Date:** [Install date — e.g. the 14th of each month]

---

**What's Included**

Drivertise will display [Business Name]'s magnetic ad on [package description — e.g. the driver-side and passenger-side front door panels] of the Drivertise vehicle. The vehicle operates daily through the Saratoga Springs, Lehi, Alpine, and Highland corridor from approximately 6AM–9PM. Routes vary by day.

**Billing**

Your card on file will be automatically charged $[Amount] on the [Day of month] of each month. You will receive an email notification 7 days before each charge. Stripe processes all payments securely — Drivertise never stores your card information.

**Cancellation**

You may cancel at any time by notifying Danyon (text or email) at least 7 days before your next billing date. Your service continues through the end of the paid period. No early termination fees.

**Ad Sign**

If your magnetic sign is damaged while displayed on the Drivertise vehicle, Drivertise will replace it at no cost to you.

If you change your mind about your ad design after approving the digital proof in writing, a reprint is available at your cost. If the print shop produces a sign that differs from the approved proof, Drivertise will reprint at no cost to you.

**No Impression Guarantees**

Drivertise reports honest metrics: routes logged and hours of coverage. We do not guarantee a specific number of impressions, leads, or sales outcomes.

**Full Terms**

Complete terms of service are available at drivertiseusa.com/terms.html and are incorporated by reference.

---

By signing below, [Client Name] agrees to the terms above.

Client Signature: _________________ Date: _________

Danyon [Last Name], Drivertise: _________________ Date: _________

---

## Cancellation Policy (Summary for Reference)

- 7-day written notice required (text or email to Danyon)
- Service continues through end of current billing period
- No penalty, no fee
- Danyon cancels Stripe Subscription same day as notice confirmed
- Sign removal scheduled at mutual convenience

---

## Cost Summary

At 10 founding clients paying ~$349/month average:
- Stripe fees: ~$130/month (2.9% + 30¢ per transaction)
- Dropbox Sign: $0/month (under 3 docs/month) → $15/month when scaling
- Mercury: $0/month
- **Total tool cost: under $20/month to start**

---

## Pinned for Later (Website Integrations)

These three integrations were designed but deferred until the first few clients are live:

1. **Billboard waitlist Stripe Checkout** — Embed $50 deposit payment directly on pricing.html success state so clients can pay immediately after joining the waitlist
2. **Admin wizard Stripe Customer creation** — "Add Client" wizard auto-creates a Stripe Customer and stores `stripe_customer_id` on the profiles table
3. **Client portal live billing status** — Pull subscription status and next billing date from Stripe API into the Active Plan card on the client portal

A reminder chip has been created for these. Start them after the first 2–3 clients are onboarded and the workflow is proven.

---

## Verification Steps

1. **Stripe setup**: Create account, connect Mercury, enable automatic emails, create all 6 products — verify products appear in Stripe dashboard
2. **Dropbox Sign template**: Send a test agreement to yourself — verify all fields are editable, signing works, PDF copy is delivered
3. **First client flow**: Walk through all 5 steps with the first client — agreement signed, deposit paid, install payment received, subscription active in Stripe, upcoming invoice email received 7 days before first charge
4. **Cancellation test**: Create a test subscription, cancel it — verify final period runs, no further charges
5. **Mercury**: Verify first Stripe payout lands in Mercury account within 2 business days of first payment
