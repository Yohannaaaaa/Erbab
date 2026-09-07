export type Locale = "tr" | "en";

type NavCopy = {
  vision: string;
  userTypes: string;
  features: string;
  categories: string;
  howItWorks: string;
  roadmap: string;
  cta: string;
};

type HeroCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
};

type VisionCopy = {
  title: string;
  body: string;
  mission: string;
};

type NamedItem = { title: string; description: string };

type UserTypesCopy = {
  title: string;
  subtitle: string;
  items: NamedItem[];
};

type FeaturesCopy = {
  title: string;
  subtitle: string;
  items: NamedItem[];
};

type CategoriesCopy = {
  title: string;
  subtitle: string;
  items: string[];
};

type HowItWorksCopy = {
  title: string;
  steps: NamedItem[];
};

type RoadmapPhase = { phase: string; region: string; strategy: string };

type RoadmapCopy = {
  title: string;
  phases: RoadmapPhase[];
};

type WaitlistCopy = {
  title: string;
  subtitle: string;
  emailPlaceholder: string;
  roleLabel: string;
  roles: string[];
  submit: string;
  successTitle: string;
  successBody: string;
  note: string;
};

type FooterCopy = {
  tagline: string;
  rights: string;
};

export type Translations = {
  nav: NavCopy;
  hero: HeroCopy;
  vision: VisionCopy;
  userTypes: UserTypesCopy;
  features: FeaturesCopy;
  categories: CategoriesCopy;
  howItWorks: HowItWorksCopy;
  roadmap: RoadmapCopy;
  waitlist: WaitlistCopy;
  footer: FooterCopy;
};

