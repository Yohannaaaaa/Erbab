import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { translations } from "@/lib/translations";
import { getServerLocale } from "@/lib/locale-server";
import { Avatar } from "@/components/Avatar";

export default async function MessagesInboxPage() {
  const [session, locale] = await Promise.all([getSession(), getServerLocale()]);
  if (!session) {
    redirect("/giris");
  }

  const messages = await prisma.message.findMany({
    where: { OR: [{ senderId: session.userId }, { recipientId: session.userId }] },
    orderBy: { createdAt: "desc" },
    include: { sender: true, recipient: true },
  });

  const conversations = new Map<
    string,
    { userId: string; name: string; avatarUrl: string | null; lastBody: string; unreadCount: number }
  >();

  for (const message of messages) {
    const otherUser = message.senderId === session.userId ? message.recipient : message.sender;
    const existing = conversations.get(otherUser.id);

    if (!existing) {
      conversations.set(otherUser.id, {
        userId: otherUser.id,
        name: otherUser.name,
        avatarUrl: null,
        lastBody: message.body,
        unreadCount: message.recipientId === session.userId && !message.read ? 1 : 0,
      });
    } else if (message.recipientId === session.userId && !message.read) {
      existing.unreadCount += 1;
    }
  }

  const t = translations[locale].dm;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-black">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-2xl font-bold text-white">{t.inboxTitle}</h1>

        {conversations.size === 0 ? (
          <p className="mt-6 text-sm text-white/50">{t.inboxEmpty}</p>
        ) : (
          <ul className="mt-6 flex flex-col gap-2">
            {Array.from(conversations.values()).map((conv) => (
              <li key={conv.userId}>
                <Link
                  href={`/panel/mesajlar/${conv.userId}`}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:border-white/25"
                >
                  <Avatar src={conv.avatarUrl} name={conv.name} className="h-10 w-10 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-white">{conv.name}</p>
                    <p className="truncate text-sm text-white/50">{conv.lastBody}</p>
                  </div>
                  {conv.unreadCount > 0 && (
                    <span className="shrink-0 rounded-full bg-gold px-2 py-0.5 text-xs font-bold text-black">
                      {conv.unreadCount}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
