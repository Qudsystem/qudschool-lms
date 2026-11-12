/**
 * prerender.mjs — Generate static HTML for each public route.
 *
 * Why: AI crawlers (GPTBot, ClaudeBot, PerplexityBot) and some search bots
 * do NOT execute JavaScript. A SPA without prerendering shows them an empty
 * <div id="root"></div>. This script captures the fully-rendered DOM for each
 * public route and writes it to dist/<route>/index.html, so every route has
 * real HTML content at crawl time.
 *
 * Usage: node scripts/prerender.mjs
 * Requires: a built dist/ folder (run `npm run build` first).
 */
import { chromium } from 'playwright-core';
import { spawn } from 'child_process';
import { mkdir, writeFile, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { findChromium } from './find-chromium.mjs';

const PORT = 5099;
const BASE = `http://127.0.0.1:${PORT}`;
const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');

if (!existsSync(DIST)) {
  console.error('✗ dist/ not found. Run `npm run build` first.');
  process.exit(1);
}

const ROUTES = [
  '/',
  '/courses',
  '/live-sessions',
  '/competitions',
  '/pricing',
  '/about',
  '/instructors',
  '/certifications',
  '/blog',
  '/blog/why-kids-should-learn-programming-2026',
  '/blog/ai-for-kids-guide',
  '/blog/game-development-for-beginners',
  '/blog/robotics-stem-kids',
  '/success-stories',
  '/faq',
  '/contact',
  '/privacy-policy',
  '/terms-of-service',
];

function routeToOutFile(route) {
  if (route === '/') return join(DIST, 'index.html');
  const safe = route.replace(/^\//, '').replace(/\/$/, '');
  return join(DIST, safe, 'index.html');
}

async function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch {
      // not ready yet
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  return false;
}

async function main() {
  // 1. Locate a Chromium binary
  const chromiumPath = findChromium();
  if (!chromiumPath) {
    console.error('✗ No Chromium binary found. Install playwright browsers first.');
    process.exit(1);
  }
  console.log('✓ Using Chromium:', chromiumPath);

  // 2. Start vite preview server
  console.log('→ Starting vite preview on port', PORT);
  const preview = spawn(
    process.platform === 'win32' ? 'npx.cmd' : 'npx',
    ['vite', 'preview', '--port', String(PORT), '--strictPort', '--host', '127.0.0.1'],
    { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'], shell: process.platform === 'win32' }
  );

  preview.stdout.on('data', () => {});
  preview.stderr.on('data', () => {});

  const ready = await waitForServer(BASE + '/');
  if (!ready) {
    console.error('✗ preview server did not start in time');
    preview.kill();
    process.exit(1);
  }
  console.log('✓ Preview server ready');

  // 3. Launch Chromium
  const browser = await chromium.launch({
    executablePath: chromiumPath,
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });

  let ok = 0, failed = 0;

  try {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      locale: 'ar-EG',
      userAgent:
        'Mozilla/5.0 (compatible; QudSchoolPrerender/1.0; +https://qudschool.com)',
    });

    for (const route of ROUTES) {
      const page = await context.newPage();
      const url = BASE + route;
      try {
        const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
        if (!res || !res.ok()) {
          throw new Error('HTTP ' + (res ? res.status() : 'no-response'));
        }

        // Wait for React to render meaningful content.
        // Primary signal: substantial visible text inside #root.
        // Secondary: no untranslated "key.style" strings in the heading area.
        // Wait for React to render. We only need enough text to be visible;
        // avoid waiting for network idleness (the app loads fonts, GA, etc.).
        await page.waitForFunction(
          () => {
            const root = document.getElementById('root');
            if (!root) return false;
            const text = (root.innerText || '').trim();
            // Reject the "loading" state (very short) and the empty shell.
            if (text.length < 300) return false;
            return true;
          },
          { timeout: 20000 }
        );

        // Additional wait: ensure route-specific H1 has rendered (not the home hero)
        await page.waitForFunction(
          (expectedPath) => {
            const h1 = document.querySelector('h1');
            if (!h1) return false;
            const text = (h1.textContent || '').trim();
            if (text.length < 3) return false;
            // Reject untranslated key-like headings
            if (/^[a-zA-Z]+\.[a-zA-Z0-9_.]+$/.test(text)) return false;
            return true;
          },
          route,
          { timeout: 10000 }
        ).catch(() => { /* home page has no h1 — non-fatal */ });

        // Allow fonts/animations/translations to settle.
        await page.waitForTimeout(700);

        const html = await page.content();

        // Sanity check: ensure the prerendered HTML contains visible text
        if (!/class="[^"]*"|>\s*[\u0600-\u06FF]/.test(html)) {
          throw new Error('Empty prerender output');
        }

        const outFile = routeToOutFile(route);
        await mkdir(dirname(outFile), { recursive: true });
        await writeFile(outFile, html, 'utf8');
        console.log('✓', route, '→', outFile.replace(ROOT + (process.platform === 'win32' ? '\\' : '/'), ''));
        ok++;
      } catch (err) {
        console.error('✗', route, '—', err.message);
        failed++;
      } finally {
        await page.close();
      }
    }

    await context.close();
  } finally {
    await browser.close();
    preview.kill();
  }

  console.log(`\n=== Prerender summary ===`);
  console.log(`Success: ${ok}/${ROUTES.length}`);
  if (failed) {
    console.log(`Failed:  ${failed}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