export const translations: Record<Locale, Translations> = {
  tr: {
    nav: {
      vision: "Vizyon",
      userTypes: "Kimler İçin",
      features: "Özellikler",
      categories: "Kategoriler",
      howItWorks: "Nasıl Çalışır",
      roadmap: "Yol Haritası",
      cta: "Erken Erişime Katıl",
    },
    hero: {
      eyebrow: "erbab.com",
      title: "Ustalığın Yeri Belli",
      subtitle:
        "Dünyadaki her bireyin kendi ustalığını, yeteneğini veya uzmanlığını global ölçekte sergileyebileceği tek çatı: zanaatkarlar, sanatçılar, geliştiriciler, sporcular, eğitmenler ve daha fazlası.",
      primaryCta: "Erken Erişime Katıl",
      secondaryCta: "Nasıl Çalışır?",
    },
    vision: {
      title: "Vizyon",
      body: "Behance, LinkedIn, Fiverr, Dribbble, Upwork, SoundCloud ve YouTube hepsi parçalı bir deneyim sunuyor. Erbab.com, disiplinler arası ve tamamen uzmanlık odaklı yapısıyla, yapay zekâ destekli profil eşleştirme ve vitrin sistemiyle hepsini tek bir çatı altında topluyor.",
      mission: "Misyonumuz: ustaları keşfetmek, desteklemek ve iş, mentorluk ve eğitim gibi fırsatlarla buluşturmak.",
    },
    userTypes: {
      title: "Kimler İçin",
      subtitle: "Üç kullanıcı tipi, tek platform.",
      items: [
        {
          title: "Erbab (Usta)",
          description:
            "Zanaatkarlar, sanatçılar, geliştiriciler, sporcular, eğitmenler ve her alandan yetenekli bireyler — kendi vitrinini oluşturur.",
        },
        {
          title: "Gözlemci",
          description: "Takipçi, işveren, sponsor veya mentor — ustaları keşfeder, takip eder ve etkileşime geçer.",
        },
        {
          title: "İşveren / Proje Sahibi",
          description: "Freelance iş veya proje teklifi sunar, doğru ustayla eşleşir.",
        },
      ],
    },
    features: {
      title: "Platform Özellikleri",
      subtitle: "MVP sürümünün temel yapı taşları.",
      items: [
        { title: "Profil Sistemi", description: "Yetkinlik, portfolyo, değerlendirme ve kanıt belgeleriyle detaylı profil." },
        { title: "Vitrin", description: "Her usta kendi alanında bir vitrin oluşturur: video, yazı, proje, sertifika." },
        { title: "Kategori Sistemi", description: "Her ustalık alanı için özel alt kategoriler." },
        { title: "Sosyal Yorumlama", description: "Beğeni, yorum, takip etme, çıraklık teklif et, iş birliği öner." },
        { title: "İş Eşleştirme", description: "Freelancer tarzı proje teklif sistemi." },
        { title: "Eğitim & Mentorluk", description: "Ustalar eğitim açabilir, mentor olabilir." },
        { title: "Dil Desteği", description: "Otomatik çeviri altyapısı ile küresel erişim." },
        { title: "AI Öneri Sistemi", description: "Profile ve ilgi alanlarına göre usta, mentor ve proje önerileri." },
      ],
    },
    categories: {
      title: "Kategoriler",
      subtitle: "Disiplinler arası, tamamen ustalık odaklı.",
      items: [
        "Zanaat & El Sanatları",
        "Sanat & Tasarım",
        "Yazılım & Teknoloji",
        "Spor",
        "Müzik",
        "Eğitim & Danışmanlık",
        "Marangozluk",
        "Bilim",
      ],
    },
    howItWorks: {
      title: "Nasıl Çalışır",
      steps: [
        { title: "Profilini Oluştur", description: "Yetkinliklerini, portfolyonu ve kanıt belgelerini ekle." },
        { title: "Vitrinini Sergile", description: "Video, proje, sertifika yükleyerek ustalığını göster." },
        { title: "Keşfedil & Eşleş", description: "AI destekli öneri sistemiyle doğru kişilerle buluş." },
        { title: "Büyü", description: "İş, mentorluk ve eğitim fırsatlarıyla ustalığını değere dönüştür." },
      ],
    },
    roadmap: {
      title: "Global Büyüme Yol Haritası",
      phases: [
        { phase: "1. Aşama", region: "Türkiye, MENA", strategy: "Yerel iş birlikleri, ustalık kültürü" },
        { phase: "2. Aşama", region: "Avrupa, Hindistan", strategy: "Geniş yetenek havuzu" },
        { phase: "3. Aşama", region: "Latin Amerika, Afrika", strategy: "Mikro girişimciler için büyük fırsat" },
        { phase: "4. Aşama", region: "Kuzey Amerika", strategy: "Yatırım ve global pazarlama" },
      ],
    },
    waitlist: {
      title: "Erken Erişime Katıl",
      subtitle: "Erbab.com yayına girdiğinde ilk sen haberdar ol.",
      emailPlaceholder: "E-posta adresin",
      roleLabel: "Sen kimsin?",
      roles: ["Erbab (Usta)", "Gözlemci", "İşveren"],
      submit: "Kaydol",
      successTitle: "Teşekkürler!",
      successBody: "Listeye eklendin. Lansman haberlerini ilk sen alacaksın.",
      note: "Not: Bu form henüz canlı bir sunucuya bağlı değildir — erken tanıtım amaçlıdır.",
    },
    footer: {
      tagline: "Erbabını Bul, Erbab Ol.",
      rights: "Tüm hakları saklıdır.",
    },
  },
  en: {
    nav: {
      vision: "Vision",
      userTypes: "Who It's For",
      features: "Features",
      categories: "Categories",
      howItWorks: "How It Works",
      roadmap: "Roadmap",
      cta: "Join Early Access",
    },
    hero: {
      eyebrow: "erbab.com",
      title: "Your Mastery Has a Home",
      subtitle:
        "The single global platform where every individual can showcase their craft, talent, or expertise: craftspeople, artists, developers, athletes, educators, and more.",
      primaryCta: "Join Early Access",
      secondaryCta: "How It Works",
    },
    vision: {
      title: "Vision",
      body: "Behance, LinkedIn, Fiverr, Dribbble, Upwork, SoundCloud, and YouTube each offer a fragmented experience. Erbab.com brings them together under one roof with a cross-discipline, mastery-first structure and AI-powered profile matching and showcasing.",
      mission: "Our mission: discover masters, support them, and connect them with jobs, mentorship, and education opportunities.",
    },
    userTypes: {
      title: "Who It's For",
      subtitle: "Three user types, one platform.",
      items: [
        {
          title: "Erbab (Master)",
          description:
            "Craftspeople, artists, developers, athletes, educators, and talented individuals from every field — builds their own showcase.",
        },
        {
          title: "Observer",
          description: "Followers, employers, sponsors, or mentors — discover masters, follow them, and engage.",
        },
        {
          title: "Employer / Project Owner",
          description: "Posts freelance work or project offers and gets matched with the right master.",
        },
      ],
    },
    features: {
      title: "Platform Features",
      subtitle: "Core building blocks of the MVP.",
      items: [
        { title: "Profile System", description: "Detailed profile with skills, portfolio, reviews, and proof of credentials." },
        { title: "Showcase", description: "Every master builds a showcase in their field: video, writing, projects, certificates." },
        { title: "Category System", description: "Dedicated subcategories for every field of mastery." },
        { title: "Social Interaction", description: "Like, comment, follow, offer apprenticeship, propose collaboration." },
        { title: "Job Matching", description: "Freelancer-style project offer system." },
        { title: "Education & Mentorship", description: "Masters can run courses and become mentors." },
        { title: "Language Support", description: "Automatic translation infrastructure for global reach." },
        { title: "AI Recommendations", description: "Master, mentor, and project suggestions based on profile and interests." },
      ],
    },
    categories: {
      title: "Categories",
      subtitle: "Cross-discipline, entirely mastery-focused.",
      items: [
        "Craft & Handiwork",
        "Art & Design",
        "Software & Technology",
        "Sports",
        "Music",
        "Education & Consulting",
        "Woodworking",
        "Science",
      ],
    },
    howItWorks: {
      title: "How It Works",
      steps: [
        { title: "Build Your Profile", description: "Add your skills, portfolio, and proof of credentials." },
        { title: "Showcase Your Craft", description: "Upload videos, projects, and certificates to show your mastery." },
        { title: "Get Discovered & Matched", description: "Meet the right people through AI-powered recommendations." },
        { title: "Grow", description: "Turn your mastery into value through jobs, mentorship, and education." },
      ],
    },
    roadmap: {
      title: "Global Growth Roadmap",
      phases: [
        { phase: "Phase 1", region: "Turkey, MENA", strategy: "Local partnerships, craft culture" },
        { phase: "Phase 2", region: "Europe, India", strategy: "Broad talent pool" },
        { phase: "Phase 3", region: "Latin America, Africa", strategy: "Major opportunity for micro-entrepreneurs" },
        { phase: "Phase 4", region: "North America", strategy: "Investment and global marketing" },
      ],
    },
    waitlist: {
      title: "Join Early Access",
      subtitle: "Be the first to know when Erbab.com launches.",
      emailPlaceholder: "Your email address",
      roleLabel: "Who are you?",
      roles: ["Erbab (Master)", "Observer", "Employer"],
      submit: "Sign Up",
      successTitle: "Thank you!",
      successBody: "You're on the list. You'll be the first to hear our launch news.",
      note: "Note: this form isn't wired to a live server yet — it's for early outreach only.",
    },
    footer: {
      tagline: "Find Your Master. Become One.",
      rights: "All rights reserved.",
    },
  },
};
