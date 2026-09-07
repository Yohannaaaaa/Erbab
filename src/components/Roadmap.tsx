"use client";

import { useLanguage } from "@/lib/language-context";

export function Roadmap() {
  const { t } = useLanguage();

  return (
    <section id="yol-haritasi" className="border-t border-black/10 bg-black/[0.02] py-20 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">{t.roadmap.title}</h2>

        <ol className="mt-12 space-y-6">
          {t.roadmap.phases.map((phase) => (
            <li
              key={phase.phase}
              className="flex flex-col gap-2 rounded-xl border border-black/10 bg-background p-6 sm:flex-row sm:items-center sm:gap-6 dark:border-white/10"
            >
              <span className="w-28 shrink-0 text-sm font-bold uppercase tracking-wide text-amber-600">
                {phase.phase}
              </span>
              <span className="font-semibold">{phase.region}</span>
              <span className="text-sm text-foreground/70 sm:ml-auto">{phase.strategy}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
