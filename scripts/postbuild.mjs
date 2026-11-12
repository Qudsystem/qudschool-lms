// postbuild.mjs — GitHub Pages SPA fallback + prerender hints.
// GitHub Pages doesn't support SPA rewrites natively; a 404.html that boots the
// same app is the official workaround. We also copy index.html to .nojekyll so
// paths with underscores work.
import { copyFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const DIST = 'dist';

await mkdir(DIST, { recursive: true });

// SPA fallback for GitHub Pages
await copyFile(join(DIST, 'index.html'), join(DIST, '404.html'));
console.log('✓ dist/404.html (SPA fallback)');

// Disable Jekyll so files/folders starting with "_" are served
await writeFile(join(DIST, '.nojekyll'), '');
console.log('✓ dist/.nojekyll');

// robots.txt SPA-friendly CNAME? no — custom domain not configured yet.
console.log('✓ postbuild done');
