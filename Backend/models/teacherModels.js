import mongoose from "mongoose";
const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    dep: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("teacherSchema", teacherSchema);
