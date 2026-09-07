import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(_request: Request, { params }: { params: Promise<{ userId: string }> }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Giriş yapmalısınız" }, { status: 401 });
  }

  const { userId } = await params;

  const otherUser = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, name: true } });
  if (!otherUser) {
    return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });
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

  return NextResponse.json({
    otherUser,
    messages: messages.map((m) => ({
      id: m.id,
      body: m.body,
      createdAt: m.createdAt,
      isOwn: m.senderId === session.userId,
    })),
  });
}
