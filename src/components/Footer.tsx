"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/language-context";

export function Footer() {
  const { t, locale, setLocale } = useLanguage();

  const links = [
    { href: "/#vizyon", label: t.footer.about },
    { href: "/gizlilik", label: t.footer.privacy },
    { href: "/kullanim-sartlari", label: t.footer.terms },
    { href: "/#erken-erisim", label: t.footer.contact },
  ];

  return (
    <footer className="border-t border-white/10 bg-black py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center text-sm text-white/50">
        <Image src="/logo.png" alt="erbab.com" width={48} height={48} className="rounded-md" />
        <p className="font-semibold text-white">{t.footer.tagline}</p>

        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex overflow-hidden rounded-full border border-white/15 text-xs font-semibold">
          <button
            onClick={() => setLocale("tr")}
            className={`px-2.5 py-1 ${locale === "tr" ? "bg-gold text-black" : "text-white/60"}`}
          >
            TR
          </button>
          <button
            onClick={() => setLocale("en")}
            className={`px-2.5 py-1 ${locale === "en" ? "bg-gold text-black" : "text-white/60"}`}
          >
            EN
          </button>
        </div>

        <p>
          © {new Date().getFullYear()} erbab.com — {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
