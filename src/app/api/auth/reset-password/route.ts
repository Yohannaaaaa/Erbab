import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { resetPasswordSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const parsed = resetPasswordSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Geçersiz form" },
      { status: 400 },
    );
  }

  const { token, password } = parsed.data;
  const tokenHash = createHash("sha256").update(token).digest("hex");

  const resetToken = await prisma.passwordResetToken.findUnique({ where: { tokenHash } });
  if (!resetToken || resetToken.expiresAt < new Date()) {
    return NextResponse.json({ error: "Link geçersiz veya süresi dolmuş" }, { status: 400 });
  }

  const passwordHash = await hashPassword(password);

  await prisma.$transaction([
    prisma.user.update({ where: { id: resetToken.userId }, data: { passwordHash } }),
    prisma.passwordResetToken.deleteMany({ where: { userId: resetToken.userId } }),
  ]);

  return NextResponse.json({ ok: true });
}
