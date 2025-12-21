/**
 * WordPress Listing Page Product Migration Script
 * 
 * Extracts products from category listing pages
 * 
 * Usage: npx tsx scripts/migrate-from-listings.ts
 */

import * as fs from 'fs';
import * as path from 'path';

// Paths
const WP_CACHE_DIR = path.join(process.cwd(), 'geowags-archive/wp-content/endurance-page-cache');
const WP_UPLOADS_DIR = path.join(process.cwd(), 'geowags-archive/wp-content/uploads');
const OUTPUT_PRODUCTS_DIR = path.join(process.cwd(), 'content/products');
const OUTPUT_IMAGES_DIR = path.join(process.cwd(), 'public/images/products');

// Category mappings
const CATEGORY_MAP: Record<string, { category: string; subcategory?: string }> = {
  'bath-shop': { category: 'bathroom' },
  'bath-tub': { category: 'bathroom', subcategory: 'bath-tub' },
  'wcs': { category: 'bathroom', subcategory: 'wcs' },
  'wash-basins': { category: 'bathroom', subcategory: 'wash-basins' },
  'shower-enclosures': { category: 'bathroom', subcategory: 'shower-enclosures' },
  'shower-tray': { category: 'bathroom', subcategory: 'shower-tray' },
  'faucets': { category: 'bathroom', subcategory: 'faucets' },
  'bathroom-furnitures': { category: 'bathroom', subcategory: 'bathroom-furnitures' },
  'water-heaters': { category: 'bathroom', subcategory: 'water-heaters' },
  'kitchen': { category: 'kitchen' },
  'stainless-steel-sinks': { category: 'kitchen', subcategory: 'stainless-steel-sinks' },
  'granite-quartz-sinks': { category: 'kitchen', subcategory: 'granite-quartz-sinks' },
  'sink-faucets': { category: 'kitchen', subcategory: 'sink-faucets' },
  'food-waste-disposal': { category: 'kitchen', subcategory: 'food-waste-disposal' },
  'tile-shop': { category: 'tiles' },
  'floor-tiles': { category: 'tiles', subcategory: 'floor-tiles' },
  'wall-tiles': { category: 'tiles', subcategory: 'wall-tiles' },
  'special-tiles': { category: 'tiles', subcategory: 'special-tiles' },
  'mosaics': { category: 'tiles', subcategory: 'mosaics' },
  'monto-paint-shop': { category: 'paints' },
  'speciality': { category: 'paints', subcategory: 'speciality' },
  'floor-paints': { category: 'paints', subcategory: 'floor-paints' },
  'doors': { category: 'doors' },
  'security-doors': { category: 'doors', subcategory: 'security-doors' },
  'kitchen-doors': { category: 'doors', subcategory: 'kitchen-doors' },
};

const BRAND_SLUGS = ['gala', 'vado', 'grespania', 'grespania-ceramica', 'reginox', 'carysil', 'wesen', 'banos10', 'bella-casa', 'pestan', 'gural', 'gural-armatur'];

function normalizeBrand(slug: string): string | undefined {
  if (slug === 'grespania-ceramica') return 'grespania';
  if (slug === 'gural-armatur') return 'gural';
  if (BRAND_SLUGS.includes(slug)) return slug;
  return undefined;
}

