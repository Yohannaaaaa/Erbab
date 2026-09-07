import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { createNotification } from "@/lib/notifications";

const bodySchema = z.object({
  courseId: z.string().min(1),
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

  const { courseId, message } = parsed.data;

  const course = await prisma.course.findUnique({ where: { id: courseId }, include: { profile: true } });
  if (!course) {
    return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
  }
  if (course.profile.userId === session.userId) {
    return NextResponse.json({ error: "Kendi eğitimine talep gönderemezsin" }, { status: 400 });
  }

  const request_ = await prisma.courseRequest.create({
    data: { courseId, studentId: session.userId, message },
  });

  await createNotification({
    userId: course.profile.userId,
    type: "COURSE_REQUEST",
    actorName: session.name,
    link: "/panel",
  });

  return NextResponse.json({ ok: true, request: request_ });
}
