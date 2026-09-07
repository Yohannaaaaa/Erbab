import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

const bodySchema = z.object({
  type: z.enum(["COURSE", "MENTORSHIP"]),
  title: z.string().trim().min(2).max(120),
  description: z.string().trim().min(10).max(1000),
  price: z.string().trim().max(60).optional().or(z.literal("")),
});

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Giriş yapmalısınız" }, { status: 401 });
  }
  if (session.role !== "ERBAB") {
    return NextResponse.json({ error: "Sadece Erbab hesapları eğitim açabilir" }, { status: 403 });
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Geçersiz form" },
      { status: 400 },
    );
  }

  const profile = await prisma.profile.findUnique({ where: { userId: session.userId } });
  if (!profile) {
    return NextResponse.json({ error: "Profil bulunamadı" }, { status: 404 });
  }

  const { type, title, description, price } = parsed.data;

  const course = await prisma.course.create({
    data: {
      profileId: profile.id,
      type,
      title,
      description,
      price: price || null,
    },
  });

  return NextResponse.json({ ok: true, course });
}
