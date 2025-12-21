/**
 * WordPress to Markdown Product Migration Script
 * 
 * This script:
 * 1. Scans WordPress cached HTML product pages
 * 2. Extracts product data (name, categories, images, description)
 * 3. Copies product images to public/images/products/
 * 4. Generates markdown files in content/products/
 * 
 * Usage: npx tsx scripts/migrate-products.ts
 */

import * as fs from 'fs';
import * as path from 'path';

// Paths
const WP_CACHE_DIR = path.join(process.cwd(), 'geowags-archive/wp-content/endurance-page-cache/product');
const WP_UPLOADS_DIR = path.join(process.cwd(), 'geowags-archive/wp-content/uploads');
const OUTPUT_PRODUCTS_DIR = path.join(process.cwd(), 'content/products');
const OUTPUT_IMAGES_DIR = path.join(process.cwd(), 'public/images/products');

// Category mappings from WP to new structure
const CATEGORY_MAP: Record<string, { category: string; subcategory?: string }> = {
  // Bath Shop
  'bath-shop': { category: 'bathroom' },
  'bath-tub': { category: 'bathroom', subcategory: 'bath-tub' },
  'wcs': { category: 'bathroom', subcategory: 'wcs' },
  'wash-basins': { category: 'bathroom', subcategory: 'wash-basins' },
  'shower-enclosures': { category: 'bathroom', subcategory: 'shower-enclosures' },
  'shower-tray': { category: 'bathroom', subcategory: 'shower-tray' },
  'faucets': { category: 'bathroom', subcategory: 'faucets' },
  'bathroom-furnitures': { category: 'bathroom', subcategory: 'bathroom-furnitures' },
  'water-heaters': { category: 'bathroom', subcategory: 'water-heaters' },
  
  // Kitchen
  'kitchen': { category: 'kitchen' },
  'stainless-steel-sinks': { category: 'kitchen', subcategory: 'stainless-steel-sinks' },
  'granite-quartz-sinks': { category: 'kitchen', subcategory: 'granite-quartz-sinks' },
  'sink-faucets': { category: 'kitchen', subcategory: 'sink-faucets' },
  'food-waste-disposal': { category: 'kitchen', subcategory: 'food-waste-disposal' },
  
  // Tiles
  'tile-shop': { category: 'tiles' },
  'floor-tiles': { category: 'tiles', subcategory: 'floor-tiles' },
  'wall-tiles': { category: 'tiles', subcategory: 'wall-tiles' },
  'special-tiles': { category: 'tiles', subcategory: 'special-tiles' },
  'mosaics': { category: 'tiles', subcategory: 'mosaics' },
  
  // Paints
  'monto-paint-shop': { category: 'paints' },
  'speciality': { category: 'paints', subcategory: 'speciality' },
  'floor-paints': { category: 'paints', subcategory: 'floor-paints' },
  
  // Doors
  'doors': { category: 'doors' },
  'security-doors': { category: 'doors', subcategory: 'security-doors' },
  'kitchen-doors': { category: 'doors', subcategory: 'kitchen-doors' },
};

// Brand slugs
const BRAND_SLUGS = [
  'gala', 'vado', 'grespania', 'grespania-ceramica', 'reginox', 
  'carysil', 'wesen', 'banos10', 'bella-casa', 'pestan',
  'gural', 'gural-armatur'
];

// Normalize brand slug
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
  images: { url: string; alt: string; primary: boolean }[];
  description: string;
}

