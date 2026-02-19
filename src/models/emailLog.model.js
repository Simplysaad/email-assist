const EmailLogSchema = new mongoose.Schema(
  {
    recipient: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    subject: String,
    templateId: { type: mongoose.Schema.Types.ObjectId, ref: "Template" },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "sent", "failed", "opened", "clicked"],
      default: "pending"
    },
    errorMessage: String, // To debug failed sends
    metadata: mongoose.Schema.Types.Mixed // Store the params used (e.g., { name: "Alex" })
  },
  {
    timestamps: true
  }
);

// Indexing for fast history lookups
EmailLogSchema.index({ userId: 1, createdAt: -1 });

const EmailLog = mongoose.model("EmailLog", EmailLogSchema);
export default EmailLog;