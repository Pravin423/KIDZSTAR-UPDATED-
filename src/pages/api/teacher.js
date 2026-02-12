import connectDB from "@/lib/db";
import Teacher from "@/models/Teacher";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    const teacher = await Teacher.create(req.body);
    res.status(201).json(teacher);
  }
}
