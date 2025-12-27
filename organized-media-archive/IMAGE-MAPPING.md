# Image Mapping Guide

This document maps archived WordPress images to product slugs for the new Geowags website.

## Summary

| Folder | Brand | File Count | Description |
|--------|-------|------------|-------------|
| `products/carysil/` | Carysil | 104 | Kitchen sinks (granite/quartz) |
| `products/vado/` | Vado | 68 | Taps & faucets (UK brand) |
| `products/kludi/` | Kludi | 81 | Taps & faucets (German brand) |
| `products/reginox/` | Reginox | 15 | Kitchen sinks (stainless steel) |
| `products/gala/` | Gala | 106 | Bathroom fixtures (toilets, basins) |
| `products/gala-parts/` | Gala | 513 | Gala component parts & accessories |
| `products/banos10/` | Banos10 | 32 | Bathtubs & shower trays |
| `products/pestan/` | Pestan | 17 | Drainage systems (Confluo) |
| `products/tiles-misc/` | Various | 95 | Tile collection images |
| `catalog-scans/grespania/` | Grespania | 9 | Catalog page scans |
| `catalog-scans/bella-casa/` | Bella Casa | 28 | Catalog page scans |
| `hero/` | - | 6 | Homepage slider images |
| `logos/` | - | 9 | Brand & company logos |
| `about/` | - | 3 | About page images |
| `team/` | - | 3 | Team member photos |

**Total: 1,089 organized files**

---

## Brand Image Patterns

### Carysil (Kitchen Sinks)

**Location:** `products/carysil/`

**Naming Patterns:**
1. Hex-prefix: `[5-char-hex]-model-size_color.png`
2. New-prefix: `New_Model_Size_Color.png`

**Color Variants:**
- champagne (beige/cream)
- concrete (grey)
- crater (dark grey)
- snova (white)
- nera (black)
- yellow
- cornflakes
- red

**Model Mapping:**

| Filename Pattern | Product Slug | Model Name |
|-----------------|--------------|------------|
| `*beethoven-d100*` | beethoven-d100 | Beethoven D100 |
| `*beethoven-d100-l*` | beethoven-d-100-l | Beethoven D100-L |
| `*beethoven-d150*` | beethoven-d150 | Beethoven D150 |
| `*beethoven-d200*` | beethoven-d200 | Beethoven D200 |
| `*enigma-d100*` | enigma-d100 | Enigma D100 |
| `*enigma-d100-l*` | enigma-d100-l | Enigma D100-L |
| `*enigma-d200*` | enigma-d200 | Enigma D200 |
| `*enigma-n150*` | enigma-n150 | Enigma N150 |
| `*enigma-n200*` | enigma-n200 | Enigma N200 |
| `*vivaldi-d100*` | vivaldi-d100 | Vivaldi D100 |
| `*vivaldi-n200*` | vivaldi-n200 | Vivaldi N200 |
| `*polo-d100*` | polo-d100-l | Polo D100 |
| `*polo-d200*` | polo-d200 | Polo D200 |
| `*swan-n100*` | swan-n100-l | Swan N100 |
| `*swan-n200*` | swan-n200 | Swan N200 |
| `*waltz-740*` | waltz-740 | Waltz 740 |
| `*waltz-780*` | waltz-780 | Waltz 780 |
| `*rimo-d100*` | rimo-d100-l | Rimo D100 |
| `*rimo-d150*` | rimo-d150 | Rimo D150 |
| `*tip-toe-d100*` | tip-toe-d100 | Tip Toe D100 |
| `*tip-toe-d150*` | tip-toe-d-150 | Tip Toe D150 |
| `*tip-toe-d200*` | tip-toe-d-200 | Tip Toe D200 |
| `*jumbo-bowl*` | jumbo-n200-l | Jumbo Bowl |
| `*jumbo-n100*` | jumbo-n100-l | Jumbo N100 |
| `*bar-sink*` | bar-sink | Bar Sink |
| `*rock-o2*` | rock-o2-d100 | Rock O2 |
| `*magic-salsa*` | magic-salsa | Magic Salsa |
| `*jazz-d100*` | jazz-d100-l | Jazz D100 |
| `*cg-db-3220*` | cg-db-3220 | CG-DB-3220 |
| `*cg-db-3322*` | cg-db-3322 | CG-DB-3322 |
| `*cg-2b-3322*` | cg-2b-3322 | CG-2B-3322 |
| `*cd-2b-3121*` | cd-2b-3121 | CD-2B-3121 |

