// compress-images.mjs — in-place compression, same filenames, no code changes.
// Usage: node scripts/compress-images.mjs
import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';

const ROOT = 'public/assets';
const RASTER = new Set(['.png', '.jpg', '.jpeg']);

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...await walk(p));
    else if (RASTER.has(extname(e.name).toLowerCase())) out.push(p);
  }
  return out;
}

function fmtBytes(n) { return (n / 1024).toFixed(0) + ' KB'; }

const files = await walk(ROOT);
let totalBefore = 0, totalAfter = 0, changed = 0;

for (const file of files) {
  const before = (await stat(file)).size;
  const ext = extname(file).toLowerCase();
  const tmp = file + '.tmp' + ext;
  try {
    const img = sharp(file, { failOn: 'none' });
    const meta = await img.metadata();

    // Skip tiny images (< 40KB) — already fine
    if (before < 40 * 1024) continue;

    // Cap max width at 1920 (Retina-friendly)
    const needsResize = meta.width && meta.width > 1920;
    let pipeline = sharp(file, { failOn: 'none' });
    if (needsResize) pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true });

    if (ext === '.png') {
      pipeline = pipeline.png({ quality: 82, compressionLevel: 9, palette: true, effort: 10 });
    } else {
      pipeline = pipeline.jpeg({ quality: 82, mozjpeg: true, progressive: true });
    }

    await pipeline.toFile(tmp);
    const after = (await stat(tmp)).size;

    if (after < before * 0.9) {
      await rename(tmp, file);
      totalBefore += before;
      totalAfter += after;
      changed++;
      console.log(`✓ ${basename(file)}  ${fmtBytes(before)} → ${fmtBytes(after)}  (-${Math.round((1 - after / before) * 100)}%)`);
    } else {
      await unlink(tmp);
    }
  } catch (err) {
    console.error('✗', file, err.message);
    try { await unlink(tmp); } catch {}
  }
}

console.log(`\n=== Done ===`);
console.log(`Files compressed: ${changed} / ${files.length}`);
console.log(`Total: ${fmtBytes(totalBefore)} → ${fmtBytes(totalAfter)}  (-${totalBefore ? Math.round((1 - totalAfter / totalBefore) * 100) : 0}%)`);
