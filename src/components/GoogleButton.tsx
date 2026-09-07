"use client";

import { useLanguage } from "@/lib/language-context";

export function GoogleButton({ role }: { role?: "ERBAB" | "GOZLEMCI" | "ISVEREN" }) {
  const { t } = useLanguage();
  const href = role ? `/api/auth/google?role=${role}` : "/api/auth/google";

  return (
    <a
      href={href}
      className="flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-white/90"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
        <path
          fill="#4285F4"
          d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.13-.84 2.09-1.8 2.73v2.27h2.91c1.7-1.57 2.69-3.88 2.69-6.64z"
        />
        <path
          fill="#34A853"
          d="M9 18c2.43 0 4.47-.8 5.96-2.17l-2.91-2.27c-.81.54-1.84.86-3.05.86-2.34 0-4.32-1.58-5.03-3.71H.96v2.34C2.44 15.98 5.48 18 9 18z"
        />
        <path
          fill="#FBBC05"
          d="M3.97 10.71a5.4 5.4 0 0 1 0-3.42V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.34z"
        />
        <path
          fill="#EA4335"
          d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.95l3.01 2.34C4.68 5.16 6.66 3.58 9 3.58z"
        />
      </svg>
      {t.auth.googleCta}
    </a>
  );
}
