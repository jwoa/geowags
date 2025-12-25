import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'products');

function main() {
  console.log('='.repeat(80));
  console.log('FINDING PRODUCTS WITH UNDEFINED NAME');
  console.log('='.repeat(80));
  console.log();

  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
  const undefinedNames: string[] = [];

  for (const file of files) {
    try {
      const filePath = path.join(CONTENT_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(content);

      if (!data.name || data.name === '' || typeof data.name !== 'string') {
        console.log(`❌ ${file}: name is "${data.name}" (type: ${typeof data.name})`);
        undefinedNames.push(file);
      }
    } catch (error) {
      console.log(`❌ ${file}: Failed to parse`);
      console.log(`   Error: ${error}`);
      undefinedNames.push(file);
    }
  }

  console.log();
  console.log('='.repeat(80));
  console.log('SUMMARY');
  console.log('='.repeat(80));
  console.log(`Products with issues: ${undefinedNames.length}`);
  console.log();

  if (undefinedNames.length > 0) {
    console.log('FILES:');
    console.log('-'.repeat(80));
    undefinedNames.forEach(f => console.log(`  ${f}`));
  } else {
    console.log('✅ All products have valid names!');
  }
}

main();
