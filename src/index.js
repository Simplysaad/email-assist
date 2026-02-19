import express from "express";
import "dotenv/config";
import { sendEmail } from "./utils/nodemailer.util.js";
import User from "./models/user.model.js";
import Template from "./models/template.model.js";
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

// const sampleUser = {
//   name: "saad idrs",
//   emailAddress: "saadidris23@gmail.com",
//   _id: "dhmakn37i7diukj398u"
// };

app.post("/api/template", async (req, res, next) => {
  try {
    const { title, subject, body, description } = req.body;

    // const currentUser = sampleUser
    // const currentUser = User.findOne({_id: })

    const random = Math.floor(Math.random * 10);

    const newTemplate = new Template({
      subject,
      body,
      description
    });

    newTemplate.slug = title?.toLowerCase().split(" ").join("-") + random;

    await newTemplate.save()


    return res.status(201).json({
      success: true,
      message: `new template created successfully`,
      data: newTemplate
    })
  } catch (err) {
    next(err);
  }
});

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

  return res.status(201).json({
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
