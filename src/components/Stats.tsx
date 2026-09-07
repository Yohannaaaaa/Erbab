"use client";

import { useLanguage } from "@/lib/language-context";

export function Stats() {
  const { t } = useLanguage();

  return (
    <section className="border-t border-white/10 bg-black py-10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-gold">
          {t.stats.eyebrow}
        </p>
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-5">
          {t.stats.items.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-extrabold text-white sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs text-white/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
