# Company Periscope — Post-Payment Operations Playbook
**AI Receptionist Service | $1,000 Onboarding + $500/month**
*Internal SOP — Last Updated: April 2026*

---

## Quick Reference: The 7 Moments That Matter

| When | What Happens | Owner |
|---|---|---|
| Minute 0 | Payment hits → GHL contact created, welcome email fires, internal alert sent | Automated |
| Hour 1 | Dan reviews onboarding form responses | Dan |
| Hour 4–24 | Onboarding call scheduled with client | Dan / ops |
| Day 1–2 | AI configured, QA tested, client goes live | Fulfillment |
| Day 3 | First human check-in — "how's it going?" | Dan |
| Day 30 | Month 1 report delivered + satisfaction survey sent | Automated + Dan |
| Monthly | Report, QA, touchpoint — every single month, no exceptions | Ops |

---

## 1. Notification Triggers

**Who gets notified the moment payment comes in?**

- **Primary account owner:** Dan (or assigned ops lead). Every client has one named human responsible from Day 0.
- **Founder alert:** Every single sale. This is a $1,000 high-ticket product — no threshold, no exceptions.
- **Internal SLA:** Team acknowledges new client within 1 hour during business hours. After hours: first thing next morning (client is already on the thank-you page filling their onboarding form).

**Notification channels to configure:**
- Email → internal team + hello@companyperiscope.com
- GHL → Stripe webhook auto-creates contact, fires internal notification + task
- GHL Pipeline → Contact moves: Lead → "New Client — Awaiting Onboarding Form"
- Fulfillment team → notified via GHL task assignment within 1 hour

**Accounting:** Stripe sends automatic payment receipt. No manual confirmation step needed.

---

## 2. Immediate Automations (First 0–15 Minutes)

Everything below should happen with zero human action. If a team member must manually trigger any of this, it's a gap.

**Minute 0 — Stripe payment confirmed:**
- Client redirected to `thank-you-signup.html` (already built)
- Page shows 3-step onboarding timeline and GHL onboarding form immediately

**Minute 0 — Welcome email (via GHL):**
- Subject: "You're in — here's what happens next"
- Content: Payment confirmed, 48-hour go-live timeline, what to expect on the onboarding call
- Tone: Warm, human, no fluff

**Minute 1 — CRM (GHL):**
- Contact auto-created with tags: "New Client," "Awaiting Onboarding Form," "Payment Received"
- Pipeline stage set: New Client — Setup Pending
- GHL task auto-created and assigned to Dan: "Review onboarding form — [Client Name]"

**Minute 5 — Internal alert:**
- Stripe webhook → GHL → Email to ops: "New client payment received — [name, amount, timestamp]"

**Gaps to close (not yet built):**
- [ ] Service agreement via e-sign (DocuSign or PandaDoc) — should fire automatically at payment
- [ ] Welcome SMS: "You're in! Check your email — onboarding starts now." — dramatically improves form completion
- [ ] Self-scheduling link in the welcome email so client books their own onboarding call immediately

---

## 3. Onboarding Timeline

**Our promise: AI live within 48 hours of payment.**

### Hour 0 — Payment
- Stripe fires. Client lands on thank-you page. Onboarding form is right there. Most clients fill it immediately.
- Internal team notified via GHL.

### Hour 1–4 — Form Review
- Dan or ops reviews GHL onboarding form responses.
- Identify: business type, call volume, services offered, hours, special instructions, any red flags.

### Hour 4–24 — Onboarding Call Scheduled
- Scheduling link sent to client (via email or GHL automation).
- 30–45 minute call booked within 24 hours of payment. This is a stated promise — hold to it.

### Day 1 — Onboarding Call
- Confirm: business details, call handling preferences, escalation rules (when AI routes to a human), FAQs the AI needs to handle, tone/voice preferences
- Collect: any remaining assets, existing phone number info, forwarding instructions

