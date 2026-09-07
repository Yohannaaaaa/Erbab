"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";

export function CourseRequestButton({
  courseId,
  isLoggedIn,
  isOwnProfile,
}: {
  courseId: string;
  isLoggedIn: boolean;
  isOwnProfile: boolean;
}) {
  const { t } = useLanguage();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  if (isOwnProfile) {
    return null;
  }

  const openForm = () => {
    if (!isLoggedIn) {
      router.push(`/giris?next=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    setSent(false);
    setError(null);
    setOpen(true);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setError(null);

    const res = await fetch("/api/course-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId, message }),
    });
    const data = await res.json();
    setSending(false);

    if (!res.ok) {
      setError(data.error ?? t.courses.sendError);
      return;
    }

    setSent(true);
    setMessage("");
  };

  return (
    <div className="mt-3">
      {!open ? (
        <button
          onClick={openForm}
          className="rounded-full border border-gold/40 px-4 py-1.5 text-xs font-semibold text-gold-light hover:bg-gold/10"
        >
          {t.courses.requestCta}
        </button>
      ) : sent ? (
        <p className="text-xs text-white/60">{t.courses.sentSuccess}</p>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-2">
          <textarea
            required
            minLength={10}
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t.courses.messagePlaceholder}
            className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-gold"
          />
          {error && <p className="text-xs text-red-400">{error}</p>}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={sending}
              className="rounded-full bg-gold px-4 py-1.5 text-xs font-semibold text-black hover:bg-gold-light disabled:opacity-60"
            >
              {t.courses.send}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-xs text-white/50 hover:text-white"
            >
              {t.courses.cancel}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
