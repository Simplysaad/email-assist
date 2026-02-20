import express from "express";
import "dotenv/config";
import { sendEmail } from "./utils/nodemailer.util.js";
import Template from "./models/template.model.js";
import connectDB from "./utils/db.js";
import handlebarsToHtml from "./utils/handlebars.util.js";
import keepAlive from "./utils/keep-alive.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
  console.log(`connected to PORT ${process.env.PORT}`);
  connectDB();
});

keepAlive()


app.get("/", (req, res)=>{
  return res.status(200).json({
    success: true,
    messages: `Today is ${new Date().toLocaleString()}, API is up and running`
  })
})

app.post("/api/template", async (req, res, next) => {
  try {
    const { title, subject, body, description, params = [] } = req.body;

    // FIX: Math.random is a function, it needs ()
    const random = Math.floor(Math.random() * 1000);

    const newTemplate = new Template({
      subject,
      body,
      description,
      params
    });

    // Clean up slug generation
    newTemplate.slug = `${title?.toLowerCase().split(" ").join("-")}-${random}`;

    await newTemplate.save();

    return res.status(201).json({
      success: true,
      message: `New template created successfully`,
      data: newTemplate
    });
  } catch (err) {
    next(err);
  }
});

app.post("/api/send-email", async (req, res, next) => {
  try {
    const { to, text, subject, templateId, templateParams } = req.body;

    const currentTemplate = await Template.findById(templateId);
    if (!currentTemplate)
      return res.status(404).json({ message: "Template not found" });

    const html = handlebarsToHtml(currentTemplate.body, templateParams);

    const email = await sendEmail({
      to,
      from: "suhoorgroup <suhoorapp@gmail.com>",
      subject: subject || currentTemplate.subject, 
      text,
      html
    });

    return res.status(200).json({
      success: true,
      message: `Mail sent to ${to} successfully`,
      data: email
    });
  } catch (err) {
    next(err);
  }
});
