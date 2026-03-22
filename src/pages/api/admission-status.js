import connectDB from "@/lib/db";
import Admission from "@/models/Admission";
import { requireAdmin, withMethod } from "@/lib/adminAuth";

async function handler(req, res) {
  const { id, status } = req.body;

  if (!id || !["pending", "done"].includes(status)) {
    return res.status(400).json({ error: "Invalid id or status" });
  }

  try {
    await connectDB();

    const updated = await Admission.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true, strict: false }
    );

    if (!updated) return res.status(404).json({ error: "Record not found" });

    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ success: true, status: updated.status });
  } catch (err) {
    console.error("Status update error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Only authenticated admins; only PATCH allowed
export default requireAdmin(withMethod(["PATCH"], handler));
