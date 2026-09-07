"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";

export function VitrinActions() {
  const { t } = useLanguage();
  const [message, setMessage] = useState<string | null>(null);

  const showComingSoon = () => {
    setMessage(t.vitrin.comingSoon);
    window.setTimeout(() => setMessage(null), 2500);
  };

  const buttons = [
    { label: t.vitrin.offerJob, primary: true },
    { label: t.vitrin.follow, primary: false },
    { label: t.vitrin.proposeCollab, primary: false },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-3">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={showComingSoon}
            className={
              btn.primary
                ? "rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-black hover:bg-gold-light"
                : "rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            }
          >
            {btn.label}
          </button>
        ))}
      </div>
      {message && <p className="text-xs text-white/50">{message}</p>}
    </div>
  );
}