### Day 1–2 — AI Configuration
- Set up AI phone number or configure forwarding from client's existing number
- Program business info: hours, services, location, pricing FAQs
- Configure call handling scripts and after-hours responses
- Set escalation rules: what triggers a live transfer vs. message capture
- Build AI knowledge base from onboarding form + call notes

### Day 2 — Internal QA
- Place test calls. Verify AI handles every scenario covered in the onboarding call correctly.
- Catch issues before the client sees them. Do not skip this step.

### Day 2 — Go Live
- "You're live" confirmation email sent to client.
- Include: what to expect, how calls will be handled, who to contact with issues.
- 48-hour clock is met.

### Day 3 — First Check-In (Mandatory)
- Human touchpoint. Email or quick call: "Your AI has been live for 24 hours — any calls come through? Anything feel off?"
- This catches setup issues before they become complaints. Never skip.

**Escalation rule — unresponsive client:**
If client has not filled onboarding form within 24 hours of payment → call them directly.
If unreachable within 48 hours → flag in GHL, follow up daily for 5 days.
Do not let onboarding stall silently.

---

## 4. Cross-Sell & Upsell Strategy

### Our Upsell Catalog

| Service | Description | Est. Price |
|---|---|---|
| Additional locations / lines | Each extra number is its own AI instance | $200–250/month |
| SMS follow-up sequences | AI captures lead → automation follows up via text | Add-on |
| Post-call review requests | Automated Google review ask after every resolved call | Add-on |
| Lead nurture sequences | Multi-touch follow-up for leads captured by AI | Add-on |
| Website chatbot | Complement to phone AI — captures web leads 24/7 | Add-on |
| CRM integration setup | Connect AI to client's existing CRM | One-time |
| Monthly analytics dashboard | Deeper call data and reporting | Add-on |
| Premium / priority tier | Dedicated account manager + faster SLA | $750/month |

### Upsell Timing

| Timing | Action | Owner |
|---|---|---|
| Day 30 | Soft mention in Month 1 report ("Did you know we also offer SMS follow-up?") | Written, no pressure |
| Day 60 | Formal upsell email or call — most relevant add-on based on their usage | Dan |
| Day 90 | Referral program introduced | Automated |
| Renewal | Bundle upgrade offer ("Add a second location for $150 more this month") | Dan |

