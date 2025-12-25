import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'products');
const PUBLIC_IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'products');

const orphanedImages: Record<string, string> = {
  'kludi/K101K_1.jpg': 'cano-gold',
  'kludi/K1025K_2.jpg': 'pearl-black',
  'kludi/K105K.jpg': 'astoria-brushed-nickel',
  'kludi/K785K_2.jpg': 'nova',
};

function parseFrontmatter(content: string): { frontmatter: string; rest: string } {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n/);

  if (!frontmatterMatch) {
    return { frontmatter: '', rest: content };
  }

  return {
    frontmatter: frontmatterMatch[1],
    rest: content.substring(frontmatterMatch[0].length),
  };
}

function main() {
  console.log('='.repeat(80));
  console.log('ADDING ORPHANED IMAGES TO PRODUCTS');
  console.log('='.repeat(80));
  console.log();

  let addedCount = 0;
  const errors: string[] = [];

  for (const [imagePath, slug] of Object.entries(orphanedImages)) {
    const [brand, filename] = imagePath.split('/');
    const filePath = path.join(CONTENT_DIR, `${slug}.md`);
    const sourceImagePath = path.join(process.cwd(), 'organized-archive', 'products', brand, filename);
    const targetImagePath = path.join(PUBLIC_IMAGES_DIR, slug, filename);

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Product file not found: ${slug}.md`);
      errors.push(`${slug}.md: Product file not found`);
      continue;
    }

    if (!fs.existsSync(sourceImagePath)) {
      console.log(`⚠️  Source image not found: ${imagePath}`);
      errors.push(`${imagePath}: Source image not found`);
      continue;
    }

    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const { frontmatter, rest } = parseFrontmatter(content);

      const nameMatch = content.match(/name:\s*"([^"]+)"/);
      const productName = nameMatch?.[1] || slug;

      const existingImagesMatch = frontmatter.match(/images:\s*\n((?:  -[^\n]*\n)*)/);
      const existingImageFilenames = frontmatter.match(/url:\s*"\/images\/products\/[^/]+\/([^"]+)"/g) || [];

      const filenameInExisting = existingImageFilenames.some(url => url.includes(filename));

      if (filenameInExisting) {
        console.log(`⏭️  ${filename} already in ${slug}.md`);
        continue;
      }

      if (!fs.existsSync(path.dirname(targetImagePath))) {
        fs.mkdirSync(path.dirname(targetImagePath), { recursive: true });
      }

      if (!fs.existsSync(targetImagePath)) {
        fs.copyFileSync(sourceImagePath, targetImagePath);
        console.log(`✅ Copied ${filename} to public folder`);
      }

      const existingImageList: Array<{ url: string; alt: string; primary: boolean }> = [];

      if (existingImagesMatch) {
        const imageMatches = existingImagesMatch[1].matchAll(/-\s*url:\s*"([^"]+)"\s*\n\s*alt:\s*"([^"]*)"\s*\n\s*primary:\s*(true|false)/g);

        for (const match of imageMatches) {
          existingImageList.push({
            url: match[1],
            alt: match[2],
            primary: match[3] === 'true',
          });
        }
      }

      const newImage = {
        url: `/images/products/${slug}/${filename}`,
        alt: productName,
        primary: false,
      };

      const updatedImages = [...existingImageList, newImage];

      const imageBlock = `images:\n${updatedImages.map((img, index) => {
        return `  - url: "${img.url}"\n    alt: "${img.alt}"\n    primary: ${img.primary}`;
      }).join('\n')}\n`;

      let newFrontmatter: string;
      if (existingImagesMatch) {
        newFrontmatter = frontmatter.replace(existingImagesMatch[0], imageBlock);
      } else {
        newFrontmatter = frontmatter.trim() + '\n' + imageBlock;
      }

      const newContent = `---\n${newFrontmatter}---\n${rest}`;
      fs.writeFileSync(filePath, newContent, 'utf-8');

      addedCount++;
      console.log(`✅ Added ${filename} to ${slug}.md`);
    } catch (error) {
      errors.push(`${slug}: ${error}`);
      console.log(`❌ ${slug} - ${error}`);
    }
  }

  console.log();
  console.log('='.repeat(80));
  console.log('SUMMARY');
  console.log('='.repeat(80));
  console.log(`✅ Added: ${addedCount}`);
  console.log(`❌ Errors: ${errors.length}`);
  console.log();

  if (errors.length > 0) {
    console.log('ERRORS:');
    console.log('-'.repeat(80));
    errors.forEach(err => console.log(`  ${err}`));
    console.log();
  }

  console.log('✅ Done!');
}

main();
