#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';

const VARIANTS = [
  {
    base: 'crystal',
    variants: ['crystal-copper', 'crystal-gold', 'crystal-gun-metal']
  },
  {
    base: 'gila',
    variants: ['gila-brushed', 'gila-chrome']
  },
  {
    base: 'belaya',
    variants: ['belaya-brushed-inox']
  },
  {
    base: 'narmada',
    variants: ['narmada-brushed-inox', 'narmada-chrome']
  },
  {
    base: 'nova',
    variants: ['nova-brushed']
  },
  {
    base: 'pearl',
    variants: ['pearl-black', 'pearl-chrome']
  },
  {
    base: 'xinga',
    variants: ['xinga-brushed']
  },
  {
    base: 'yadkin',
    variants: ['yadkin-black', 'yadkin-chrome']
  },
  {
    base: 'yampa',
    variants: ['yampa-black', 'yampa-chrome']
  }
];

interface ProductFrontmatter {
  name: string;
  slug: string;
  category: string;
  subcategory?: string;
  brand?: string;
  collection?: string;
  featured: boolean;
  new: boolean;
  active: boolean;
  images: {
    url: string;
    alt: string;
    primary: boolean;
  }[];
  finishes?: string[];
}

function parseMarkdownFile(filepath: string): ProductFrontmatter | null {
  const content = fs.readFileSync(filepath, 'utf-8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const data: ProductFrontmatter = {
    name: '',
    slug: path.basename(filepath, '.md'),
    category: '',
    featured: false,
    new: false,
    active: true,
    images: [],
  };

  const lines = match[1].split('\n');
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line || line.startsWith('#')) {
      i++;
      continue;
    }

    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) {
      i++;
      continue;
    }

    const key = line.substring(0, colonIndex).trim();
    let value = line.substring(colonIndex + 1).trim();

    if (value === '' || value === '-') {
      i++;
      const array: any[] = [];
      while (i < lines.length) {
        const arrayLine = lines[i].trim();
        if (arrayLine.startsWith('- ')) {
          const nestedMatch = arrayLine.match(/^-\s+(.+?):\s*(.*)$/);
          if (nestedMatch) {
            const nestedKey = nestedMatch[1].trim();
            const nestedValue = nestedMatch[2].trim();
            const obj: any = {};
            obj[nestedKey] = parseYamlValue(nestedValue);
            i++;
            while (i < lines.length && lines[i].trim().startsWith('  ')) {
              const nestedLine = lines[i].trim().substring(2);
              const nMatch = nestedLine.match(/^(.+?):\s*(.*)$/);
              if (nMatch) {
                obj[nMatch[1].trim()] = parseYamlValue(nMatch[2].trim());
              }
              i++;
            }
            array.push(obj);
          } else {
            array.push(parseYamlValue(arrayLine.substring(2).trim()));
            i++;
          }
        } else if (arrayLine.startsWith(key + ':') || arrayLine === '') {
          break;
        } else {
          i++;
        }
      }
      (data as any)[key] = array;
      continue;
    }

    (data as any)[key] = parseYamlValue(value);
    i++;
  }

  return data;
}

function parseYamlValue(value: string): any {
  value = value.trim();
  if ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (/^\d+$/.test(value)) return parseInt(value, 10);
  if (/^\d+\.\d+$/.test(value)) return parseFloat(value);
  return value;
}

function generateMarkdown(data: ProductFrontmatter): string {
  const lines = [
    '---',
    `name: "${data.name}"`,
    `slug: "${data.slug}"`,
    `category: "${data.category}"`,
  ];

  if (data.subcategory) {
    lines.push(`subcategory: "${data.subcategory}"`);
  }
  if (data.brand) {
    lines.push(`brand: "${data.brand}"`);
  }
  if (data.collection) {
    lines.push(`collection: "${data.collection}"`);
  }

  lines.push(`featured: ${data.featured}`);
  lines.push(`new: ${data.new}`);
  lines.push(`active: ${data.active}`);

  if (data.images && data.images.length > 0) {
    lines.push('images:');
    data.images.forEach(img => {
      lines.push(`  - url: "${img.url}"`);
      lines.push(`    alt: "${img.alt}"`);
      lines.push(`    primary: ${img.primary}`);
    });
  }

  if (data.finishes && data.finishes.length > 0) {
    lines.push('finishes:');
    data.finishes.forEach(finish => {
      lines.push(`  - "${finish}"`);
    });
  }

  lines.push('---');
  lines.push('');
  lines.push('Premium ' + data.name + ' from Geowags. Contact us for specifications and pricing.');

  return lines.join('\n');
}

