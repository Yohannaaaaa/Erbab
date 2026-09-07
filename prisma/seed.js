const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const DEMO_PASSWORD = "demo12345";

const masters = [
  {
    name: "Elif Demir",
    email: "elif.demir@erbab.demo",
    title: "Ressam",
    category: "Sanat",
    location: "İstanbul, Türkiye",
    yearsExperience: 9,
    skills: "Yağlı Boya, Portre, Sergi Küratörlüğü",
    bio: "Çağdaş portre resmi üzerine çalışan, İstanbul merkezli bir ressamım. Eserlerim çeşitli galerilerde sergilendi.",
    portfolio: [
      { type: "IMAGE", title: "Şehir Işıkları Serisi", description: "12 parçalık yağlı boya koleksiyonu." },
      { type: "CERTIFICATE", title: "Mimar Sinan GSÜ Resim Bölümü" },
    ],
  },
  {
    name: "Marco Bianchi",
    email: "marco.bianchi@erbab.demo",
    title: "Şef",
    category: "Gastronomi",
    location: "Lyon, Fransa",
    yearsExperience: 14,
    skills: "Fransız Mutfağı, Menü Tasarımı, Mentorluk",
    bio: "Lyon'da butik bir restoranın şefiyim, genç aşçılara mentorluk yapmaktan keyif alıyorum.",
    portfolio: [{ type: "PROJECT", title: "Mevsimsel Tadım Menüsü 2025" }],
  },
  {
    name: "Luca Rossi",
    email: "luca.rossi@erbab.demo",
    title: "Ahşap Ustası",
    category: "Zanaat",
    location: "Floransa, İtalya",
    yearsExperience: 20,
    skills: "Marangozluk, Restorasyon, El Oymacılığı",
    bio: "Geleneksel İtalyan marangozluk tekniklerini modern mobilya tasarımıyla birleştiriyorum.",
    portfolio: [{ type: "IMAGE", title: "El Yapımı Ceviz Sehpa" }],
  },
  {
    name: "Sofia Müller",
    email: "sofia.muller@erbab.demo",
    title: "Keman Sanatçısı",
    category: "Müzik",
    location: "Berlin, Almanya",
    yearsExperience: 16,
    skills: "Klasik Müzik, Oda Müziği, Eğitmenlik",
    bio: "Berlin Filarmoni ile çalışan keman sanatçısıyım, aynı zamanda özel keman dersleri veriyorum.",
    portfolio: [{ type: "VIDEO", title: "Bach Solo Partita No. 2 Kaydı" }],
  },
  {
    name: "Arjun Kumar",
    email: "arjun.kumar@erbab.demo",
    title: "Yazılım Geliştirici",
    category: "Teknoloji",
    location: "Bengaluru, Hindistan",
    yearsExperience: 7,
    skills: "React, Node.js, Sistem Tasarımı",
    bio: "Ölçeklenebilir web platformları geliştiren full-stack yazılımcıyım.",
    portfolio: [
      { type: "PROJECT", title: "Fintech Ödeme Altyapısı", url: "https://example.com" },
      { type: "PROJECT", title: "Açık Kaynak UI Kit" },
    ],
  },
  {
    name: "Emily Scott",
    email: "emily.scott@erbab.demo",
    title: "Fitness Eğitmeni",
    category: "Spor",
    location: "Austin, ABD",
    yearsExperience: 10,
    skills: "Kuvvet Antrenmanı, Beslenme Danışmanlığı",
    bio: "Kişiye özel antrenman programlarıyla sporculara ve amatörlere rehberlik ediyorum.",
    portfolio: [{ type: "TEXT", title: "12 Haftalık Dönüşüm Programı" }],
  },
];

async function main() {
  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);

  for (const master of masters) {
    const slug = master.name
      .toLowerCase()
      .replace(/ç/g, "c")
      .replace(/ğ/g, "g")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ş/g, "s")
      .replace(/ü/g, "u")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const user = await prisma.user.upsert({
      where: { email: master.email },
      update: {},
      create: {
        name: master.name,
        email: master.email,
        passwordHash,
        role: "ERBAB",
        profile: {
          create: {
            slug,
            title: master.title,
            category: master.category,
            location: master.location,
            yearsExperience: master.yearsExperience,
            skills: master.skills,
            bio: master.bio,
          },
        },
      },
      include: { profile: true },
    });

    const profileId = user.profile?.id;
    if (!profileId) continue;

    for (const item of master.portfolio) {
      await prisma.portfolioItem.create({
        data: {
          profileId,
          type: item.type,
          title: item.title,
          description: item.description ?? null,
          url: item.url ?? null,
        },
      });
    }
  }

  console.log(`Seeded ${masters.length} demo Erbab profiles.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
