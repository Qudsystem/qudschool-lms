// sync-locales.mjs — copy locales/*.json → public/locales/*.json
// Must run BEFORE vite build so Vite serves them into dist/locales/.
import { copyFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';

await mkdir('public/locales', { recursive: true });

const files = ['ar.json', 'en.json'];
for (const f of files) {
  const src = 'locales/' + f;
  if (!existsSync(src)) {
    console.error('✗ missing:', src);
    process.exit(1);
  }
  await copyFile(src, 'public/locales/' + f);
  console.log('✓ synced', src, '→ public/locales/' + f);
}
