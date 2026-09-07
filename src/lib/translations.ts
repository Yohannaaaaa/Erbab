export type Locale = "tr" | "en";

type NavCopy = {
  discover: string;
  howItWorks: string;
  features: string;
  about: string;
  login: string;
  register: string;
  panel: string;
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

type StatsCopy = {
  eyebrow: string;
  items: { value: string; label: string }[];
};

type DiscoverCopy = {
  placeholder: string;
  allCategories: string;
  allCountries: string;
  submit: string;
};

type FeaturedMastersCopy = {
  title: string;
  subtitle: string;
  viewAll: string;
  empty: string;
};

type PromoCopy = {
  items: { title: string; description: string; cta: string; href: string }[];
};

type WaitlistCopy = {
  title: string;
  subtitle: string;
  submit: string;
  browseCta: string;
  note: string;
};

type FooterCopy = {
  tagline: string;
  rights: string;
  about: string;
  privacy: string;
  terms: string;
  contact: string;
};

type AuthCopy = {
  registerTitle: string;
  registerSubtitle: string;
  loginTitle: string;
  loginSubtitle: string;
  nameLabel: string;
  emailLabel: string;
  passwordLabel: string;
  roleLabel: string;
  roles: { value: "ERBAB" | "GOZLEMCI" | "ISVEREN"; label: string; description: string }[];
  registerSubmit: string;
  loginSubmit: string;
  hasAccount: string;
  noAccount: string;
  loginLink: string;
  registerLink: string;
  genericError: string;
  googleCta: string;
  orDivider: string;
  oauthError: string;
};

type PanelCopy = {
  welcome: string;
  roleLabels: Record<"ERBAB" | "GOZLEMCI" | "ISVEREN", string>;
  viewShowcase: string;
  editProfile: string;
  logout: string;
  noProfileYet: string;
  editTitle: string;
  titleLabel: string;
  bioLabel: string;
  locationLabel: string;
  categoryLabel: string;
  skillsLabel: string;
  skillsHint: string;
  experienceLabel: string;
  save: string;
  saved: string;
  portfolioTitle: string;
  portfolioEmpty: string;
  addItem: string;
  itemTypeLabel: string;
  itemTypes: Record<"VIDEO" | "IMAGE" | "CERTIFICATE" | "PROJECT" | "TEXT", string>;
  itemTitleLabel: string;
  itemUrlLabel: string;
  itemDescriptionLabel: string;
  add: string;
  remove: string;
};

type VitrinCopy = {
  notFoundTitle: string;
  notFoundBody: string;
  backHome: string;
  yearsExperience: string;
  portfolioTitle: string;
  empty: string;
  offerJob: string;
  follow: string;
  proposeCollab: string;
  comingSoon: string;
  memberSince: string;
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
  stats: StatsCopy;
  discover: DiscoverCopy;
  featuredMasters: FeaturedMastersCopy;
  promo: PromoCopy;
  waitlist: WaitlistCopy;
  auth: AuthCopy;
  panel: PanelCopy;
  vitrin: VitrinCopy;
  footer: FooterCopy;
};

export const translations: Record<Locale, Translations> = {
  tr: {
    nav: {
      discover: "Keşfet",
      howItWorks: "Nasıl Çalışır",
      features: "Özellikler",
      about: "Hakkımızda",
      login: "Giriş Yap",
      register: "Kayıt Ol",
      panel: "Panelim",
    },
    hero: {
      eyebrow: "erbab.com",
      title: "Ustalığın Yeri Belli",
      subtitle:
        "Dünyadaki her bireyin kendi ustalığını, yeteneğini veya uzmanlığını global ölçekte sergileyebileceği tek çatı: zanaatkarlar, sanatçılar, geliştiriciler, sporcular, eğitmenler ve daha fazlası.",
      primaryCta: "Hemen Katıl",
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
    stats: {
      eyebrow: "2026 Hedeflerimiz",
      items: [
        { value: "100K+", label: "Kayıtlı Kullanıcı" },
        { value: "5K+", label: "İş Eşleşmesi" },
        { value: "20K+", label: "Aktif Vitrin" },
        { value: "50+", label: "Ülke" },
        { value: "Sınırsız", label: "Fırsat" },
      ],
    },
    discover: {
      placeholder: "Hangi ustalığı arıyorsunuz?",
      allCategories: "Tüm Kategoriler",
      allCountries: "Tüm Ülkeler",
      submit: "Ara",
    },
    featuredMasters: {
      title: "Öne Çıkan Ustalar",
      subtitle: "Dünyanın dört bir yanından ilham veren yetenekler.",
      viewAll: "Tüm Ustaları Keşfet",
      empty: "Henüz bir Erbab profili yok — ilk sen ol.",
    },
    promo: {
      items: [
        {
          title: "Bilgini Paylaş, Geleceği Şekillendir",
          description: "Eğitim aç, mentor ol, yeni nesillere ilham ver.",
          cta: "Erbab Ol",
          href: "/kayit",
        },
        {
          title: "Doğru İnsanlarla Doğru Projelere",
          description: "Ustaları keşfet ve projen için doğru yetenekle eşleş.",
          cta: "Ustaları Keşfet",
          href: "/ustalar",
        },
        {
          title: "Sınır Yok, Fırsat Çok",
          description: "50'den fazla ülkeden kullanıcılarla global bir topluluğa katıl.",
          cta: "Erbab'a Katıl",
          href: "/kayit",
        },
      ],
    },
    waitlist: {
      title: "Sen de Erbab Ol",
      subtitle: "Ustalığını bugün sergilemeye başla ya da doğru yeteneği keşfet.",
      submit: "Ücretsiz Kaydol",
      browseCta: "Ustaları Keşfet",
      note: "erbab.com şu anda erken geliştirme aşamasındadır.",
    },
    footer: {
      tagline: "Erbabını Bul, Erbab Ol.",
      rights: "Tüm hakları saklıdır.",
      about: "Hakkımızda",
      privacy: "Gizlilik Politikası",
      terms: "Kullanım Şartları",
      contact: "İletişim",
    },
    auth: {
      registerTitle: "Hesap Oluştur",
      registerSubtitle: "Ustalığını sergilemeye bugün başla.",
      loginTitle: "Giriş Yap",
      loginSubtitle: "Hesabına dön ve ustalığına devam et.",
      nameLabel: "Ad Soyad",
      emailLabel: "E-posta",
      passwordLabel: "Şifre",
      roleLabel: "Sen kimsin?",
      roles: [
        { value: "ERBAB", label: "Erbab (Usta)", description: "Kendi vitrinimi oluşturmak istiyorum." },
        { value: "GOZLEMCI", label: "Gözlemci", description: "Ustaları keşfetmek ve takip etmek istiyorum." },
        { value: "ISVEREN", label: "İşveren", description: "Proje için usta arıyorum." },
      ],
      registerSubmit: "Kayıt Ol",
      loginSubmit: "Giriş Yap",
      hasAccount: "Zaten hesabın var mı?",
      noAccount: "Hesabın yok mu?",
      loginLink: "Giriş yap",
      registerLink: "Kayıt ol",
      genericError: "Bir şeyler ters gitti, tekrar dene.",
      googleCta: "Google ile Devam Et",
      orDivider: "veya",
      oauthError: "Google ile giriş başarısız oldu, tekrar dene.",
    },
    panel: {
      welcome: "Hoş geldin",
      roleLabels: { ERBAB: "Erbab (Usta)", GOZLEMCI: "Gözlemci", ISVEREN: "İşveren" },
      viewShowcase: "Vitrinimi Görüntüle",
      editProfile: "Profili Düzenle",
      logout: "Çıkış Yap",
      noProfileYet: "Vitrin sayfası yalnızca Erbab hesapları için oluşturulur.",
      editTitle: "Vitrinini Düzenle",
      titleLabel: "Unvan",
      bioLabel: "Hakkında",
      locationLabel: "Konum",
      categoryLabel: "Kategori",
      skillsLabel: "Yetenekler",
      skillsHint: "Virgülle ayırarak yaz, örn: Logo Tasarım, İllüstrasyon",
      experienceLabel: "Deneyim (yıl)",
      save: "Kaydet",
      saved: "Kaydedildi.",
      portfolioTitle: "Çalışmaların",
      portfolioEmpty: "Henüz bir çalışma eklemedin.",
      addItem: "Çalışma Ekle",
      itemTypeLabel: "Tür",
      itemTypes: { VIDEO: "Video", IMAGE: "Görsel", CERTIFICATE: "Sertifika", PROJECT: "Proje", TEXT: "Yazı" },
      itemTitleLabel: "Başlık",
      itemUrlLabel: "Bağlantı",
      itemDescriptionLabel: "Açıklama",
      add: "Ekle",
      remove: "Sil",
    },
    vitrin: {
      notFoundTitle: "Vitrin bulunamadı",
      notFoundBody: "Aradığın Erbab profili mevcut değil.",
      backHome: "Ana Sayfaya Dön",
      yearsExperience: "yıllık deneyim",
      portfolioTitle: "Çalışmalar",
      empty: "Bu Erbab henüz bir çalışma eklemedi.",
      offerJob: "İş Teklifi Gönder",
      follow: "Takip Et",
      proposeCollab: "İş Birliği Öner",
      comingSoon: "Bu özellik yakında aktif olacak.",
      memberSince: "Katılım",
    },
  },
  en: {
    nav: {
      discover: "Discover",
      howItWorks: "How It Works",
      features: "Features",
      about: "About",
      login: "Log In",
      register: "Sign Up",
      panel: "My Panel",
    },
    hero: {
      eyebrow: "erbab.com",
      title: "Your Mastery Has a Home",
      subtitle:
        "The single global platform where every individual can showcase their craft, talent, or expertise: craftspeople, artists, developers, athletes, educators, and more.",
      primaryCta: "Join Now",
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
    stats: {
      eyebrow: "Our 2026 Goals",
      items: [
        { value: "100K+", label: "Registered Users" },
        { value: "5K+", label: "Job Matches" },
        { value: "20K+", label: "Active Showcases" },
        { value: "50+", label: "Countries" },
        { value: "Unlimited", label: "Opportunity" },
      ],
    },
    discover: {
      placeholder: "What mastery are you looking for?",
      allCategories: "All Categories",
      allCountries: "All Countries",
      submit: "Search",
    },
    featuredMasters: {
      title: "Featured Masters",
      subtitle: "Inspiring talent from every corner of the world.",
      viewAll: "Browse All Masters",
      empty: "No Erbab profile yet — be the first.",
    },
    promo: {
      items: [
        {
          title: "Share Your Knowledge, Shape the Future",
          description: "Launch a course, become a mentor, inspire the next generation.",
          cta: "Become an Erbab",
          href: "/kayit",
        },
        {
          title: "The Right People for the Right Projects",
          description: "Discover masters and get matched with the right talent for your project.",
          cta: "Browse Masters",
          href: "/ustalar",
        },
        {
          title: "No Borders, Endless Opportunity",
          description: "Join a global community with members from 50+ countries.",
          cta: "Join Erbab",
          href: "/kayit",
        },
      ],
    },
    waitlist: {
      title: "Become an Erbab",
      subtitle: "Start showcasing your mastery today, or discover the right talent.",
      submit: "Sign Up Free",
      browseCta: "Browse Masters",
      note: "erbab.com is currently in early development.",
    },
    footer: {
      tagline: "Find Your Master. Become One.",
      rights: "All rights reserved.",
      about: "About",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      contact: "Contact",
    },
    auth: {
      registerTitle: "Create Your Account",
      registerSubtitle: "Start showcasing your mastery today.",
      loginTitle: "Log In",
      loginSubtitle: "Welcome back — continue your craft.",
      nameLabel: "Full Name",
      emailLabel: "Email",
      passwordLabel: "Password",
      roleLabel: "Who are you?",
      roles: [
        { value: "ERBAB", label: "Erbab (Master)", description: "I want to build my own showcase." },
        { value: "GOZLEMCI", label: "Observer", description: "I want to discover and follow masters." },
        { value: "ISVEREN", label: "Employer", description: "I'm looking for a master for a project." },
      ],
      registerSubmit: "Sign Up",
      loginSubmit: "Log In",
      hasAccount: "Already have an account?",
      noAccount: "Don't have an account?",
      loginLink: "Log in",
      registerLink: "Sign up",
      genericError: "Something went wrong, please try again.",
      googleCta: "Continue with Google",
      orDivider: "or",
      oauthError: "Google sign-in failed, please try again.",
    },
    panel: {
      welcome: "Welcome",
      roleLabels: { ERBAB: "Erbab (Master)", GOZLEMCI: "Observer", ISVEREN: "Employer" },
      viewShowcase: "View My Showcase",
      editProfile: "Edit Profile",
      logout: "Log Out",
      noProfileYet: "A showcase page is only created for Erbab accounts.",
      editTitle: "Edit Your Showcase",
      titleLabel: "Title",
      bioLabel: "About",
      locationLabel: "Location",
      categoryLabel: "Category",
      skillsLabel: "Skills",
      skillsHint: "Separate with commas, e.g. Logo Design, Illustration",
      experienceLabel: "Experience (years)",
      save: "Save",
      saved: "Saved.",
      portfolioTitle: "Your Work",
      portfolioEmpty: "You haven't added any work yet.",
      addItem: "Add Work",
      itemTypeLabel: "Type",
      itemTypes: { VIDEO: "Video", IMAGE: "Image", CERTIFICATE: "Certificate", PROJECT: "Project", TEXT: "Writing" },
      itemTitleLabel: "Title",
      itemUrlLabel: "Link",
      itemDescriptionLabel: "Description",
      add: "Add",
      remove: "Remove",
    },
    vitrin: {
      notFoundTitle: "Showcase not found",
      notFoundBody: "The Erbab profile you're looking for doesn't exist.",
      backHome: "Back to Home",
      yearsExperience: "years of experience",
      portfolioTitle: "Work",
      empty: "This Erbab hasn't added any work yet.",
      offerJob: "Send Job Offer",
      follow: "Follow",
      proposeCollab: "Propose Collaboration",
      comingSoon: "This feature is coming soon.",
      memberSince: "Member since",
    },
  },
};
