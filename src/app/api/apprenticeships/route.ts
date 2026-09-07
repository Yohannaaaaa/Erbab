import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { createNotification } from "@/lib/notifications";

const bodySchema = z.object({
  recipientId: z.string().min(1),
  message: z.string().trim().min(10).max(1000),
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

  const { recipientId, message } = parsed.data;

  if (recipientId === session.userId) {
    return NextResponse.json({ error: "Kendine çıraklık teklif edemezsin" }, { status: 400 });
  }

  const recipient = await prisma.user.findUnique({ where: { id: recipientId } });
  if (!recipient) {
    return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });
  }

  const request_ = await prisma.apprenticeshipRequest.create({
    data: { senderId: session.userId, recipientId, message },
  });

  await createNotification({
    userId: recipientId,
    type: "APPRENTICESHIP_REQUEST",
    actorName: session.name,
    link: "/panel",
  });

  return NextResponse.json({ ok: true, request: request_ });
}

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Giriş yapmalısınız" }, { status: 401 });
  }

  const url = new URL(request.url);
  const box = url.searchParams.get("box") === "sent" ? "sent" : "received";

  const requests =
    box === "sent"
      ? await prisma.apprenticeshipRequest.findMany({
          where: { senderId: session.userId },
          include: { recipient: true },
          orderBy: { createdAt: "desc" },
        })
      : await prisma.apprenticeshipRequest.findMany({
          where: { recipientId: session.userId },
          include: { sender: true },
          orderBy: { createdAt: "desc" },
        });

  return NextResponse.json({ requests });
}
