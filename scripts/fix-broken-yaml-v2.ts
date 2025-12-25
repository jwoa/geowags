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
  return content
    .replace(/    alt: "[^"]+"\n    primary: (true|false)---\n/g, '')
    .replace(/    primary: (true|false)---\n/g, '---\n')
    .replace(/    alt: "[^"]+"\n---\n/g, '---\n');
}

function main() {
  console.log('='.repeat(80));
  console.log('FIXING BROKEN YAML FILES (v2)');
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

      if (content === fixedContent) {
        console.log(`⏭️  No changes needed: ${file}`);
        continue;
      }

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
