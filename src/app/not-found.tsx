import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-black px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-gold">404</p>
      <h1 className="mt-3 text-2xl font-bold text-white">Sayfa bulunamadı</h1>
      <p className="mt-2 text-white/60">Aradığın sayfa mevcut değil ya da taşınmış olabilir.</p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-black hover:bg-gold-light"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}
