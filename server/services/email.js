const nodemailer = require("nodemailer");
let transporter;

function hasSmtpConfig() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.SMTP_FROM
  );
}

async function sendMail({ to, subject, text, html }) {
  if (!hasSmtpConfig()) {
    console.log(`[email skipped] ${subject} -> ${to}`);
    return { sent: false, skipped: true };
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      pool: true,
      maxConnections: 1,
      maxMessages: 50,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      replyTo: process.env.ADMIN_NOTIFICATION_EMAIL || process.env.SMTP_USER,
      to,
      subject,
      text,
      html
    });
    const accepted = info.accepted || [];
    const rejected = info.rejected || [];
    console.log(
      `[email sent] ${subject} -> ${to}; messageId=${info.messageId}; accepted=${accepted.join(",") || "none"}; rejected=${rejected.join(",") || "none"}`
    );
    return { sent: accepted.length > 0, accepted, rejected, messageId: info.messageId };
  } catch (error) {
    console.error(`[email failed] ${subject} -> ${to}`, error);
    return { sent: false, error: error.message };
  }
}

module.exports = { sendMail };
