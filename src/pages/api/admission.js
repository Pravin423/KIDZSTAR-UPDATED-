import connectDB from "@/lib/db";
import Admission from "@/models/Admission";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    const admission = await Admission.create(req.body);
    res.status(201).json(admission);
  }
}
