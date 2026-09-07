export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.EMAIL_FROM || "erbab.support@gmail.com";

  if (!apiKey) {
    console.log(
      `[email] BREVO_API_KEY tanımlı değil, e-posta gönderilmedi.\nAlıcı: ${to}\nKonu: ${subject}\n${html}`,
    );
    return;
  }

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { email: senderEmail, name: "erbab.com" },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error(`[email] Brevo gönderimi başarısız (${res.status}): ${body}`);
    return;
  }

  const body = await res.json().catch(() => null);
  console.log(`[email] Brevo gönderimi başarılı. Alıcı: ${to}, messageId: ${body?.messageId ?? "?"}`);
}
