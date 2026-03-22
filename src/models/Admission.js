import mongoose from "mongoose";

const AdmissionSchema = new mongoose.Schema(
  {
    childName: String,
    parentName: String,
    email: String,
    phone: String,
    message: String,
    status: {
      type: String,
      enum: ["pending", "done"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// In Next.js dev mode, the module is re-evaluated on hot reload but
// mongoose.models still holds the OLD model (without `status`).
// We delete the cached model so it's always recreated with the latest schema.
if (mongoose.models.Admission) {
  delete mongoose.models.Admission;
}

export default mongoose.model("Admission", AdmissionSchema);
