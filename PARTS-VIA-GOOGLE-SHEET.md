# Manage Featured Parts from a Google Sheet (no code, no redeploy)

Add or edit a part by editing a **Google Sheet** — the live site reads it
automatically. No GitHub, no Netlify rebuild.

## One-time setup (≈5 minutes)

1. **Create the sheet**
   - New Google Sheet → import the starter file so you don't type the
     current parts by hand:
     **File → Import → Upload → `parts-template.csv` → "Replace current sheet".**
   - (Or make a blank sheet with this header row, exact names, any order:)
     ```
     slug  brand  name  tag  fit  models  priceTHB  gain  img  fits  desc  features
     ```

2. **Publish it as CSV**
   - **File → Share → Publish to web**
   - Under *Link*, pick the sheet tab → choose **Comma-separated values (.csv)**
   - **Publish** → copy the URL it gives you (ends in `output=csv`).

3. **Point the site at it (one time)**
   - In **`products.js`**, paste that URL between the quotes:
     ```js
     window.NW_SHEET_CSV = "https://docs.google.com/spreadsheets/d/e/XXXX/pub?gid=0&single=true&output=csv";
     ```
   - Commit/push once. From now on you never touch code again — just the sheet.

## Adding / editing a part

Edit a row in the sheet and **save**. The change shows on the site within a
minute or two (Google republishes the CSV, then visitors load the new data).

| Column     | What to put | Notes |
|------------|-------------|-------|
| `slug`     | unique id, e.g. `vrsf-n55-downpipe` | used in the URL `product.html?p=<slug>` — keep it unique, lowercase, no spaces |
| `brand`    | e.g. `VRSF` | |
| `name`     | e.g. `N55 Catted Downpipe` | |
| `tag`      | e.g. `Catless · High-flow` | small red badge on the card |
| `fit`      | e.g. `Fits BMW 1–4 Series · N55` | |
| `models`   | e.g. `335i · 435i · M2` | |
| `priceTHB` | e.g. `22500` | number only, in **THB**; the currency selector converts it |
| `gain`     | e.g. `+20–25 hp` | optional — leave blank for non-power parts |
| `img`      | image URL **or** filename | a full `https://…` link, or a file in `Asset/products/` (e.g. `n55-downpipe.webp`) |
| `fits`     | car ids separated by `\|` | e.g. `bmw-3\|bmw-4` — drives the Shop-by-Car dropdown. Valid ids: `bmw-3 bmw-4 bmw-5 bmw-x3 bmw-x5 bmw-z4 benz-c benz-e`. Leave blank → only under "All cars". |
| `desc`     | 2–3 sentences | shown on the detail page |
| `features` | bullets separated by `\|` | e.g. `High-flow design\|Faster spool\|Pairs with a tune` |

### Photos
Easiest: paste a full image URL in `img` (e.g. the product photo from the
supplier). Or drop a `.webp` in `Asset/products/` and put just its filename.

## Notes
- The site **falls back** to the built-in list in `products.js` if the sheet
  is empty or unreachable — so it never breaks.
- Hosting/deploy is unchanged; only the **content** now comes from the sheet.
- Same data powers both the homepage cards and the `product.html` detail pages.
