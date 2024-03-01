import mongoose from "mongoose";
const routineSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
      trim: true,
    },
    period: {
      type: String,
      required: true,
      trim: true,
    },
    classes: {
      type: mongoose.ObjectId,
      ref: "classSchema",
      required: true,
    },
    subject: {
      type: mongoose.ObjectId,
      ref: "subjectSchema",
      required: true,
    },
    teacher: {
      type: mongoose.ObjectId,
      ref: "teacherSchema",
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("routineSchema", routineSchema);