// Parse HTML to extract product data
function parseProductHtml(html: string, slug: string): ProductData | null {
  try {
    // Extract product title
    const titleMatch = html.match(/<h3[^>]*class="edgtf-single-product-title"[^>]*>([^<]+)<\/h3>/);
    if (!titleMatch) {
      console.warn(`  No title found for ${slug}`);
      return null;
    }
    const name = decodeHtmlEntities(titleMatch[1].trim());

    // Extract categories from product wrapper class
    const wrapperMatch = html.match(/<div[^>]*id="product-\d+"[^>]*class="([^"]+)"/);
    const categoryClasses = wrapperMatch ? wrapperMatch[1].split(' ').filter(c => c.startsWith('product_cat-')) : [];
    
    // Parse categories
    let category = 'bathroom'; // default
    let subcategory: string | undefined;
    let brand: string | undefined;
    
    for (const catClass of categoryClasses) {
      const catSlug = catClass.replace('product_cat-', '');
      
      // Check if it's a brand
      const normalizedBrand = normalizeBrand(catSlug);
      if (normalizedBrand) {
        brand = normalizedBrand;
        continue;
      }
      
      // Check if it's a mapped category
      const mapping = CATEGORY_MAP[catSlug];
      if (mapping) {
        category = mapping.category;
        if (mapping.subcategory) {
          subcategory = mapping.subcategory;
        }
      }
    }

    // Extract images
    const images: { url: string; alt: string; primary: boolean }[] = [];
    
    // Primary image
    const primaryMatch = html.match(/class="woocommerce-product-gallery__image"[^>]*>.*?<a[^>]*href="([^"]+)"[^>]*>.*?<img[^>]*data-src="([^"]+)"/s);
    if (primaryMatch) {
      const imgUrl = primaryMatch[2] || primaryMatch[1];
      images.push({
        url: convertImageUrl(imgUrl, slug),
        alt: name,
        primary: true
      });
    }
    
    // Gallery images
    const galleryRegex = /<div class="thumbnails[^"]*"[^>]*>(.*?)<\/div>/s;
    const galleryMatch = html.match(galleryRegex);
    if (galleryMatch) {
      const thumbMatches = galleryMatch[1].matchAll(/<a[^>]*href="([^"]+)"/g);
      for (const match of thumbMatches) {
        if (!images.some(img => img.url.includes(path.basename(match[1]).split('-')[0]))) {
          images.push({
            url: convertImageUrl(match[1], slug),
            alt: name,
            primary: false
          });
        }
      }
    }

    // Extract description
    let description = '';
    const descMatch = html.match(/<div[^>]*id="tab-description"[^>]*>[\s\S]*?<h2>Description<\/h2>\s*([\s\S]*?)<\/div>/);
    if (descMatch) {
      description = cleanDescription(descMatch[1]);
    }
    
    if (!description) {
      description = `Premium ${name} from ${brand ? brand.charAt(0).toUpperCase() + brand.slice(1) : 'Geowags'}. Contact us for specifications and pricing.`;
    }

    return {
      name,
      slug,
      category,
      subcategory,
      brand,
      images,
      description
    };
  } catch (error) {
    console.error(`  Error parsing ${slug}:`, error);
    return null;
  }
}

// Convert WordPress image URL to local path
function convertImageUrl(wpUrl: string, productSlug: string): string {
  const filename = path.basename(wpUrl).replace(/-\d+x\d+(\.\w+)$/, '$1');
  return `/images/products/${productSlug}/${filename}`;
}

// Decode HTML entities
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

// Clean description HTML
function cleanDescription(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Generate markdown content
function generateMarkdown(product: ProductData): string {
  const frontmatter: Record<string, unknown> = {
    name: product.name,
    slug: product.slug,
    category: product.category,
  };
  
  if (product.subcategory) {
    frontmatter.subcategory = product.subcategory;
  }
  
  if (product.brand) {
    frontmatter.brand = product.brand;
  }
  
  frontmatter.featured = false;
  frontmatter.new = false;
  frontmatter.active = true;
  frontmatter.images = product.images;

  const yaml = formatYaml(frontmatter);
  
  return `---
${yaml}---

${product.description}
`;
}

// Format object as YAML
function formatYaml(obj: Record<string, unknown>, indent = 0): string {
  let result = '';
  const prefix = '  '.repeat(indent);
  
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined) continue;
    
    if (Array.isArray(value)) {
      if (value.length === 0) {
        result += `${prefix}${key}: []\n`;
      } else if (typeof value[0] === 'object') {
        result += `${prefix}${key}:\n`;
        for (const item of value) {
          const itemLines = formatYaml(item as Record<string, unknown>, indent + 1).split('\n').filter(l => l.trim());
          result += `${prefix}  - ${itemLines[0].trim()}\n`;
          for (let i = 1; i < itemLines.length; i++) {
            result += `${prefix}    ${itemLines[i].trim()}\n`;
          }
        }
      } else {
        result += `${prefix}${key}:\n`;
        for (const item of value) {
          result += `${prefix}  - "${item}"\n`;
        }
      }
    } else if (typeof value === 'object' && value !== null) {
      result += `${prefix}${key}:\n`;
      result += formatYaml(value as Record<string, unknown>, indent + 1);
    } else if (typeof value === 'string') {
      if (value.includes(':') || value.includes('"') || value.includes('\n')) {
        result += `${prefix}${key}: "${value.replace(/"/g, '\\"')}"\n`;
      } else {
        result += `${prefix}${key}: "${value}"\n`;
      }
    } else {
      result += `${prefix}${key}: ${value}\n`;
    }
  }
  
  return result;
}

