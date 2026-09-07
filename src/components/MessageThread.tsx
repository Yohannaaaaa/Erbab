"use client";

import { useState, type FormEvent } from "react";
import { useLanguage } from "@/lib/language-context";

type MessageItem = {
  id: string;
  body: string;
  createdAt: string;
  isOwn: boolean;
};

export function MessageThread({
  otherUserId,
  initialMessages,
}: {
  otherUserId: string;
  initialMessages: MessageItem[];
}) {
  const { t, locale } = useLanguage();
  const [messages, setMessages] = useState(initialMessages);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);

    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipientId: otherUserId, body: text }),
    });
    setSending(false);

    if (res.ok) {
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { id: data.message.id, body: data.message.body, createdAt: data.message.createdAt, isOwn: true },
      ]);
      setText("");
    }
  };

  return (
    <div className="mt-6 flex flex-col gap-4">
      <ul className="flex flex-col gap-2">
        {messages.map((message) => (
          <li key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                message.isOwn ? "bg-gold text-black" : "border border-white/10 bg-white/[0.05] text-white"
              }`}
            >
              <p>{message.body}</p>
              <p className={`mt-1 text-[10px] ${message.isOwn ? "text-black/50" : "text-white/40"}`}>
                {new Intl.DateTimeFormat(locale === "en" ? "en-US" : "tr-TR", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(new Date(message.createdAt))}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <form onSubmit={submit} className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t.dm.placeholder}
          required
          className="flex-1 rounded-full border border-white/15 bg-black/40 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
        />
        <button
          type="submit"
          disabled={sending}
          className="shrink-0 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-black hover:bg-gold-light disabled:opacity-60"
        >
          {t.dm.send}
        </button>
      </form>
    </div>
  );
}
