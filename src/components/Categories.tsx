"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { CATEGORIES } from "@/lib/categories";

export function Categories() {
  const { t, locale } = useLanguage();

  return (
    <section id="kategoriler" className="border-t border-white/10 bg-white/[0.02] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t.categories.title}</h2>
          <p className="mt-3 text-white/60">{t.categories.subtitle}</p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {CATEGORIES.slice(0, 8).map((category) => (
            <Link
              key={category.value}
              href={`/ustalar?category=${encodeURIComponent(category.value)}`}
              className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-5 text-center transition-colors hover:border-gold/40"
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="text-xs font-medium text-white/70">
                {locale === "en" ? category.en : category.tr}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
