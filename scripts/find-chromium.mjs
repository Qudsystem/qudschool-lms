/**
 * find-chromium.mjs — Locate a usable Chromium/Chrome binary across platforms.
 * Search order:
 *   1. CHROMIUM_PATH / PUPPETEER_EXECUTABLE_PATH env var
 *   2. playwright-core's bundled registry (if installed via `npx playwright install`)
 *   3. ms-playwright cache under LOCALAPPDATA (Windows) / ~/Library/Caches (macOS) / ~/.cache (Linux)
 *   4. System Chrome / Edge
 */
import { existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { homedir, platform } from 'os';

function tryPaths(candidates) {
  for (const p of candidates) {
    if (p && existsSync(p)) return p;
  }
  return null;
}

function findInPlaywrightCache() {
  const os = platform();
  const roots = [];
  if (os === 'win32') {
    const local = process.env.LOCALAPPDATA;
    if (local) roots.push(join(local, 'ms-playwright'));
  } else if (os === 'darwin') {
    roots.push(join(homedir(), 'Library', 'Caches', 'ms-playwright'));
  } else {
    roots.push(join(homedir(), '.cache', 'ms-playwright'));
  }

  for (const root of roots) {
    if (!existsSync(root)) continue;
    let entries = [];
    try { entries = readdirSync(root); } catch { continue; }

    // Prefer newest chromium-* folder
    const chromiumDirs = entries
      .filter((n) => /^chromium-\d+$/.test(n))
      .sort()
      .reverse();

    for (const dir of chromiumDirs) {
      const base = join(root, dir);
      const candidates = os === 'win32'
        ? [join(base, 'chrome-win', 'chrome.exe'), join(base, 'chrome-win64', 'chrome.exe')]
        : os === 'darwin'
        ? [join(base, 'chrome-mac', 'Chromium.app', 'Contents', 'MacOS', 'Chromium')]
        : [join(base, 'chrome-linux', 'chrome'), join(base, 'chrome-linux64', 'chrome')];
      const found = tryPaths(candidates);
      if (found) return found;
    }

    // Fallback: headless shell
    const shellDirs = entries
      .filter((n) => /^chromium_headless_shell-\d+$/.test(n))
      .sort()
      .reverse();
    for (const dir of shellDirs) {
      const base = join(root, dir);
      const candidates = os === 'win32'
        ? [join(base, 'chrome-win', 'headless_shell.exe'), join(base, 'chrome-headless-shell-win64', 'chrome-headless-shell.exe')]
        : os === 'darwin'
        ? [join(base, 'chrome-mac', 'headless_shell')]
        : [join(base, 'chrome-linux', 'headless_shell'), join(base, 'chrome-headless-shell-linux64', 'chrome-headless-shell')];
      const found = tryPaths(candidates);
      if (found) return found;
    }
  }
  return null;
}

export function findChromium() {
  // 1. Explicit env var
  const envPath = process.env.CHROMIUM_PATH || process.env.PUPPETEER_EXECUTABLE_PATH;
  if (envPath && existsSync(envPath)) return envPath;

  // 2. playwright-core registry (ESM dynamic import; skipped if unavailable)
  // Note: playwright-core.executablePath() only works after `npx playwright install`.
  // We rely primarily on the ms-playwright cache scan below.

  // 3. ms-playwright cache
  const cached = findInPlaywrightCache();
  if (cached) return cached;

  // 4. System Chrome / Edge fallback
  const os = platform();
  const systemCandidates = os === 'win32'
    ? [
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
        'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
      ]
    : os === 'darwin'
    ? [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/Applications/Chromium.app/Contents/MacOS/Chromium',
      ]
    : ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'];

  return tryPaths(systemCandidates);
}

// CLI mode: print path
if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, '/')}` || process.argv[1]?.endsWith('find-chromium.mjs')) {
  const p = findChromium();
  console.log(p || 'NOT FOUND');
}
