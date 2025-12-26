#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';

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
  specifications?: Record<string, string>;
  colors?: {
    name: string;
    hex: string;
  }[];
  sizes?: {
    name: string;
    dimensions?: string;
  }[];
  finishes?: string[];
}

interface ProductFile {
  data: ProductFrontmatter;
  content: string;
  slug: string;
  filepath: string;
}

// Finish suffixes to identify variants
const FINISH_SUFFIXES = [
  'brushed', 'chrome', 'copper', 'gold', 'gun-metal',
  'brushed-nickel', 'brushed-inox', 'brass', 'black', 'white',
  'beige', 'gris', 'antracita', 'negro', 'cemento'
];

// Suffixes that might indicate numeric variants (like -2, -5, -6)
const NUMERIC_SUFFIXES = /^-?\d+$/;

// Regex to identify size variants (contains dimensions like 45x46, 50x60, 100x90, etc.)
const SIZE_REGEX = /\b(\d{2,3}x\d{2,3})\b/i;

function parseMarkdownFile(filepath: string): ProductFile | null {
  const content = fs.readFileSync(filepath, 'utf-8');
  const slug = path.basename(filepath, '.md');

  // Parse frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return null;

  try {
    const frontmatterStr = frontmatterMatch[1];
    const data: ProductFrontmatter = {
      name: '',
      slug,
      category: '',
      featured: false,
      new: false,
      active: true,
      images: [],
    };

    const lines = frontmatterStr.split('\n');
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

      // Handle arrays
      if (value === '' || value === '-') {
        i++;
        const array: any[] = [];
        while (i < lines.length) {
          const arrayLine = lines[i].trim();
          if (arrayLine.startsWith('- ')) {
            array.push(parseYamlValue(arrayLine.substring(2).trim()));
            i++;
          } else if (arrayLine.startsWith(key + ':') || arrayLine === '') {
            break;
          } else {
            i++;
          }
        }
        (data as any)[key] = array;
        continue;
      }

      // Handle simple values
      (data as any)[key] = parseYamlValue(value);
      i++;
    }

    const bodyContent = content.substring(frontmatterMatch[0].length).trim();

    return {
      data,
      content: bodyContent,
      slug,
      filepath,
    };
  } catch (error) {
    console.error(`Error parsing ${filepath}:`, error);
    return null;
  }
}

function parseYamlValue(value: string): any {
  value = value.trim();

  // Remove quotes
  if ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }

  // Boolean
  if (value === 'true') return true;
  if (value === 'false') return false;

  // Number
  if (/^\d+$/.test(value)) return parseInt(value, 10);
  if (/^\d+\.\d+$/.test(value)) return parseFloat(value);

  return value;
}

function generateMarkdown(data: ProductFrontmatter, content: string): string {
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

  // Images
  if (data.images && data.images.length > 0) {
    lines.push('images:');
    data.images.forEach(img => {
      lines.push(`  - url: "${img.url}"`);
      lines.push(`    alt: "${img.alt}"`);
      lines.push(`    primary: ${img.primary}`);
    });
  }

  // Colors
  if (data.colors && data.colors.length > 0) {
    lines.push('colors:');
    data.colors.forEach(color => {
      lines.push(`  - name: "${color.name}"`);
      lines.push(`    hex: "${color.hex}"`);
    });
  }

  // Sizes
  if (data.sizes && data.sizes.length > 0) {
    lines.push('sizes:');
    data.sizes.forEach(size => {
      lines.push(`  - name: "${size.name}"`);
      if (size.dimensions) {
        lines.push(`    dimensions: "${size.dimensions}"`);
      }
    });
  }

  // Finishes
  if (data.finishes && data.finishes.length > 0) {
    lines.push('finishes:');
    data.finishes.forEach(finish => {
      lines.push(`  - "${finish}"`);
    });
  }

  // Specifications
  if (data.specifications && Object.keys(data.specifications).length > 0) {
    lines.push('specifications:');
    Object.entries(data.specifications).forEach(([key, value]) => {
      lines.push(`  ${key}: "${value}"`);
    });
  }

  lines.push('---');
  lines.push('');
  lines.push(content);

  return lines.join('\n');
}

