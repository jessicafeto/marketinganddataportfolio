# Jessica Feto — Marketing & Data Portfolio

A static portfolio website showcasing marketing strategy and data analytics
work, built around a flagship case study: **Glow Lab**, a fictional indie
beauty brand.

## What's in here

- `index.html` — portfolio homepage (about, skills, featured project, contact)
- `glow-lab.html` — the Glow Lab case study (brief, data & approach,
  interactive dashboard, customer segments, strategy, content calendar,
  email mockups, projected impact)
- `assets/css/` — stylesheets (`style.css` is shared site-wide, `glow-lab.css`
  is the case-study theme)
- `assets/js/dashboard.js` — dashboard data and Chart.js configuration
- `data/` — the synthetic Glow Lab dataset (`customers.csv`, `orders.csv`,
  `campaigns.csv`, `customers_segmented.csv`, `results.json`)
- `analysis/generate_and_analyze.py` — the Python script that generated the
  dataset and ran the segmentation/CAC/ROAS analysis

## 1. Deploy with GitHub Pages (recommended)

The simplest setup is a "user site" repo, published automatically at
`https://jessicafeto.github.io/`.

1. On GitHub, create a new **public** repository named exactly
   `jessicafeto.github.io` (this exact name is what makes it a personal site).
2. Upload everything **inside this `portfolio-site` folder** to the root of
   that repo (its contents, not the folder itself). Either drag-and-drop the
   files in the GitHub web UI, or use git:
   ```
   git init
   git remote add origin https://github.com/jessicafeto/jessicafeto.github.io.git
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**. Under "Build and deployment", set
   Source to **Deploy from a branch**, branch `main`, folder `/ (root)`, then
   save.
4. After a minute or two, your site is live at `https://jessicafeto.github.io/`.

### Alternative: a project repo
If you'd rather keep this as one project among several, create a repo with any
name (e.g. `portfolio`), push the same contents and enable Pages the same way —
your site will be at `https://jessicafeto.github.io/portfolio/`. All links in
this site use relative paths, so it works either way.

## 2. Personalization checklist

Before sharing the link, update these placeholders:

| What | Where | Current value |
|---|---|---|
| LinkedIn URL | `index.html`, Contact section | `href="#"` — replace with your LinkedIn profile URL |
| GitHub code/data link | `glow-lab.html`, "The Data & Approach" section | points to `github.com/jessicafeto/glow-lab-marketing-analytics` — update to wherever you publish this repo |
| Email | already set to `codesxjessica@gmail.com` throughout | confirm this is the address you want public |

## 3. Optional: regenerate the dataset

To produce different numbers, tweak the constants at the top of
`analysis/generate_and_analyze.py` (monthly new customers, CAC trends, repeat
purchase probabilities, etc.) and re-run it with Python 3:

```
pip install pandas numpy
python generate_and_analyze.py
```

This regenerates the CSVs and `results.json` in `data/`. The dashboard figures
in `glow-lab.html` and `assets/js/dashboard.js` are hard-coded (no live data
fetching), so you'd need to update them manually to match any new numbers.

## 4. A note on Glow Lab

Glow Lab is entirely fictional — the brand, the data and the results are all
synthetic, generated to demonstrate a marketing + data analytics approach end
to end. This is disclosed directly on the case study page.
