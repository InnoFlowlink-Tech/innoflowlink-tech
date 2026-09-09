import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { once } from 'node:events';
import { pages, origin } from '../src/pages.js';
import { server } from './serve.mjs';

server.listen(0, '127.0.0.1');
await once(server, 'listening');
const base = `http://127.0.0.1:${server.address().port}`;
const documents = new Map();
const titles = new Set(), descriptions = new Set();
const count = (html, regex) => [...html.matchAll(regex)].length;
try {
  for (const [path, page] of Object.entries(pages)) {
    const response = await fetch(base + path);
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get('content-type'), /text\/html/);
    const html = await response.text();
    documents.set(path, html);
    assert.equal(count(html, /<h1[ >]/g), 1, `One H1: ${path}`);
    assert.equal(count(html, /<title>/g), 1);
    assert.equal(count(html, /name="description"/g), 1);
    assert.equal(count(html, /rel="canonical"/g), 1);
    assert.ok(html.includes(`rel="canonical" href="${origin}${path}"`));
    assert.ok(html.includes('name="robots" content="index, follow"'));
    assert.ok(html.includes(`property="og:url" content="${origin}${path}"`));
    for (const field of ['og:title', 'og:description', 'og:type', 'og:site_name', 'twitter:card', 'twitter:title', 'twitter:description']) assert.equal(count(html, new RegExp(`(?:name|property)="${field}"`, 'g')), 1);
    assert.ok(!titles.has(page.title)); titles.add(page.title);
    assert.ok(!descriptions.has(page.description)); descriptions.add(page.description);
    assert.ok(!/localhost|127\.0\.0\.1|undefined\/api|staging/i.test(html));
    assert.ok(html.includes('G-MSSCLFVQHP'), 'Existing GA retained');
    assert.ok(!html.includes('Lead management'), 'Admin content not prerendered');
    for (const match of html.matchAll(/<img\b[^>]*>/g)) {
      assert.match(match[0], /alt="[^"]+"/); assert.match(match[0], /width="\d+"/); assert.match(match[0], /height="\d+"/);
    }
    // Directory pages work directly; noncanonical forms redirect rather than duplicate.
    for (const alternative of path === '/' ? ['/index.html'] : [path.slice(0,-1), `${path}index.html`]) {
      const redirect = await fetch(base + alternative, { redirect: 'manual' });
      assert.equal(redirect.status, 301); assert.equal(redirect.headers.get('location'), path);
    }
    console.log(`PASS ${path}: HTTP, content, headings, metadata, redirects`);
  }
  const checked = new Set();
  for (const [path, html] of documents) {
    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const value = match[1].replaceAll('&amp;', '&');
      if (!value.startsWith('/') && !value.startsWith('#')) continue;
      const url = new URL(value, base + path);
      if (url.hash && url.hash !== '#admin') {
        const target = documents.get(url.pathname);
        assert.ok(target?.includes(`id="${url.hash.slice(1)}"`), `Anchor ${value} from ${path}`);
      }
      if (!checked.has(url.pathname)) {
        const response = await fetch(base + url.pathname);
        assert.equal(response.status, 200, `Internal reference ${value}`);
        checked.add(url.pathname);
      }
    }
  }
  const schema = JSON.parse(documents.get('/').match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(schema['@type'], 'Organization'); assert.equal(schema.url, origin + '/');
  assert.equal(schema.email, 'innoflowlink4202@gmail.com');
  assert.deepEqual(schema.sameAs, ['https://github.com/InnoFlowlink-Tech']);
  for (const unsupported of ['address', 'aggregateRating', 'review', 'award', 'legalName']) assert.ok(!(unsupported in schema));
  const sitemapResponse = await fetch(base + '/sitemap.xml'); assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  assert.deepEqual(urls, Object.keys(pages).map(p => origin + p));
  const robotsResponse = await fetch(base + '/robots.txt'); assert.equal(robotsResponse.status, 200);
  const robots = await robotsResponse.text();
  assert.match(robots, /Allow: \/\n/); assert.ok(!/Disallow: \/\s*\n/.test(robots));
  assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
  const missing = await fetch(base + '/does-not-exist/'); assert.equal(missing.status, 404);
  assert.match(await missing.text(), /noindex, follow/);
  assert.equal((await fetch(base + '/assets/missing.js')).status, 404);
  assert.equal((await fetch(base + '/', {method:'POST'})).status, 405);
  const assets = await readdir('dist/assets');
  assert.ok(assets.some(f => /^AdminDashboard-.*\.js$/.test(f)), 'Deferred admin bundle');
  const mainJs = await readFile('dist/assets/' + assets.find(f => /^index-.*\.js$/.test(f)), 'utf8');
  assert.ok(!mainJs.includes('Lead management'), 'Admin implementation excluded from initial bundle');
  assert.ok(mainJs.includes('generate_lead'));
  for (const path of ['/', '/contact/']) {
    const html = documents.get(path);
    for (const name of ['name','email','phone','projectType','budget','requirement']) assert.ok(html.includes(`name="${name}"`));
    assert.ok(html.includes('Need guidance on budget'));
  }
  console.log(`PASS ${checked.size} internal paths/assets, anchors, contact fields, JSON-LD, sitemap, robots, 404, method handling and deferred admin bundle.`);
} finally { await new Promise(resolve => server.close(resolve)); }
