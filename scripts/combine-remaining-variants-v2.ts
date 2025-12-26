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
    images: [],
  };

  const lines = match[1].split('\n');
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) {
      i++;
      continue;
    }

    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) {
      i++;
      continue;
    }

    const key = line.substring(0, colonIndex).trim();
    const value = line.substring(colonIndex + 1).trim();

    if (key === 'name') {
      (data as any)[key] = value.replace(/"/g, '');
    } else if (key === 'slug') {
      (data as any)[key] = value.replace(/"/g, '');
    } else if (key === 'category') {
      (data as any)[key] = value.replace(/"/g, '');
    } else if (key === 'images') {
      const array: any[] = [];
      i++;
      while (i < lines.length && lines[i].trim().startsWith('-')) {
        const imgLine = lines[i].trim().substring(2);
        const img: any = { url: '', alt: '', primary: false };
        
        if (imgLine.startsWith('url:')) {
          img.url = imgLine.replace('url:', '').trim().replace(/"/g, '');
        }
        
        i++;
        if (i < lines.length && lines[i].trim().startsWith('  alt:')) {
          img.alt = lines[i].trim().replace('  alt:', '').trim().replace(/"/g, '');
          i++;
        }
        if (i < lines.length && lines[i].trim().startsWith('  primary:')) {
          img.primary = lines[i].trim().replace('  primary:', '').trim() === 'true';
          i++;
        }
        
        array.push(img);
      }
      (data as any)[key] = array;
    } else {
      (data as any)[key] = value;
      i++;
    }
  }

  return data;
}

function generateMarkdown(data: ProductFrontmatter): string {
  const lines = [
    '---',
    `name: "${data.name}"`,
    `slug: "${data.slug}"`,
    `category: "${data.category}"`,
    'featured: false',
    'new: false',
    'active: true',
  ];

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

    const baseImageDir = path.join(imagesDir, base);
    if (!fs.existsSync(baseImageDir)) {
      fs.mkdirSync(baseImageDir, { recursive: true });
    }

    const allImages: ProductFrontmatter['images'] = [];
    const imageUrls = new Set<string>();
    const finishes: string[] = [];

    // Check if base product exists
    const baseFile = path.join(productsDir, `${base}.md`);
    let baseData: ProductFrontmatter | null = null;
    let baseCategory = 'bathroom';

    if (fs.existsSync(baseFile)) {
      baseData = parseMarkdownFile(baseFile);
      if (baseData && baseData.category) {
        baseCategory = baseData.category;
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

      // Extract finish from name or slug
      let finish = variantData.name
        .replace(new RegExp(`^${base}\\s+`, 'i'), '')
        .trim();
      
      if (!finish || finish === variantData.name) {
        finish = variant.replace(/^-/, '').replace(/-/g, ' ').trim();
      }
      
      finish = finish.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

      if (!finishes.includes(finish)) {
        finishes.push(finish);
      }
      console.log(`   - ${variant}: ${finish}`);

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
      allImages.forEach((img, idx) => {
        img.primary = idx === 0;
      });

      const combinedData: ProductFrontmatter = {
        name: base.charAt(0).toUpperCase() + base.slice(1),
        slug: base,
        category: baseCategory,
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
          console.log(`🗑️  Deleted ${variant}/ images`);
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
