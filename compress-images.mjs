/**
 * Run this script to compress your large PNG images to WebP:
 *   node compress-images.mjs
 * 
 * Requires: npm install sharp (one-time)
 */
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function compress() {
  const publicDir = path.join(__dirname, 'public');

  // Compress Pratya.png (7.6MB) → Pratya.webp (profile photo, square crop is fine)
  await sharp(path.join(publicDir, 'Pratya.png'))
    .resize(600, 600, { fit: 'cover' })
    .webp({ quality: 80 })
    .toFile(path.join(publicDir, 'Pratya.webp'));
  console.log('✅ Pratya.png → Pratya.webp (compressed)');

  // Compress Pratya2.png (profile photo, square crop is fine)
  await sharp(path.join(publicDir, 'Pratya2.png'))
    .resize(600, 600, { fit: 'cover' })
    .webp({ quality: 80 })
    .toFile(path.join(publicDir, 'Pratya2.webp'));
  console.log('✅ Pratya2.png → Pratya2.webp (compressed)');

  // Compress project thumbnails — NO CROPPING, just resize to fit within max width
  const thumbs = ['callme.png', 'owlops.png', 'pokedetail.png', 'quickfavi.png'];
  for (const thumb of thumbs) {
    const input = path.join(publicDir, thumb);
    const output = path.join(publicDir, thumb.replace('.png', '.webp'));
    await sharp(input)
      .resize({ width: 800, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(output);
    console.log(`✅ ${thumb} → ${thumb.replace('.png', '.webp')} (compressed, no crop)`);
  }

  console.log('\n🎉 All images compressed!');
}

compress().catch(console.error);
