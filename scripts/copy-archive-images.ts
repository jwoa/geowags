import fs from 'fs';
import path from 'path';

const ARCHIVE_DIR = path.join(process.cwd(), 'organized-archive', 'products');
const PUBLIC_IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'products');

const brandMappings: Record<string, Record<string, string>> = {
  banos10: {
    'B10_Acrilica_Van.jpg': 'van-4',
    'B10_Acrilica_Nor.jpg': 'nor',
    'B10_Acrilica_Vela.jpg': 'vela-2',
    'B10_Acrilica_Keta.jpg': 'keta',
    'B10_Acrilica_Epoca.jpg': 'epoca',
    'B10_En2_Boat.jpg': 'boat-2',
    'B10_En2_Crab.jpg': 'crab',
    'B10_En2_Duke.jpg': 'duke-2',
    'B10_Encastrada_Bravatta.jpg': 'bravatta-4',
    'B10_Encastrada_Curve.jpg': 'curve',
    'B10_Encastrada_Drop.jpg': 'drop-2',
    'B10_Encastrada_Duet.jpg': 'duet',
    'B10_Encastrada_GB.jpg': 'gb-2',
    'B10_Encastrada_Iman.jpg': 'iman',
    'B10_Encastrada_JazzL.jpg': 'jazz-l',
    'B10_Encastrada_JazzS.jpg': 'jazz-s-6',
    'B10_Encastrada_JazzXL.jpg': 'jazz-xl-2',
    'B10_Encastrada_Kube_det2.jpg': 'kube-6',
    'B10_Encastrada_Sharon.jpg': 'sharon',
    'B10_Encastrada_Space.jpg': 'space',
    'B10_Encastrada_Toba.jpg': 'toba',
    'B10_Outdoor_Abot.jpg': 'abot',
    'B10_Outdoor_Clay.jpg': 'clay',
    'B10_Outdoor_Miles.jpg': 'miles-2',
    'B10_SolidSurface_Aral.jpg': 'aral',
    'B10_SolidSurface_Aral-5.jpg': 'aral-5',
    'B10_SolidSurface_LEO_Det01.jpg': 'leo',
    'B10_SolidSurface_Tay_Det1.jpg': 'tay-2',
    'B10_Spas_Formentera.jpg': 'formentera',
    'B10_Spas_Ibiza.jpg': 'ibiza-6',
    'B10_Spas_Mallorca.jpg': 'mallorca',
    'B10_Spas_Menorca.jpg': 'menorca',
    'B10_encastrada_Cimbra.jpg': 'cimbra-2',
    'B10_En2_Crab_Det2-uai.jpg': 'crab',
  },
  kludi: {
    'K1000K_4.jpg': 'yukon-chrome',
    'K1000K_5.jpg': 'yukon-chrome',
    'K100K.jpg': 'cano-gun-metal',
    'K100K_1.jpg': 'cano-gun-metal',
    'K1010K.jpg': 'columba-chrome',
    'K1010K_1.jpg': 'columba-chrome',
    'K1015K.jpg': 'japura-black-chrome',
    'K1015K_1.jpg': 'japura-black-chrome',
    'K101K.jpg': 'cano-gold',
    'K1020K_2.jpg': 'pearl-chrome',
    'K1020K_3.jpg': 'pearl-chrome',
    'K1025K_1.jpg': 'pearl-black',
    'K102K.jpg': 'cano-copper',
    'K102K_1.jpg': 'cano-copper',
    'K1030K.jpg': 'flint-chrome',
    'K1030K_1.jpg': 'flint-chrome',
    'K103K.jpg': 'crystal-gun-metal',
    'K103K_1.jpg': 'crystal-gun-metal',
    'K1035K_1.jpg': 'flint-black-chrome',
    'K1035K_2.jpg': 'flint-black-chrome',
    'K1040K_6.jpg': 'cedar-chrome',
    'K1040K_7.jpg': 'cedar-chrome',
    'K1045K.jpg': 'belaya-brushed-inox',
    'K1045K_1.jpg': 'belaya-brushed-inox',
    'K104K.jpg': 'belaya',
    'K104K_1.jpg': 'belaya',
    'K1050K_1.jpg': 'amur-brushed-nickel',
    'K1050K_2.jpg': 'amur-brushed-nickel',
    'K1055K_4.jpg': 'yampa-black',
    'K1055K_5.jpg': 'yampa-black',
    'K105K_1.jpg': 'astoria-brushed-nickel',
    'K1060K.jpg': 'yadkin-chrome',
    'K1060K_1.jpg': 'yadkin-chrome',
    'K1065K_6.jpg': 'amani-brushed',
    'K1065K_7.jpg': 'amani-brushed',
    'K1070K.jpg': 'parana-chrome',
    'K1070K_1.jpg': 'parana-chrome',
    'K1080K_10.jpg': 'levisa-chrome',
    'K1080K_9.jpg': 'levisa-chrome',
    'K1090K_10.jpg': 'narmada-chrome',
    'K1090K_11-1.jpg': 'narmada-chrome',
    'K1090K_11.jpg': 'narmada-chrome',
    'K1100K.jpg': 'jerico-chrome',
    'K1100K_1.jpg': 'jerico-chrome',
    'K2000K_2.jpg': 'leon-chrome',
    'K2000K_3.jpg': 'leon-chrome',
    'K2010K_4.jpg': 'gila-chrome',
    'K2010K_5.jpg': 'gila-chrome',
    'K755K_1.jpg': 'alpina-brushed',
    'K755K_2.jpg': 'alpina-brushed',
    'K760K_1.jpg': 'amani-hot-tap',
    'K760K_2.jpg': 'amani-hot-tap',
    'K762K_2.jpg': 'amanzi-hot-tap',
    'K762K_3.jpg': 'amanzi-hot-tap',
    'K765K_2.jpg': 'alpina-chrome',
    'K765K_3.jpg': 'alpina-chrome',
    'K767K_2.jpg': 'zenta-chrome',
    'K767K_3.jpg': 'zenta-chrome',
    'K770K_1.jpg': 'xinga',
    'K770K_2.jpg': 'xinga',
    'K772K_2.jpg': 'xinga-brushed',
    'K772K_3.jpg': 'xinga-brushed',
    'K775K_1.jpg': 'nova',
    'K775K_2.jpg': 'nova',
    'K777K_2.jpg': 'nova-2',
    'K777K_3.jpg': 'nova-2',
    'K780K_1.jpg': 'wolga-chrome',
    'K780K_2.jpg': 'wolga-chrome',
    'K785K_1.jpg': 'nova-3',
    'K787K_1.jpg': 'nova-3',
    'K787K_2.jpg': 'nova-3',
    'K821K_2.jpg': 'kludi-zenta-hd-schwarz',
    'K821K_3.jpg': 'kludi-zenta-hd-schwarz',
    'K914K.jpg': 'kludi-zenta-hd-schwarz',
    'K914K_1.jpg': 'kludi-zenta-hd-schwarz',
    'K750K.jpg': 'lena-chrome',
    'K750K_1.jpg': 'lena-chrome',
    'K750K_2.jpg': 'lena-chrome',
  },
  reginox: {
    'OMI-100-CC_main.jpg': 'centurio-10-r-inset-all-specifications',
    'OMI-100-SB_main.jpg': 'centurio-10-r-inset-all-specifications',
    'OMI-100M-CC_main.jpg': 'centurio-10-r-inset-all-specifications',
    'OMI-100_main.jpg': 'centurio-10-r-inset-all-specifications',
    'OMI-100_1.jpg': 'centurio-10-r-inset-all-specifications',
    'OMI-100_2.jpg': 'centurio-10-r-inset-all-specifications',
    'OMI-133_main.jpg': 'centurio-10-r-inset-all-specifications',
    'OMI-133_1.jpg': 'centurio-10-r-inset-all-specifications',
    'OMI-133_2.jpg': 'centurio-10-r-inset-all-specifications',
    'SYN-100-CC_main.jpg': 'regidrain-r-inset-all-specifications',
    'SYN-100-SB_main.jpg': 'regidrain-r-inset-all-specifications',
    'SYN-100E-SB_main.jpg': 'regidrain-r-inset-all-specifications',
    'SYN-109S_main_0.jpg': 'regidrain-r-inset-all-specifications',
    'SYN-140-W_main.jpg': 'wall-mounted-waterfall-bath-spout',
    'SYN-233_0.jpg': 'regidrain-r-inset-all-specifications',
    'WG-81389-SQ_main.jpg': 'wg-81389-sq',
  },
  pestan: {
    'Confluo-Drops-2-15X15-NO-FLANGE-1.jpg': 'confluo-premium-line-elements',
    'Confluo-Drops-2-15X15-NO-FLANGE-2.jpg': 'confluo-premium-line-elements',
    'Confluo-Premium-black-glass.jpg': 'confluo-premium-line-elements',
    'Confluo-Premium-gold-product.jpg': 'confluo-premium-line-elements',
    'Confluo-Premium-gold.jpg': 'confluo-premium-line-elements',
    'Confluo-Premium-line-elements.jpg': 'confluo-premium-line-elements',
    'Confluo-Premium-line-product.jpg': 'confluo-premium-line-elements',
    'Confluo-Premium-line.jpg': 'confluo-premium-line-elements',
    'Confluo-Premium-slim-elements.jpg': 'confluo-premium-slim',
    'Confluo-Premium-slim-product.jpg': 'confluo-premium-slim',
    'Confluo-Premium-slim.jpg': 'confluo-premium-slim',
    'Confluo-Premium-product-1.jpg': 'confluo-premium-line-elements',
    'Confluo-Tide-15X15-NO-FLANGE-1.jpg': 'confluo-premium-slim',
    'Confluo-Tide-15X15-NO-FLANGE-2.jpg': 'confluo-premium-slim',
    'Confluo-Wall-elements.jpg': 'confluo-premium-line-elements',
    'Confluo-Wall-gold.jpg': 'confluo-premium-line-elements',
    'Confluo-Wall.jpg': 'confluo-premium-line-elements',
  },
};

