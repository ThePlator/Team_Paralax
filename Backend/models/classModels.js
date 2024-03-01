import mongoose from "mongoose";
const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("classSchema", classSchema);
