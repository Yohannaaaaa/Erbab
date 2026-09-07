"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import { SimpleProposalButton } from "@/components/SimpleProposalButton";

export function VitrinActions({
  targetUserId,
  isOwnProfile,
  isLoggedIn,
  initialFollowing,
}: {
  targetUserId: string;
  isOwnProfile: boolean;
  isLoggedIn: boolean;
  initialFollowing: boolean;
}) {
  const { t } = useLanguage();
  const router = useRouter();

  const [following, setFollowing] = useState(initialFollowing);
  const [followLoading, setFollowLoading] = useState(false);

  const [showOfferForm, setShowOfferForm] = useState(false);
  const [offerTitle, setOfferTitle] = useState("");
  const [offerBudget, setOfferBudget] = useState("");
  const [offerMessage, setOfferMessage] = useState("");
  const [offerSending, setOfferSending] = useState(false);
  const [offerError, setOfferError] = useState<string | null>(null);
  const [offerSent, setOfferSent] = useState(false);

  const requireLogin = () => {
    router.push(`/giris?next=${encodeURIComponent(window.location.pathname)}`);
  };

  const sendMessage = () => {
    if (!isLoggedIn) {
      requireLogin();
      return;
    }
    router.push(`/panel/mesajlar/${targetUserId}`);
  };

  const toggleFollow = async () => {
    if (!isLoggedIn) {
      requireLogin();
      return;
    }

    setFollowLoading(true);
    const res = await fetch("/api/follow", {
      method: following ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: targetUserId }),
    });
    setFollowLoading(false);

    if (res.ok) {
      const data = await res.json();
      setFollowing(data.following);
      router.refresh();
    }
  };

  const openOfferForm = () => {
    if (!isLoggedIn) {
      requireLogin();
      return;
    }
    setOfferSent(false);
    setOfferError(null);
    setShowOfferForm(true);
  };

  const submitOffer = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOfferSending(true);
    setOfferError(null);

    const res = await fetch("/api/job-offers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipientId: targetUserId,
        title: offerTitle,
        budget: offerBudget,
        message: offerMessage,
      }),
    });
    const data = await res.json();
    setOfferSending(false);

    if (!res.ok) {
      setOfferError(data.error ?? t.offers.sendError);
      return;
    }

    setOfferSent(true);
    setOfferTitle("");
    setOfferBudget("");
    setOfferMessage("");
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={openOfferForm}
          className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-black hover:bg-gold-light"
        >
          {t.vitrin.offerJob}
        </button>

        {!isOwnProfile && (
          <button
            onClick={toggleFollow}
            disabled={followLoading}
            className={
              following
                ? "rounded-full border border-gold/50 px-5 py-2.5 text-sm font-semibold text-gold hover:bg-gold/10 disabled:opacity-60"
                : "rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 disabled:opacity-60"
            }
          >
            {following ? t.vitrin.following : t.vitrin.follow}
          </button>
        )}

        {!isOwnProfile && (
          <button
            onClick={sendMessage}
            className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            {t.dm.sendMessage}
          </button>
        )}

        {!isOwnProfile && (
          <SimpleProposalButton
            targetUserId={targetUserId}
            isLoggedIn={isLoggedIn}
            apiEndpoint="/api/collaborations"
            copy={t.collaborations}
          />
        )}

        {!isOwnProfile && (
          <SimpleProposalButton
            targetUserId={targetUserId}
            isLoggedIn={isLoggedIn}
            apiEndpoint="/api/apprenticeships"
            copy={t.apprenticeships}
          />
        )}
      </div>

      {showOfferForm && (
        <div className="mt-2 max-w-md rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">{t.offers.formTitle}</h3>
            <button
              onClick={() => setShowOfferForm(false)}
              className="text-sm text-white/40 hover:text-white"
              aria-label={t.offers.cancel}
            >
              ✕
            </button>
          </div>

          {offerSent ? (
            <p className="mt-4 text-sm text-white/70">{t.offers.sentSuccess}</p>
          ) : (
            <form onSubmit={submitOffer} className="mt-4 flex flex-col gap-3">
              <label className="flex flex-col gap-1.5 text-sm text-white/80">
                {t.offers.titleLabel}
                <input
                  required
                  value={offerTitle}
                  onChange={(e) => setOfferTitle(e.target.value)}
                  className="rounded-lg border border-white/15 bg-black/40 px-4 py-2 text-white outline-none focus:border-gold"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-sm text-white/80">
                {t.offers.budgetLabel}
                <input
                  value={offerBudget}
                  onChange={(e) => setOfferBudget(e.target.value)}
                  placeholder={t.offers.budgetPlaceholder}
                  className="rounded-lg border border-white/15 bg-black/40 px-4 py-2 text-white outline-none focus:border-gold"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-sm text-white/80">
                {t.offers.messageLabel}
                <textarea
                  required
                  minLength={10}
                  rows={4}
                  value={offerMessage}
                  onChange={(e) => setOfferMessage(e.target.value)}
                  className="rounded-lg border border-white/15 bg-black/40 px-4 py-2 text-white outline-none focus:border-gold"
                />
              </label>

              {offerError && <p className="text-sm text-red-400">{offerError}</p>}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={offerSending}
                  className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-black hover:bg-gold-light disabled:opacity-60"
                >
                  {t.offers.send}
                </button>
                <button
                  type="button"
                  onClick={() => setShowOfferForm(false)}
                  className="text-sm text-white/50 hover:text-white"
                >
                  {t.offers.cancel}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
