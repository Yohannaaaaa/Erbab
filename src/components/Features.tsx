"use client";

import { useLanguage } from "@/lib/language-context";

const icons = ["👤", "🖼️", "🗂️", "💬", "🤝", "🎓", "🌍", "✨"];

export function Features() {
  const { t } = useLanguage();

  return (
    <section id="ozellikler" className="border-t border-white/10 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t.features.title}</h2>
          <p className="mt-3 text-white/60">{t.features.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.features.items.map((item, i) => (
            <div
              key={item.title}
              className="rounded-xl border border-white/10 p-6 transition-colors hover:border-gold/40"
            >
              <div className="text-2xl">{icons[i]}</div>
              <h3 className="mt-3 font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/70">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
