"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="top" className="relative isolate overflow-hidden bg-black">
      <Image
        src="/hero-banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />

      <div className="relative mx-auto flex min-h-[520px] max-w-6xl flex-col items-center justify-end px-6 pb-16 pt-32 text-center sm:min-h-[640px] sm:pb-20">
        <span className="rounded-full border border-gold-light/40 bg-gold-light/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-light">
          {t.hero.eyebrow}
        </span>

        <h1 className="mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
          {t.hero.title}
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-white/80 sm:text-xl">
          {t.hero.subtitle}
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/kayit"
            className="rounded-full bg-gold px-7 py-3 text-base font-semibold text-black shadow-lg shadow-gold/30 transition-transform hover:-translate-y-0.5 hover:bg-gold-light"
          >
            {t.hero.primaryCta}
          </Link>
          <a
            href="#nasil-calisir"
            className="rounded-full border border-white/30 px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            {t.hero.secondaryCta}
          </a>
        </div>
      </div>
    </section>
  );
}
