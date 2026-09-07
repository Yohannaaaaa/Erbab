"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";

type OfferStatus = "PENDING" | "ACCEPTED" | "DECLINED";

export type OfferItem = {
  id: string;
  title: string;
  budget: string | null;
  message: string;
  status: OfferStatus;
  createdAt: string;
  counterpartName: string;
};

export function OffersPanel({
  received,
  sent,
}: {
  received: OfferItem[];
  sent: OfferItem[];
}) {
  const { t } = useLanguage();
  const router = useRouter();
  const [items, setItems] = useState(received);
  const [busyId, setBusyId] = useState<string | null>(null);

  const respond = async (id: string, status: "ACCEPTED" | "DECLINED") => {
    setBusyId(id);
    const res = await fetch(`/api/job-offers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setBusyId(null);

    if (res.ok) {
      setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
      router.refresh();
    }
  };

  const statusBadge = (status: OfferStatus) => (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        status === "PENDING"
          ? "bg-gold/10 text-gold-light"
          : status === "ACCEPTED"
            ? "bg-green-500/10 text-green-400"
            : "bg-white/10 text-white/50"
      }`}
    >
      {t.offers.statusLabels[status]}
    </span>
  );

  return (
    <div className="mt-10 flex flex-col gap-10">
      <div>
        <h2 className="text-xl font-bold text-white">{t.offers.receivedTitle}</h2>
        {items.length === 0 ? (
          <p className="mt-3 text-sm text-white/50">{t.offers.empty}</p>
        ) : (
          <ul className="mt-4 flex flex-col gap-3">
            {items.map((offer) => (
              <li key={offer.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-white">{offer.title}</p>
                  {statusBadge(offer.status)}
                </div>
                <p className="mt-1 text-xs text-white/50">
                  {t.offers.from}: {offer.counterpartName}
                  {offer.budget ? ` · ${offer.budget}` : ""}
                </p>
                <p className="mt-2 text-sm text-white/70">{offer.message}</p>
                {offer.status === "PENDING" && (
                  <div className="mt-3 flex gap-3">
                    <button
                      onClick={() => respond(offer.id, "ACCEPTED")}
                      disabled={busyId === offer.id}
                      className="rounded-full bg-gold px-4 py-1.5 text-xs font-semibold text-black hover:bg-gold-light disabled:opacity-60"
                    >
                      {t.offers.accept}
                    </button>
                    <button
                      onClick={() => respond(offer.id, "DECLINED")}
                      disabled={busyId === offer.id}
                      className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold text-white hover:bg-white/10 disabled:opacity-60"
                    >
                      {t.offers.decline}
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold text-white">{t.offers.sentTitle}</h2>
        {sent.length === 0 ? (
          <p className="mt-3 text-sm text-white/50">{t.offers.sentEmpty}</p>
        ) : (
          <ul className="mt-4 flex flex-col gap-3">
            {sent.map((offer) => (
              <li key={offer.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-white">{offer.title}</p>
                  {statusBadge(offer.status)}
                </div>
                <p className="mt-1 text-xs text-white/50">
                  {t.offers.to}: {offer.counterpartName}
                  {offer.budget ? ` · ${offer.budget}` : ""}
                </p>
                <p className="mt-2 text-sm text-white/70">{offer.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
