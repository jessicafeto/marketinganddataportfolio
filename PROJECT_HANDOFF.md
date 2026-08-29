# Jessica Feto — Marketing & Data Portfolio: Project Handoff

**Document created:** 1 August 2026
**Live site:** deployed via Vercel, auto-deploy on push to `main`
**Repo:** `https://github.com/jessicafeto/marketinganddataportfolio.git`
**Local path:** `/Users/xhesikafeto/Documents/Claude/Projects/UK Visa Sponsorship Job/portfolio-site`

This document is the single source of truth for continuing work on this project in a new chat. It reflects the **verified current state of the codebase** as of the date above (checked directly against files, not assumed from memory).

---

## 1. Project Overview

**What this is:** A static HTML/CSS/JS personal portfolio site for Jessica Feto, a London-based marketing and data specialist. It exists to win her a marketing/data role in the UK **with visa sponsorship**.

**Purpose:** Convert recruiter/hiring-manager attention into interview requests by demonstrating (a) real, credible client work at enterprise scale (Intellimation.ai, a BFSI-focused AI company), (b) technical/analytical range (GA4, SQL, Power BI, CRM systems), and (c) the ability to build and ship a polished, self-made product (Noova, her own studio, including this very site's sibling brand-build).

**Target audience:** UK-based hiring managers and recruiters in marketing, product marketing, marketing analytics, and marketing operations — particularly at companies willing to sponsor a Skilled Worker visa. Secondary audience: potential freelance/studio clients for Noova.

**Design philosophy:** Quiet, editorial confidence — not a flashy "creative portfolio." Restrained typography, generous whitespace, real photography and real deliverables (not mockup clichés), one clear idea per screen. The case-study pages deliberately mirror the visual language of `noovadata.com/work/intellimation` (the real Noova client page): hero → overview → snapshot → image sections → next project → footer, with no stat blocks, no dark glassmorphism panels, no decorative quote blocks.

**Brand positioning:** "I turn data into marketing that drives real growth." Jessica is positioned as the rare hybrid who sits between data teams and marketing teams — data science/computer engineering background, applied to marketing outcomes (segmentation, CRM, campaign reporting).

**Overall vision:** A single-page marketing site (`index.html`) that funnels into 8 detailed case-study pages, each proving a different capability (product marketing, events, CRM, content, research, analytics/BI, brand strategy, marketing ops/automation) — collectively covering the full range of marketing/data job descriptions she's applying against.

---

## 2. Design Principles

Two parallel design systems exist on this site, used for different page types:

### A. Main site system (`assets/css/style.css`) — used by `index.html`
- **Colour tokens:** `--bg:#FFFFFF`, `--bg-alt:#FAFAFA`, `--ink:#0F0F0F`, `--text:#0F0F0F`, `--text-light:#5B5B5B`, `--text-muted:#8A8A8A`, `--accent:#8A6A54` (warm taupe/brown), `--accent-dark:#6B5242`, `--accent-light:#F5F0EC`
- **Borders:** `--border: rgba(15,15,15,0.08)`, `--border-solid:#ECECEC`
- **Radius:** `--radius:24px` (cards), `--radius-sm:12px` (buttons/pills)
- **Shadow:** `--shadow: 0 12px 40px rgba(15,15,15,0.06)`, `--shadow-md: 0 20px 60px rgba(15,15,15,0.08)`
- **Max width:** `--max-width: 1180px`
- **Typography:** System font stack (`-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Helvetica, Arial, sans-serif`) for body; Google Fonts **DM Sans** (weights 300–700, variable optical size) + **Inter** (400–800) loaded via `<link>` with `media="print" onload="this.media='all'"` (non-blocking font load pattern)
- **Layout goal (established and still active):** each major section of `index.html` should read as roughly one viewport when scrolling — hero, about, experience, and skills/certs sections use fixed heights on desktop that collapse to `auto` on mobile (≤860px breakpoint). The `#work` (projects) section and footer are intentionally natural-height/scrollable, not viewport-locked.

### B. Case-study editorial system (`assets/css/editorial.css`) — used by all 8 case study pages
- **Colour tokens:** `--ed-paper:#ffffff` (pure white, changed from an earlier cream `#faf8f3`), `--ed-limestone:#f1ece3`, `--ed-stone:#e6ddce`, `--ed-ink:#1a1917`, `--ed-charcoal:#24211d`, `--ed-grey:#6e6a63`, `--ed-light:#b8b2a8`, `--ed-rule:#e0d9cc`, `--ed-rule-dark:#3a362f`, `--ed-oxblood:#7a2e2e` (used sparingly)
- **Easing:** `--ed-ease: cubic-bezier(0.2, 0.6, 0.2, 1)` — single shared easing curve for all transitions/reveals
- **Typography:** All text set in **DM Sans** (hero titles, overview headings, body, nav) — Cormorant Garamond was originally used for hero/heading type but was **explicitly removed** per user feedback ("this text needs to be DM Sans or Lato whatever the page is using"); Cormorant now survives only in the snapshot-column label and the footer wordmark logo
- **Container:** `.ed-wrap` max-width 1240px, centered
- **Base body font:** 17px, line-height 1.6, `overflow-x: hidden`
- **Minimalism rule:** no stat blocks, no dark glassmorphism panels, no decorative pull-quotes — this was a direct correction from the user ("too much info... I want it exactly like noovadata.com/work/intellimation")
- **Section pattern (repeats per case study):** hero (full `100svh`, dark charcoal bg, optional photo at reduced opacity + dark overlay) → overview (eyebrow + heading + body paragraph) → snapshot (4-column meta grid: Industry/Services/Timeline/Deliverables-or-similar) → N × content sections (each = centered title+subtitle text block, then either a single full image `.ed-section__img`, a 2-up `.ed-section__duo`, a 4-up `.ed-section__quad`, or — for the 3 image-free pages — a tag-pill grid `.ed-section__tags` + centered body paragraph `.ed-section__body`) → next-project card (full-bleed dark card, DM Sans uppercase title, links to the next case study) → shared footer.
- **Scroll reveal:** every meaningful text/image block carries class `.ed-reveal`; a single shared IntersectionObserver script (threshold 0.08) adds `.in` on first intersection, which CSS transitions from `opacity:0; translateY(20px)` to `opacity:1; translateY(0)`.
- **Image treatment:** real project photography and real client deliverables only — no AI-generated mockups of the actual Intellimation product materials (those are genuine screenshots/photos supplied by the user from `/Users/xhesikafeto/Desktop/noova/website/public/img/`). Hero background images sit at reduced opacity (0.35–0.5) under a dark overlay for text legibility.
- **No glassmorphism** — this was tried in an earlier design phase and removed; the current system is flat, matte, high-contrast typography on solid colour.

### Consistency rules (apply to any new case-study page)
1. Reuse the exact `<nav class="navbar">` markup from `index.html`, not a bespoke nav.
2. Load `assets/css/style.css` **before** `assets/css/editorial.css` (style.css owns the navbar; editorial.css is scoped to `body.editorial` so it can't leak and override nav styles).
3. `<body class="editorial">` on every case-study page.
4. Every case study ends with the same next-project card pattern and the same footer markup (only text/links change).
5. Snapshot grid always has 4 columns; label copy should match the nature of the project.

---

## 3. Technology

- **HTML:** Plain hand-written HTML5, no templating engine, no build step for the HTML itself.
- **CSS:** Plain hand-written CSS3, no preprocessor, no framework (no Tailwind/Bootstrap on the portfolio pages themselves — Tailwind *is* used in the separate `noova-flagship`/`noova-site` sub-projects that live alongside this repo but are not part of the deployed portfolio).
- **JavaScript:** Vanilla JS only, inline `<script>` blocks per page. No framework, no bundler, no npm dependencies for the site itself.
  - IntersectionObserver used for: scroll-reveal animation (`.ed-reveal`/`.in`), logos-section fade-in, nav section highlighting, hamburger-menu state.
  - Filter-pill project filtering on `index.html` is vanilla DOM filtering (`querySelectorAll('.filter-pill')`, `data-filter` attributes, `data-filters` on cards).
- **Fonts:** Google Fonts — **DM Sans** (variable weight/optical size) and **Inter** (400–800) for the main site; **Cormorant Garamond** (400/600, italic variants) retained only for two small accents on case-study pages. Loaded via the standard non-blocking `<link media="print" onload="this.media='all'">` pattern with a `<noscript>` fallback.
- **Icons:** Inline SVG (hand-authored, e.g. the dot-grid decorative pattern on project cards) — no icon font/library.
- **Images:** PNG and JPG, no WebP/AVIF conversion currently done, no responsive `srcset`/`sizes` — a possible future optimisation (see Section 7/12).
- **Forms:** Contact form submits via **Formspree** (`action="https://formspree.io/f/mykqjlaa" method="POST"`) — no custom backend.
- **Hosting/CI:** GitHub repo (`jessicafeto/marketinganddataportfolio`) connected to **Vercel**; every `git push origin main` triggers an automatic production deploy. No staging environment, no CI test suite.
- **Local dev:** Served via Python's built-in `http.server` (see `.claude/launch.json`, config name `"portfolio"`, port **4400**). No npm install needed to preview the portfolio pages.
- **Analytics:** Google Tag Manager / gtag.js snippet embedded on every page (`G-8TKEPZ4H77`).

---

## 4. Folder Structure

```
portfolio-site/                          ← repo root (also contains unrelated sibling projects — see note below)
├── index.html                           ← main single-page site (hero, about, work grid, experience, skills, contact, footer)
├── enterprise-ai-product-marketing.html ← Case study 1: Product Marketing
├── intellimation-events.html            ← Case study 2: Executive Events
├── intellimation-crm.html               ← Case study 3: Demand Gen & CRM
├── intellimation-content.html           ← Case study 4: Content & Thought Leadership
├── intellimation-research.html          ← Case study 5: Research & Competitive Intelligence
├── analytics-bi.html                    ← Case study 6: Marketing Analytics & BI (no images, tag-pill layout)
├── noova-brand.html                     ← Case study 7: Brand Strategy & Digital Experience — Noova (no images)
├── marketing-systems.html               ← Case study 8: Marketing Systems & Automation (no images)
├── PROJECT_HANDOFF.md                   ← this document
├── assets/
│   ├── css/
│   │   ├── style.css                    ← main site stylesheet (index.html navbar, hero, bento grid, etc.)
│   │   └── editorial.css                ← case-study design system (all 8 case study pages)
│   ├── images/                          ← ~52 files: hero portraits, brochure exports, Intellimation event photography
│   │   ├── brochure-*.png               ← 4 vertical AI brochure exports (Structured Products, Collateral Mgmt, Direct Lending, Data-Aware AI)
│   │   ├── iai *.png / iai-*.jpg        ← real Intellimation product/marketing screenshots and merch photography
│   │   ├── work-1/2/3.jpg               ← Intellimation misc work photography
│   │   ├── automation.png, growth.png, brand.png, problem.jpg, marketing.png ← Noova-sourced concept/strategy imagery reused across case studies
│   │   ├── banner1.png, banner2.png     ← Intellimation exhibition roll-up banner photography (added to Executive Events hero + booth-banner section)
│   │   └── logos/                       ← client/company logo marks shown in the "Presented work to" strip
│   └── ... (favicon, hero portraits, misc)
├── .claude/
│   └── launch.json                      ← dev-server configs (portfolio on :4400, plus configs for unrelated sibling projects on :4401–4405)
└── .git/                                ← git history; remote = github.com/jessicafeto/marketinganddataportfolio
```

**⚠️ Orphaned files still on disk but NOT linked from `index.html` (verified 1 Aug 2026):**
- `intellimation-enablement.html`
- `intellimation-gtm.html`
- `intellimation-linkedin.html`
- `fashion-customer-analytics.html`

These are leftovers from an earlier iteration of the site (before the current 8-page editorial rebuild). They still exist as files and still reference an older `case-study-v2.css`/`intellimation.css` design system, but nothing on the live site links to them anymore. **Decide whether to delete them or leave as dead files** (see Open Questions, Section 18).

**⚠️ Sibling directories inside this same repo folder that are unrelated side projects, not part of the deployed portfolio:** `ame-site/`, `noova-site/`, `noova-flagship/`, `noova-brand/`, `Archive/`, `analysis/`, `data/`. These have their own `.claude/launch.json` dev-server entries (ports 4401, 4403–4405) and should generally be ignored when working on the portfolio unless explicitly asked.

---

## 5. Components

### 5.1 `index.html` — Main site

| Section | Purpose | Structure | Styling | Animation |
|---|---|---|---|---|
| **Navbar** | Persistent nav + CTA | Logo, 4 anchor links (About/Experience/Projects/Skills), "Let's Talk ↗" button, hamburger for mobile | Sticky, `style.css` | Section-highlight-on-scroll via IntersectionObserver |
| **Hero** | First impression + primary CTA | Eyebrow "Marketing & Data Analytics", H1, subhead, "View Projects ↓" + "Download Resume ↗" buttons, portrait photo | Fixed viewport height minus navbar | — |
| **Logos strip** | Social proof ("Presented work to") | Two duplicated rows of client/bank logos (Intellimation, Barclays, HSBC, Symphony, Santander, Bank of America, Morgan Stanley, JPMorgan Chase, Seereen) for a marquee-style scroll effect; second row is `aria-hidden` duplicate | `.logos-section` | Fade-in via IntersectionObserver |
| **About** | Positioning statement + credentials + stats | 2-col grid: photo | text; BEng Computer Engineering + MSc Data Science credentials; "2+ years / 50+ projects / 6 industries / ∞ coffee" stat row; visa-sponsorship line | Fixed 100vh on desktop | — |
| **Work / Projects** | The core portfolio grid | Filter pills (All + 9 category filters) → bento grid of 8 project cards; first card is a dark stat-tile visual, rest use either dark stat-tiles or photography | `.bento-wrap` scrolls internally | Filter JS toggles card visibility by `data-filters` match |
| **Experience** | Work history | 4 roles: BA Educational Consultancy (Business Support Officer, current), noova (Founder, current), Vertical AI Platform · BFSI (Marketing & Data Associate, contractor via Noova Data), Oxyzn (Data & Marketing Intern) | Fixed 100vh on desktop | — |
| **Skills + Certifications** | Capability proof | Combined 100vh section: 6 skill-card categories (Customer Analytics, Marketing Performance & Reporting, CRM & Email Marketing, Paid & Multi-Channel Campaigns, Content & Social Strategy, Brand & GTM Strategy) each with named tools; certifications column (IBM, Stanford/DeepLearning.AI, Google ×2, HubSpot) | `.skills-certs-layout` (3fr : 2fr) | — |
| **Contact** | Lead capture | Left: heading + email + location; Right: name/email/message form → Formspree | `.contact-section` | — |
| **Footer** | Site-wide close | Brand recap, nav links, **Social** column (LinkedIn + Email only — GitHub intentionally removed), copyright | `.site-footer-dark` | — |

### 5.2 Case-study pages (all 8 share one template — see Section 2B)

| Page | Brand angle | Sections beyond hero/overview/snapshot | Images? |
|---|---|---|---|
| `enterprise-ai-product-marketing.html` | Product Marketing | Marketing Collateral (duo), Vertical AI Brochures (quad of 4) | Yes |
| `intellimation-events.html` | Executive Events | Exhibition & Events (single image — polo shirt), Event Messaging & Booth Banners (duo — banner1/banner2) | Yes |
| `intellimation-crm.html` | Demand Gen & CRM | Outreach Materials (duo), Vertical Collateral (duo) | Yes |
| `intellimation-content.html` | Content & Thought Leadership | Sales Enablement (duo) + one more section | Yes |
| `intellimation-research.html` | Research & Competitive Intelligence | Market Landscape (duo), Strategic Outputs (duo) | Yes |
| `analytics-bi.html` | Marketing Analytics & BI | Campaign Reporting (tag-pill grid + body para), KPI Dashboards & BI (tag-pill grid + body para) | **No — tag-pill layout** |
| `noova-brand.html` | Brand Strategy & Digital Experience (Noova) | Brand Strategy & Identity System, Digital Experience & Marketing Systems (both tag-pill + body para) | **No — tag-pill layout** |
| `marketing-systems.html` | Marketing Systems & Automation | Workflow Design & AI Automation, Marketing Operations & Documentation (both tag-pill + body para) | **No — tag-pill layout** |

**Next-project chain (loop):** Enterprise AI → Executive Events → Demand Gen & CRM → Content & Thought Leadership → Research & Competitive Intelligence → Analytics & BI → Brand Strategy (Noova) → Marketing Systems → back to Enterprise AI.

**Recent edits to Executive Events specifically (most-iterated page):**
- Hero background image swapped from generic `project-events.png` to a real Intellimation booth photo (`iai 1.png`), opacity tuned to 0.35 for text legibility.
- Added, then partially removed, a "Sales Collateral" brochure-duo section (fully removed per user request).
- Added an "Event Messaging & Booth Banners" section using real roll-up banner photography (`banner1.png`, `banner2.png`).
- Removed `work-2.jpg` from the Exhibition & Events section, leaving a single full-width image of the branded polo shirt.

**Future improvements (noted per-section):** see Section 7 (Planned Features).

---

## 6. Features Already Implemented ✅

- [x] Single-page main site with sticky nav, hamburger mobile menu, section-highlight-on-scroll
- [x] Hero with resume download + primary CTA
- [x] Logo/social-proof marquee strip
- [x] About section with credentials, stats, and explicit UK visa-sponsorship statement
- [x] Filterable project grid (bento layout) with 9 category filters + "All"
- [x] 8 fully written and imaged (or intentionally image-free) case study pages
- [x] Consistent editorial design system across all case studies (hero/overview/snapshot/sections/next-project/footer)
- [x] Shared navbar reused identically between `index.html` and all case studies
- [x] Scroll-reveal animation system (IntersectionObserver + `.ed-reveal`/`.in`)
- [x] Next-project navigation loop across all 8 case studies
- [x] Experience section with 4 real roles
- [x] Skills + Certifications combined section with named tools per skill category
- [x] Contact form wired to Formspree (real submissions land in Jessica's inbox)
- [x] Footer with corrected LinkedIn URL (`https://www.linkedin.com/in/jessica-feto/`), GitHub link removed, mailto pointing at `jessicaxfeto@gmail.com`
- [x] Real Intellimation event/product photography integrated into 5 of the 8 case studies (replacing earlier generic/placeholder imagery)
- [x] Executive Events case study rebuilt around real booth photography and banner photography
- [x] GA/GTM analytics snippet on all pages
- [x] Auto-deploy pipeline: `git push` → GitHub → Vercel production build

---

## 7. Features Planned 📋 (discussed but not yet implemented)

- [ ] Add stronger **quantified business-impact statements** to each case study (flagged in the full portfolio audit — see Section 8 for detail). Currently most case studies describe *what* was done, not the measurable *so-what* (pipeline influenced, cost-per-lead, sales-cycle acceleration, etc.), with the notable exception of the Content & Thought Leadership page which already has concrete numbers (33,900 impressions, 300+ reactions, 40+ posts).
- [ ] Clarify **visa/work-authorisation status** more prominently in the hero or About section (currently only stated once in About body copy) — e.g. "UK-based, eligible for Skilled Worker visa sponsorship."
- [ ] Decide the fate of orphaned files (`intellimation-enablement.html`, `intellimation-gtm.html`, `intellimation-linkedin.html`, `fashion-customer-analytics.html`) — delete or archive.
- [ ] Add methodology detail to Research & Competitive Intelligence case study (how research was actually conducted — interviews, desk research, etc.)
- [ ] Add concrete before/after metrics to Marketing Systems & Automation (time saved, hours/week freed up)
- [ ] Add business-result proof to the Noova Brand case study (revenue, client count, traffic, since it's currently strategy-only with no outcome data)
- [ ] Possible image optimisation pass (compression / responsive `srcset`) since several source images are 2–3.7MB PNGs
- [ ] Confirm "Download Resume ↗" link actually resolves to a real, current PDF
- [ ] Consider adding direct social links (LinkedIn icon) inline in the hero, not just the footer

---

## 8. Design Decisions (with reasoning, including rejected ideas)

| Decision | Reasoning | Rejected alternative |
|---|---|---|
| Case studies use a **plain white** background (`--ed-paper:#ffffff`) | User explicitly requested plain white, matching noovadata.com | Earlier cream/limestone `#faf8f3` background |
| Case-study hero/heading typography is **DM Sans**, not Cormorant Garamond | Direct user correction: "this text needs to be Dm sans or lato whatever the page is using" | Cormorant Garamond serif headings (originally used for editorial elegance) |
| Case studies reuse the **exact same navbar** as `index.html` | Direct user request: "keep the same nav bar as in the index.html" | A bespoke `ed-nav` component with its own scroll-driven show/hide behaviour (built, then discarded) |
| Case-study content sections are **pure image + centered text block**, no stat tiles/dark panels/quote blocks | Direct user correction after reviewing an earlier, denser draft: "We don't like that because clearly there's too much info... I want this layout [noovadata.com/work/intellimation]" | An earlier richer layout with CSS "compositions," stat blocks, and pull-quotes |
| 3 newest case studies (Analytics & BI, Noova Brand, Marketing Systems) are **explicitly image-free**, using a tag-pill + body-paragraph pattern instead | Direct user instruction: "do not use any images" for these 3 new pages | Reusing stock/generic imagery to fill the sections |
| Noova Brand case study is framed as a **full brand-build project**, not "just a website" | Direct user instruction: "Don't make Noova just a website project. Make it your complete brand project... This becomes your creative flagship." | A narrower "website design & development" case study |
| "Next project" card title uses **DM Sans**, uppercase, letter-spaced | Consistency correction after user flagged it was still using the old serif | Cormorant Garamond serif title |
| Footer **Social** column: LinkedIn + Email only | Explicit user instruction to remove GitHub and correct the LinkedIn URL to `https://www.linkedin.com/in/jessica-feto/` | Original footer had LinkedIn (wrong/placeholder URL) + GitHub + Email |
| Contact form posts to **Formspree**, no custom backend | Static site, no server — Formspree is the simplest reliable way to receive real submissions | A custom Node/serverless mail handler (never built — unnecessary for this stage) |
| Real Intellimation photography replaces earlier generic/placeholder images across 5 case studies | User supplied real photos from her own device (`/Users/xhesikafeto/Desktop/noova/website/public/img/`) and wanted authentic proof of work, not stock imagery | Continuing with abstract/generic project imagery |
| Executive Events: removed the Sales Collateral brochure section entirely | Direct user instruction ("remove the sales collateral. images.") after initially adding it — kept the page tighter and focused on booth/event execution | Keeping brochures duplicated across both the CRM and Events case studies (redundant) |
| Executive Events: removed `work-2.jpg`, kept only the polo-shirt merch photo full-width | Direct user instruction to remove that specific image | Two-image duo in the Exhibition & Events section |

**Standing rule that should never be silently reversed:** case studies must visually and structurally match the noovadata.com/work/intellimation pattern. Any future new case study should be built by copying an existing one (e.g. `intellimation-crm.html`) as the template, not built from scratch.

---

## 9. Code Standards

- **Naming:** BEM-ish prefixed class names per system — `ed-*` for the editorial/case-study system (`.ed-hero`, `.ed-section__img`, `.ed-next__card-title`), plain semantic names for the main site (`.project-card`, `.filter-pill`, `.sfd-*` for the dark footer). Section-scoped prefixes prevent collisions between `style.css` and `editorial.css`.
- **Formatting:** No linter/formatter config present — style is consistent 2-space indentation, double-quoted HTML attributes, minimal inline styles (used only for one-off background-image opacity tweaks, e.g. `style="opacity:0.35;"` on hero images).
- **CSS organisation:** One stylesheet per design system, loaded in a fixed order (`style.css` before `editorial.css`) so the more specific/scoped rules win without needing `!important`. New component styles are appended to the bottom of the relevant file under a comment header (e.g. `/* tool/skill tags — image-free section variant */`).
- **Comments:** Sparse, used only to label a new CSS block's purpose (not to narrate obvious code).
- **Accessibility:** `alt` text on every content image (descriptive, e.g. "Intellimation.ai product positioning — enterprise AI platform"), `aria-hidden="true"` on decorative/duplicate elements (second logo row, hero scroll cue), `aria-label` on the hero section and hamburger button, semantic `<nav>`/`<section>`/`<footer>` throughout.
- **Performance:** Non-blocking font loading (`media="print" onload`), `loading="lazy"` on logo images, IntersectionObserver instead of scroll-event listeners for all reveal/nav-highlight behaviour (avoids layout thrashing).
- **Responsive strategy:** Single main breakpoint at **≤860px** for the fixed-viewport-height sections (reverts to `auto`); bento grid and skills grid presumably collapse to single-column below that (not independently re-verified in this pass — check `style.css` media queries directly if making layout changes).
- **Animation rules:** One shared easing curve per system (`--ed-ease` in editorial.css); all reveal animations use the same `.ed-reveal`/`.in` opacity+translateY pattern; no animation libraries — everything is hand-written CSS transitions + one shared IntersectionObserver snippet copy-pasted (not deduplicated into a shared JS file) at the bottom of every case-study page.

---

## 10. Current State

**Finished:**
- All 8 case studies exist, are linked from the homepage, use the consistent editorial system, and are live in production.
- Main site (`index.html`) is fully built: hero, logos, about, filterable work grid, experience, skills/certs, contact, footer.
- Footer social links corrected (LinkedIn fixed, GitHub removed).
- Real client/event photography has replaced placeholder imagery in 5 of 8 case studies.
- Contact form is live and functional via Formspree.
- Deploy pipeline confirmed working (GitHub → Vercel auto-deploy on push).

**Partially complete:**
- Executive Events case study has been iterated on the most — hero image, banner section, brochure section — and may still need a final content pass now that its image set has changed twice.
- Business-impact/outcome metrics are inconsistent across case studies — Content & Thought Leadership has real numbers; most others (Product Marketing, Events, CRM, Research, Analytics/BI, Noova Brand, Marketing Systems) describe activity/scope but not measurable outcomes. A full audit of this was already delivered to the user (see Section 8 context) but not yet acted on.
- The 3 newest, image-free case studies (Analytics & BI, Noova Brand, Marketing Systems) are content-complete but were explicitly built without visual proof — worth revisiting once/if suitable non-Intellimation imagery exists (e.g. real Noova site screenshots, real dashboard screenshots).

**Needs work:**
- Orphaned legacy HTML files and their associated CSS (`case-study-v2.css`, `intellimation.css`) are still on disk — decide keep/delete.
- No image optimisation pass has been done; several source PNGs are 2–3.7MB.
- "Download Resume" link has not been independently verified in this session as pointing to a current, correct PDF.

---

## 11. Outstanding Bugs

None confirmed broken in this session. Two process/workflow snags worth recording so they aren't repeated:

1. **Pasted chat images are not files.** Multiple times in this project's history, the user pasted images directly into the chat (screenshots of event photography, brochures, gift boxes, etc.) expecting them to be usable as project assets. **They are not automatically saved to disk anywhere accessible to the coding agent.** Every time this happens, the user must explicitly right-click the pasted image in the chat UI → "Save Image As…" → save it into `assets/images/` → then tell the agent the exact filename. Do not assume a pasted image is available as a file without verifying via `ls`/`find` first.
2. **Browser cache during local preview.** Changes made to a page sometimes don't appear in the local preview browser tab until a **hard refresh** (`window.location.reload(true)` via the JS tool, or a manual hard-refresh) — the dev server itself was serving updated files correctly; the stale view was a browser cache issue, not a build issue.

---

## 12. TODO List (Prioritised Roadmap)

### High Priority
1. Decide and execute on orphaned files (`intellimation-enablement.html`, `intellimation-gtm.html`, `intellimation-linkedin.html`, `fashion-customer-analytics.html`) — delete if truly unused.
2. Add one concrete outcome/impact metric to each case study that currently lacks one (Product Marketing, Events, CRM, Research, Analytics & BI, Noova Brand, Marketing Systems) — see the full audit findings referenced in Section 8/16.
3. Verify and, if needed, fix the "Download Resume" link on the hero.
4. Add a clearer, more prominent visa-sponsorship/location statement (hero or top of About) rather than only mid-paragraph.

### Medium Priority
5. Revisit Executive Events one more time for a final content/image consistency pass (it has changed 4+ times).
6. Consider adding real Noova site screenshots to `noova-brand.html` now that the Noova flagship site exists as a working project.
7. Image optimisation (compress large PNGs, consider `srcset` for hero images).
8. Confirm mobile responsive behaviour of the 9-filter-pill row and the bento grid (not re-verified this session).

### Low Priority
9. Consider inline social icons in the hero (not just footer).
10. Consider deduplicating the repeated scroll-reveal `<script>` block across 8 case-study files into a single shared JS file (`assets/js/reveal.js`) referenced by all — currently copy-pasted per page (fine at this scale, but worth doing if the page count grows further).

---

## 13. Assets

**Images (in `assets/images/`, ~52 files):**
- Brochures: `brochure-structured-products.png`, `brochure-collateral-management.png`, `brochure-direct-lending.png`, `brochure-data-aware-ai.png` (4 real vertical AI product brochures)
- Real Intellimation product/marketing screenshots: `iai 1.png` through `iai 8.png`
- Real Intellimation merch/collateral photography: `iai-polo.jpg`, `iai-badge.jpg`, `iai-card.jpg`
- Misc work photography: `work-1.jpg`, `work-2.jpg` (removed from live use, still on disk), `work-3.jpg`
- Noova-sourced concept imagery reused for text-narrative sections: `automation.png`, `growth.png`, `brand.png`, `problem.jpg`, `marketing.png`
- Exhibition banner photography: `banner1.png`, `banner2.png`
- Hero portraits: `hero-portrait.png`, `hero-portrait_1.png`, `jessica-hero.png`, `profile.jpg`, `jessica-feto-hero.png` (empty/0-byte — broken), `jessica-feto-portrait.png` (empty/0-byte — broken)
- `favicon.png` / `favicon.svg`
- `logos/` subfolder — client/bank logo marks for the "Presented work to" strip (Intellimation, Barclays, HSBC, Symphony, Santander, Bank of America, Morgan Stanley, JPMorgan Chase, Seereen)
- `opa-taverne/` subfolder — belongs to an unrelated concept project, not part of the live portfolio

**⚠️ Two broken image files noted:** `jessica-feto-hero.png` and `jessica-feto-portrait.png` are both 0 bytes. Confirm nothing references them before ignoring; if referenced, replace or repoint.

**Fonts:** Google Fonts — DM Sans (variable), Inter (400–800), Cormorant Garamond (400/600 + italics, minimal use).

**External resources:**
- Formspree endpoint: `https://formspree.io/f/mykqjlaa`
- Google Analytics/GTM ID: `G-8TKEPZ4H77`
- LinkedIn: `https://www.linkedin.com/in/jessica-feto/`
- Contact email (both mailto and displayed): `jessicaxfeto@gmail.com` — note: an earlier commit briefly used `codesxjessica@gmail.com` in some case-study footers; **`jessicaxfeto@gmail.com` is the correct, current address** per explicit user instruction — worth a final repo-wide grep to make sure no page still shows the old address.

**Reference/inspiration:** `https://noovadata.com/work/intellimation` — the real Noova client page that the entire case-study design system was built to match.

---

## 14. Important Decisions to Never Forget

- **Never reintroduce Cormorant Garamond as the primary heading font on case studies.** DM Sans only, except the two small legacy accents already noted.
- **Never reintroduce dark glassmorphism panels, stat blocks, or quote blocks into case-study content sections.** The user rejected this pattern explicitly and firmly.
- **Never build a bespoke nav for a new page.** Always reuse the exact `index.html` navbar markup.
- **Never fabricate or AI-generate imagery of the real Intellimation product/brand to stand in for real work.** Only use photography the user has actually supplied from her own device. (This aligns with a standing cross-project rule already in memory: don't AI-fabricate photorealistic images of a real, named business's actual space/brand — enhance or use real material instead.)
- **Never assume a pasted chat image is a usable file.** Always verify with `ls`/`find` before referencing a path.
- **The plain white background (`#ffffff`) on case studies is final** — not to be reverted to the earlier cream tone without explicit request.
- **GitHub link stays removed from the footer** unless the user asks to add it back.
- **The user strongly prefers direct action over lengthy clarifying questions** when the request is clear — she has redirected/corrected quickly and specifically each time something didn't match her vision (nav bar, background colour, font, image content), which shows she trusts iterative correction over up-front interrogation. Ship a reasonable first attempt, then adjust to her feedback.

---

## 15. Context About Jessica (relevant to this project only)

- **Design preferences:** Restrained, editorial, "quiet confidence" over flashy/decorative. Reacts quickly and specifically to anything that reads as "too much" (stat blocks, dark panels, wrong font) — prefers a single clean reference (e.g. "make it look like noovadata.com/work/intellimation") over abstract direction.
- **Coding experience:** Not a developer herself — communicates in outcomes and visual references, not code. All implementation should be handled end-to-end by the assistant; she reviews visually (screenshots/live site) rather than reading code.
- **Goals:** Land a UK marketing/data role with visa sponsorship. Secondary goal: grow Noova (her own studio) as a credible, flagship-worthy brand in its own right.
- **Workflow:** Iterative, conversational, screenshot/visual-reference driven. Frequently pastes reference images or screenshots mid-task. Confirms changes by viewing the live local preview or the deployed Vercel site. Expects the assistant to commit and push to GitHub (which auto-deploys via Vercel) as a normal part of finishing a task, without needing to ask each time — though care should still be taken not to push obviously broken or half-finished work.
- **Communication style:** Short, direct instructions ("remove the sales collateral images", "add my linkedin", "use images from this folder"). Comfortable giving terse corrections and expects them to be understood in context rather than requiring extensive back-and-forth.

---

## 16. Continuation Instructions (for a new Claude chat)

Assume this document is the **only** context available. On starting a new session against this project:

1. **Do not re-derive design decisions from scratch.** Section 2 and Section 8 of this document are authoritative. If a proposed change would contradict a "never forget" rule in Section 14, flag it to the user before proceeding rather than assuming it's fine.
2. **Verify before asserting.** This document was written from a direct, one-time inspection of the codebase on 1 August 2026. Time will have passed. Before making claims about "the current state" of any file, re-check it (`Read`/`grep`/`ls`) rather than trusting this document's file contents blindly — trust its *decisions and reasoning*, verify its *file-level facts*.
3. **Local dev server:** use the `.claude/launch.json` config named `"portfolio"` (port 4400), served via Python's `http.server`. Ignore the other configs in that file (`noova-site`, `ame-site`, `noova-web`, `retailiq`, `portfolio-opa-preview`) unless the user specifically asks about those other projects.
4. **Deploy model:** the user expects a normal completed task to end with a `git add` / `git commit` / `git push origin main`, which auto-deploys via Vercel. Confirm this is still desired at the start of a new session if it's been a while, but treat it as the default expectation established across many prior sessions.
5. **Image sourcing:** if the user wants new imagery added and pasted images appear in chat, remember Section 11 Bug #1 — pasted images are not files. Ask the user to save them into `assets/images/` and confirm filenames before referencing them in HTML.
6. **When building a new case-study page:** copy an existing one (e.g. `intellimation-crm.html`) as a template rather than building from the empty editorial.css classes — this guarantees structural consistency.
7. **When editing an existing case study:** read the file fully first (the Edit tool requires a prior Read), and re-verify in the browser (hard refresh) after any change, since local caching has bitten this project before.

---

## 17. Next Recommended Steps (in order)

1. **Resolve the orphaned-files question first** (Section 12, High Priority #1) — a quick decision that de-risks any future confusion about "which files matter."
2. **Run the outcome-metrics pass** across the 7 case studies that currently lack quantified impact (everything except Content & Thought Leadership). For each: ask the user for one real number or concrete before/after, and add a single sentence to the overview paragraph and/or snapshot grid. Do this one case study at a time, confirming with the user before moving to the next — this mirrors how all prior edits in this project have been done (small, confirmed, iterative changes rather than one large sweeping rewrite).
3. **Address the visa-sponsorship visibility gap** — draft 1–2 short copy options for the hero or top of About, present them, let the user pick.
4. **Verify the Download Resume link** — check it resolves and the PDF is current; flag to the user if not.
5. **Final Executive Events consistency check** — re-read the live page top to bottom given how many times its images/sections have changed, and confirm nothing reads disjointed.
6. **Only after the above:** consider lower-priority polish items from Section 12 (image optimisation, shared JS file, inline social icons).

---

## 18. Open Questions (require Jessica's decision)

1. **Delete or keep the 4 orphaned HTML files** (`intellimation-enablement.html`, `intellimation-gtm.html`, `intellimation-linkedin.html`, `fashion-customer-analytics.html`) and their dedicated CSS (`case-study-v2.css`, `intellimation.css`)? They're not linked anywhere but still exist on disk and in the repo.
2. **What real metric can be used for each case study currently lacking one?** (Product Marketing, Events, CRM, Research, Analytics & BI, Noova Brand, Marketing Systems) — this requires input only Jessica has (actual pipeline numbers, actual time savings, actual Noova revenue/client count, etc.). The assistant cannot invent these.
3. **Is `jessicaxfeto@gmail.com` the single correct contact email everywhere?** An earlier version of some case-study footers used `codesxjessica@gmail.com` — worth a repo-wide check to confirm consistency (flagged, not yet resolved).
4. **Should the two 0-byte broken image files** (`jessica-feto-hero.png`, `jessica-feto-portrait.png`) be deleted, or does something still reference them?
5. **Does Jessica want real Noova site screenshots added** to `noova-brand.html` now, or is the image-free/tag-pill treatment intentional and permanent for that page?
6. **Confirm current UK work-authorisation phrasing** — "open to UK visa sponsorship" vs. "already eligible to work in the UK" vs. something else — this is a factual/legal detail only Jessica can specify precisely.

---

## 19. Master Prompt (paste into a new Claude chat to resume work)

```
This is an ongoing, long-running portfolio website project for Jessica Feto,
a London-based marketing and data specialist seeking a UK role with visa
sponsorship. The project lives at:

/Users/xhesikafeto/Documents/Claude/Projects/UK Visa Sponsorship Job/portfolio-site

A complete handoff document exists at PROJECT_HANDOFF.md in that same folder —
treat it as the authoritative source of truth for all prior decisions, design
system rules, file structure, and standing preferences. Read it in full before
making any changes.

Rules for this session:
1. Do not overwrite or contradict any established decision in the handoff
   document (design system, colours, fonts, layout patterns, footer content,
   removed features) unless Jessica explicitly asks for that specific change.
2. Preserve the existing architecture: two parallel CSS systems
   (assets/css/style.css for the main site, assets/css/editorial.css for all
   case-study pages), vanilla HTML/CSS/JS, no build step, no framework.
3. Improve the project incrementally — small, confirmed changes one at a time,
   matching how this project has always been worked on. Do not attempt large
   unrequested rewrites.
4. Before making a MAJOR design change (new layout pattern, new colour system,
   restructuring navigation, adding a framework/build step), stop and ask
   Jessica first, explaining the tradeoff in plain terms.
5. Maintain the existing code quality bar: semantic HTML, alt text on every
   image, consistent class-naming conventions per system (ed-* for editorial,
   plain semantic names for the main site), no inline frameworks.
6. Before implementing any structural or architectural decision (e.g. "should
   this be a new page or a new section," "should this reuse editorial.css or
   need its own stylesheet"), briefly explain your reasoning to Jessica before
   writing code, not after.
7. Remember: pasted chat images are NOT automatically saved as files. If
   Jessica pastes a reference image she wants added to the site, ask her to
   save it into assets/images/ and confirm the filename before using it.
8. The local dev server is the "portfolio" config in .claude/launch.json,
   port 4400 (Python http.server). Ignore other configs in that file unless
   asked about a different project.
9. Standard end-of-task flow is: verify the change locally (hard refresh if
   needed), then git add / commit / push to origin main, which auto-deploys
   via Vercel — this has been the default throughout the project.
10. Check the "Open Questions" section of the handoff doc — several pending
    decisions need Jessica's input before certain TODO items can be completed
    (deleting orphaned files, sourcing real impact metrics, confirming the
    correct contact email, confirming visa-status phrasing).

Start by asking Jessica what she'd like to work on next, optionally referencing
the "Next Recommended Steps" section of the handoff document as a suggested
starting point — but let her direct the actual priority.
```
