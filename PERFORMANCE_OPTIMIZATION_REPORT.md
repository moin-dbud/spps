# Performance, SEO, and Deployment Audit Implementation

**Project:** P.M. Shri Savitribai Phule High School, Chandrapur  
**Audit baseline:** November 2, 2026  
**Implementation status:** Source changes and local production verification complete; no remote deployment performed.

## Summary

This update prioritizes the homepage LCP image, defers admin-only code, improves the About link label, aligns source canonical metadata to the provided live hostname, and makes crawler-file content types explicit in Vercel configuration. Original JPEGs, gallery/admin data and image mappings, authentication/permissions, multilingual content, and the global school-settings polling behavior were preserved.

## Baseline and architecture

The site is a Vite/React single-page application. Public routes share the app shell and client-side metadata is updated by the `SEO` component after React renders. Admin pages were statically imported by the application entry point, so their code was part of the initial JavaScript download.

The audited production build reported:

| Asset | Baseline size | Gzip |
|---|---:|---:|
| HTML entry | 7.30 kB | 2.19 kB |
| CSS | 170.56 kB | 26.61 kB |
| JavaScript | 776.97 kB | 196.14 kB |

The Lighthouse attachment reported **91 performance, 98 accessibility, 100 best practices, and 83 SEO** (FCP 1.2 s, LCP 1.6 s, TBT 0, CLS 0, Speed Index 1.5 s). It estimated 625 KiB of image savings and identified `img.ed-hero__main-img` as LCP, recommending high fetch priority and no lazy loading. Other observations included render-blocking CSS, five Google Fonts families, and an unused-JavaScript estimate. These are audit baselines, not post-change measurements.

The separate local score of 30 is not comparable to the production report: it was a development-mode run affected by browser extensions and IndexedDB.

## Implemented changes

- **LCP image:** Added intrinsic 936 × 752 dimensions, eager loading, and `fetchPriority="high"`. A `<picture>` supplies 480 px and 936 px WebP variants while retaining the original JPEG as the fallback. A document-level preload was intentionally omitted because the same SPA HTML shell serves admin routes; a global preload would download the hero image on those routes too. The original source image and all other source assets remain unchanged.
- **Image quality check:** The variants were generated at WebP quality 82 and visually inspected. SSIM against appropriately resized JPEG references was 0.96499 (480 px) and 0.97069 (936 px). The 480 px file is 28,864 bytes and the 936 px file is 93,390 bytes, compared with 245,535 bytes for the original JPEG. The browser selects one WebP size; the JPEG remains available as fallback.
- **Admin route splitting:** `AdminLogin` and `AdminDashboard` now load on their routes through `React.lazy`. A route-local Suspense status and error boundary provide loading feedback and a reload action on chunk/render errors. Authentication and permissions were not changed.
- **Descriptive About link:** The home-page About CTA now reads “About Our School” in English and localized equivalents in Marathi and Hindi.
- **Canonical hostname:** Static canonical, Open Graph, Twitter, JSON-LD, runtime fallback, persisted default settings, seed fallback, robots, and sitemap URLs now use `https://www.pmshrisavitribaiphuleschool.in`, the production URL supplied for this work. Related README and SEO deployment instructions were aligned. The previous configured `pmshrispps-chandrapur.edu.in` hostname failed DNS resolution in the audit. No host redirect was added.
- **Crawler-file response types:** `vercel.json` now assigns `text/plain` to `/robots.txt` and `application/xml` to `/sitemap.xml`, with `nosniff`. The existing SPA rewrite exclusions remain in place. Local production preview confirmed both files are served as static files.
- **Fonts/security:** No font families or weights were removed: all five families have source usage, including Devanagari, and the audit did not establish safely removable variants. No CSP was added because all runtime API, upload, map/embed, and font origins could not be completely verified; an unverified policy risks breaking public and admin features. HSTS was not broadened to subdomains or preload.
- **Preserved behavior:** The `/api` rewrite and `SchoolSettingsContext` polling interval/refresh behavior remain unchanged. No speculative cleanup was made for the external `/dashboard/totalusers` request.