**Trigger-based upsell (don't wait for the timeline):**
- Client mentions multiple locations → pitch additional lines immediately
- Client asks about text follow-up → pitch SMS sequences immediately
- Act on buying signals when they appear, not on a calendar

### Referral Program (Day 90+)
"Know a business owner who's losing calls? Refer them and get one month free."
Simple, zero friction. Every happy client is a referral source.

---

## 5. Quality & Check-In Cadence

Every touchpoint below has a named owner. If there's no owner, it won't happen.

### Day 3 — First Check-In
- Call or email: "Your AI has been live for a day — how's it going? Any calls come through?"
- Goal: Catch setup issues early.
- Owner: Dan

### Day 30 — Month 1 Report
Deliver a performance summary including:
- Total calls handled by AI
- After-hours calls captured (would have been missed before)
- Estimated revenue protected (avg job value × calls captured — use the calculator math)
- Any issues or reconfigurations needed

Also send: 1-question satisfaction survey ("How likely are you to recommend us? 1–10")

- Owner: GHL automation sends the report. Dan reviews NPS scores same day.

### Monthly — Every Month, No Exceptions
- Same report format as Month 1
- Internal QA review of AI call handling completed before billing hits
- If quality has slipped, fix it before the client notices
- Owner: Ops (report generation) + Dan (QA sign-off before report goes out)

### Quarterly — Month 3+ Accounts
- Live strategy call with client
- Review results against their business goals
- Identify expansion opportunities
- Reinforce value with real numbers
- Owner: Dan

**What counts as a quality issue:**
- AI providing wrong information on calls
- Client reports a missed call that should have been caught
- Unanswered escalation from the client
- Any declined payment

---

## 6. Churn Prevention

A client going silent is never neutral. Treat unresponsiveness as a churn signal, not a quiet account.

### Warning Signals

| Signal | What It Means | Action |
|---|---|---|
| Onboarding form not submitted in 24 hrs | Client may not be fully committed | Call them directly — do not email |
| No AI calls in first 7 days | Number forwarding likely broken | Check config, call client to troubleshoot |
| No response to 2+ consecutive check-ins | At-risk account | Escalate to Dan immediately, phone call not email |
| Client complaint or escalation | Active dissatisfaction | Same-day response, Dan handles personally |
| "Can we pause?" request | This is a churn signal | Dan has the conversation — offer pause option first |
| Payment failure on Month 2 | Billing issue or intent to cancel | Outreach same day, retry within 72 hours |

### Intervention Playbook

1. Define a health score in GHL — track: calls handled, days since last check-in response, NPS score, payment status
2. Flag any account with 2+ unanswered check-ins for immediate human outreach
3. Flag any account with zero calls in 7 days for technical review
4. "Save offer" options:
   - **Option A:** 30-day pause — skip one month, no charge, AI stays configured
   - **Option B:** Free AI reconfiguration — if quality was the issue, rebuild it at no cost
   - **Option C:** Reduced scope rate — if budget is the issue, explore $350/month with fewer features
5. Every cancellation conversation produces product feedback — log the reason in GHL and route to Dan

---

## 7. Offboarding & Cancellation

A clean offboarding protects reputation, preserves data integrity, and creates a structured win-back opportunity.

### How a Client Cancels
Email hello@companyperiscope.com with subject: "Cancel My Account"
Dan or ops responds within 24 hours to confirm and schedule a brief exit conversation.
No hoops, no dark patterns.

### Notice Period
None required. Month-to-month. Cancellation takes effect at end of current billing period.

### Refund Policy
- **$500 first-month subscription:** Refundable if cancellation is requested within 30 days of payment
- **$500 onboarding fee:** Non-refundable (work was performed)
- **After 30 days:** No refund on any charges

### Exit Conversation (5 minutes, always do this)
Goal: understand the real reason they're leaving.
Questions to ask:
- "Was it the results? The price? A technical issue?"
- "Is there anything we could have done differently?"

Log the answer in GHL under "Cancellation Reason." Route feedback to Dan for product improvement.

### Deprovisioning Checklist
- [ ] Release or transfer AI phone number if client wants to keep it
- [ ] Archive client in GHL pipeline — tag: "Churned"
- [ ] Stop all active GHL automation sequences for this contact
- [ ] Export and deliver call logs to client (their data)
- [ ] Internal debrief: What could we have done to prevent this?

### Win-Back Sequence (GHL Automated)
- Day 30 post-cancel: "How are things going? Calls still coming in after hours?"
- Day 60 post-cancel: "We've made improvements to the AI — here's what's new."
- Day 90 post-cancel: "We'd love to have you back. Same guarantee, and we'll waive the onboarding fee."

---

## 8. Gaps to Close — Priority Action Items

These are things that don't exist yet but should before we scale.

| Priority | What | Why It Matters |
|---|---|---|
| 1 | Stripe webhook → GHL fully configured | Without this, contact creation and internal alerts are manual |
| 2 | Service agreement via e-sign (DocuSign / PandaDoc) | Protects both parties, sets expectations, fires automatically at payment |
| 3 | Welcome SMS at payment | Dramatically increases same-day onboarding form completion |
| 4 | Self-scheduling link in welcome email | Client books their own onboarding call without waiting for us to reach out |
| 5 | Monthly report template (automated) | Currently manual — should be auto-populated from GHL/call data by Month 2 |
| 6 | Churn health score dashboard in GHL | Proactive flagging instead of reactive firefighting |
| 7 | Pre-written upsell email templates for Day 60 | Dan should send with one click, not write from scratch each time |

---

*This document should be reviewed and updated quarterly. Owner: Dan.*
*Questions: hello@companyperiscope.com*
