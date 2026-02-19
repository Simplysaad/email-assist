// id: Unique identifier.
// slug: A human-readable ID (e.g., welcome-email) that the user will send in their API request.
// userId: Foreign key linking the template to its owner (The User).
// subject: The default subject line (can include placeholders like Welcome to {{appName}}).
// body: The raw HTML string containing Handlebars placeholders.
// description: Optional notes on what the template is for.

import { Schema, model, Types } from "mongoose";

const templateSchema = new Schema({
  slug: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  subject: {
    type: String,
    default: "New notification"
  },
  body: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});


// templateSchema.virtual("slug").get(())

const Template = new model("template", templateSchema)
export default Template