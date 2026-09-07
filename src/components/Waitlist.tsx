"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export function Waitlist() {
  const { t } = useLanguage();

  return (
    <section id="erken-erisim" className="border-t border-white/10 py-20">
      <div className="mx-auto max-w-xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t.waitlist.title}</h2>
        <p className="mt-3 text-white/60">{t.waitlist.subtitle}</p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/kayit"
            className="rounded-full bg-gold px-7 py-3 text-base font-semibold text-black shadow-lg shadow-gold/30 transition-transform hover:-translate-y-0.5 hover:bg-gold-light"
          >
            {t.waitlist.submit}
          </Link>
          <Link
            href="/ustalar"
            className="rounded-full border border-white/20 px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            {t.waitlist.browseCta}
          </Link>
        </div>

        <p className="mt-4 text-xs text-white/40">{t.waitlist.note}</p>
      </div>
    </section>
  );
}
