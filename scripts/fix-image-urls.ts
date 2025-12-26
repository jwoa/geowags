#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';

const VARIANTS = [
  {
    base: 'cedar',
    variants: ['cedar-black', 'cedar-chrome']
  },
  {
    base: 'cano',
    variants: ['cano-copper', 'cano-gold', 'cano-gun-metal']
  },
  {
    base: 'ibiza',
    variants: ['ibiza-2', 'ibiza-6']
  },
  {
    base: 'aral',
    variants: ['aral-5']
  }
];

function getActualImages(base: string) {
  const imagesDir = path.join(process.cwd(), 'public', 'images', 'products', base);
  if (!fs.existsSync(imagesDir)) {
    return [];
  }

  const files = fs.readdirSync(imagesDir);
  return files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
}

function updateMarkdownUrls() {
  const productsDir = path.join(process.cwd(), 'content', 'products');

  for (const { base, variants } of VARIANTS) {
    const filePath = path.join(productsDir, `${base}.md`);

    if (!fs.existsSync(filePath)) {
      console.log(`⏭️  Skipping ${base}.md (not found)`);
      continue;
    }

    console.log(`\n🔄 Updating ${base}.md`);

    let content = fs.readFileSync(filePath, 'utf-8');

    // Get actual images in the base directory
    const actualImages = getActualImages(base);
    console.log(`   Found ${actualImages.length} images in ${base}/`);

    // Extract current image URLs from the markdown
    const urlMatches = content.match(/url: "([^"]+)"/g);
    if (!urlMatches) {
      console.log(`   No images found in markdown`);
      continue;
    }

    const currentUrls = urlMatches.map(m => m.match(/"([^"]+)"/)![1]);

    // Generate new images section with actual files
    let newImagesSection = 'images:\n';
    actualImages.forEach((img, idx) => {
      newImagesSection += `  - url: "/images/products/${base}/${img}"\n`;
      newImagesSection += `    alt: "${base.charAt(0).toUpperCase() + base.slice(1)}"\n`;
      newImagesSection += `    primary: ${idx === 0}\n`;
    });

    // Replace images section
    const imagesStart = content.indexOf('images:');
    const finishesStart = content.indexOf('finishes:') !== -1 ? content.indexOf('finishes:') : -1;
    const endMarker = finishesStart !== -1 ? finishesStart : content.indexOf('\n---\n');

    if (imagesStart !== -1 && endMarker !== -1) {
      content = content.substring(0, imagesStart) + newImagesSection + '  ' + content.substring(endMarker);
    }

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Updated ${base}.md`);
  }
}

function removeDuplicateImages() {
  const imagesDir = path.join(process.cwd(), 'public', 'images', 'products');

  for (const { base, variants } of VARIANTS) {
    const baseDir = path.join(imagesDir, base);

    if (!fs.existsSync(baseDir)) {
      continue;
    }

    const files = fs.readdirSync(baseDir);

    // Find and remove duplicate images (those with variant suffixes)
    for (const file of files) {
      for (const variant of variants) {
        if (file.includes(`-${variant}`)) {
          const filePath = path.join(baseDir, file);
          const baseFile = file.replace(`-${variant}`, '');

          // If base file exists and duplicate exists, remove duplicate
          if (files.includes(baseFile)) {
            fs.unlinkSync(filePath);
            console.log(`🗑️  Removed duplicate: ${base}/${file}`);
          }
        }
      }
    }
  }
}

async function main() {
  console.log('=== Removing Duplicate Images ===');
  removeDuplicateImages();

  console.log('\n=== Updating Markdown Files ===');
  updateMarkdownUrls();

  console.log('\n✅ All done!');
}

try {
  main();
} catch (error) {
  console.error('Error:', error);
}