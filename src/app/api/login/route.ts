import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyPassword, createSession } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";
import { syncAdminStatus } from "@/lib/admin";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Geçersiz form" },
      { status: 400 },
    );
  }

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email }, include: { profile: true } });
  if (!user || !user.passwordHash || !(await verifyPassword(password, user.passwordHash))) {
    return NextResponse.json({ error: "E-posta veya şifre hatalı" }, { status: 401 });
  }

  const isAdmin = await syncAdminStatus(user);
  await createSession({ userId: user.id, email: user.email, name: user.name, role: user.role, isAdmin });

  return NextResponse.json({ ok: true, slug: user.profile?.slug ?? null });
}
