# Typeflow

Your own app-like website: a free typing speed test + word counter that installs on any phone home screen and works offline after the first load. No store fee, no backend, no paid tools.

## What is inside

```
typeflow/
  index.html                     typing test (30s / 60s / quote, live WPM + accuracy)
  word-counter.html              live word / character / sentence count + reading time
  blog/improve-typing-speed.html guide post (SEO + internal links to tools)
  blog/touch-typing-basics.html  guide post
  blog/typing-test-for-jobs-india.html guide post (SSC / data-entry exam speeds)
  assets/style.css               black/white + orange accent design, system fonts only
  assets/app.js                  all logic, no network calls
  assets/icon-192.png            self-generated icons
  assets/icon-512.png
  manifest.json                  PWA manifest (install to home screen)
  sw.js                          service worker - cache-first, site works offline
  robots.txt / sitemap.xml       search crawler files (update base URL after hosting)
  ads.txt.example                rename to ads.txt after you get an AdSense publisher id
  MONETIZATION.md                the full money plan: AdSense path, math, promotion
  LIVE-URL.txt                   the current public tunnel URL
```

## Run it on your own machine

```
cd /home/bharath/Desktop/typeflow
python3 -m http.server 8642
```
Open http://localhost:8642. (The typing tool pages never call the internet, so even this local server is fully functional.)

## Deploy step (a): quick tunnel for demos / testing (free, no account)

```
cloudflared tunnel --url http://localhost:8642
```
Read the `https://xxxx.trycloudflare.com` URL it prints and save it into `LIVE-URL.txt`.
Important: quick-tunnel URLs are temporary - they change every time you restart `cloudflared`. Use them to test and to share links for a day, not as the address you put on Google.

## Deploy step (b): stable free hosting (the real 24/7 URL - SEO + ads need this)

Pick ONE free host and upload this exact folder:

- **GitHub Pages** (free): create a free GitHub account, create a new repository, upload all files, open Settings -> Pages, set source to your main branch, and the site goes live at `https://<username>.github.io/<repo>/`. Note: in a sub-folder, change `/sw.js` registration in `assets/app.js` to the sub-folder path, or keep the repo at the root of a `<username>.github.io` repository.
- **Netlify Drop** (free): drag the whole `typeflow` folder into netlify drop - live in seconds, free subdomain like `typeflow.netlify.app`.
- **Cloudflare Pages** (free): direct upload or, later, connect a GitHub repo for auto-updates on every commit.

After the stable host is live:

1. Replace the base URL inside `sitemap.xml` and the `Sitemap:` line in `robots.txt` with your real address (they were written with the temporary tunnel URL).
2. Add the site to **Google Search Console** (free) and submit the sitemap so all pages get crawled quickly.
3. Keep the site served over HTTPS (all three hosts above do this by default) - the PWA install prompt and the offline mode need HTTPS.

## Anything I must redo when changing hosts?

- `robots.txt` + `sitemap.xml` - update the base URL (one minute).
- `ads.txt` - only needed after you get an ad network publisher id (see `ads.txt.example` and `MONETIZATION.md`).
- That is all - the pages, tools and PWA files themselves are host-agnostic.

## Monetization

`MONETIZATION.md` covers the full AdSense path (age rule + parent/guardian account, PAN, address PIN, bank payout), honest earnings math, easier-approval ad networks as a first step, and the 30-day free promotion checklist. The four ad slots are already reserved in the pages as commented slots - the site shows NO ads today.
