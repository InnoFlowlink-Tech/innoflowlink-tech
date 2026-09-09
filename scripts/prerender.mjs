import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { render } from '../.prerender/entry-server.js';
import { pages, origin } from '../src/pages.js';

const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const template = await readFile('dist/index.html', 'utf8');
const organization = {
  '@context': 'https://schema.org', '@type': 'Organization',
  '@id': `${origin}/#organization`, name: 'InnoFlowlink Tech', url: `${origin}/`,
  logo: `${origin}/innoflowlink-logo.jpg`, email: 'innoflowlink4202@gmail.com',
  sameAs: ['https://github.com/InnoFlowlink-Tech'],
};
for (const [path, page] of [...Object.entries(pages), ['/404/', { title: 'Page not found | InnoFlowlink Tech', description: 'Find services, project examples and contact information for InnoFlowlink Tech.' }]]) {
  const notFound = path === '/404/';
  const url = origin + path;
  const seo = [
    `<title>${escape(page.title)}</title>`,
    `<meta name="description" content="${escape(page.description)}" />`,
    `<meta name="robots" content="${notFound ? 'noindex, follow' : 'index, follow'}" />`,
    ...(!notFound ? [`<link rel="canonical" href="${url}" />`] : []),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="InnoFlowlink Tech" />`,
    `<meta property="og:title" content="${escape(page.title)}" />`,
    `<meta property="og:description" content="${escape(page.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${escape(page.title)}" />`,
    `<meta name="twitter:description" content="${escape(page.description)}" />`,
    ...(path === '/' ? [`<script type="application/ld+json">${JSON.stringify(organization).replaceAll('<', '\\u003c')}</script>`] : []),
  ].join('\n    ');
  const html = template.replace(/<!--seo-start-->[\s\S]*?<!--seo-end-->/, seo)
    .replace('<div id="root"></div>', `<div id="root">${render(path)}</div>`);
  const directory = notFound ? 'dist' : `dist${path}`;
  await mkdir(directory, { recursive: true });
  await writeFile(notFound ? 'dist/404.html' : `${directory}/index.html`, html);
}
await rm('.prerender', { recursive: true, force: true });
console.log(`Prerendered ${Object.keys(pages).length} public pages and 404.html.`);
