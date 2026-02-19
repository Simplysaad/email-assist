import express from "express";
import "dotenv/config";
import { sendEmail } from "./utils/nodemailer.util.js";
// const app = express();

// app.listen(process.env.PORT, () => {
//   console.log(`connected to PORT ${process.env.PORT}`);
// });

// app.get("/api/send-email", async (req, res, next) => {
//   try {
//     const { emailAddress, template, data } = req.body;
//   } catch (err) {
//     next(err);
//   }
// });

// app.get("/api/broadcast", async (req, res, next) => {
//   try {
//     const { emailAddresses, template, data } = req.body;
//   } catch (err) {
//     next(err);
//   }
// });

sendEmail({
  to: "saadidris23@gmail.com",
  from: "saad <saadidris70@gmail.com>",
  subject: "Test",
  // html: "this is a test",
  html: "<strong>This is a strong text</strong>"
})
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
