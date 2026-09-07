"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";

type RequestStatus = "PENDING" | "ACCEPTED" | "DECLINED";

export type CourseRequestItem = {
  id: string;
  courseTitle: string;
  message: string;
  status: RequestStatus;
  counterpartName: string;
};

export function CourseRequestsPanel({
  received,
  sent,
}: {
  received: CourseRequestItem[];
  sent: CourseRequestItem[];
}) {
  const { t } = useLanguage();
  const router = useRouter();
  const [items, setItems] = useState(received);
  const [busyId, setBusyId] = useState<string | null>(null);

  const respond = async (id: string, status: "ACCEPTED" | "DECLINED") => {
    setBusyId(id);
    const res = await fetch(`/api/course-requests/${id}`, {
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

  const statusBadge = (status: RequestStatus) => (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        status === "PENDING"
          ? "bg-gold/10 text-gold-light"
          : status === "ACCEPTED"
            ? "bg-green-500/10 text-green-400"
            : "bg-white/10 text-white/50"
      }`}
    >
      {t.courses.statusLabels[status]}
    </span>
  );

  return (
    <div className="mt-10 flex flex-col gap-10">
      <div>
        <h2 className="text-xl font-bold text-white">{t.courses.receivedRequestsTitle}</h2>
        {items.length === 0 ? (
          <p className="mt-3 text-sm text-white/50">{t.courses.noReceivedRequests}</p>
        ) : (
          <ul className="mt-4 flex flex-col gap-3">
            {items.map((request) => (
              <li key={request.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-white">{request.courseTitle}</p>
                  {statusBadge(request.status)}
                </div>
                <p className="mt-1 text-xs text-white/50">
                  {t.courses.from}: {request.counterpartName}
                </p>
                <p className="mt-2 text-sm text-white/70">{request.message}</p>
                {request.status === "PENDING" && (
                  <div className="mt-3 flex gap-3">
                    <button
                      onClick={() => respond(request.id, "ACCEPTED")}
                      disabled={busyId === request.id}
                      className="rounded-full bg-gold px-4 py-1.5 text-xs font-semibold text-black hover:bg-gold-light disabled:opacity-60"
                    >
                      {t.courses.accept}
                    </button>
                    <button
                      onClick={() => respond(request.id, "DECLINED")}
                      disabled={busyId === request.id}
                      className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold text-white hover:bg-white/10 disabled:opacity-60"
                    >
                      {t.courses.decline}
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold text-white">{t.courses.myRequestsTitle}</h2>
        {sent.length === 0 ? (
          <p className="mt-3 text-sm text-white/50">{t.courses.noSentRequests}</p>
        ) : (
          <ul className="mt-4 flex flex-col gap-3">
            {sent.map((request) => (
              <li key={request.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-white">{request.courseTitle}</p>
                  {statusBadge(request.status)}
                </div>
                <p className="mt-1 text-xs text-white/50">
                  {t.courses.from}: {request.counterpartName}
                </p>
                <p className="mt-2 text-sm text-white/70">{request.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