function getBaseName(slug: string): string {
  // Remove finish suffixes
  let base = slug;
  for (const suffix of FINISH_SUFFIXES) {
    const suffixWithDash = `-${suffix}`;
    if (base.endsWith(suffixWithDash)) {
      base = base.slice(0, -suffixWithDash.length);
      break;
    }
  }
  return base;
}

function extractFinishFromName(name: string): string | null {
  const lowerName = name.toLowerCase();

  // Check for finish phrases in the name
  for (const suffix of FINISH_SUFFIXES) {
    if (lowerName.includes(suffix)) {
      // Capitalize each word
      return suffix.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    }
  }

  return null;
}

function isSizeVariant(slug: string): boolean {
  return SIZE_REGEX.test(slug);
}

function isNumericVariant(slug: string): boolean {
  const parts = slug.split('-');
  const lastPart = parts[parts.length - 1];
  return NUMERIC_SUFFIXES.test(lastPart) && parts.length > 1;
}

async function combineVariants() {
  const productsDir = path.join(process.cwd(), 'content', 'products');
  const allFiles = fs.readdirSync(productsDir);
  const files = allFiles.filter(f => f.endsWith('.md'));

  console.log(`Found ${files.length} product files...`);

  // Parse all products
  const products: ProductFile[] = [];
  for (const file of files) {
    const filepath = path.join(productsDir, file);
    const product = parseMarkdownFile(filepath);
    if (product) {
      products.push(product);
    }
  }

  console.log(`Parsed ${products.length} valid products...\n`);

  // Group by base name (skip size and numeric variants)
  const groups: Record<string, ProductFile[]> = {};
  const sizeVariants: ProductFile[] = [];
  const numericVariants: ProductFile[] = [];

  for (const product of products) {
    if (isSizeVariant(product.slug)) {
      sizeVariants.push(product);
      continue;
    }

    if (isNumericVariant(product.slug)) {
      numericVariants.push(product);
      continue;
    }

    const baseName = getBaseName(product.slug);
    if (!groups[baseName]) {
      groups[baseName] = [];
    }
    groups[baseName].push(product);
  }

  console.log(`Found ${Object.keys(groups).length} product groups...`);
  console.log(`Found ${sizeVariants.length} size variants (keeping separate)...`);
  console.log(`Found ${numericVariants.length} numeric variants (keeping separate)...\n`);

  // Also check for groups with same base name but different suffixes (handle duplicates like aral.md and aral-5.md)
  const duplicateGroups: Record<string, ProductFile[]> = {};
  for (const product of numericVariants) {
    const baseName = product.slug.replace(/-\d+$/, '');
    if (!duplicateGroups[baseName]) {
      duplicateGroups[baseName] = [];
    }
    duplicateGroups[baseName].push(product);
  }

  // Add any standalone products that match a duplicate group base
  for (const product of products) {
    for (const baseName of Object.keys(duplicateGroups)) {
      if (product.slug === baseName) {
        duplicateGroups[baseName].push(product);
      }
    }
  }

  console.log(`Found ${Object.keys(duplicateGroups).length} duplicate/numeric groups...\n`);

  // Combine finish variants
  let combinedCount = 0;
  let deletedCount = 0;

  for (const [baseName, variants] of Object.entries(groups)) {
    if (variants.length <= 1) {
      console.log(`⏭️  Skipping single product: ${variants[0].slug}`);
      continue;
    }

    console.log(`\n🔄 Combining ${variants.length} variants of "${baseName}":`);
    variants.forEach(v => console.log(`   - ${v.slug}`));

    // Use the first variant as the base
    const mainProduct = { ...variants[0] };
    const mainProductFilepath = path.join(productsDir, `${baseName}.md`);

    // Extract generic name
    const genericName = mainProduct.data.name
      .replace(/\s+(Brushed|Chrome|Copper|Gold|Gun\s*Metal|Brushed\s*Nickel|Brushed\s*Inox|Brass|Black|White|Beige|Gris|Antracita|Negro|Cemento)$/i, '')
      .trim();

    mainProduct.data.name = genericName;
    mainProduct.data.slug = baseName;
    mainProduct.filepath = mainProductFilepath;

    // Combine finishes
    const finishes: string[] = [];
    const allImages = [...mainProduct.data.images];

    for (let i = 1; i < variants.length; i++) {
      const variant = variants[i];
      const finish = extractFinishFromName(variant.data.name) ||
                     extractFinishFromName(variant.slug) ||
                     `Variant ${i}`;

      // Add to finishes
      if (!finishes.includes(finish)) {
        finishes.push(finish);
      }

      // Add variant images
      allImages.push(...variant.data.images);
    }

    // Add main product's finish
    const mainFinish = extractFinishFromName(mainProduct.data.name) ||
                      extractFinishFromName(variants[0].slug) ||
                      'Standard';
    if (!finishes.includes(mainFinish)) {
      finishes.unshift(mainFinish);
    }

    // Update main product
    mainProduct.data.finishes = finishes;
    mainProduct.data.images = allImages;

    // Mark all images except first as non-primary
    mainProduct.data.images.forEach((img, idx) => {
      img.primary = idx === 0;
    });

    // Write combined product
    const markdown = generateMarkdown(mainProduct.data, mainProduct.content);
    fs.writeFileSync(mainProductFilepath, markdown, 'utf-8');
    console.log(`✅ Created combined product: ${baseName}.md`);

    // Delete variant files
    for (const variant of variants) {
      if (variant.slug !== baseName && variant.slug !== variants[0].slug) {
        const variantFilepath = path.join(productsDir, `${variant.slug}.md`);
        if (fs.existsSync(variantFilepath)) {
          fs.unlinkSync(variantFilepath);
          console.log(`🗑️  Deleted variant: ${variant.slug}.md`);
          deletedCount++;
        }
      } else if (variant.slug === variants[0].slug && variant.slug !== baseName) {
        // Delete original main file if slug changed
        if (fs.existsSync(variant.filepath)) {
          fs.unlinkSync(variant.filepath);
          console.log(`🗑️  Deleted original: ${variant.slug}.md`);
          deletedCount++;
        }
      }
    }

    combinedCount++;
  }

  // Combine numeric/duplicate variants
  console.log(`\n=== Processing Numeric/Duplicate Variants ===`);
  for (const [baseName, variants] of Object.entries(duplicateGroups)) {
    if (variants.length <= 1) {
      console.log(`⏭️  Skipping single variant: ${baseName}`);
      continue;
    }

    console.log(`\n🔄 Combining ${variants.length} numeric variants of "${baseName}":`);
    variants.forEach(v => console.log(`   - ${v.slug}`));

    // Use the first variant or one without numeric suffix as the base
    const baseVariant = variants.find(v => v.slug === baseName) || variants[0];
    const mainProduct = { ...baseVariant };
    const mainProductFilepath = path.join(productsDir, `${baseName}.md`);

    mainProduct.data.slug = baseName;
    mainProduct.filepath = mainProductFilepath;

    // Combine all images
    const allImages: typeof mainProduct.data.images = [];
    const imageUrls = new Set<string>();

    for (const variant of variants) {
      for (const img of variant.data.images) {
        if (!imageUrls.has(img.url)) {
          imageUrls.add(img.url);
          allImages.push(img);
        }
      }
    }

    mainProduct.data.images = allImages;

    // Mark all images except first as non-primary
    mainProduct.data.images.forEach((img, idx) => {
      img.primary = idx === 0;
    });

    // Write combined product
    const markdown = generateMarkdown(mainProduct.data, mainProduct.content);
    fs.writeFileSync(mainProductFilepath, markdown, 'utf-8');
    console.log(`✅ Created combined product: ${baseName}.md`);

    // Delete variant files
    for (const variant of variants) {
      if (variant.slug !== baseName) {
        const variantFilepath = path.join(productsDir, `${variant.slug}.md`);
        if (fs.existsSync(variantFilepath)) {
          fs.unlinkSync(variantFilepath);
          console.log(`🗑️  Deleted variant: ${variant.slug}.md`);
          deletedCount++;
        }
      }
    }

    combinedCount++;
  }

  console.log(`\n=== Summary ===`);
  console.log(`Combined ${combinedCount} product groups`);
  console.log(`Deleted ${deletedCount} variant files`);
  console.log(`Kept ${sizeVariants.length} size variants separate`);
}

// Run the script
combineVariants().catch(console.error);