## Build comparison

The final production build was written outside the repository to `D:\spps_audit_build_20261102`; the existing `dist` directory was not overwritten.

| Asset | Baseline | Implemented build | Change |
|---|---:|---:|---:|
| HTML entry | 7.30 kB / 2.19 kB gzip | 7.36 kB / 2.18 kB gzip | +0.06 / −0.01 kB |
| Initial CSS | 170.56 kB / 26.61 kB gzip | 132.15 kB / 20.67 kB gzip | −38.41 / −5.94 kB |
| Initial JavaScript | 776.97 kB / 196.14 kB gzip | 660.33 kB / 173.69 kB gzip | −116.64 / −22.45 kB |

The admin route chunks are deferred: `AdminLogin` is 3.33 kB (1.28 kB gzip) plus 5.71 kB CSS (1.65 kB gzip), and `AdminDashboard` is 116.55 kB (24.39 kB gzip) plus 32.93 kB CSS (6.30 kB gzip). The initial JavaScript remains above Vite’s 500 kB warning threshold; further broad code splitting was not attempted because it was outside this surgical change.

## SEO, security, and remaining limitations

- The audited live site returned the homepage HTML for both `/robots.txt` and `/sitemap.xml`. The source build and local preview now serve the static files with appropriate content types, but a remote deployment is required to verify the fix on the public host.
- Initial HTML remains shared by client-side routes. Route-specific metadata is set after React runs, so direct-route HTML is not pre-rendered with route-specific canonical/title/schema data. A static/SSR rewrite was not introduced because it would be a higher-risk architecture change.
- The production Lighthouse request to `backend.spendingcalculator.xyz/dashboard/totalusers` was not found in repository code or a clean browser session. The report also contained Buyhatke extension resources, so extension contamination is plausible but attribution is unconfirmed. Re-run in a clean browser before drawing conclusions.
- The live HTTPS response was reported with `Strict-Transport-Security: max-age=63072000` and no CSP. Do not add `includeSubDomains` or `preload` until every subdomain is verified. CSP remains pending a complete origin inventory and safe report-only validation.
- The current deployment mismatch is unresolved: the supplied live hostname differs from the hostname previously configured in source, and the audit found the previous hostname did not resolve. Source changes do not confirm which Vercel project or build is serving production.
- Performance scores and field metrics were **not remeasured after these changes**. The build-size comparison is the only post-change performance evidence.

## Verification

- `npm run build -- --outDir D:\spps_audit_build_20261102 --emptyOutDir` — passed; initial bundle warning remains.
- `npx tsc --noEmit` — passed.
- `npm run lint` — passed with the repository’s existing warnings; unrelated warnings were not changed.
- Local production preview — `/`, `/admin/login`, `/robots.txt`, `/sitemap.xml`, the original JPEG, and the responsive WebP returned HTTP 200. Crawler files returned `text/plain` and `text/xml` in Vite preview; Vercel config explicitly requests `text/plain` and `application/xml`.
- Generated sitemap parsed as XML; built static HTML, robots, and sitemap contain no old hostname or localhost URL.
- No test script or focused test suite is configured in `package.json`.

## Manual deployment checks

1. In Vercel, verify the project points to this repository, the intended production branch, and repository root (not a nested directory).
2. Verify the production build command is `npm run build` and the output directory is `dist`; ensure the deployed output contains `robots.txt` and `sitemap.xml` from `public/`.
3. Confirm the intended production domain is `www.pmshrisavitribaiphuleschool.in` and inspect the deployed HTML’s canonical/OG/JSON-LD URLs.
4. After deployment, verify `/robots.txt` returns the robots directives as `text/plain` and `/sitemap.xml` returns valid XML as `application/xml`, rather than the SPA document. Also verify a direct visit to `/admin/login`, API routing, and uploaded/image assets.
5. Do not create host redirects until the Vercel project/domain mismatch is understood. Re-run Lighthouse against the deployed production build in a clean browser profile with extensions disabled.