---

### Vado (Taps & Faucets - UK)

**Location:** `products/vado/`

**Naming Pattern:** `T[SKU].jpg`

The T-prefix numbers are Vado product SKUs. These need to be matched to product names using the Vado catalog.

**Sample Files:**
- `T63440.jpg` - `T63470.jpg` (range of models)
- `T65548.jpg` - `T65554.jpg` (range of models)
- `T68781.jpg`, `T68783.jpg`

**Note:** These SKU-based images require Vado catalog lookup to match to product names.

---

### Kludi (Taps & Faucets - Germany)

**Location:** `products/kludi/`

**Naming Pattern:** `K[number]K[_variant].jpg`

**Sample Mapping:**

| Filename | Likely Product |
|----------|----------------|
| `K100K.jpg` | Cano Gun Metal |
| `K101K.jpg` | Cano Gold |
| `K102K.jpg` | Cano Copper |
| `K103K.jpg` | Crystal Gun Metal |
| `K750K.jpg` | Lena Chrome |
| `K772K.jpg` | Xinga Brushed |
| `K785K.jpg` | Nova |
| `K914K.jpg` | Kludi Zenta HD Schwarz |
| `K1000K.jpg` | Flint range |
| `K1015K.jpg` | Japura Black Chrome |
| `K1020K.jpg` | Pearl Chrome |
| `K1025K.jpg` | Pearl Black |
| `K1030K.jpg` | Flint Chrome |
| `K1035K.jpg` | Flint Black Chrome |
| `K1055K.jpg` | Yampa Black |
| `K1060K.jpg` | Yadkin Chrome |
| `K1080K.jpg` | Levisa Chrome |
| `K1100K.jpg` | Jerico Chrome |

---

### Reginox (Kitchen Sinks - Stainless Steel)

**Location:** `products/reginox/`

**Naming Patterns:**
- `OMI-[size][-variant]_main.jpg` - Omi series
- `SYN-[size][-variant]_main.jpg` - Synergy series
- `WG-[code]_main.jpg` - WG series

**Files:**
| Filename | Product |
|----------|---------|
| `OMI-100_main.jpg` | Centurio series |
| `OMI-100-CC_main.jpg` | Centurio CC variant |
| `OMI-100-SB_main.jpg` | Centurio SB variant |
| `OMI-133_main.jpg` | Larger Centurio |
| `SYN-100-CC_main.jpg` | Synergy series |
| `SYN-140-W_main.jpg` | Wall mounted waterfall spout |
| `WG-81389-SQ_main.jpg` | WG Square series |

---

### Gala (Bathroom Fixtures - Spain)

**Location:** `products/gala/`

**Naming Pattern:** `A[number][NAME]-[variant].jpg`

**Code Prefixes:**
- `A05` - Street series
- `A10` - Atlas, Baby, Blue series
- `A11` - Universal series
- `A25` - Smart series
- `A27` - Emma Square series
- `A28` - Jazz series
- `A30` - Emma series
- `A60` - Nila, Flex series
- `A65` - Flex Center series

**Product Type Suffixes:**
- `BTW` - Back-to-wall
- `SUSPENDIDO` - Wall-hung
- `Lavabo` - Basin/washbasin
- `Pedestal` - Pedestal basin
- `WC` - Toilet

**Sample Mapping:**

