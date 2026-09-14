# PUBLISH.md — your morning runbook (F.A.R.T. Sheet Done)

Follow these in order. Total time: about 15 minutes. None of it costs money.

## a. Get a fresh AI key (the old one is dead)

The old b.ai key was revoked by b.ai and no longer works. Go to **api.b.ai** (or the
b.ai console), sign in, and create a new API key. Do not share it with anyone beyond
this site. Never paste it into screenshots, chats, or emails.

## b. Paste the key into logic.js (10 seconds)

Open `logic.js` in a text editor. Find this line near the top:

```
const API_KEY='';
```

Put your new key between the quotes, like this:

```
const API_KEY='sk-YOURNEWKEY';
```

Save the file. Done.

## c. Test it locally

Double-clicking `index.html` may not work (some browsers block the AI calls from a
`file://` page). Instead, open a terminal in the `fart-sheet-done` folder and run:

```
python -m http.server 8765
```

Then open **http://127.0.0.1:8765/** in your browser. Enter the code `fartsheetai`,
pick a book, click Generate on one section, and confirm it fills in. Press Ctrl+C in
the terminal to stop the server.

## d. Publish it free on GitHub Pages

1. Make (or log into) a free account at **github.com**.
2. Click **+ → New repository**, name it `fart-sheet-done`, leave it Public, then create it.
3. Upload **all the files** in this folder (drag the files themselves, not the folder).
4. Go to **Settings → Pages**. Source: "Deploy from a branch". Branch: `main` / `/ (root)`. Save.
5. Wait about a minute. Your site is live at:
   `https://<YOUR-USERNAME>.github.io/fart-sheet-done/`

That URL works right away and anyone can open it or find it in search.

## e. Optional: nicer domain (fart-sheet-done.is-a.dev)

There is a ready-made file in this repo: `is-a-dev-pr/fart-sheet-done.json`.

1. Open it and replace the two placeholder strings with your real GitHub username:
   `REPLACE_WITH_YOUR_GITHUB_USERNAME` and `REPLACE_WITH_YOUR_USERNAME.github.io`.
2. Go to **github.com/is-a-dev/register**, click Fork, add a file named
   `fart-sheet-done.json` in the `domains/` folder, paste your edited file content in,
   and open a Pull Request. A volunteer reviews it, usually within a few days.
3. Once approved: in your repo add a file named `CNAME` containing exactly
   `fart-sheet-done.is-a.dev`, and it shows in Settings → Pages as the custom domain.

Your github.io URL from step d keeps working as a fallback. Do not block launch on this step.

## f. Get it into Google

After d (and e if you did it), submit your URL in **Google Search Console**
(https://search.google.com/search-console) and **Bing Webmaster Tools**
(https://www.bing.com/webmasters — you can import from Search Console). Add
`sitemap.xml` in both. Expect it to show up in search within hours to a few days.

## g. Stopping abuse

The site already rate-limits itself: 30 seconds between AI calls, 12 per day per
device. If your key's budget ever gets drained, edit `logic.js` back to
`const API_KEY='';` and re-upload the file — students can't burn a blank key.
Then get a new key and paste it in. Rotate as freely as you like.
