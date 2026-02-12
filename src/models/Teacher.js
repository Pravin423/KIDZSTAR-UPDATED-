import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  qualification: String,
}, { timestamps: true });

export default mongoose.models.Teacher ||
  mongoose.model("Teacher", TeacherSchema);
