# Project 2: Executive Events

**Document type:** Master Project Documentation (internal knowledge base — not portfolio copy)
**Status:** Living document, partially complete. Structural/factual/evidence decisions below are confirmed; the full narrative interview (challenge → thinking → strategy → execution → outcome → reflection, STAR stories, resume/LinkedIn bullets) is still outstanding — run it before treating this doc as done.
**Last updated:** 2026-08-06, from an asset-review and evidence-integrity session (not yet a full structured interview).
**Company / client:** Intellimation.ai — proprietary Vertical AI platform for banking and financial services (BFSI)
**Employment relationship:** Contractor via Noova Data Ltd
**Engagement window (this project):** March – September 2025
**Location:** London, Boston, New York

---

## Project Overview

Executive event marketing and commercial operations for four events supporting Intellimation.ai's enterprise sales motion in capital markets: **SRP Europe** (London, March 2025), the **Collateral Management Optimisation Summit** (Hilton London Kensington, 3–4 April 2025), a month-long **executive outreach programme** across Boston and New York (summer 2025), and an **executive reception at the British Consulate-General, New York**, in partnership with HM Government (9 December 2025 — note: invitation date is December 2025, outside the March–September window quoted in the case study; reconcile this date discrepancy in the next interview pass). Reported to / worked directly with the CEO and commercial leadership.

## Scope of Work (confirmed from assets + case study copy)

- Event planning and ownership of the master checklist (venue, registration, exhibition booth, branding, speaker logistics) — see `Executive Event Planning Checklist.xlsx` (owner: Jessica Feto, v2.1)
- Executive attendee list management and RSVP tracking — see `Executive Attendee Management` and `RSVP Tracking Dashboard` workbooks (Collateral Management Optimisation Summit, 3–4 April 2025, Hilton London Kensington)
- Invitation copywriting and outreach (draft: "Exclusive Invitation: AI Roundtable for Senior Financial Services Leaders", sent from jessica.feto@intellimation.ai, titled "Marketing & Events Lead")
- CRM segmentation and LinkedIn-sourced prospecting for target lists (banks, asset managers, hedge funds, fintechs)
- Branded event collateral: business cards, name badges/lanyards, printed brochures, welcome gifts
- On-site coordination and post-event CRM follow-up / lead handoff to sales

## Evidence status — what's real vs. what's a styled rendering

This project's asset library needed a direct conversation before publishing, because several files in `assets/images/` are AI-generated photographic renderings rather than photographs, and some depict real third-party brand names. Resolution (confirmed with Jessica, 2026-08-06):

- **Genuine screenshots (real, unedited):** `event-planning-checklist.jpg`, `executive-attendee-list.jpg`, `invitation-email.jpg`, `rsvp-tracking-sheet.jpg` — real Excel/Outlook exports.
- **Genuine photo:** `consulate-invitation.png` — real flat-lay photo of the printed British Consulate invitation card (Alan Gogbashian, UK Deputy Trade Commissioner for North America; "From Pilot to Performance: Turning AI into Reliable Value"; British Residence, New York).
- **AI-rendered design mockups, confirmed as editorial presentation of real deliverables Jessica produced** (not fabricated work — AI used as a styling/production tool, comparable to Photoshop, to present real collateral at a higher visual standard): `event-business-cards.jpg`, `event-badge-lanyard.jpg`, `event-brochure-cover.png`, `event-welcome-gift.png`, plus the hero background `iai 1.png` (already live since the original Project 1/2 build).
- **AI-rendered mockups depicting specific client names and metrics** (Barclays, Citi, Nomura, JPMorgan Chase & Co, MGG, Capstone, State Street, Finex, "90%+ STP", "6,000+ counterparties", "$100+B processed", etc.): Jessica confirmed this content is recreated from real Intellimation marketing materials she had access to during the engagement (original files not available to her post-employment) — consistent with the client list already recorded in [[01-enterprise-ai-product-marketing]] ("Marquee clientele referenced in real marketing collateral: Barclays, Citi, Nomura, MGG, and others"). **Decision: kept off the Executive Events page for now** to avoid duplicating/over-using claim-heavy imagery (some of it — `iai 8.png` — is already used once in Project 1's "Real Numbers, Vertical by Vertical" section). Archived, unused files: `iai 2 copy.png`/`iai 3 copy.png` (redundant table/gift-box shots with legible client logos), `iai 7 copy.png`/`iai 8 copy.png` (open brochure spreads with client logos + stats), `banner1.png`/`banner2.png` (booth banner pair, one with the "Trusted by 30+ clients" claim). None of these are referenced in any HTML file as of this update — available if a future session wants to use them, but should keep the "recreated" framing if so.
- **Unresolved:** `IMG_4354.heic` — not yet identified (couldn't be previewed; ask Jessica directly what this is before using or discarding it).
- **Duplicate files still on disk, not yet cleaned up:** several exact-content duplicates exist under messier names (`1.png`–`8.png`, `iai N copy.png` variants, `Executive attende management workbook*.png`, `RSVP tracking dashboard excel workbook*.png`, `corporate invitation draft.png`, `executive event planning checklist 2.png`). Bash `rm` on these was blocked by the permission classifier mid-session — needs explicit user approval to delete, or leave as harmless clutter.

## Known live-site bug (pre-existing, unrelated to this session's edits)

The previously-committed (pre-2026-08-06) version of `intellimation-events.html` referenced `assets/images/banner1.png` and `banner2.png`, but neither file was ever committed to git (`git ls-files` confirms). Those two images were broken on the actual production site (jessicafeto.vercel.app) prior to this session. Resolved as a side effect of this session's rewrite, which no longer references them — will be fixed once this work is committed and deployed.

## Page structure as of 2026-08-06 rewrite

Hero → Overview → Snapshot (industry/services/timeline/events) → Event Operations (real checklist image + tags + prose, placeholders cut) → Lead Generation & Executive Invitations (3 real screenshots + prose) → Brand & Event Collateral (4 AI-rendered design images, each captioned "— design rendering") → British Consulate Executive Reception (new section, built around the real invitation photo) → Post-Event Engagement (tags + prose, placeholders cut) → Highlights → Next project.

Previously the page had ~26 gallery slots, 22 of which were literal placeholder icons (gray SVG + filename, no real asset behind them) — cut per the site's evidence rule; that work is no longer speculative/half-finished.

## Outstanding for the next session

1. Run the full structured interview (context, objective beyond "support the CEO," specific decisions/trade-offs made, quantifiable outcomes if any exist — pipeline generated, meetings booked, attendee-to-pipeline conversion — reflection, what she'd do differently).
2. Reconcile the Consulate reception date (invitation says December 2025; case study snapshot says "September 2025" / "Mar – Sept 2025" timeline) — confirm actual date and fix whichever is wrong.
3. Ask Jessica what `IMG_4354.heic` is.
4. Get explicit permission to delete the redundant duplicate files listed above, or leave them.
5. Decide whether to add a small "design rendering" note to `iai 1.png` in the hero (currently unlabelled, at 35% opacity, contains the same "Trusted by 30+ clients" content as the archived high-risk files — consistent with the confirmed-accurate ruling above, so not urgent, but worth a consistency pass).

**Why:** [[project-case-studies]]
