# ADS ACTIVATION RUNBOOK - copy-paste commands only
Goal: permanent URL -> ad account -> real snippet -> ads.txt -> verify. The Builder cannot create ad
accounts (18+ rules), so YOUR hands-on part is only ~25 minutes total. Every money/limit number below
must be confirmed in the network's own dashboard - treat any figure you see there as the truth.

## S1 - PERMANENT URL (you + maybe parent, ~10 min, free)

The push commands below assume this repo is named exactly `<username>.github.io` so the site is served
at the ROOT (that keeps `/sw.js` + `manifest.json` working untouched - already pre-committed locally).

1. Create a free GitHub account (if you have none) and click New repository.
   Name: `<your-username>.github.io` (your GitHub username, no spaces), Public, EMPTY (no README).
2. Push the pre-committed repo (from /home/bharath/Desktop/typeflow):
```
git config user.name "<your-name>"          # repo-local; placeholders set for you, change freely
git config user.email "<your-email>"
git remote add origin https://github.com/<username>/<username>.github.io.git
git push -u origin main                     # three commands total: remote, push, done
```
   (If the placeholder identity is already fine, skip the two config lines.)
3. Turn on Pages: repo -> Settings -> Pages -> Source: "Deploy from a branch" -> Branch: main, folder
   /(root) -> Save. Site goes live at `https://<username>.github.io/` (first deploy takes a minute).
4. Point the SEO files at the real address (replace the temporary tunnel base everywhere):
```
OLD_BASE=https://granny-bedroom-pdt-computing.trycloudflare.com
NEW_BASE=https://<username>.github.io
sed -i "s|$OLD_BASE|$NEW_BASE|g" sitemap.xml robots.txt
grep -c '<loc>' sitemap.xml && cat robots.txt        # verify: 5 locs + Sitemap line
git add -A && git commit -m "point sitemap and robots at GitHub Pages" && git push
```
5. Google Search Console (free): search.google.com/search-console -> Add property -> URL prefix
   `https://<username>.github.io/` -> verify (HTML file method is easiest: download, copy into the repo
   alongside index.html, push, wait for verification) -> Sitemaps -> submit `sitemap.xml`.

Alternative to GitHub, if easier for you: Netlify Drop - open app.netlify.com/drop and drag the
`typeflow` folder in; live instantly at `yourname.netlify.app` (still root-served; then do steps 4-5
with that URL instead).

Allowed extra: `LIVE-URL.txt` records the temporary tunnel; you may delete it once the stable URL is
live, or update it for notes only.

## S2 - AD ACCOUNT (you WITH parent/guardian, ~15 min) - pick from the decision table

| Network | Best for | Notes + what signup asks |
|---|---|---|
| Adsterra | first rung, faster approval, we can move at 1 visitor/day | site + email; 18+ -> parent's name, ID details, payout method; min payout SMALL (confirm exact in dashboard); payout methods incl. PayPal/bank-something (confirm in dashboard) |
| Monetag | other easy first rung, similar shape | same as above; formats incl. banner (confirm in dashboard) |
| AdSense (via guardian) | better long-term rates - apply LATER with some content history | full path: MONETIZATION.md section 2 - do not redo it here |

Signup asks for: your/parent's email, the site URL, account holder data (18+), and payout details.
Where your publisher id + ad snippet live: each network's dashboard shows "Websites", "Ad units /
Sites -> Get code" or similar (name varies - confirm in the dashboard). Approval timing differs per
network and site - expect minutes to days; treat the dashboard verdict as final. Approval is per-site:
use the PERMANENT URL only (tunnels get rejected).

## S3 - GO-LIVE ROUND (hand the snippet over)

When approved, the dashboard gives you a snippet + a publisher id. Copy that snippet and hand it to the
Planner (paste it in the plan session) - the Builder then places it into the reserved slots.
Slot mapping is already locked in MONETIZATION.md section 4 (tool pages: SLOT 1 + SLOT 2 + SLOT 4;
blog posts: SLOT 1 + SLOT 2/3 content + SLOT 4). Do not invent new slots - the four reserved types have
fixed min-heights so ads cannot shift the layout.

## S4 - ads.txt (minutes)

After you have the publisher id, rename the placeholder and add the network's OWN ads.txt line
(AdSense's standard line shape is shown in the example file; Adsterra/Monetag serve their own exact
line in the dashboard - copy it verbatim, confirming in the dashboard):
```
cd /home/bharath/Desktop/typeflow
mv ads.txt.example ads.txt        # then edit the placeholder pub-0000000000000000 line to YOUR id
git add -A && git commit -m "add ads.txt with real publisher id" && git push
```
ads.txt must sit at the site ROOT, one line per entry (each network's line exactly as given).

## S5 - VERIFY + HARD RULES

Verify yourself (2 min) after each go-live round:
- open every page, F12 -> Console: no red errors;
- ad iframes/frames appear inside the reserved slots (inspect -> slot div only contains ad + its code);
- layout does not jump when ads load (min-heights are already reserved);
- then point at the rules: MONETIZATION.md section 5 is NOT optional - **NEVER click your own ads, not
  once, not "to test"** (instant ban), nothing fake/misleading, no paid traffic, ads must not break
  layout. Re-read it before telling friends about the site.
