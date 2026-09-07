"use client";

import { useLanguage } from "@/lib/language-context";

export function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="nasil-calisir" className="border-t border-white/10 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">{t.howItWorks.title}</h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {t.howItWorks.steps.map((step, i) => (
            <div key={step.title} className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-lg font-bold text-black">
                {i + 1}
              </div>
              <h3 className="mt-4 font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/70">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
