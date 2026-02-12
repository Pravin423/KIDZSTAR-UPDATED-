import connectDB from "@/lib/db";
import Gallery from "@/models/Gallery";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const images = await Gallery.find();
    res.status(200).json(images);
  }

  if (req.method === "POST") {
    const image = await Gallery.create(req.body);
    res.status(201).json(image);
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    await Gallery.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted" });
  }
}
