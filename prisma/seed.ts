import "dotenv/config";
import { PrismaClient } from "@prisma/client";

// For Prisma 7, we need to pass the config via adapter or environment
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.productImage.deleteMany();
  await prisma.productColor.deleteMany();
  await prisma.productSize.deleteMany();
  await prisma.productFinish.deleteMany();
  await prisma.product.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.category.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.siteSetting.deleteMany();

  // Create Categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Tiles",
        slug: "tiles",
        description: "Premium floor and wall tiles for every space",
        sortOrder: 1,
      },
    }),
    prisma.category.create({
      data: {
        name: "Bathroom Fixtures",
        slug: "bathroom-fixtures",
        description: "Elegant fixtures for modern bathrooms",
        sortOrder: 2,
      },
    }),
    prisma.category.create({
      data: {
        name: "Kitchen & Dining",
        slug: "kitchen-dining",
        description: "Quality kitchenware and dining essentials",
        sortOrder: 3,
      },
    }),
    prisma.category.create({
      data: {
        name: "Home Decor",
        slug: "home-decor",
        description: "Beautiful accents for your living spaces",
        sortOrder: 4,
      },
    }),
  ]);

  console.log(`✅ Created ${categories.length} categories`);

  // Create Collections
  const collections = await Promise.all([
    prisma.collection.create({
      data: {
        name: "Luxury Marble",
        slug: "luxury-marble",
        description: "Timeless marble designs for sophisticated spaces",
        isFeatured: true,
        sortOrder: 1,
      },
    }),
    prisma.collection.create({
      data: {
        name: "Modern Bath",
        slug: "modern-bath",
        description: "Contemporary bathroom solutions",
        isFeatured: true,
        sortOrder: 2,
      },
    }),
    prisma.collection.create({
      data: {
        name: "Contemporary",
        slug: "contemporary",
        description: "Modern designs for today's homes",
        isFeatured: false,
        sortOrder: 3,
      },
    }),
    prisma.collection.create({
      data: {
        name: "Wood Look",
        slug: "wood-look",
        description: "Natural wood aesthetics in durable materials",
        isFeatured: true,
        sortOrder: 4,
      },
    }),
    prisma.collection.create({
      data: {
        name: "Classic",
        slug: "classic",
        description: "Timeless designs that never go out of style",
        isFeatured: false,
        sortOrder: 5,
      },
    }),
  ]);

  console.log(`✅ Created ${collections.length} collections`);

  // Create Products
  const tilesCategory = categories[0];
  const bathroomCategory = categories[1];
  const luxuryMarbleCollection = collections[0];
  const modernBathCollection = collections[1];
  const contemporaryCollection = collections[2];
  const woodLookCollection = collections[3];

  const products = await Promise.all([
    // Tile Products
    prisma.product.create({
      data: {
        name: "Carrara White Marble Tile",
        slug: "carrara-white-marble-tile",
        description: "Elevate your space with the timeless elegance of Carrara White Marble Tiles. These premium tiles feature the classic white background with subtle grey veining that has made Carrara marble a favorite of architects and designers for centuries.",
        specifications: JSON.stringify({
          material: "Natural Marble",
          finish: "Polished",
          thickness: "10mm",
          origin: "Italy",
          usage: "Indoor/Outdoor",
          waterAbsorption: "< 0.5%",
        }),
        categoryId: tilesCategory.id,
        collectionId: luxuryMarbleCollection.id,
        isFeatured: true,
        isNew: true,
        images: {
          create: [
            { url: "/images/products/tile-1.jpg", alt: "Carrara White Marble Tile", isPrimary: true, sortOrder: 1 },
          ],
        },
        colors: {
          create: [
            { name: "White", hexCode: "#FFFFFF" },
            { name: "Grey", hexCode: "#808080" },
          ],
        },
        sizes: {
          create: [
            { name: "30x30 cm", dimensions: "300mm x 300mm x 10mm" },
            { name: "60x60 cm", dimensions: "600mm x 600mm x 10mm" },
            { name: "60x120 cm", dimensions: "600mm x 1200mm x 10mm" },
          ],
        },
        finishes: {
          create: [
            { name: "Polished" },
            { name: "Honed" },
            { name: "Brushed" },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Hexagon Cement Tiles",
        slug: "hexagon-cement-tiles",
        description: "Add geometric interest to your floors and walls with our Hexagon Cement Tiles. Handcrafted using traditional methods, each tile brings unique character and artisanal quality to your space.",
        specifications: JSON.stringify({
          material: "Cement",
          finish: "Matte",
          thickness: "16mm",
          origin: "Morocco",
          usage: "Indoor",
        }),
        categoryId: tilesCategory.id,
        collectionId: contemporaryCollection.id,
        isFeatured: true,
        isNew: true,
        images: {
          create: [
            { url: "/images/products/tile-2.jpg", alt: "Hexagon Cement Tiles", isPrimary: true, sortOrder: 1 },
          ],
        },
        colors: {
          create: [
            { name: "Charcoal", hexCode: "#36454F" },
            { name: "Terracotta", hexCode: "#E2725B" },
            { name: "Blue", hexCode: "#4169E1" },
          ],
        },
        sizes: {
          create: [
            { name: "20x23 cm", dimensions: "200mm x 230mm x 16mm" },
          ],
        },
        finishes: {
          create: [
            { name: "Matte" },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Porcelain Wood Plank",
        slug: "porcelain-wood-plank",
        description: "Get the warmth and beauty of hardwood with the durability of porcelain. Our Wood Plank tiles feature realistic grain patterns and textures that are virtually indistinguishable from real wood.",
        specifications: JSON.stringify({
          material: "Porcelain",
          finish: "Textured",
          thickness: "9mm",
          origin: "Spain",
          usage: "Indoor/Outdoor",
          waterAbsorption: "< 0.1%",
        }),
        categoryId: tilesCategory.id,
        collectionId: woodLookCollection.id,
        isFeatured: false,
        isNew: false,
        images: {
          create: [
            { url: "/images/products/tile-3.jpg", alt: "Porcelain Wood Plank", isPrimary: true, sortOrder: 1 },
          ],
        },
        colors: {
          create: [
            { name: "Oak", hexCode: "#D4A76A" },
            { name: "Walnut", hexCode: "#5D432C" },
            { name: "Grey Oak", hexCode: "#A9A9A9" },
          ],
        },
        sizes: {
          create: [
            { name: "20x120 cm", dimensions: "200mm x 1200mm x 9mm" },
            { name: "15x90 cm", dimensions: "150mm x 900mm x 9mm" },
          ],
        },
        finishes: {
          create: [
            { name: "Textured" },
            { name: "Matte" },
          ],
        },
      },
    }),
    // Bathroom Products
    prisma.product.create({
      data: {
        name: "Modern Rainfall Shower Set",
        slug: "modern-rainfall-shower-set",
        description: "Transform your daily shower into a spa-like experience with our Modern Rainfall Shower Set. Features a generous overhead rain shower head and convenient hand shower.",
        specifications: JSON.stringify({
          material: "Stainless Steel",
          finish: "Chrome",
          showerHeadDiameter: "30cm",
          handShowerModes: "3",
          warranty: "5 years",
        }),
        categoryId: bathroomCategory.id,
        collectionId: modernBathCollection.id,
        isFeatured: true,
        isNew: false,
        images: {
          create: [
            { url: "/images/products/shower-1.jpg", alt: "Modern Rainfall Shower Set", isPrimary: true, sortOrder: 1 },
          ],
        },
        colors: {
          create: [
            { name: "Chrome", hexCode: "#C0C0C0" },
            { name: "Matte Black", hexCode: "#28282B" },
            { name: "Brushed Gold", hexCode: "#CFB53B" },
          ],
        },
        sizes: {
          create: [
            { name: "Standard", dimensions: "30cm head" },
            { name: "Large", dimensions: "40cm head" },
          ],
        },
        finishes: {
          create: [
            { name: "Polished" },
            { name: "Matte" },
            { name: "Brushed" },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Freestanding Bathtub Elite",
        slug: "freestanding-bathtub-elite",
        description: "Make a statement with our Freestanding Bathtub Elite. This sculptural piece combines ergonomic comfort with stunning contemporary design.",
        specifications: JSON.stringify({
          material: "Acrylic",
          capacity: "250L",
          dimensions: "170x80x60 cm",
          weight: "45kg",
          warranty: "10 years",
        }),
        categoryId: bathroomCategory.id,
        collectionId: modernBathCollection.id,
        isFeatured: true,
        isNew: false,
        images: {
          create: [
            { url: "/images/products/bathtub-1.jpg", alt: "Freestanding Bathtub Elite", isPrimary: true, sortOrder: 1 },
          ],
        },
        colors: {
          create: [
            { name: "White", hexCode: "#FFFFFF" },
            { name: "Black", hexCode: "#000000" },
          ],
        },
        sizes: {
          create: [
            { name: "Standard", dimensions: "170x80x60 cm" },
            { name: "Large", dimensions: "180x85x65 cm" },
          ],
        },
        finishes: {
          create: [
            { name: "Glossy" },
            { name: "Matte" },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Vessel Sink Basin",
        slug: "vessel-sink-basin",
        description: "Add a touch of artistry to your bathroom with our Vessel Sink Basin. The elegant bowl shape sits atop your vanity, creating a stunning focal point.",
        specifications: JSON.stringify({
          material: "Ceramic",
          dimensions: "45x45x15 cm",
          drainType: "Pop-up",
          installation: "Above counter",
          warranty: "5 years",
        }),
        categoryId: bathroomCategory.id,
        collectionId: modernBathCollection.id,
        isFeatured: true,
        isNew: true,
        images: {
          create: [
            { url: "/images/products/sink-1.jpg", alt: "Vessel Sink Basin", isPrimary: true, sortOrder: 1 },
          ],
        },
        colors: {
          create: [
            { name: "White", hexCode: "#FFFFFF" },
            { name: "Stone Grey", hexCode: "#928E85" },
          ],
        },
        sizes: {
          create: [
            { name: "Medium", dimensions: "45x45x15 cm" },
            { name: "Large", dimensions: "55x55x18 cm" },
          ],
        },
        finishes: {
          create: [
            { name: "Glossy" },
            { name: "Matte" },
          ],
        },
      },
    }),
  ]);

  console.log(`✅ Created ${products.length} products`);

  // Create Admin User
  const admin = await prisma.admin.create({
    data: {
      email: "admin@geowags.com",
      password: "hashed_password_here", // In production, use proper password hashing
      name: "Admin User",
      role: "admin",
    },
  });

  console.log(`✅ Created admin user: ${admin.email}`);

  // Create Site Settings
  await prisma.siteSetting.createMany({
    data: [
      { key: "site_name", value: "Geowags" },
      { key: "site_tagline", value: "Premier Housewares & Tiles" },
      { key: "contact_email", value: "info@geowags.com" },
      { key: "contact_phone", value: "+233 XX XXX XXXX" },
      { key: "address", value: "Accra, Ghana" },
    ],
  });

  console.log(`✅ Created site settings`);

  console.log("\n🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
