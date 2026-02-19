import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  requireTLS: process.env.SMTP_HOST === "smtp.gmail.com" ? true : undefined,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

const sampleUser = {
  name: "saad idris",
  email: "saadidris23@gmail.com"
};

export async function sendEmail(emailOptions) {
  const { to, subject, text, html } = emailOptions;

  try {
    await transporter.sendMail({
      from: "saad <saadidris70@gmail.com>",
      to,
      subject,
      text,
      html
    });
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
}
