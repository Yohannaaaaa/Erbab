import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { profileSchema } from "@/lib/validation";

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Giriş yapmalısınız" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = profileSchema.safeParse(body);
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

  const { title, bio, location, category, skills, yearsExperience } = parsed.data;

  await prisma.profile.update({
    where: { userId: session.userId },
    data: {
      title: title || null,
      bio: bio || null,
      location: location || null,
      category: category || null,
      skills: skills || null,
      yearsExperience: yearsExperience ?? null,
    },
  });

  return NextResponse.json({ ok: true });
}
