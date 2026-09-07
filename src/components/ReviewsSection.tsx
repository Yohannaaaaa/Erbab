"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useLanguage } from "@/lib/language-context";

export type ReviewItem = {
  id: string;
  authorName: string;
  rating: number;
  comment: string | null;
  isOwn: boolean;
};

function Stars({ value, size = "text-sm" }: { value: number; size?: string }) {
  return (
    <span className={`text-gold-light ${size}`} aria-label={`${value}/5`}>
      {"★".repeat(Math.round(value))}
      <span className="text-white/20">{"★".repeat(5 - Math.round(value))}</span>
    </span>
  );
}

export function ReviewsSection({
  targetUserId,
  isEligible,
  initialReviews,
}: {
  targetUserId: string;
  isEligible: boolean;
  initialReviews: ReviewItem[];
}) {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState(initialReviews);
  const ownReview = reviews.find((r) => r.isOwn);

  const [rating, setRating] = useState(ownReview?.rating ?? 5);
  const [comment, setComment] = useState(ownReview?.comment ?? "");
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const average = useMemo(() => {
    if (reviews.length === 0) return 0;
    return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  }, [reviews]);

  const countLabel = reviews.length === 1 ? t.reviews.countOne : t.reviews.countOther;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setFeedback(null);

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetUserId, rating, comment }),
    });
    const data = await res.json();
    setSending(false);

    if (!res.ok) {
      setFeedback(data.error ?? t.reviews.sendError);
      return;
    }

    setFeedback(t.reviews.sentSuccess);
    setReviews((prev) => {
      const withoutOwn = prev.filter((r) => !r.isOwn);
      return [...withoutOwn, { id: data.review.id, authorName: data.review.authorName, rating, comment: comment || null, isOwn: true }];
    });
  };

  const removeOwn = async () => {
    setReviews((prev) => prev.filter((r) => !r.isOwn));
    await fetch("/api/reviews", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetUserId }),
    });
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        {reviews.length > 0 && <Stars value={average} size="text-lg" />}
        <span className="text-sm text-white/60">
          {reviews.length > 0 && `${average.toFixed(1)} · `}
          {reviews.length} {countLabel}
        </span>
      </div>

      {reviews.length === 0 && <p className="mt-2 text-sm text-white/40">{t.reviews.empty}</p>}

      {reviews.length > 0 && (
        <ul className="mt-4 flex flex-col gap-3">
          {reviews.map((review) => (
            <li key={review.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{review.authorName}</span>
                    <Stars value={review.rating} />
                  </div>
                  {review.comment && <p className="mt-1 text-sm text-white/70">{review.comment}</p>}
                </div>
                {review.isOwn && (
                  <button onClick={removeOwn} className="shrink-0 text-xs text-white/30 hover:text-red-400">
                    {t.reviews.delete}
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {isEligible && (
        <form onSubmit={submit} className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-sm font-semibold text-white">{t.reviews.formTitle}</p>

          <div className="mt-2 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                className={`text-2xl leading-none ${n <= rating ? "text-gold-light" : "text-white/20"}`}
                aria-label={`${n}/5`}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t.reviews.commentPlaceholder}
            rows={2}
            maxLength={500}
            className="mt-3 w-full resize-none rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-gold"
          />

          {feedback && <p className="mt-2 text-xs text-white/60">{feedback}</p>}

          <button
            type="submit"
            disabled={sending}
            className="mt-3 rounded-full bg-gold px-4 py-2 text-xs font-semibold text-black hover:bg-gold-light disabled:opacity-60"
          >
            {ownReview ? t.reviews.editSubmit : t.reviews.submit}
          </button>
        </form>
      )}
    </div>
  );
}
