# Git, deployment and Google Search Console

## 1. Apply the update to your existing Git checkout

Extract this archive. Copy the updated `src`, `public`, `scripts`, `index.html`, `package.json`, `.gitignore`, `README.md`, `DEPLOYMENT.md` and `VERIFICATION_REPORT.md` into the matching paths of your existing InnoFlowlink Tech checkout. Do not replace its `.git` directory or any existing environment files. The backend and dependency lockfiles are unchanged; leave the deployed backend configuration in place.

Run these commands from your existing repository root, with no unrelated local work staged:

```sh
git status --short
git switch -c improve-seo-and-enquiries
npm ci --ignore-scripts --no-audit --no-fund
npm ci --prefix server --ignore-scripts --no-audit --no-fund
npm run build
npm run lint
npm run verify
node --check server/server.js
git diff --check
git add src/App.jsx src/App.css src/main.jsx src/AdminDashboard.jsx src/PageContent.jsx src/pages.js src/entry-server.jsx public/robots.txt public/sitemap.xml scripts/prerender.mjs scripts/serve.mjs scripts/verify.mjs index.html package.json .gitignore README.md DEPLOYMENT.md VERIFICATION_REPORT.md
git diff --cached --stat
git commit -m "Add prerendered service pages, SEO and enquiry improvements"
git push -u origin improve-seo-and-enquiries
```

Open a pull request from `improve-seo-and-enquiries` to your repository's production branch and review it. Merge when ready to release. If your production branch is `main`, update your local copy afterward with:

```sh
git switch main
git pull --ff-only origin main
```

The supplied ZIP has no Git history or hosting manifest, so the actual remote, branch, dashboard settings and auto-deploy status could not be verified. Do not initialize a replacement repository over your existing checkout.

## 2. Deploy the existing frontend service

Use the existing Render service that owns `https://innoflowlink-tech.onrender.com/`; creating a new service would change the production URL. First confirm whether that frontend service is a Static Site or a Node Web Service. Do not change the separate Express API service into a static site.

### Existing Render Static Site

1. Keep the existing linked repository, production branch and public hostname.
2. Root Directory: repository root (leave blank if it is currently the root).
3. Build Command: `npm ci --ignore-scripts --no-audit --no-fund && npm run build`.
4. Publish Directory: `dist`.
5. Preserve the existing production `VITE_API_URL` build setting. It must point to the existing HTTPS API origin. Do not substitute the frontend origin unless `/api/` is actually served there.
6. A real HTML file exists for each public route. Remove only an obsolete catch-all SPA rewrite such as `/* → /index.html` if present; preserve unrelated redirects. A catch-all may mask missing pages and serve homepage metadata for them.
7. Render serves static directory index files. Check both slash and non-slash variants after deployment; all emitted canonical links use trailing slashes. `dist/404.html` is the custom missing-page document. Confirm unknown paths return HTTP 404.
8. Optionally add a response header for `/assets/*`: `Cache-Control: public, max-age=31536000, immutable`. Assets have content hashes. Keep HTML revalidating rather than assigning it a year-long cache lifetime.
9. Use Manual Deploy → Deploy latest commit if auto-deploy did not run. Wait until deployment succeeds.

### Existing Render Node Web Service serving the frontend

Use the same build command, keep the existing `VITE_API_URL` setting and set Start Command to `npm start` at the repository root. The included frontend server serves all generated pages, redirects their noncanonical paths and returns genuine 404 responses. It uses Render's `PORT` value and listens on all interfaces.

This frontend start command is **not** a replacement for the separate backend's `node server.js` command. If your service combines frontend and backend in a configuration absent from this archive, review that configuration before changing its start command.

### Existing Netlify frontend, if still in use

The same build command and `dist` publish directory work with generated directory indexes. Preserve the existing `VITE_API_URL`. Review and remove only obsolete catch-all SPA fallbacks. The requested canonical origin is Render: confirm which site is the primary public site before releasing, and redirect any duplicate public host to that primary host. Do not silently change the canonical origin to Netlify.

## 3. Post-deployment functional checks

1. Open each of the eight sitemap URLs directly in a fresh tab, then refresh. Check the correct content and title appear. Use View Page Source to confirm the page-specific H1, description and canonical exist before JavaScript runs.
2. Open `/robots.txt` and `/sitemap.xml`; both must return 200 with their intended content. Open an unknown URL and check a 404 response.
3. On a phone or mobile browser viewport, test Menu, keyboard focus, all service links, the contact form and footer. Confirm no horizontal overflow.
4. Send one clearly labelled test enquiry through `/contact/` using your own contact details. Confirm the success message, one record in the existing admin portal and the configured notification email. Remove the test record afterward if appropriate. Avoid repeated submissions because the existing rate limit is five per 15 minutes.
5. Open `/#admin`. Use your existing key locally, check search/filter/status actions, and log out. Never share the key or put it in a URL.
6. Check Google Analytics Realtime for page views and a single `generate_lead` event from that successful enquiry. If wanted, mark `generate_lead` as a key event in Analytics. Browser blocking and analytics settings can affect collection; the code alone does not prove ingestion.
7. Run PageSpeed Insights against the live homepage and a service page in mobile mode. Record LCP, INP and CLS when field data is available. No Core Web Vitals score or improvement percentage was measured in this environment.

## 4. Google Search Console steps

1. Open https://search.google.com/search-console/ and choose the verified property covering `https://innoflowlink-tech.onrender.com/`.
2. Open **Sitemaps**. Enter `sitemap.xml` (or the full `https://innoflowlink-tech.onrender.com/sitemap.xml` if the input requires it) and submit. Revisit the report to check processing status and discovered pages.
3. Use the top **URL inspection** field for `https://innoflowlink-tech.onrender.com/`. Select **Test live URL**. Confirm crawl access, successful fetching and indexability; inspect tested HTML for the canonical and page content.
4. If the live test is successful, select **Request indexing**. Repeat for the seven new pages when quota permits; the sitemap also supports discovery. Repeating requests does not accelerate crawling.
5. Test the homepage with https://search.google.com/test/rich-results and inspect the Organization markup. JSON syntax passing locally is not a guarantee of rich-result eligibility or display.
6. Monitor **Page indexing** for excluded/error URLs and canonical selection. Use URL inspection to investigate any mismatch. Monitor **Performance → Search results** for impressions, clicks and queries over time, filtering by page when useful.
7. Monitor the **Core Web Vitals** report when enough real-user data is available. No immediate report or fixed indexing/ranking timeline is promised.

## Official references consulted

- JavaScript SEO and prerendered content: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Organization markup: https://developers.google.com/search/docs/appearance/structured-data/organization
- Sitemap creation and submission: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Recrawl requests: https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- Render static sites: https://render.com/docs/static-sites
- Render redirects/rewrites: https://render.com/docs/redirects-rewrites
- Render static export explanation: https://render.com/tutorials/web-service-vs-static-site/static-sites

These changes improve technical discoverability and enquiry clarity. Search engines control crawling, indexing, ranking and search presentation.
