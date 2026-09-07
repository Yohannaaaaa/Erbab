export default function TermsPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-black">
      <div className="mx-auto max-w-2xl px-6 py-16 text-white/70">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">Taslak</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Kullanım Şartları</h1>
        <p className="mt-6">
          erbab.com şu anda erken geliştirme aşamasındadır. Bu sayfa, platform canlıya
          alınmadan önce hukuki danışmanlık ile tamamlanacak bir taslaktır ve bağlayıcı
          bir sözleşme niteliği taşımaz.
        </p>
        <p className="mt-4">
          Nihai kullanım şartları; hesap sorumlulukları, içerik kuralları, iş
          eşleştirme süreçleri ve komisyon koşulları gibi konuları kapsayacak şekilde
          lansmandan önce yayınlanacaktır.
        </p>
      </div>
    </div>
  );
}
