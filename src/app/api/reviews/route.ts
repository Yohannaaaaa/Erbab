import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { createNotification } from "@/lib/notifications";

const bodySchema = z.object({
  targetUserId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().max(500).optional().or(z.literal("")),
});

async function isEligible(authorId: string, targetUserId: string) {
  const [acceptedOffer, acceptedCourseRequest] = await Promise.all([
    prisma.jobOffer.findFirst({
      where: { senderId: authorId, recipientId: targetUserId, status: "ACCEPTED" },
    }),
    prisma.courseRequest.findFirst({
      where: {
        studentId: authorId,
        status: "ACCEPTED",
        course: { profile: { userId: targetUserId } },
      },
    }),
  ]);

  return Boolean(acceptedOffer || acceptedCourseRequest);
}

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

  const { targetUserId, rating, comment } = parsed.data;

  if (targetUserId === session.userId) {
    return NextResponse.json({ error: "Kendine değerlendirme yapamazsın" }, { status: 400 });
  }

  const eligible = await isEligible(session.userId, targetUserId);
  if (!eligible) {
    return NextResponse.json(
      { error: "Değerlendirme yapabilmek için bu kişiyle kabul edilmiş bir iş teklifin veya eğitim talebin olmalı" },
      { status: 403 },
    );
  }

  const isNew = !(await prisma.review.findUnique({
    where: { authorId_targetUserId: { authorId: session.userId, targetUserId } },
  }));

  const review = await prisma.review.upsert({
    where: { authorId_targetUserId: { authorId: session.userId, targetUserId } },
    create: { authorId: session.userId, authorName: session.name, targetUserId, rating, comment: comment || null },
    update: { rating, comment: comment || null },
  });

  if (isNew) {
    await createNotification({
      userId: targetUserId,
      type: "REVIEW",
      actorName: session.name,
    });
  }

  return NextResponse.json({ ok: true, review });
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Giriş yapmalısınız" }, { status: 401 });
  }

  const parsed = z.object({ targetUserId: z.string().min(1) }).safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  await prisma.review.deleteMany({
    where: { authorId: session.userId, targetUserId: parsed.data.targetUserId },
  });

  return NextResponse.json({ ok: true });
}