| Filename | Product Slug | Description |
|----------|--------------|-------------|
| `A10BABYWC-12.jpg` | baby-wc | Baby WC toilet |
| `A25SMART-13.jpg` | smart-5 | Smart series |
| `A28JAZZ-17.jpg` | jazz-series | Jazz bathroom series |
| `A60NILA-08TOC.jpg` | nila | Nila series |
| `A65FLEXCENTERANG-12D.jpg` | flex-center-2 | Flex Center Angular |

---

### Gala Parts & Accessories

**Location:** `products/gala-parts/`

**Naming Patterns:**
- `C[5-6 digits].jpg` - Shower trays, columns, accessories
- `L[4 digits].jpg` - Larger fixtures
- `B[code].jpg` - Base units, cabinets
- `KO[code].jpg` - Toilet components

**Sample Categories:**

| Pattern | Category | Example |
|---------|----------|---------|
| `C63***` | Shower trays | `C63860-3.jpg` |
| `C38***` | Columns | `C3846301-2.jpg` |
| `L64**` | Integrated sinks | `L6414_12.jpg` |
| `B29**` | Base units | `B2903RLU06GDS_3.jpg` |

---

### Banos10 (Bathtubs & Spas - Spain)

**Location:** `products/banos10/`

**Naming Pattern:** `B10_[Type]_[Model].jpg`

**Types:**
- `Acrilica` - Acrylic bathtubs
- `Encastrada` - Built-in bathtubs
- `En2` - Freestanding bathtubs
- `SolidSurface` - Solid surface bathtubs
- `Spas` - Spa/whirlpool bathtubs

**Mapping:**

| Filename | Product Slug | Description |
|----------|--------------|-------------|
| `B10_Acrilica_Van.jpg` | van-4 | Van acrylic bathtub |
| `B10_Acrilica_Nor.jpg` | nor | Nor acrylic bathtub |
| `B10_Acrilica_Vela.jpg` | vela-2 | Vela acrylic bathtub |
| `B10_En2_Crab.jpg` | crab | Crab freestanding tub |
| `B10_En2_Duke.jpg` | duke-2 | Duke freestanding tub |
| `B10_Encastrada_Drop.jpg` | drop-2 | Drop built-in bathtub |
| `B10_Encastrada_Duet.jpg` | duet | Duet built-in bathtub |
| `B10_Encastrada_GB.jpg` | gb-2 | GB built-in bathtub |
| `B10_Encastrada_JazzL.jpg` | jazz-l | Jazz L built-in bathtub |
| `B10_Encastrada_JazzS.jpg` | jazz-s-6 | Jazz S built-in bathtub |
| `B10_encastrada_Cimbra.jpg` | cimbra-2 | Cimbra built-in |
| `B10_Spas_Formentera.jpg` | formentera | Formentera spa |
| `B10_Spas_Ibiza.jpg` | ibiza-6 | Ibiza spa |
| `B10_SolidSurface_Tay.jpg` | tay-2 | Tay solid surface |

---

### Pestan (Drainage Systems - Serbia)

**Location:** `products/pestan/`

**Naming Pattern:** `Confluo-[Line]-[variant].jpg`

**Product Lines:**
- `Confluo-Premium` - Premium linear drains
- `Confluo-Wall` - Wall-mounted drains
- `Confluo-Drops` - Point drains
- `Confluo-Tide` - Tide series drains

**Mapping:**

| Filename | Product Slug | Description |
|----------|--------------|-------------|
| `Confluo-Premium-line.jpg` | confluo-premium-line-elements | Premium line drain |
| `Confluo-Premium-slim.jpg` | confluo-premium-slim | Premium slim drain |
| `Confluo-Premium-gold.jpg` | - | Gold finish variant |
| `Confluo-Premium-black-glass.jpg` | - | Black glass variant |
| `Confluo-Wall.jpg` | - | Wall drain |

---

### Tiles (Miscellaneous)

**Location:** `products/tiles-misc/`

