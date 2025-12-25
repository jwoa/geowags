import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'products');

const brokenFiles = [
  'alpina-brushed.md',
  'amanzi-hot-tap.md',
  'belaya-brushed-inox.md',
  'belaya.md',
  'cano-copper.md',
  'cano-gun-metal.md',
  'cedar-chrome.md',
  'centurio-10-r-inset-all-specifications.md',
  'crystal-gun-metal.md',
  'flint-black-chrome.md',
  'gila-chrome.md',
  'japura-black-chrome.md',
  'jerico-chrome.md',
  'kludi-zenta-hd-schwarz.md',
  'leon-chrome.md',
  'levisa-chrome.md',
  'narmada-chrome.md',
  'parana-chrome.md',
  'pearl-chrome.md',
  'wolga-chrome.md',
  'xinga-brushed.md',
  'xinga.md',
  'yadkin-chrome.md',
  'yampa-black.md',
  'yukon-chrome.md',
];

function fixBrokenYaml(content: string): string {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n/);

  if (!frontmatterMatch) {
    return content;
  }

  const frontmatter = frontmatterMatch[1];
  const rest = content.substring(frontmatterMatch[0].length);

  const imagesMatch = frontmatter.match(/images:\s*\n((?:  -[^\n]*\n(?:    [^\n]*\n)*)*)/);

  if (!imagesMatch) {
    return content;
  }

  const imagesBlock = imagesMatch[1];
  const imageBlocks = imagesBlock.match(/  - url:[^\n]+\n(?:    [^\n]*\n)*/g) || [];

  const fixedImageBlocks: string[] = [];

  for (const block of imageBlocks) {
    const lines = block.split('\n').filter(Boolean);
    const seenKeys = new Set<string>();
    const fixedLines: string[] = [];

    for (const line of lines) {
      const keyMatch = line.match(/^    (alt|primary):/);

      if (keyMatch) {
        const key = keyMatch[1];

        if (seenKeys.has(key)) {
          continue;
        }

        seenKeys.add(key);
      }

      fixedLines.push(line);
    }

    fixedImageBlocks.push(fixedLines.join('\n'));
  }

  const newFrontmatter = frontmatter.replace(imagesMatch[0], `images:\n${fixedImageBlocks.join('\n')}\n`);

  return `---\n${newFrontmatter}---\n${rest}`;
}

function main() {
  console.log('='.repeat(80));
  console.log('FIXING BROKEN YAML FILES');
  console.log('='.repeat(80));
  console.log();

  let fixedCount = 0;
  let errorCount = 0;
  const errors: string[] = [];

  for (const file of brokenFiles) {
    const filePath = path.join(CONTENT_DIR, file);

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${file}`);
      continue;
    }

    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const fixedContent = fixBrokenYaml(content);

      fs.writeFileSync(filePath, fixedContent, 'utf-8');
      fixedCount++;
      console.log(`✅ Fixed: ${file}`);
    } catch (error) {
      errorCount++;
      errors.push(`${file}: ${error}`);
      console.log(`❌ ${file}: ${error}`);
    }
  }

  console.log();
  console.log('='.repeat(80));
  console.log('FIX SUMMARY');
  console.log('='.repeat(80));
  console.log(`✅ Fixed: ${fixedCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log();

  if (errors.length > 0) {
    console.log('ERRORS:');
    console.log('-'.repeat(80));
    errors.forEach(err => console.log(`  ${err}`));
  }

  console.log('✅ Done!');
}

main();
