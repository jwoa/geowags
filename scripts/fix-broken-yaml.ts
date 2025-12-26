import fs from 'fs';
import path from 'path';

const FILES_TO_FIX = [
  'cedar.md',
  'cano.md',
  'ibiza.md',
  'aral.md'
];

function fixYaml() {
  const productsDir = path.join(process.cwd(), 'content', 'products');

  for (const file of FILES_TO_FIX) {
    const filePath = path.join(productsDir, file);

    if (!fs.existsSync(filePath)) {
      continue;
    }

    console.log(`\n🔄 Fixing ${file}`);

    let content = fs.readFileSync(filePath, 'utf-8');

    // Fix: Remove extra indentation before finishes, specifications, etc.
    content = content.replace(/\n  (finishes|specifications|colors|sizes):/g, '\n$1:');

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Fixed ${file}`);
  }
}

try {
  fixYaml();
  console.log('\n✅ All done!');
} catch (error) {
  console.error('Error:', error);
}
