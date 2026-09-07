"use client";

import { useLanguage } from "@/lib/language-context";

export function Categories() {
  const { t } = useLanguage();

  return (
    <section id="kategoriler" className="border-t border-black/10 bg-black/[0.02] py-20 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.categories.title}</h2>
          <p className="mt-3 text-foreground/60">{t.categories.subtitle}</p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {t.categories.items.map((category) => (
            <span
              key={category}
              className="rounded-full border border-black/10 bg-background px-5 py-2 text-sm font-medium dark:border-white/10"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
