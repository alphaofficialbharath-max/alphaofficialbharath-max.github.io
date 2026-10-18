# MONETIZATION - how Typeflow earns money from ads

## 1. How website ads pay

An ad network (Google AdSense and similar) shows small ad banners on your pages. You are paid for:

- **Impressions** - when visitors simply see an ad, and
- **Clicks** - when a visitor opens an ad.

Site owners measure it as **RPM** (revenue per 1,000 pageviews). For free-tool sites like this, a realistic working range is roughly Rs.100-300 RPM for typical Indian traffic (it varies a lot by traffic quality). Simple math behind the goal: at ~Rs.150-300 RPM, **about 5,000-15,000 pageviews a month lands near Rs.1,500.** Tools that people open again and again (typing practice is a daily habit) are the ideal shape for this: users return every evening and the views stack up.

Honest expectation: **weeks to months, not days.** Users first, ads second. Trying to earn before you have daily users is the classic trap.

## 2. The AdSense path (the real ladder)

- **Age rule:** AdSense is for 18+. Since you are a student, the account is opened and owned by a **parent or guardian** - their name on the account, their bank account receives the payout. Thousands of student sites run exactly this way.
- **Documents needed:** PAN card (of the account owner), the address-verification PIN (sent by post), and a bank account for payouts.
- **Payout threshold:** this plan assumed about Rs.800 - **confirm the live minimum in your dashboard (Payments settings) before relying on any number.** AdSense's standard threshold is US$100 (roughly Rs.8,000+), and Indian payment terms can differ - the dashboard is the source of truth.
- **Rough sequence:** apply -> approved -> paste publisher id -> grow traffic -> cross the threshold -> PIN by post -> first bank transfer. A brand-new site may need a few application cycles - that is normal, keep the blog posts growing meanwhile.

## 3. Easier-approval networks (the first rung)

AdSense can reject brand-new small sites. Easier first-step networks that accept small traffic:

- **Adsterra** - accepts small sites, banners + native + push, regular payouts.
- **PropellerAds** - easy start, banner and push formats.
- **RevenueHits** - long-standing, beginner-friendly.

Use one of these only as a training rung to learn the flow (publisher id -> paste snippet -> read reports -> payout). Keep pages clean and useful - ads must never bury the tool. When the site has a few dozen daily users and a couple of months of real content history, apply to AdSense via the parent/guardian account for the better rates.

## 4. The 4 ad slots already reserved in the code

Every ad position is pre-built with a fixed minimum height so adding ads later cannot shift the layout (layout shift damages search ranking and annoys users). Each slot contains a comment block with SAMPLE code - the pages render **no ads at all** right now. To go live, replace a slot's sample comments with your real snippet.

| Slot | Where | Frame size |
|---|---|---|
| AD SLOT 1 | header banner (top of every page) | ~728x90 desktop leader |
| AD SLOT 2 | below the test / tool (index + word counter) | ~300x250 box |
| AD SLOT 3 | middle of each blog post | ~300x250 in-content |
| AD SLOT 4 | footer banner (every page) | ~468x60 desktop, 320x50 mobile |

Find a slot by searching the HTML for `AD SLOT`. Each page carries 3 slots (header + one content slot + footer); the four slot types are distributed across the site in the proven pattern for text-tool sites.

After hosting, rename `ads.txt.example` to `ads.txt` at the site ROOT and put YOUR publisher line in it, e.g. for AdSense (use your real id instead of zeros):

```
google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
```

## 5. Hard rules - break one and the account is gone

- **Never click your own ads.** Not once, not "to test". Networks detect patterns and ban instantly - and a relative clicking them also counts.
- **Nothing fake or misleading** - never place ads that pretend to be download buttons, answer keys or system messages.
- **Ads must not break the layout** - the reserved min-heights exist for this; pushing content down or overlapping is bad policy and bad SEO.
- **No paid or fabricated traffic** - paid visits and auto-reload tricks are invalid traffic and kill payouts.
- **Content before monetization** - keep the tools and blog posts genuinely useful; forbidden practices above apply to everything.

## 6. 30-day free promotion checklist (users first, ads second)

- **WhatsApp / Telegram student groups** (your +1 batch, entrance-exam groups): share the test on practice days - "free 60-second test, live WPM" works better than "visit my site".
- **Reddit & forums:** answer real questions ("what typing speed does SSC DEST need?") with genuine advice and link the tool naturally where allowed - never spam.
- **Free tool directories:** submit Typeflow to free directories and typing-tool lists; each one is also a backlink for search.
- **On-page SEO:** titles, descriptions and the 3 guide posts already target what typing-seekers type into Google. Submit the sitemap in **Google Search Console** the day the stable URL is live.
- **Daily habit:** one evening test + one share, every day - the compounding win is a small message among classmates daily, not one big post.
- Track weekly: pageviews, which pages earned them, what searchers' questions were answered best - then do more of that.
