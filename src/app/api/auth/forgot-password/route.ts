import { randomBytes, createHash } from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { forgotPasswordSchema } from "@/lib/validation";
import { sendEmail } from "@/lib/email";

const TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

export async function POST(request: Request) {
  const parsed = forgotPasswordSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Geçersiz form" },
      { status: 400 },
    );
  }

  const { email } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    console.log(`[forgot-password] Kayıtlı kullanıcı bulunamadı: ${email}`);
  } else if (!user.passwordHash) {
    console.log(`[forgot-password] Kullanıcı Google ile kayıtlı, şifresi yok: ${email}`);
  }

  if (user && user.passwordHash) {
    const token = randomBytes(32).toString("hex");
    const tokenHash = createHash("sha256").update(token).digest("hex");

    await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });
    await prisma.passwordResetToken.create({
      data: { userId: user.id, tokenHash, expiresAt: new Date(Date.now() + TOKEN_TTL_MS) },
    });

    const baseUrl = new URL(request.url).origin;
    const resetUrl = `${baseUrl}/sifre-sifirla?token=${token}`;

    console.log(`[forgot-password] Sıfırlama e-postası gönderiliyor: ${user.email}`);
    await sendEmail({
      to: user.email,
      subject: "erbab.com - Şifre Sıfırlama",
      html: `
        <p>Merhaba ${user.name},</p>
        <p>Şifreni sıfırlamak için aşağıdaki linke tıkla. Bu link 1 saat içinde geçerliliğini yitirecek.</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>Bu talebi sen yapmadıysan bu e-postayı yok sayabilirsin.</p>
      `,
    });
    console.log(`[forgot-password] sendEmail çağrısı tamamlandı: ${user.email}`);
  }

  return NextResponse.json({ ok: true });
}
