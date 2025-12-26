#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';

function combineArals() {
  const productsDir = path.join(process.cwd(), 'content', 'products');

  const aralFile = path.join(productsDir, 'aral.md');
  const aral5File = path.join(productsDir, 'aral-5.md');

  const aralContent = fs.readFileSync(aralFile, 'utf-8');
  const aral5Content = fs.readFileSync(aral5File, 'utf-8');

  // Parse aral.md
  const aralMatch = aralContent.match(/^---\n([\s\S]*?)\n---/);
  const aral5Match = aral5Content.match(/^---\n([\s\S]*?)\n---/);

  if (!aralMatch || !aral5Match) {
    console.error('Could not parse frontmatter');
    return;
  }

  // Combine images - remove duplicates
  const aralImages = aralContent.match(/url: "([^"]+)"/g)?.map(m => m.match(/"([^"]+)"/)?.[1]) || [];
  const aral5Images = aral5Content.match(/url: "([^"]+)"/g)?.map(m => m.match(/"([^"]+)"/)?.[1]) || [];

  const allImages = [...new Set([...aralImages, ...aral5Images])];

  // Create combined file
  const combinedFrontmatter = `---
name: "Aral"
slug: "aral"
category: "bathroom"
featured: false
new: false
active: true
images:
${allImages.map((url, idx) => `  - url: "${url}"
    alt: "Aral"
    primary: ${idx === 0}`).join('\n')}
---

Premium Aral from Geowags. Contact us for specifications and pricing.
`;

  fs.writeFileSync(aralFile, combinedFrontmatter, 'utf-8');
  fs.unlinkSync(aral5File);

  console.log('✅ Combined aral.md and aral-5.md');
  console.log(`   - Combined ${allImages.length} unique images`);
  console.log('🗑️  Deleted aral-5.md');
}

try {
  combineArals();
} catch (error) {
  console.error('Error:', error);
}