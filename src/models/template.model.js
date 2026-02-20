import { Schema, model, Types } from "mongoose";

const templateSchema = new Schema({
  slug: {
    type: String,
    required: true
  },
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "users",
  //   required: true
  // },
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