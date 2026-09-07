"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";

export type CommentItem = {
  id: string;
  authorName: string;
  body: string;
  isOwn: boolean;
};

export function CommentsSection({
  portfolioItemId,
  initialComments,
  isLoggedIn,
}: {
  portfolioItemId: string;
  initialComments: CommentItem[];
  isLoggedIn: boolean;
}) {
  const { t } = useLanguage();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const label = comments.length === 1 ? t.comments.showOne : t.comments.showOther;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isLoggedIn) {
      router.push(`/giris?next=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    setSending(true);
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ portfolioItemId, body: text }),
    });
    setSending(false);

    if (res.ok) {
      const data = await res.json();
      setComments((prev) => [...prev, { id: data.comment.id, authorName: data.comment.authorName, body: data.comment.body, isOwn: true }]);
      setText("");
    }
  };

  const remove = async (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
    await fetch(`/api/comments/${id}`, { method: "DELETE" });
  };

  return (
    <div className="mt-3 border-t border-white/10 pt-3">
      <button onClick={() => setOpen((v) => !v)} className="text-xs text-white/50 hover:text-white">
        💬 {comments.length} {label}
      </button>

      {open && (
        <div className="mt-3 flex flex-col gap-2">
          {comments.length === 0 ? (
            <p className="text-xs text-white/40">{t.comments.empty}</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {comments.map((comment) => (
                <li key={comment.id} className="rounded-lg bg-white/[0.03] p-2.5 text-sm">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-white">{comment.authorName}</span>
                    {comment.isOwn && (
                      <button
                        onClick={() => remove(comment.id)}
                        className="shrink-0 text-xs text-white/30 hover:text-red-400"
                      >
                        {t.comments.delete}
                      </button>
                    )}
                  </div>
                  <p className="mt-0.5 text-white/70">{comment.body}</p>
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={submit} className="flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={isLoggedIn ? t.comments.placeholder : t.comments.loginToComment}
              required
              className="flex-1 rounded-lg border border-white/15 bg-black/40 px-3 py-1.5 text-sm text-white outline-none focus:border-gold"
            />
            <button
              type="submit"
              disabled={sending}
              className="shrink-0 rounded-lg bg-gold px-3 py-1.5 text-xs font-semibold text-black hover:bg-gold-light disabled:opacity-60"
            >
              {t.comments.send}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
