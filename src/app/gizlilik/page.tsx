export default function PrivacyPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-black">
      <div className="mx-auto max-w-2xl px-6 py-16 text-white/70">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">Taslak</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Gizlilik Politikası</h1>
        <p className="mt-6">
          erbab.com henüz yayında değil ve bu sayfa, platform canlıya alınmadan önce
          hukuki danışmanlık ile tamamlanacak bir taslaktır. Kayıt sırasında topladığımız
          bilgiler (ad, e-posta, profil içeriği) yalnızca hesabını oluşturmak ve
          vitrinini yayınlamak için kullanılır; üçüncü taraflarla paylaşılmaz.
        </p>
        <p className="mt-4">
          Nihai gizlilik politikası; veri saklama süreleri, KVKK/GDPR uyumluluğu ve
          kullanıcı hakları gibi konuları detaylandıracak şekilde lansmandan önce
          yayınlanacaktır.
        </p>
      </div>
    </div>
  );
}
