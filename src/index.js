import express from "express";
import "dotenv/config";
import cors from "cors";
import errorMiddleware from "./error.middleware.js";
import { sendEmail } from "./utils/nodemailer.util.js";
import Template from "./models/template.model.js";
import connectDB from "./utils/db.js";
import handlebarsToHtml from "./utils/handlebars.util.js";
import keepAlive from "./utils/keep-alive.js";

const app = express();

// 1. GLOBAL MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. DATABASE & SERVER START
app.listen(process.env.PORT, () => {
  console.log(`connected to PORT ${process.env.PORT}`);
  connectDB();
});

keepAlive();

// 3. ROUTES
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    messages: `Today is ${new Date().toLocaleString()}, API is up and running`
  });
});

// Create Template
app.post("/api/template", async (req, res, next) => {
  const { title, subject, body, description, params = [] } = req.body;
  const random = Math.floor(Math.random() * 1000);

  try {
    const newTemplate = new Template({
      subject,
      body,
      description,
      params
    });

    newTemplate.slug = `${title?.toLowerCase().split(" ").join("-") || "template"}-${random}`;

    await newTemplate.save();
    return res.status(201).json({
      success: true,
      message: `New template created successfully`,
      data: newTemplate
    });
  } catch (err) {
    next(err); // Pass to errorMiddleware
  }
});

// Get Templates (Fixed logic flip)
app.get(["/api/template", "/api/template/:id"], async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = id ? await Template.findById(id) : await Template.find({});

    if (id && !data) {
      return res
        .status(404)
        .json({ success: false, message: "Template not found" });
    }

    return res.status(200).json({
      success: true,
      message: `Templates retrieved successfully`,
      data
    });
  } catch (err) {
    next(err);
  }
});

// Send Email
app.post("/api/send-email", async (req, res, next) => {
  const { to, text, subject, templateId, templateParams } = req.body;
  let html;
  let currentTemplate;

  try {
    currentTemplate = await Template.findById(templateId);
    if (!currentTemplate) {
      return res.status(404).json({
        success: false,
        message: "Template not found"
      });
    }
    html = handlebarsToHtml(currentTemplate.body, templateParams);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error encountered while finding template",
      error: err.message
    });
  }

  try {
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

app.use(errorMiddleware);
