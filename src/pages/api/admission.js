import connectDB from "@/lib/db";
import Admission from "@/models/Admission";
import { withMethod } from "@/lib/adminAuth";

// Simple string sanitiser — strips HTML tags and trims whitespace
const sanitise = (str) =>
  typeof str === "string" ? str.replace(/<[^>]*>/g, "").trim().slice(0, 500) : "";

async function handler(req, res) {
  try {
    await connectDB();

    const { childName, parentName, email, phone, message } = req.body;

    // Basic validation
    if (!phone && !email) {
      return res.status(400).json({ error: "Phone or email is required" });
    }

    const admission = await Admission.create({
      childName: sanitise(childName),
      parentName: sanitise(parentName),
      email: sanitise(email),
      phone: sanitise(phone),
      message: sanitise(message),
    });

    // Don't leak the full document back — just confirm success
    return res.status(201).json({ success: true, id: admission._id });
  } catch (err) {
    console.error("Admission error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Public route — only POST allowed, but inputs are sanitised
export default withMethod(["POST"], handler);
