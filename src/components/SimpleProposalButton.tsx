"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type Copy = {
  buttonLabel: string;
  formTitle: string;
  messageLabel: string;
  messagePlaceholder: string;
  send: string;
  cancel: string;
  sentSuccess: string;
  sendError: string;
};

export function SimpleProposalButton({
  targetUserId,
  isLoggedIn,
  apiEndpoint,
  copy,
}: {
  targetUserId: string;
  isLoggedIn: boolean;
  apiEndpoint: string;
  copy: Copy;
}) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

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

    const res = await fetch(apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipientId: targetUserId, message }),
    });
    const data = await res.json();
    setSending(false);

    if (!res.ok) {
      setError(data.error ?? copy.sendError);
      return;
    }

    setSent(true);
    setMessage("");
  };

  return (
    <>
      <button
        onClick={openForm}
        className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
      >
        {copy.buttonLabel}
      </button>

      {open && (
        <div className="mt-2 w-full max-w-md rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">{copy.formTitle}</h3>
            <button
              onClick={() => setOpen(false)}
              className="text-sm text-white/40 hover:text-white"
              aria-label={copy.cancel}
            >
              ✕
            </button>
          </div>

          {sent ? (
            <p className="mt-4 text-sm text-white/70">{copy.sentSuccess}</p>
          ) : (
            <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
              <label className="flex flex-col gap-1.5 text-sm text-white/80">
                {copy.messageLabel}
                <textarea
                  required
                  minLength={10}
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={copy.messagePlaceholder}
                  className="rounded-lg border border-white/15 bg-black/40 px-4 py-2 text-white outline-none focus:border-gold"
                />
              </label>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={sending}
                  className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-black hover:bg-gold-light disabled:opacity-60"
                >
                  {copy.send}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-sm text-white/50 hover:text-white"
                >
                  {copy.cancel}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </>
  );
}
