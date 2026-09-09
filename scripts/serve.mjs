// Optional standalone frontend server for a Render Node Web Service.
// The existing Express API remains a separate service;
// VITE_API_URL is build-time configuration.

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, extname, sep } from 'node:path';
import { pages } from '../src/pages.js';

const root = resolve(
  fileURLToPath(new URL('../dist/', import.meta.url))
);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

export const server = createServer(async (req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    res.end();
    return;
  }

  let path;

  try {
    path = decodeURIComponent(
      new URL(req.url, 'http://local.invalid').pathname
    );
  } catch {
    res.writeHead(400);
    res.end('Bad request');
    return;
  }

  const canonical =
    path === '/index.html'
      ? '/'
      : path.endsWith('/index.html')
        ? path.slice(0, -10)
        : `${path.replace(/\/+$/, '')}/`;

  if (pages[canonical] && path !== canonical) {
    const search = new URL(
      req.url,
      'http://local.invalid'
    ).search;

    res.writeHead(301, {
      Location: canonical + search,
    });

    res.end();
    return;
  }

  const publicPath = pages[path]
    ? `${path}index.html`
    : path;

  const file = resolve(root, `.${publicPath}`);

  const safe =
    file.startsWith(root + sep) &&
    !path.includes('\\') &&
    !path
      .split('/')
      .some((part) => part.startsWith('.'));

  let body;
  let status = 200;
  let extension = extname(file);

  try {
    if (!safe) {
      throw new Error('Invalid path');
    }

    body = await readFile(file);
  } catch {
    status = 404;
    extension = '.html';
    body = await readFile(resolve(root, '404.html'));
  }

  res.writeHead(status, {
    'Content-Type':
      types[extension] || 'application/octet-stream',

    'X-Content-Type-Options': 'nosniff',

    'Cache-Control':
      status === 200 && path.startsWith('/assets/')
        ? 'public, max-age=31536000, immutable'
        : 'no-cache',

    ...(status === 404
      ? { 'X-Robots-Tag': 'noindex' }
      : {}),
  });

  res.end(req.method === 'HEAD' ? undefined : body);
});

if (
  process.argv[1] === fileURLToPath(import.meta.url)
) {
  server.listen(
    process.env.PORT || 4173,
    '0.0.0.0',
    () => console.log('Frontend server ready')
  );
}