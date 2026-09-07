"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export function PromoCards() {
  const { t } = useLanguage();

  return (
    <section className="border-t border-white/10 bg-white/[0.02] py-20">
      <div className="mx-auto grid max-w-6xl gap-5 px-6 sm:grid-cols-3">
        {t.promo.items.map((item) => (
          <div
            key={item.title}
            className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <div>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-white/60">{item.description}</p>
            </div>
            <Link
              href={item.href}
              className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-gold-light hover:text-gold"
            >
              {item.cta} →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