function main() {
  console.log('='.repeat(80));
  console.log('COPYING ARCHIVE IMAGES TO PUBLIC FOLDER');
  console.log('='.repeat(80));
  console.log();

  let copiedCount = 0;
  let errorCount = 0;
  const errors: string[] = [];

  for (const [brand, mappings] of Object.entries(brandMappings)) {
    const brandDir = path.join(ARCHIVE_DIR, brand);

    if (!fs.existsSync(brandDir)) {
      console.log(`⚠️  Brand directory not found: ${brandDir}`);
      continue;
    }

    const files = fs.readdirSync(brandDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

    for (const file of files) {
      const slug = mappings[file];

      if (!slug) {
        continue;
      }

      const sourcePath = path.join(brandDir, file);
      const targetDir = path.join(PUBLIC_IMAGES_DIR, slug);
      const targetPath = path.join(targetDir, file);

      try {
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true });
        }

        if (!fs.existsSync(targetPath)) {
          fs.copyFileSync(sourcePath, targetPath);
          copiedCount++;
          console.log(`✅ ${slug}/${file}`);
        } else {
          console.log(`⏭️  ${slug}/${file} (already exists)`);
        }
      } catch (error) {
        errorCount++;
        errors.push(`${slug}/${file}: ${error}`);
        console.log(`❌ ${slug}/${file} - ${error}`);
      }
    }
  }

  console.log();
  console.log('='.repeat(80));
  console.log('COPY SUMMARY');
  console.log('='.repeat(80));
  console.log(`✅ Images copied: ${copiedCount}`);
  console.log(`⏭️  Already exists: ${[...Object.values(brandMappings)].flat().length - copiedCount}`);
  console.log(`❌ Errors: ${errorCount}`);
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
