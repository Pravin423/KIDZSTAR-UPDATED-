import connectDB from "@/lib/db";
import Admission from "@/models/Admission";

// Re-uses the Admission model to store contact enquiries.
// You can create a separate Contact model later if needed.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connectDB();
    const { name, phone, email, message } = req.body;

    // Map contact fields to admission schema fields
    const entry = await Admission.create({
      parentName: name,
      phone,
      email,
      message,
    });

    return res.status(201).json({ success: true, id: entry._id });
  } catch (err) {
    console.error("Contact API error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
