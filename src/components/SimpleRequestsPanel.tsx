"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";

type Status = "PENDING" | "ACCEPTED" | "DECLINED";

export type SimpleRequestItem = {
  id: string;
  message: string;
  status: Status;
  createdAt: string;
  counterpartName: string;
};

export function SimpleRequestsPanel({
  received,
  sent,
  apiEndpoint,
  type,
}: {
  received: SimpleRequestItem[];
  sent: SimpleRequestItem[];
  apiEndpoint: string;
  type: "collaborations" | "apprenticeships";
}) {
  const { t } = useLanguage();
  const copy = t[type];
  const router = useRouter();
  const [items, setItems] = useState(received);
  const [busyId, setBusyId] = useState<string | null>(null);

  const respond = async (id: string, status: "ACCEPTED" | "DECLINED") => {
    setBusyId(id);
    const res = await fetch(`${apiEndpoint}/${id}`, {
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

  const statusBadge = (status: Status) => (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        status === "PENDING"
          ? "bg-gold/10 text-gold-light"
          : status === "ACCEPTED"
            ? "bg-green-500/10 text-green-400"
            : "bg-white/10 text-white/50"
      }`}
    >
      {copy.statusLabels[status]}
    </span>
  );

  return (
    <div className="mt-10 flex flex-col gap-10">
      <div>
        <h2 className="text-xl font-bold text-white">{copy.receivedTitle}</h2>
        {items.length === 0 ? (
          <p className="mt-3 text-sm text-white/50">{copy.empty}</p>
        ) : (
          <ul className="mt-4 flex flex-col gap-3">
            {items.map((item) => (
              <li key={item.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs text-white/50">
                    {copy.from}: <span className="font-semibold text-white">{item.counterpartName}</span>
                  </p>
                  {statusBadge(item.status)}
                </div>
                <p className="mt-2 text-sm text-white/70">{item.message}</p>
                {item.status === "PENDING" && (
                  <div className="mt-3 flex gap-3">
                    <button
                      onClick={() => respond(item.id, "ACCEPTED")}
                      disabled={busyId === item.id}
                      className="rounded-full bg-gold px-4 py-1.5 text-xs font-semibold text-black hover:bg-gold-light disabled:opacity-60"
                    >
                      {copy.accept}
                    </button>
                    <button
                      onClick={() => respond(item.id, "DECLINED")}
                      disabled={busyId === item.id}
                      className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold text-white hover:bg-white/10 disabled:opacity-60"
                    >
                      {copy.decline}
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold text-white">{copy.sentTitle}</h2>
        {sent.length === 0 ? (
          <p className="mt-3 text-sm text-white/50">{copy.sentEmpty}</p>
        ) : (
          <ul className="mt-4 flex flex-col gap-3">
            {sent.map((item) => (
              <li key={item.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs text-white/50">
                    {copy.to}: <span className="font-semibold text-white">{item.counterpartName}</span>
                  </p>
                  {statusBadge(item.status)}
                </div>
                <p className="mt-2 text-sm text-white/70">{item.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
