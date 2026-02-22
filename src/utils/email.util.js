// import {
//   TransactionalEmailsApi,
//   TransactionalEmailsApiApiKeys
// } from "@getbrevo/brevo";

// Initialize the API instance
const apiInstance = new TransactionalEmailsApi();

// Configure the API Key
apiInstance.setApiKey(
  TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export async function sendEmail({ to, subject, html }) {
  try {
    const sendSmtpEmail = {
      sender: {
        email: process.env.BREVO_SENDER,
        name: "suhoor"
      },
      to: [{ email: to }],
      subject: subject,
      htmlContent: html
    };

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Email Sent Successfully. Message ID:", data.body.messageId);
    return data;
  } catch (err) {
    // Fix: Reference 'err' which is defined in the catch block
    console.error("Brevo API Error: ", err.response ? err.response.body : err);
    throw err;
  }
}
