# Drivertise Payment SOP

*Quick reference — follow in order for every new client.*

---

## New Magnetic Ad Client

**Day 0 — Service Agreement**
1. Dropbox Sign → Drivertise Service Agreement template
2. Fill in: Client Name, Business Name, Package, Monthly Rate, Start Date
3. Leave Billing Date blank until install day
4. Send — client signs in ~2 min, both receive signed PDF automatically
5. Save the signed PDF to the client's folder (Google Drive or local)

**Day 0–2 — Deposit (50% upfront)**
6. Stripe → Payment Links → + Create link → enter deposit amount → Create
7. Text client: *"Awesome — sign is ordered! Here's your deposit link: [paste link]. Takes 30 seconds."*
8. Stripe emails client a receipt automatically when paid
9. Order the magnetic sign + email client the spec sheet for their design file

**Install Day — Final Payment (50% at install)**
10. Stripe → Customers → [Client name] → Create invoice → enter remaining 50% amount → Send invoice
11. Text day before install: *"We're good to go for tomorrow! Here's your final payment: [paste link from invoice email]"*
12. Install sign after payment confirmed → take photo → send to client

**Post-Install — Monthly Subscription**
13. Stripe → Customers → [Client name] → Create subscription
14. Select product: [Package] — [Rate Tier] (e.g. Front Pair — Founding Rate)
15. Billing date = install date (use 28th if install was on the 29th, 30th, or 31st)
16. Start subscription — Stripe auto-emails client their billing confirmation
17. Done — Stripe charges monthly, sends 7-day advance notice, sends receipt automatically

**Cancellation (if client requests)**
- Must be at least 7 days before next billing date (text or email counts)
- Stripe → Customers → [Client name] → Subscriptions → Cancel subscription
- Final billing period runs, no further charges
- Schedule sign removal at mutual convenience

---

## Billboard Waitlist — $50 Deposit

*After client submits the waitlist form on pricing.html:*

1. Stripe → Payment Links → + Create → $50 → product: Billboard Waitlist Deposit → Create
2. Email client within 24 hours:
   *"You're on the list! Here's your $50 deposit link to lock in your spot: [link].
   This applies toward your first month when the billboard launches."*
3. Once paid: admin dashboard → Billboard Waitlist tab → mark Deposit Paid ✓

---

## Direct Mail Co-op

**Reserve slot (client confirmed):**
1. Stripe → Customers → [Client name] → Create invoice → 50% of their tier price → Send

**Proof approved (client signs off in writing):**
2. Stripe → Customers → [Client name] → Create invoice → remaining 50% → Send
3. Do not authorize the print run until this invoice is paid and confirmed

---

## Stripe Cheat Sheet

| Action | Where in Stripe |
|---|---|
| Create a payment link (one-time) | Payment Links → + Create |
| Send an invoice | Customers → [client] → Create invoice |
| Start a subscription | Customers → [client] → Create subscription |
| Cancel a subscription | Customers → [client] → Subscriptions → Cancel |
| See all active subscriptions | Subscriptions (left nav) |
| Check payout landed in Mercury | Balance → Payouts |
| See a client's full payment history | Customers → [client] → Payments tab |
