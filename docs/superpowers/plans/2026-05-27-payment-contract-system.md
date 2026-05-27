# Payment & Contract System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Set up Stripe + Dropbox Sign as the complete payment and contract system for Drivertiseusa, remove the payment placeholder from pricing.html, and create reusable reference documents (service agreement template + SOP).

**Architecture:** Three external tool accounts (Mercury → Stripe → Dropbox Sign) configured in sequence since each depends on the previous. One small code change to pricing.html. Two markdown docs created and committed as project files.

**Tech Stack:** Stripe (subscriptions, invoices, payment links), Dropbox Sign (e-signatures), Mercury (business bank), HTML for pricing.html update.

---

### Task 1: Mercury Business Bank Account

**Files:** None (external account setup)

*Skip this task if Mercury is already created and verified.*

- [ ] **Step 1: Create Mercury account**
  - Go to [mercury.com](https://mercury.com) → "Open an Account"
  - Business type: Sole Proprietor (or LLC if already formed)
  - Use the Drivertiseusa business email
  - Approval takes 1–3 business days — complete the rest of this task, then wait

- [ ] **Step 2: Complete identity verification**
  - Mercury will prompt for: legal name, SSN, date of birth, home address
  - Upload a government-issued photo ID when prompted
  - Do not skip — required before any deposits can be received

- [ ] **Step 3: Fund the account**
  - Transfer at least $1 from a personal account to activate
  - Mercury dashboard → Move Money → Add funds

- [ ] **Step 4: Save routing and account numbers**
  - Mercury dashboard → Account → Account details
  - Copy the Routing Number and Account Number to a secure note
  - You'll enter these into Stripe in Task 2

---

### Task 2: Stripe Account Setup

**Files:** None (external account setup)

- [ ] **Step 1: Create Stripe account**
  - Go to [stripe.com](https://stripe.com) → Create account
  - Use the Drivertiseusa business email
  - Country: United States
  - Business type: Individual / Sole Proprietor
  - Business name: Drivertiseusa

- [ ] **Step 2: Complete identity verification**
  - Stripe prompts for: SSN (last 4 or full), date of birth, home address
  - Required before payouts are enabled — complete immediately, do not defer

- [ ] **Step 3: Connect Mercury bank account**
  - Stripe dashboard → Settings (gear icon, top right) → Bank accounts and scheduling
  - Click "Add bank account"
  - Enter the Mercury Routing Number and Account Number from Task 1 Step 4
  - Stripe sends 2 micro-deposits to Mercury (arrive within 1–2 business days)
  - Return to this step once deposits appear: Stripe dashboard → Settings → Bank accounts → Verify → enter both deposit amounts

- [ ] **Step 4: Set payout schedule to Daily**
  - Stripe dashboard → Settings → Bank accounts and scheduling
  - Payout schedule → Automatic → Daily
  - This means money clears from Stripe into Mercury the next business day after each payment

- [ ] **Step 5: Enable automatic customer emails**
  - Stripe dashboard → Settings → Emails
  - Turn ON: **Upcoming renewal reminder** — Stripe sends this automatically 7 days before each subscription charge
  - Turn ON: **Successful payment receipt** — client gets a receipt after every payment
  - Turn ON: **Failed payment** — you get notified if a client's card declines
  - Save changes

---

### Task 3: Create Stripe Products

**Files:** None (Stripe dashboard)

These products become the line items on subscriptions. Create all 7 now so they're ready when the first client signs.

- [ ] **Step 1: Open Product catalog**
  - Stripe dashboard → Product catalog (left nav) → + Add product

- [ ] **Step 2: Create Single Door — Founding Rate**
  - Name: `Single Door — Founding Rate`
  - Description: `1 front door panel (driver or passenger). Founding rate — locked in permanently.`
  - Pricing model: Recurring
  - Price: $199.00 / month
  - Save product

- [ ] **Step 3: Create Single Door — Regular Rate**
  - Name: `Single Door — Regular Rate`
  - Description: `1 front door panel (driver or passenger).`
  - Pricing model: Recurring
  - Price: $299.00 / month
  - Save product

- [ ] **Step 4: Create Front Pair — Founding Rate**
  - Name: `Front Pair — Founding Rate`
  - Description: `Driver front + passenger front door panels. Founding rate — locked in permanently.`
  - Pricing model: Recurring
  - Price: $349.00 / month
  - Save product

- [ ] **Step 5: Create Front Pair — Regular Rate**
  - Name: `Front Pair — Regular Rate`
  - Description: `Driver front + passenger front door panels.`
  - Pricing model: Recurring
  - Price: $499.00 / month
  - Save product

- [ ] **Step 6: Create Rear Pair — Founding Rate**
  - Name: `Rear Pair — Founding Rate`
  - Description: `Rear driver + rear passenger door panels. Founding rate — locked in permanently.`
  - Pricing model: Recurring
  - Price: $279.00 / month
  - Save product

- [ ] **Step 7: Create Rear Pair — Regular Rate**
  - Name: `Rear Pair — Regular Rate`
  - Description: `Rear driver + rear passenger door panels.`
  - Pricing model: Recurring
  - Price: $399.00 / month
  - Save product

- [ ] **Step 8: Create Billboard Waitlist Deposit**
  - Name: `Billboard Waitlist Deposit`
  - Description: `$50 deposit to hold your spot. Applies toward your first month when the billboard launches.`
  - Pricing model: One time
  - Price: $50.00
  - Save product

- [ ] **Step 9: Verify product catalog**
  - Stripe → Product catalog should now list 7 products
  - Confirm all names and prices are correct before continuing

---

### Task 4: Dropbox Sign — Service Agreement Template

**Files:** None (external tool setup)

- [ ] **Step 1: Create Dropbox Sign account**
  - Go to [sign.dropbox.com](https://sign.dropbox.com) → Sign up
  - Use the Drivertiseusa business email
  - Free plan covers 3 documents/month — no payment needed to start

- [ ] **Step 2: Start a new template**
  - Dropbox Sign dashboard → Templates → Create a template
  - Choose: "I'm the only signer" or "I and others" — select "Me and one other" (you + client)
  - Upload method: type directly or upload a doc — either works

- [ ] **Step 3: Enter the agreement text**

  Type or paste the following into the document:

  ```
  DRIVERTISE SERVICE AGREEMENT

  Client: _______________  Business: _______________
  Package: _______________
  Monthly Rate: $_______________/month
  Service Start Date: _______________
  Monthly Billing Date: _______________ (the same day each month)

  WHAT'S INCLUDED

  Drivertise will display [Business Name]'s magnetic ad on [package description
  — e.g. the driver-side and passenger-side front door panels] of the Drivertise
  vehicle. The vehicle operates daily through the Saratoga Springs, Lehi, Alpine,
  and Highland corridor from approximately 6AM–9PM. Routes vary by day.

  BILLING

  Your card on file will be automatically charged $[Monthly Rate] on the billing
  date listed above each month. You will receive an email notification 7 days
  before each charge. Stripe processes all payments securely — Drivertise never
  stores your card information.

  CANCELLATION

  You may cancel at any time by notifying Danyon (text or email) at least 7 days
  before your next billing date. Your service continues through the end of the paid
  period. No early termination fees.

  AD SIGN

  If your magnetic sign is damaged while displayed on the Drivertise vehicle,
  Drivertise will replace it at no cost to you.

  If you change your mind about your ad design after approving the digital proof
  in writing, a reprint is available at your cost. If the print shop produces a
  sign that differs from the approved proof, Drivertise will reprint at no cost
  to you.

  NO IMPRESSION GUARANTEES

  Drivertise reports honest metrics: routes logged and hours of coverage. We do
  not guarantee a specific number of impressions, leads, or sales outcomes.

  FULL TERMS

  Complete terms of service are available at drivertiseusa.com/terms.html and
  are incorporated by reference.

  ─────────────────────────────────────────────

  Client Signature: _______________  Date: _______________

  Danyon [YOUR LAST NAME], Drivertise: _______________  Date: _______________
  ```

  **Replace `[YOUR LAST NAME]` with your actual last name before saving the template.**

- [ ] **Step 4: Add signer fields**
  - Mark the signature line for "Client" as an e-signature field assigned to the client signer
  - Mark the date field next to client signature as an auto-date field (fills in automatically when signed)
  - Mark the signature line for "Danyon" as an e-signature field assigned to you
  - Mark the date field next to your signature as an auto-date field
  - Mark the blank lines for: Client name, Business, Package, Monthly Rate, Start Date, Billing Date — as text fields that Danyon fills in before sending each time

- [ ] **Step 5: Save the template**
  - Template name: `Drivertise Service Agreement`
  - Save as reusable template

- [ ] **Step 6: Send a test agreement to yourself**
  - Templates → Drivertise Service Agreement → Use template
  - Fill in dummy data (Test Client, Test Business, Front Pair — Founding Rate, $349, etc.)
  - Enter your own email as the client signer
  - Send
  - Open the email from the client side → sign it
  - Verify: both your Dropbox Sign account and the "client" email receive a signed PDF automatically
  - Verify: the document is readable on a mobile phone (clients will likely sign on their phone)

---

### Task 5: Update pricing.html — Remove Payment Placeholder

**Files:**
- Modify: `D:\Projects\Drivertiseusa\pricing.html`

- [ ] **Step 1: Find the placeholder**

  Open `D:\Projects\Drivertiseusa\pricing.html`. Search for `Payment method coming soon` — it's in the `id="wl-success"` div around line 587.

- [ ] **Step 2: Replace the placeholder paragraph**

  Find:
  ```html
  <p>To lock in your spot, send your $50 deposit to <strong>[Payment method coming soon — Mercury banking pending]</strong>. We'll reach out directly with details.</p>
  ```

  Replace with:
  ```html
  <p>You'll receive a secure Stripe payment link at your email within 24 hours to lock in your $50 deposit — takes less than a minute to pay. We'll reach out directly when the billboard launches.</p>
  ```

- [ ] **Step 3: Verify in browser**
  - Open `pricing.html` in a browser
  - Scroll to the Electric Billboard section
  - Fill out and submit the waitlist form with a test name and email
  - Confirm the success message shows the new text with no brackets or placeholder language visible

- [ ] **Step 4: Commit**
  ```bash
  git add D:/Projects/Drivertiseusa/pricing.html
  git commit -m "fix: replace billboard waitlist payment placeholder with Stripe instructions"
  ```

---

### Task 6: Create Service Agreement Document File

**Files:**
- Create: `D:\Projects\Drivertiseusa\docs\service-agreement-template.md`

Saves the agreement text as a versioned project file — easy to update, reference, or hand to a lawyer later.

- [ ] **Step 1: Create the file**

  Create `D:\Projects\Drivertiseusa\docs\service-agreement-template.md` with the following content:

  ```markdown
  # Drivertise Service Agreement Template

  *Use this text when building or updating the Dropbox Sign template.*
  *Replace [YOUR LAST NAME] with your actual last name in Dropbox Sign directly.*
  *All other bracketed fields are filled in per-client before sending.*

  **Billing date rule:** Use the install date. If install falls on the 29th, 30th,
  or 31st — set billing date to the 28th to avoid February month-end errors in Stripe.

  ---

  DRIVERTISE SERVICE AGREEMENT

  Client: [Client Name] — [Business Name]
  Service Package: [Package Name] (e.g. Front Pair — Founding Rate)
  Monthly Rate: $[Amount]/month
  Service Start Date: [Start Date]
  Monthly Billing Date: [Install date — e.g. the 14th of each month]

  WHAT'S INCLUDED

  Drivertise will display [Business Name]'s magnetic ad on [package description
  — e.g. the driver-side and passenger-side front door panels] of the Drivertise
  vehicle. The vehicle operates daily through the Saratoga Springs, Lehi, Alpine,
  and Highland corridor from approximately 6AM–9PM. Routes vary by day.

  BILLING

  Your card on file will be automatically charged $[Amount] on the [Install date]
  of each month. You will receive an email notification 7 days before each charge.
  Stripe processes all payments securely — Drivertise never stores your card
  information.

  CANCELLATION

  You may cancel at any time by notifying Danyon (text or email) at least 7 days
  before your next billing date. Your service continues through the end of the paid
  period. No early termination fees.

  AD SIGN

  If your magnetic sign is damaged while displayed on the Drivertise vehicle,
  Drivertise will replace it at no cost to you.

  If you change your mind about your ad design after approving the digital proof
  in writing, a reprint is available at your cost. If the print shop produces a
  sign that differs from the approved proof, Drivertise will reprint at no cost
  to you.

  NO IMPRESSION GUARANTEES

  Drivertise reports honest metrics: routes logged and hours of coverage. We do
  not guarantee a specific number of impressions, leads, or sales outcomes.

  FULL TERMS

  Complete terms of service are available at drivertiseusa.com/terms.html and
  are incorporated by reference.

  ---

  By signing below, [Client Name] agrees to the terms above.

  Client Signature: _________________  Date: _________

  Danyon [YOUR LAST NAME], Drivertise: _________________  Date: _________
  ```

- [ ] **Step 2: Commit**
  ```bash
  git add D:/Projects/Drivertiseusa/docs/service-agreement-template.md
  git commit -m "docs: add service agreement template"
  ```

---

### Task 7: Create Payment SOP Reference Card

**Files:**
- Create: `D:\Projects\Drivertiseusa\docs\payment-sop.md`

A one-page quick-reference Danyon follows for every new client. Keeps the workflow consistent as the client list grows.

- [ ] **Step 1: Create the file**

  Create `D:\Projects\Drivertiseusa\docs\payment-sop.md` with the following content:

  ```markdown
  # Drivertise Payment SOP

  *Quick reference — follow in order for every new client.*

  ---

  ## New Magnetic Ad Client

  **Day 0 — Service Agreement**
  1. Dropbox Sign → Drivertise Service Agreement template
  2. Fill in: Client Name, Business Name, Package, Monthly Rate, Start Date
  3. Billing Date = leave blank until install day
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
  17. From here: Stripe charges monthly, sends upcoming invoice email 7 days early, sends receipt — no action needed

  **Cancellation (if client requests)**
  - Must be at least 7 days before next billing date (text or email)
  - Stripe → Customers → [Client name] → Subscriptions → Cancel subscription
  - Final billing period runs, no further charges
  - Schedule sign removal at mutual convenience

  ---

  ## Billboard Waitlist — $50 Deposit

  *After client submits the waitlist form on pricing.html:*

  1. Stripe → Payment Links → + Create link → $50 → product: Billboard Waitlist Deposit → Create
  2. Email client within 24 hours:
     *"You're on the list! Here's your $50 deposit link to lock in your spot: [link].
     This applies to your first month when the billboard launches."*
  3. Once paid: admin dashboard → Billboard Waitlist tab → mark Deposit Paid ✓

  ---

  ## Direct Mail Co-op

  **Reserve slot (client confirmed):**
  1. Stripe → Customers → [Client name] → Create invoice → 50% of their tier price → Send

  **Proof approved (client signs off in writing):**
  2. Stripe → Customers → [Client name] → Create invoice → remaining 50% → Send
  3. Do not authorize the print run until this invoice is paid

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
  ```

- [ ] **Step 2: Commit**
  ```bash
  git add D:/Projects/Drivertiseusa/docs/payment-sop.md
  git commit -m "docs: add payment SOP quick reference"
  ```

---

## Verification Checklist

Run through these before considering the system live:

- [ ] Mercury account created and identity verified
- [ ] At least $1 deposited to activate Mercury
- [ ] Stripe account created and identity verified
- [ ] Stripe micro-deposits verified in Mercury — bank account confirmed connected
- [ ] Payout schedule set to Daily Automatic
- [ ] All 3 email types enabled (upcoming renewal, receipt, failed payment)
- [ ] All 7 Stripe products visible in Product catalog with correct names and prices
- [ ] Dropbox Sign account created
- [ ] Service agreement template saved and tested — signed PDF received by both parties on mobile
- [ ] `[YOUR LAST NAME]` replaced with actual last name in Dropbox Sign template
- [ ] pricing.html: no bracket placeholder visible in billboard waitlist success message
- [ ] `docs/service-agreement-template.md` committed to git
- [ ] `docs/payment-sop.md` committed to git
- [ ] **Dry run with first real client:** agreement signed → deposit paid → install → subscription active → upcoming invoice email received 7 days before first charge
