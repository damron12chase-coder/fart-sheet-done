# Deploying F.A.R.T. Sheet Done (owner guide)

Follow these steps in order. None of them cost money. Take your time on step 9 — it is the one that must happen LAST.

1. **Create a free GitHub account** at https://github.com/signup if you don't have one.

2. **Create a new repository**: click the "+" menu (top right) → "New repository". Name it exactly `fart-sheet-done`. Leave it **Public** (GitHub Pages on the free plan serves public repos). Do not tick any option to add a README, .gitignore, or license — we upload our own files.

3. **Upload the site files**: on the empty repository page click "uploading an existing file". Upload the *contents* of the `fart-sheet-done` folder (`index.html`, `logic.js`, `test.html`, `robots.txt`, `sitemap.xml`, `.gitattributes`, this file) — drag the files themselves, not the folder. Then click "Commit changes".

   Note: `.gitattributes` is already included (its one line, `* text=auto eol=lf`, keeps line endings consistent so the site behaves the same on every machine). If GitHub's web uploader hides it from your file picker, don't worry — it is only a formatting hint and the site works without it.

4. **Turn on GitHub Pages**: repository → **Settings** → **Pages** (left sidebar) → under "Build and deployment", Source: **Deploy from a branch**, Branch: **main** / **root** → **Save**.

5. **Wait a minute or two**, then open `https://<your-username>.github.io/fart-sheet-done/`. The page loads and works immediately from that address — no domain needed.

6. **(Optional) Free custom domain** `fart-sheet-done.is-a.dev`: go to https://github.com/is-a-dev/register, click Fork, add a file named `fart-sheet-done.json` in the `domains/` folder containing:

   ```json
   {
     "owner": { "username": "<your-github-username>" },
     "record": { "CNAME": "<your-username>.github.io" }
   }
   ```

   Then click "Contribute" to open a pull request. A volunteer reviews and merges, usually within a few days. **After it is approved**, go back to your own repo, add a file named `CNAME` in the root containing exactly `fart-sheet-done.is-a.dev`, and in Settings → Pages make sure the custom domain is picked up (you may need to re-save). Until then just use the github.io address — do not block launch on this step.

7. **Tell the search engines the site exists**: submit the final URL in Google Search Console (https://search.google.com/search-console — add the URL, verify by the meta-tag or DNS option they offer) and Bing Webmaster Tools (https://www.bing.com/webmasters — you can import from Search Console). Add `sitemap.xml` in both. Indexing typically takes hours to days.

8. **Sanity check the live site**: open the URL on your phone, enter the code, run one real book search, generate one section. This also proves the AI calls work from a real web address.

9. **LAST STEP before you share the site with anyone — add the private AI key**: the site cannot generate sheets until the key is in place. Open `logic.js` on GitHub (or edit your local copy and re-upload), find the line near the top that reads `const API_KEY='';`, and paste the private key between the quotes: `const API_KEY='...';`. Commit.

   - The key was deliberately kept OUT of the repository history until this moment. Once you paste it, it lives in a **public** repo — treat that as known: anyone can read it. That is why there are daily-use guards on the site, but also why you should be ready to rotate the key if usage spikes.
   - The safest way to do this step is on the GitHub website's pencil ("Edit in place") editor, so the key only ever exists on the final commit and never on a shared drive.
   - Never paste the key into screenshots, chats, emails, or other documents.
