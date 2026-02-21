import express from "express";
import "dotenv/config";
import cors from "cors"
import errorMiddleware from "./error.middleware.js"
import {
  sendEmail
} from "./utils/nodemailer.util.js";
import Template from "./models/template.model.js";
import connectDB from "./utils/db.js";
import handlebarsToHtml from "./utils/handlebars.util.js";
import keepAlive from "./utils/keep-alive.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.listen(process.env.PORT, () => {
  console.log(`connected to PORT ${process.env.PORT}`);
  connectDB();
});

keepAlive()

app.use(cors())
app.use(errorMiddleware)
app.get("/", (req, res)=> {
  return res.status(200).json({
    success: true,
    messages: `Today is ${new Date().toLocaleString()}, API is up and running`
  })
})

app.post("/api/template", async (req, res, next) => {
  const {
    title, subject, body, description, params = []
  } = req.body;
  const random = Math.floor(Math.random() * 1000);

  try {
    const newTemplate = new Template( {
      subject,
      body,
      description,
      params
    });

    // Clean up slug generation
    newTemplate.slug = `${title?.toLowerCase().split(" ").join("-")}-${random}`;

    await newTemplate.save();

  } catch (err) {
    // next(err);
    return res.status(400).json({
      success: false,
      message: `Error encountered while creating new template`,
      error: err
    });
  }
  return res.status(201).json({
    success: true,
    message: `New template created successfully`,
    data: newTemplate
  });
});

app.post("/api/send-email", async (req, res, next) => {

  const {
    to, text, subject, templateId, templateParams
  } = req.body;
let html;
  try {

    const currentTemplate = await Template.findById(templateId);
    if (!currentTemplate)
      return res.status(404).json({
      success: false, message: "Template not found"
    });

html = handlebarsToHtml(currentTemplate.body, templateParams);

  }

  catch(err) {
    return res.status(500).json({
      success: false, message: "Error encountered while finding template"
    });
  }

  
  try {
    const email = await sendEmail( {
      to,
      from: "suhoorgroup <suhoorapp@gmail.com>",
      subject: subject || currentTemplate.subject,
      text,
      html
    });
  } catch (err) {
    // next(err);

    return res.status(500).json({
      success: false,
      message: "Error encountered while sending email",
      error: err
    })
  }
  return res.status(200).json({
    success: true,
    message: `Mail sent to ${to} successfully`,
    data: email
  });

});