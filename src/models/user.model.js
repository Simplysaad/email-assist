// id: Unique identifier (UUID).
// name: Name of the project (e.g., "Suhoor App").
// email: Admin email for the project.
// apiKey: A hashed string used to authorize POST /api/send-email calls.
// createdAt / updatedAt: Timestamps for auditing. 


import { Schema, model } from "mongoose";

const userSchema = new Schema({
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


const User = new model("user", userSchema)
export default User