interface ProductData {
  name: string;
  slug: string;
  category: string;
  subcategory?: string;
  brand?: string;
  imageUrl: string;
  imagePath: string;
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&#215;/g, 'x')
    .replace(/&#8211;/g, '-')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function extractProductsFromListingHtml(html: string): ProductData[] {
  const products: ProductData[] = [];
  
  // Match each product list item
  const productRegex = /<li[^>]*class="[^"]*product[^"]*product_cat-([^"]+)"[^>]*>[\s\S]*?<a[^>]*href="https:\/\/geowags\.com\/product\/([^/"]+)\/"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"[^>]*>[\s\S]*?<h4[^>]*><a[^>]*>([^<]+)<\/a><\/h4>/g;
  
  let match;
  while ((match = productRegex.exec(html)) !== null) {
    const categoryClasses = match[1].split(' product_cat-');
    const slug = match[2];
    const imageUrl = match[3];
    const name = decodeHtmlEntities(match[4].trim());
    
    // Parse categories
    let category = 'bathroom';
    let subcategory: string | undefined;
    let brand: string | undefined;
    
    for (const catSlug of categoryClasses) {
      const normalized = normalizeBrand(catSlug);
      if (normalized) {
        brand = normalized;
        continue;
      }
      const mapping = CATEGORY_MAP[catSlug];
      if (mapping) {
        category = mapping.category;
        if (mapping.subcategory) {
          subcategory = mapping.subcategory;
        }
      }
    }
    
    // Get original image path (without size suffix)
    const imagePath = imageUrl.replace(/-\d+x\d+(\.\w+)$/, '$1');
    
    products.push({
      name,
      slug,
      category,
      subcategory,
      brand,
      imageUrl,
      imagePath
    });
  }
  
  return products;
}

function copyImage(wpUrl: string, destPath: string): boolean {
  try {
    const urlPath = wpUrl.replace('https://geowags.com/wp-content/uploads/', '').replace(/-\d+x\d+(\.\w+)$/, '$1');
    const sourcePath = path.join(WP_UPLOADS_DIR, urlPath);
    
    if (!fs.existsSync(sourcePath)) {
      // Try with size suffix
      const urlPathWithSize = wpUrl.replace('https://geowags.com/wp-content/uploads/', '');
      const sourcePathWithSize = path.join(WP_UPLOADS_DIR, urlPathWithSize);
      if (fs.existsSync(sourcePathWithSize)) {
        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        fs.copyFileSync(sourcePathWithSize, destPath);
        return true;
      }
      return false;
    }
    
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.copyFileSync(sourcePath, destPath);
    return true;
  } catch (error) {
    return false;
  }
}

function generateMarkdown(product: ProductData, localImagePath: string): string {
  return `---
name: "${product.name.replace(/"/g, '\\"')}"
slug: "${product.slug}"
category: "${product.category}"
${product.subcategory ? `subcategory: "${product.subcategory}"\n` : ''}${product.brand ? `brand: "${product.brand}"\n` : ''}featured: false
new: false
active: true
images:
  - url: "${localImagePath}"
    alt: "${product.name.replace(/"/g, '\\"')}"
    primary: true
---

Premium ${product.name} from ${product.brand ? product.brand.charAt(0).toUpperCase() + product.brand.slice(1) : 'Geowags'}. Contact us for specifications and pricing.
`;
}

async function migrate() {
  console.log('Starting listing page migration...\n');
  
  const existingProducts = new Set<string>();
  
  // Load existing products
  if (fs.existsSync(OUTPUT_PRODUCTS_DIR)) {
    for (const file of fs.readdirSync(OUTPUT_PRODUCTS_DIR)) {
      if (file.endsWith('.md')) {
        existingProducts.add(file.replace('.md', ''));
      }
    }
  }
  
  console.log(`Found ${existingProducts.size} existing products\n`);
  
  // Find all category listing pages
  const categoryDir = path.join(WP_CACHE_DIR, 'product-category');
  const allProducts: ProductData[] = [];
  
  function scanDir(dir: string) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDir(fullPath);
      } else if (file === '_index.html') {
        console.log(`Scanning: ${dir.replace(WP_CACHE_DIR, '')}`);
        const html = fs.readFileSync(fullPath, 'utf-8');
        const products = extractProductsFromListingHtml(html);
        allProducts.push(...products);
      }
    }
  }
  
  scanDir(categoryDir);
  
  // Deduplicate products
  const uniqueProducts = new Map<string, ProductData>();
  for (const product of allProducts) {
    if (!uniqueProducts.has(product.slug)) {
      uniqueProducts.set(product.slug, product);
    }
  }
  
  console.log(`\nFound ${uniqueProducts.size} unique products from listings\n`);
  
  let created = 0;
  let skipped = 0;
  let imagesCopied = 0;
  let imagesFailed = 0;
  
  for (const [slug, product] of uniqueProducts) {
    if (existingProducts.has(slug)) {
      skipped++;
      continue;
    }
    
    // Copy image
    const imageFilename = path.basename(product.imagePath);
    const localImagePath = `/images/products/${slug}/${imageFilename}`;
    const destImagePath = path.join(process.cwd(), 'public', localImagePath);
    
    if (copyImage(product.imagePath, destImagePath)) {
      imagesCopied++;
    } else {
      imagesFailed++;
    }
    
    // Generate markdown
    const markdown = generateMarkdown(product, imagesCopied > 0 ? localImagePath : '/images/placeholder-product.jpg');
    const mdPath = path.join(OUTPUT_PRODUCTS_DIR, `${slug}.md`);
    fs.writeFileSync(mdPath, markdown);
    
    created++;
  }
  
  console.log('\n=== Listing Migration Complete ===');
  console.log(`Products created: ${created}`);
  console.log(`Products skipped (already exist): ${skipped}`);
  console.log(`Images copied: ${imagesCopied}`);
  console.log(`Images failed: ${imagesFailed}`);
}

migrate().catch(console.error);

