"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";

export function Header() {
  const { t, locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#vizyon", label: t.nav.vision },
    { href: "#kimler-icin", label: t.nav.userTypes },
    { href: "#ozellikler", label: t.nav.features },
    { href: "#kategoriler", label: t.nav.categories },
    { href: "#nasil-calisir", label: t.nav.howItWorks },
    { href: "#yol-haritasi", label: t.nav.roadmap },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-background/80 backdrop-blur dark:border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2">
          <Image src="/logo.png" alt="erbab.com" width={36} height={36} className="rounded-md" priority />
          <span className="text-lg font-bold tracking-tight text-amber-600">
            erbab<span className="text-foreground">.com</span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium text-foreground/80 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-amber-600">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex overflow-hidden rounded-full border border-black/10 text-xs font-semibold dark:border-white/15">
            <button
              onClick={() => setLocale("tr")}
              className={`px-2.5 py-1 ${locale === "tr" ? "bg-amber-600 text-white" : "text-foreground/70"}`}
            >
              TR
            </button>
            <button
              onClick={() => setLocale("en")}
              className={`px-2.5 py-1 ${locale === "en" ? "bg-amber-600 text-white" : "text-foreground/70"}`}
            >
              EN
            </button>
          </div>

          <a
            href="#erken-erisim"
            className="hidden rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-700 sm:inline-block"
          >
            {t.nav.cta}
          </a>

          <button
            className="md:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block h-0.5 w-6 bg-foreground" />
            <span className="mt-1.5 block h-0.5 w-6 bg-foreground" />
            <span className="mt-1.5 block h-0.5 w-6 bg-foreground" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-3 border-t border-black/10 px-6 py-4 text-sm font-medium md:hidden dark:border-white/10">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href="#erken-erisim" onClick={() => setOpen(false)} className="font-semibold text-amber-600">
            {t.nav.cta}
          </a>
        </nav>
      )}
    </header>
  );
}
