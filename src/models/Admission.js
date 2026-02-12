import mongoose from "mongoose";

const AdmissionSchema = new mongoose.Schema({
  childName: String,
  parentName: String,
  email: String,
  phone: String,
  message: String,
}, { timestamps: true });

export default mongoose.models.Admission ||
  mongoose.model("Admission", AdmissionSchema);
