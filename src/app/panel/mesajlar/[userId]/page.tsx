import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { translations } from "@/lib/translations";
import { getServerLocale } from "@/lib/locale-server";
import { MessageThread } from "@/components/MessageThread";

export default async function MessageThreadPage({ params }: { params: Promise<{ userId: string }> }) {
  const [session, locale] = await Promise.all([getSession(), getServerLocale()]);
  if (!session) {
    redirect("/giris");
  }

  const { userId } = await params;

  const otherUser = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, name: true } });
  if (!otherUser) {
    notFound();
  }

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: session.userId, recipientId: userId },
        { senderId: userId, recipientId: session.userId },
      ],
    },
    orderBy: { createdAt: "asc" },
  });

  await prisma.message.updateMany({
    where: { senderId: userId, recipientId: session.userId, read: false },
    data: { read: true },
  });

  const t = translations[locale].dm;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-black">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <Link href="/panel/mesajlar" className="text-sm text-gold-light hover:text-gold">
          ← {t.backToInbox}
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-white">{otherUser.name}</h1>

        <MessageThread
          otherUserId={otherUser.id}
          initialMessages={messages.map((m) => ({
            id: m.id,
            body: m.body,
            createdAt: m.createdAt.toISOString(),
            isOwn: m.senderId === session.userId,
          }))}
        />
      </div>
    </div>
  );
}
