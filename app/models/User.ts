import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Prevent multiple model compilation
const User = mongoose.models.USERDATA || mongoose.model("USERDATA", userSchema);

export default User;
