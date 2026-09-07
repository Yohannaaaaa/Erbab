"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/language-context";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_-10%,rgba(217,119,6,0.18),transparent_55%),radial-gradient(circle_at_85%_10%,rgba(217,119,6,0.12),transparent_45%)]"
      />
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center sm:py-32">
        <Image
          src="/logo.png"
          alt="erbab.com"
          width={224}
          height={224}
          priority
          className="h-44 w-44 drop-shadow-xl sm:h-56 sm:w-56"
        />

        <span className="mt-6 rounded-full border border-amber-600/30 bg-amber-600/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">
          {t.hero.eyebrow}
        </span>

        <h1 className="mt-6 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-6xl">
          {t.hero.title}
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-foreground/70 sm:text-xl">
          {t.hero.subtitle}
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#erken-erisim"
            className="rounded-full bg-amber-600 px-7 py-3 text-base font-semibold text-white shadow-lg shadow-amber-600/30 transition-transform hover:-translate-y-0.5 hover:bg-amber-700"
          >
            {t.hero.primaryCta}
          </a>
          <a
            href="#nasil-calisir"
            className="rounded-full border border-black/15 px-7 py-3 text-base font-semibold text-foreground transition-colors hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
          >
            {t.hero.secondaryCta}
          </a>
        </div>
      </div>
    </section>
  );
}
