import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.NODE_ENV === "production",
  requireTLS: process.env.SMTP_HOST === "smtp.gmail.com" ? true : undefined,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
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

    return email;
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
}
