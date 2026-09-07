"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";

export function PasswordInput({
  value,
  onChange,
  required,
  minLength,
  autoComplete,
}: {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  minLength?: number;
  autoComplete?: string;
}) {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        required={required}
        minLength={minLength}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 pr-11 text-white outline-none focus:border-gold"
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? t.auth.hidePassword : t.auth.showPassword}
        className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-white/40 hover:text-white"
      >
        {visible ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3l18 18M10.58 10.58a2 2 0 002.83 2.83M9.88 5.09A9.77 9.77 0 0112 5c5 0 9 4.5 10 7-.42.99-1.19 2.24-2.3 3.36M6.4 6.4C4.24 7.86 2.7 9.87 2 12c1 2.5 5 7 10 7 1.26 0 2.44-.28 3.5-.77"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
            <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </div>
  );
}
