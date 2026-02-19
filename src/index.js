import express from "express";
import "dotenv/config";
import { sendEmail } from "./utils/nodemailer.util.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
  console.log(`connected to PORT ${process.env.PORT}`);
});

// {
//   serviceID,
//   templateId,
//   templateParams,
//   userID
// }



// app.post("/api/send-email", async (req, res, next) => {
//   // Now expecting templateId (e.g., "alpha/welcome") and params
//   const { to, subject, templateId, templateParams, text } = req.body;

//   try {
//     await sendEmail({
//       to,
//       subject: subject || "New Notification",
//       template: templateId, // Pass the slug to the util
//       data: templateParams, // The variables for React
//       message: text // Fallback plain text
//     });

//     res.status(201).json({
//       success: true,
//       message: `Mail sent to ${to} successfully`
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: "Failed to send email" });
//   }
// });



app.post("/api/send-email", async (req, res, next) => {
  const { to, text, html, subject } = req.body;
  try {
    const email = await sendEmail({
      to,
      from: "suhoorgroup <suhoorapp@gmail.com>",
      subject,
      text,
      html
    });
  } catch (err) {
    next("Error encountered while sending email", err);
  }

  res.status(201).json({
    success: true,
    message: `Mail sent to ${to} successfully`
    // data: {}
  });
});

// app.get("/api/broadcast", async (req, res, next) => {
//   try {
//     const { emailAddresses, template, data } = req.body;
//   } catch (err) {
//     next(err);
//   }
// });
