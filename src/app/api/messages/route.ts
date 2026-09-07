import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { createNotification } from "@/lib/notifications";

const bodySchema = z.object({
  recipientId: z.string().min(1),
  body: z.string().trim().min(1).max(2000),
});

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Giriş yapmalısınız" }, { status: 401 });
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Geçersiz form" },
      { status: 400 },
    );
  }

  const { recipientId, body } = parsed.data;

  if (recipientId === session.userId) {
    return NextResponse.json({ error: "Kendine mesaj gönderemezsin" }, { status: 400 });
  }

  const recipient = await prisma.user.findUnique({ where: { id: recipientId } });
  if (!recipient) {
    return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });
  }

  const message = await prisma.message.create({
    data: { senderId: session.userId, recipientId, body },
  });

  await createNotification({
    userId: recipientId,
    type: "MESSAGE",
    actorName: session.name,
    link: `/panel/mesajlar/${session.userId}`,
  });

  return NextResponse.json({ ok: true, message });
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Giriş yapmalısınız" }, { status: 401 });
  }

  const messages = await prisma.message.findMany({
    where: { OR: [{ senderId: session.userId }, { recipientId: session.userId }] },
    orderBy: { createdAt: "desc" },
    include: { sender: true, recipient: true },
  });

  const conversations = new Map<
    string,
    { userId: string; name: string; lastBody: string; lastAt: Date; unreadCount: number }
  >();

  for (const message of messages) {
    const otherUser = message.senderId === session.userId ? message.recipient : message.sender;
    const existing = conversations.get(otherUser.id);

    if (!existing) {
      conversations.set(otherUser.id, {
        userId: otherUser.id,
        name: otherUser.name,
        lastBody: message.body,
        lastAt: message.createdAt,
        unreadCount: message.recipientId === session.userId && !message.read ? 1 : 0,
      });
    } else if (message.recipientId === session.userId && !message.read) {
      existing.unreadCount += 1;
    }
  }

  return NextResponse.json({ conversations: Array.from(conversations.values()) });
}
