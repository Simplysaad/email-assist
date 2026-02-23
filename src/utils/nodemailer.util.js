import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  secure: process.env.NODE_ENV === "production",
  requireTLS: process.env.SMTP_HOST === "smtp.gmail.com" ? true : undefined,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  },
  pool: false,
  maxConnections: 1
});

export async function sendEmail(emailOptions) {
  const { to, subject, text, html } = emailOptions;

  try {
    const email = await transporter.sendMail({
      from: "saad <saadidris70@gmail.com>",
      to,
      subject,
      text,
      html
    });

    console.log("Message sent: %s", info.messageId)
    return email;

  } catch (err) {
    console.error("Nodemailer Error:", err.message);
    throw err;
  }
}
