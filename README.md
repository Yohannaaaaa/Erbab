# erbab.com

Dünyadaki her bireyin kendi ustalığını, yeteneğini veya uzmanlığını global ölçekte
sergileyebileceği platform — tanıtım (landing) sitesi.

Next.js (App Router) + TypeScript + Tailwind CSS ile geliştirildi. Site TR/EN
iki dilli olarak çalışır (sağ üstteki dil düğmesiyle değiştirilir, tercih
tarayıcıda saklanır).

## İçerik

- Vizyon ve konumlandırma
- Kullanıcı tipleri (Erbab / Gözlemci / İşveren)
- MVP platform özellikleri
- Kategoriler
- Nasıl çalışır akışı
- Global büyüme yol haritası
- Erken erişim kayıt formu (henüz bir backend'e bağlı değil)

## Geliştirme

```bash
npm install
npm run dev
```

Site `http://localhost:3000` üzerinde açılır.

```bash
npm run build   # production build
npm run lint    # eslint
```

## Yapı

- `src/app` — sayfa ve layout (metadata, favicon, OG görselleri)
- `src/components` — landing page bölümleri (Header, Hero, Features, ...)
- `src/lib/translations.ts` — TR/EN metin içerikleri
- `src/lib/language-context.tsx` — dil seçimi context'i
- `public/logo.png` — marka logosu (header, hero, footer, favicon, OG görseli)