// Copy image from WordPress uploads
function copyImage(wpUrl: string, destPath: string): boolean {
  try {
    // Extract path from URL
    const urlPath = wpUrl.replace('https://geowags.com/wp-content/uploads/', '');
    const sourcePath = path.join(WP_UPLOADS_DIR, urlPath);
    
    // Also try without size suffix
    const sourcePathOriginal = sourcePath.replace(/-\d+x\d+(\.\w+)$/, '$1');
    
    let actualSource = sourcePath;
    if (fs.existsSync(sourcePathOriginal)) {
      actualSource = sourcePathOriginal;
    } else if (!fs.existsSync(sourcePath)) {
      // Try finding the file with glob pattern
      const dir = path.dirname(sourcePath);
      const baseName = path.basename(sourcePath).split('-')[0];
      const ext = path.extname(sourcePath);
      
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir);
        const match = files.find(f => f.startsWith(baseName) && f.endsWith(ext) && !f.includes('-'));
        if (match) {
          actualSource = path.join(dir, match);
        }
      }
    }
    
    if (!fs.existsSync(actualSource)) {
      return false;
    }
    
    // Create destination directory
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    // Copy file
    fs.copyFileSync(actualSource, destPath);
    return true;
  } catch (error) {
    return false;
  }
}

// Main migration function
async function migrate() {
  console.log('Starting WordPress to Markdown migration...\n');
  
  // Ensure output directories exist
  if (!fs.existsSync(OUTPUT_PRODUCTS_DIR)) {
    fs.mkdirSync(OUTPUT_PRODUCTS_DIR, { recursive: true });
  }
  if (!fs.existsSync(OUTPUT_IMAGES_DIR)) {
    fs.mkdirSync(OUTPUT_IMAGES_DIR, { recursive: true });
  }
  
  // Find all product directories
  const productDirs = fs.readdirSync(WP_CACHE_DIR).filter(f => {
    const fullPath = path.join(WP_CACHE_DIR, f);
    return fs.statSync(fullPath).isDirectory() && !f.endsWith('_index.html');
  });
  
  console.log(`Found ${productDirs.length} product directories\n`);
  
  let processed = 0;
  let skipped = 0;
  let imagesCopied = 0;
  let imagesFailed = 0;
  
  for (const productDir of productDirs) {
    const slug = productDir;
    const htmlPath = path.join(WP_CACHE_DIR, productDir, '_index.html');
    
    if (!fs.existsSync(htmlPath)) {
      console.log(`  Skipping ${slug}: No _index.html found`);
      skipped++;
      continue;
    }
    
    console.log(`Processing: ${slug}`);
    
    // Read and parse HTML
    const html = fs.readFileSync(htmlPath, 'utf-8');
    const product = parseProductHtml(html, slug);
    
    if (!product) {
      console.log(`  Skipping ${slug}: Could not parse`);
      skipped++;
      continue;
    }
    
    // Copy images
    const productImagesDir = path.join(OUTPUT_IMAGES_DIR, slug);
    for (const image of product.images) {
      // Find original URL in HTML
      const imgMatch = html.match(new RegExp(`data-src="([^"]*${path.basename(image.url).split('.')[0]}[^"]*)"`));
      if (imgMatch) {
        const destPath = path.join(process.cwd(), 'public', image.url);
        if (copyImage(imgMatch[1], destPath)) {
          imagesCopied++;
        } else {
          imagesFailed++;
          // Use placeholder if image not found
          image.url = '/images/placeholder-product.jpg';
        }
      }
    }
    
    // Generate and write markdown
    const markdown = generateMarkdown(product);
    const mdPath = path.join(OUTPUT_PRODUCTS_DIR, `${slug}.md`);
    fs.writeFileSync(mdPath, markdown);
    
    processed++;
  }
  
  console.log('\n=== Migration Complete ===');
  console.log(`Products processed: ${processed}`);
  console.log(`Products skipped: ${skipped}`);
  console.log(`Images copied: ${imagesCopied}`);
  console.log(`Images failed: ${imagesFailed}`);
}

// Run migration
migrate().catch(console.error);

