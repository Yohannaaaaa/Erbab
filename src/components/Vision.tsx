"use client";

import { useLanguage } from "@/lib/language-context";

export function Vision() {
  const { t } = useLanguage();

  return (
    <section id="vizyon" className="border-t border-black/10 py-20 dark:border-white/10">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.vision.title}</h2>
        <p className="mt-6 text-lg leading-8 text-foreground/70">{t.vision.body}</p>
        <p className="mt-4 text-base font-medium text-amber-600">{t.vision.mission}</p>
      </div>
    </section>
  );
}
