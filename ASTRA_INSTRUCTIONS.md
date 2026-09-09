# InnoFlowlink Tech — GPT-6 Astra Implementation Instructions

## Project context

This repository contains the source code of the deployed InnoFlowlink Tech company website.

Production URL: https://innoflowlink-tech.onrender.com/

Google Search Console currently confirms:

- URL is on Google.
- Page is indexed.
- URL is available to Google.
- Page can be indexed.
- HTTPS is valid.
- The URL currently has no search enhancements.

The objective is to improve Google search visibility, impressions, organic traffic, professional credibility, and qualified client enquiries.

## Safety and scope rules

Inspect the complete project before editing. Preserve all working functionality, visual identity, responsive behavior, contact-form integration, backend connectivity, MongoDB integration, Google Analytics, and deployment configuration.

- Do not access, request, print, modify, or expose secrets.
- Do not create or modify `.env` files.
- Environment-variable references in the source must remain environment-variable references.
- Do not hardcode MongoDB URIs, API keys, admin keys, passwords, tokens, or notification email credentials.
- Do not invent company registration details, physical addresses, awards, clients, testimonials, ratings, performance numbers, or business claims.
- Clearly label internal/demo projects instead of presenting them as paid client work.
- Do not replace the existing website with an unrelated template.
- Do not guarantee rankings, traffic, leads, or rich results.
- Use the real production URL for canonical URLs, sitemap entries, Open Graph metadata, and structured data.

## Required implementation

1. Create an SEO-friendly homepage title and meta description.
2. Add a correct canonical URL using the production domain.
3. Add a production-safe `robots.txt`.
4. Add a valid `sitemap.xml` containing only public production URLs.
5. Add `Organization` JSON-LD with verified information already present in the repository only.
6. Add Open Graph and Twitter/X sharing metadata.
7. Improve heading hierarchy and semantic HTML.
8. Add meaningful alt text to relevant images.
9. Improve internal navigation and internal links.
10. Create separate SEO-friendly routes/pages for:
    - Web Development
    - Mobile App Development
    - AI and Machine Learning Solutions
    - Game Development
    - Portfolio / Case Studies
    - About
    - Contact
11. Add useful original content to each page without keyword stuffing.
12. Create honest case-study sections for existing projects, marking internal demos accurately.
13. Improve calls to action for enquiries, consultations, and quotations.
14. Use `Organization` or `LocalBusiness` structured data only when the available verified information meets Google's rules.
15. Improve mobile performance and Core Web Vitals.
16. Optimize large images, lazy loading, JavaScript bundles, and fonts where appropriate.
17. Ensure every public React route works when opened directly after deployment and does not return a 404.
18. Preserve the contact-form API and existing analytics tracking.
19. Check for broken links, localhost URLs, staging URLs, duplicate metadata, and incorrect canonical tags.
20. Add other safe technical SEO improvements only when genuinely relevant.

## Workflow

Before editing:

1. Inspect and summarize the frontend framework, backend structure, routing approach, and deployment assumptions.
2. Identify risks and any missing verified business information without inventing replacements.
3. Explain the planned file changes briefly.

Then proceed with implementation. Do not stop after recommendations.

After editing:

1. Install dependencies using the lockfiles.
2. Run the production frontend build.
3. Run available tests and linting.
4. Check backend syntax without requiring secret environment variables.
5. Verify every public route.
6. Verify `sitemap.xml` and `robots.txt`.
7. Validate structured-data syntax.
8. Summarize every changed file.
9. Provide exact Git and deployment instructions.
10. Provide exact post-deployment Google Search Console steps.
11. Clearly report anything that could not be verified.

Use current official Google Search documentation when web access is available. Make the smallest maintainable set of changes that achieves the goals.
