import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'products');

function main() {
  console.log('='.repeat(80));
  console.log('VALIDATING YAML IN PRODUCT FILES');
  console.log('='.repeat(80));
  console.log();

  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
  let validCount = 0;
  let errorCount = 0;
  const errors: Array<{ file: string; error: string }> = [];

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file);

    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      matter(content);
      validCount++;
    } catch (error) {
      errorCount++;
      errors.push({
        file,
        error: error instanceof Error ? error.message : String(error),
      });
      console.log(`❌ ${file}`);
      console.log(`   ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  console.log();
  console.log('='.repeat(80));
  console.log('VALIDATION SUMMARY');
  console.log('='.repeat(80));
  console.log(`✅ Valid: ${validCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log();

  if (errors.length > 0) {
    console.log('ERRORS:');
    console.log('-'.repeat(80));
    errors.forEach(err => {
      console.log(`\n${err.file}:`);
      console.log(`  ${err.error}`);
    });
    console.log();
    process.exit(1);
  } else {
    console.log('✅ All product files have valid YAML!');
  }
}

main();
