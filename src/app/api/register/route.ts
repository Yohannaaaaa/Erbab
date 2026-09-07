import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword, createSession } from "@/lib/auth";
import { generateUniqueSlug } from "@/lib/slug";
import { registerSchema } from "@/lib/validation";
import { syncAdminStatus } from "@/lib/admin";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Geçersiz form" },
      { status: 400 },
    );
  }

  const { name, email, password, role } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "Bu e-posta ile zaten bir hesap var" },
      { status: 409 },
    );
  }

  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role,
      ...(role === "ERBAB"
        ? { profile: { create: { slug: await generateUniqueSlug(name) } } }
        : {}),
    },
    include: { profile: true },
  });

  const isAdmin = await syncAdminStatus(user);
  await createSession({ userId: user.id, email: user.email, name: user.name, role: user.role, isAdmin });

  return NextResponse.json({ ok: true, slug: user.profile?.slug ?? null });
}
