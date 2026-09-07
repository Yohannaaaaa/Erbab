"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { MasterCard, type MasterCardData } from "@/components/MasterCard";

export function FeaturedMasters({ masters }: { masters: MasterCardData[] }) {
  const { t } = useLanguage();

  return (
    <section id="ustalar" className="border-t border-white/10 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t.featuredMasters.title}</h2>
            <p className="mt-2 text-white/60">{t.featuredMasters.subtitle}</p>
          </div>
          <Link href="/ustalar" className="text-sm font-semibold text-gold-light hover:text-gold">
            {t.featuredMasters.viewAll} →
          </Link>
        </div>

        {masters.length === 0 ? (
          <p className="mt-10 text-white/50">{t.featuredMasters.empty}</p>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {masters.map((master) => (
              <MasterCard key={master.slug} master={master} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