Tile images are named by collection and color.

**Collections Found:**

| Collection | Colors/Variants | Brand |
|------------|----------------|-------|
| Atacama | beige | Grespania |
| Atlas | beige, gris | Grespania |
| Avenue | negro | Grespania |
| Boston | cemento | Grespania |
| Calacata | (marble look) | Grespania |
| Cambridge | caramel | Grespania |
| Canaima | cipres | Grespania |
| Caucaso | cemento | Grespania |
| Cirene | amber, azul | Grespania |
| City | gris | Grespania |
| Coralina | - | Grespania |
| Creta | beige | Grespania |
| Cubana | bamboo, wengue | Grespania |
| Dock | gris | Grespania |
| Futura | nacar | Grespania |
| Garda | beige | Grespania |
| Lord | nijo | Grespania |
| Musa | rectangular gris | Grespania |
| Nancy | antracita | Grespania |
| Palace | palisandro blanco | Grespania |
| Pantagonia | fresno | Grespania |

---

## Catalog Scans

### Grespania Catalog

**Location:** `catalog-scans/grespania/`

9 pages from the GRESPANIA General Catalog 2018.
Files: `GRESPANIA-Catalogo-GENERAL-2018-baja_XXX.jpg`

### Bella Casa Catalog

**Location:** `catalog-scans/bella-casa/`

28 pages from the BELLACASA CERSAIE 2018 catalog.
Files: `BELLACASA-Catalogo-CERSAIE-2018-baja-LOW_XXX.jpg`

---

## Hero/Slider Images

**Location:** `hero/`

| Filename | Description |
|----------|-------------|
| `IMG_1715.jpg` | Showroom/product photo |
| `IMG_1760.jpg` | Showroom/product photo |
| `IMG_1814.jpg` | Showroom/product photo |
| `slider1-3.jpg` | Homepage slider |
| `slider5.jpg` | Homepage slider |
| `slider6.jpg` | Homepage slider |

---

## Logos

**Location:** `logos/`

| Filename | Brand |
|----------|-------|
| `geowags-logo-1.png` | Geowags (company) |
| `banos10.png` | Banos10 |
| `carysil.png` | Carysil |
| `Grespania-logo.png` | Grespania |
| `monto.png` | Monto (paints) |
| `pestan.png` | Pestan |
| `reginox.png` | Reginox |
| `vado.png` | Vado |
| `wesen-logo.png` | Wesen |

---

## About Page Images

**Location:** `about/`

| Filename | Description |
|----------|-------------|
| `about.jpg` | About section image |
| `aboutus-1.jpg` | Team/showroom photo |
| `aboutus-2.jpg` | Team/showroom photo (alt) |

---

## Team Photos

**Location:** `team/`

| Filename | Person | Role |
|----------|--------|------|
| `Mr.George.png` | Mr. George Wiafe-Agyekum | Founder & CEO |
| `mr.Kwame_.png` | Mr. Kwame Wiafe-Agyekum | Managing Director |
| `Mr.Eric_-1.png` | Mr. Eric Abrakwah | General Manager |

---

## Usage Notes

### Matching Images to Products

1. For **Carysil** sinks: Extract model name from filename, match to product slug
2. For **Vado/Kludi** taps: Use SKU numbers, may need catalog lookup
3. For **Gala** fixtures: Decode A-prefix codes using suffix hints (BTW, SUSPENDIDO, etc.)
4. For **Banos10**: Direct model name in filename after type prefix
5. For **Tiles**: Collection name + color directly in filename

### File Naming Notes

- Files ending in `-1.png` or `-2.jpg` are typically alternate views
- Some files have duplicate copies (with and without `-1` suffix)
- WordPress size variants (e.g., `-300x300.jpg`) were excluded

### Missing Mappings

Some products may not have corresponding images in this archive. Cross-reference with:
1. Existing `/public/images/products/` folder
2. Brand manufacturer websites
3. Product catalog PDFs