function processVariants() {
  const productsDir = path.join(process.cwd(), 'content', 'products');
  const imagesDir = path.join(process.cwd(), 'public', 'images', 'products');

  for (const { base, variants } of VARIANTS) {
    console.log(`\n🔄 Processing ${base}:`);
    variants.forEach(v => console.log(`   - ${v}`));

    // Create base image directory
    const baseImageDir = path.join(imagesDir, base);
    if (!fs.existsSync(baseImageDir)) {
      fs.mkdirSync(baseImageDir, { recursive: true });
    }

    // Collect all images and finishes
    const allImages: ProductFrontmatter['images'] = [];
    const imageUrls = new Set<string>();
    const finishes: string[] = [];

    // Check if base product exists
    const baseFile = path.join(productsDir, `${base}.md`);
    let baseData: ProductFrontmatter | null = null;

    if (fs.existsSync(baseFile)) {
      baseData = parseMarkdownFile(baseFile);
      if (baseData) {
        for (const img of baseData.images) {
          if (!imageUrls.has(img.url)) {
            imageUrls.add(img.url);
            allImages.push(img);
          }
        }

        // Copy base images if needed
        const baseImageDir2 = path.join(imagesDir, base);
        if (fs.existsSync(baseImageDir2)) {
          for (const img of baseData.images) {
            const imagePath = img.url.replace('/images/products/', '');
            const src = path.join(imagesDir, imagePath);
            const filename = path.basename(imagePath);
            const dst = path.join(baseImageDir, filename);

            if (fs.existsSync(src) && !fs.existsSync(dst)) {
              fs.copyFileSync(src, dst);
            }
          }
        }
      }
    }

    // Process each variant
    for (const variant of variants) {
      const variantFile = path.join(productsDir, `${variant}.md`);
      const variantImageDir = path.join(imagesDir, variant);

      if (!fs.existsSync(variantFile)) {
        console.log(`   ⚠️  ${variant}.md not found, skipping`);
        continue;
      }

      const variantData = parseMarkdownFile(variantFile);
      if (!variantData) continue;

      // Extract finish from name
      const finish = variantData.name
        .replace(new RegExp(`^${base}\\s+`, 'i'), '')
        .trim();

      if (!finishes.includes(finish)) {
        finishes.push(finish);
      }

      // Copy images
      if (fs.existsSync(variantImageDir)) {
        const files = fs.readdirSync(variantImageDir);
        for (const file of files) {
          const srcPath = path.join(variantImageDir, file);
          const dstPath = path.join(baseImageDir, file);

          if (!fs.existsSync(dstPath)) {
            fs.copyFileSync(srcPath, dstPath);
          }
        }
      }

      // Collect images
      for (const img of variantData.images) {
        const newUrl = img.url.replace(`/images/products/${variant}/`, `/images/products/${base}/`);
        if (!imageUrls.has(newUrl)) {
          imageUrls.add(newUrl);
          allImages.push({
            ...img,
            url: newUrl,
            alt: base.charAt(0).toUpperCase() + base.slice(1)
          });
        }
      }
    }

    // Create combined product file
    if (allImages.length > 0) {
      allImages.forEach((img: any, idx: number) => {
        img.primary = idx === 0;
      });

      const combinedData: ProductFrontmatter = {
        ...(baseData || {
          name: base.charAt(0).toUpperCase() + base.slice(1),
          slug: base,
          category: 'bathroom',
          featured: false,
          new: false,
          active: true,
        }),
        name: base.charAt(0).toUpperCase() + base.slice(1),
        slug: base,
        images: allImages,
        finishes,
      };

      const markdown = generateMarkdown(combinedData);
      fs.writeFileSync(baseFile, markdown, 'utf-8');
      console.log(`✅ Created ${base}.md`);

      // Delete variant files
      for (const variant of variants) {
        const variantFile = path.join(productsDir, `${variant}.md`);
        if (fs.existsSync(variantFile)) {
          fs.unlinkSync(variantFile);
          console.log(`🗑️  Deleted ${variant}.md`);
        }

        // Delete variant image directories
        const variantImageDir = path.join(imagesDir, variant);
        if (fs.existsSync(variantImageDir)) {
          fs.rmSync(variantImageDir, { recursive: true, force: true });
        }
      }
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Processed ${VARIANTS.length} product groups`);
}

try {
  processVariants();
  console.log('\n✅ All done!');
} catch (error) {
  console.error('Error:', error);
}