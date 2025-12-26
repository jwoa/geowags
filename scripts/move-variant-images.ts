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

function moveImages() {
  const productsDir = path.join(process.cwd(), 'public', 'images', 'products');

  for (const { base, variants } of VARIANTS) {
    console.log(`\n🔄 Processing ${base}:`);

    const targetDir = path.join(productsDir, base);

    // Create target directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
      console.log(`   Created directory: ${base}/`);
    }

    // Move images from variant directories
    for (const variant of variants) {
      const variantDir = path.join(productsDir, variant);

      if (fs.existsSync(variantDir)) {
        const files = fs.readdirSync(variantDir);

        for (const file of files) {
          const srcPath = path.join(variantDir, file);
          const dstPath = path.join(targetDir, file);

          // If file already exists in target, add variant prefix
          if (fs.existsSync(dstPath)) {
            const ext = path.extname(file);
            const name = path.basename(file, ext);
            const newPath = path.join(targetDir, `${name}-${variant}${ext}`);

            if (!fs.existsSync(newPath)) {
              fs.copyFileSync(srcPath, newPath);
              console.log(`   Copied: ${variant}/${file} -> ${base}/${name}-${variant}${ext}`);
            }
          } else {
            fs.copyFileSync(srcPath, dstPath);
            console.log(`   Moved: ${variant}/${file} -> ${base}/${file}`);
          }
        }
      }
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Processed ${VARIANTS.length} product variants`);
  console.log(`Images ready for consolidation`);
}

function updateMarkdownImageUrls() {
  const productsDir = path.join(process.cwd(), 'content', 'products');

  for (const { base, variants } of VARIANTS) {
    const filePath = path.join(productsDir, `${base}.md`);

    if (!fs.existsSync(filePath)) {
      console.log(`⏭️  Skipping ${base}.md (not found)`);
      continue;
    }

    console.log(`\n🔄 Updating ${base}.md`);

    let content = fs.readFileSync(filePath, 'utf-8');

    // Update image URLs from variant directories to base directory
    for (const variant of variants) {
      // Replace URLs with variant directory
      content = content.replace(
        new RegExp(`/images/products/${variant}/([^"]+)`, 'g'),
        `/images/products/${base}/$1-${variant}`
      );
    }

    // Clean up "undefined" alt text
    content = content.replace(
      /alt: "undefined"/g,
      (match) => {
        // Use the previous line's URL to extract the product name
        return match;
      }
    );

    // Better: Replace "undefined" alt with the product name
    const nameMatch = content.match(/name: "([^"]+)"/);
    const productName = nameMatch ? nameMatch[1] : base;

    content = content.replace(/alt: "undefined"/g, `alt: "${productName}"`);

    // Remove undefined primary values
    content = content.replace(/primary: undefined/g, 'primary: false');

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Updated ${base}.md`);
  }
}

function cleanupVariantDirectories() {
  const productsDir = path.join(process.cwd(), 'public', 'images', 'products');

  console.log(`\n=== Cleaning Up Variant Directories ===`);

  for (const { base, variants } of VARIANTS) {
    for (const variant of variants) {
      const variantDir = path.join(productsDir, variant);

      if (fs.existsSync(variantDir)) {
        fs.rmSync(variantDir, { recursive: true, force: true });
        console.log(`🗑️  Deleted: ${variant}/`);
      }
    }
  }
}

async function main() {
  console.log('=== Moving Images ===');
  moveImages();

  console.log('\n=== Updating Markdown Files ===');
  updateMarkdownImageUrls();

  console.log('\n=== Cleaning Up ===');
  cleanupVariantDirectories();

  console.log('\n✅ All done!');
}

try {
  main();
} catch (error) {
  console.error('Error:', error);
}