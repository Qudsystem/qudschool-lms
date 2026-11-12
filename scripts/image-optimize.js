/**
 * Usage:
 *  npm install sharp fast-glob
 *  node scripts/image-optimize.js --src ./public/assets/images --out ./public/assets/optimized
 */

const fg = require('fast-glob');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const argv = require('minimist')(process.argv.slice(2));
const src = argv.src || './public/assets/images';
const out = argv.out || './public/assets/optimized';

const sizes = [320, 480, 768, 1024, 1440]; // responsive widths
const formats = ['webp', 'avif'];

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const entries = await fg(['**/*.{jpg,jpeg,png}'], { cwd: src, absolute: true });

  for (const file of entries) {
    const rel = path.relative(src, file);
    const baseName = rel.replace(path.extname(rel), '');
    const outDir = path.join(out, path.dirname(rel));
    fs.mkdirSync(outDir, { recursive: true });

    for (const fmt of formats) {
      const versions = [];
      for (const w of sizes) {
        const outFile = path.join(outDir, `${baseName}-${w}.${fmt}`);
        try {
          await sharp(file)
            .resize({ width: w })
            .toFormat(fmt, fmt === 'webp' ? { quality: 80 } : { quality: 50 })
            .toFile(outFile);
          versions.push({ w, file: outFile });
        } catch (err) {
          console.error('opt failed', file, err);
        }
      }
      // also produce a "fallback" large version
      const fallback = path.join(outDir, `${baseName}-orig.${fmt}`);
      await sharp(file).toFormat(fmt, { quality: 80 }).toFile(fallback);
    }
    console.log('Optimized:', rel);
  }
  console.log('Done. Replace <img> src with the optimized assets and use srcset/sizes.');
})();
