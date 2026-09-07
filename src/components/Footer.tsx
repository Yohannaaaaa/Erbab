"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/language-context";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-black/10 py-10 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 text-center text-sm text-foreground/60">
        <Image src="/logo.png" alt="erbab.com" width={48} height={48} className="rounded-md" />
        <p className="font-semibold text-foreground">{t.footer.tagline}</p>
        <p>
          © {new Date().getFullYear()} erbab.com — {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
