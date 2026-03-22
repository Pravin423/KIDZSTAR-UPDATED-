import dbConnect from "@/lib/db";
import Gallery from "@/models/Gallery";
import cloudinary from "@/lib/cloudinary";
import { getSession } from "next-auth/react";
import { IncomingForm } from "formidable";
import { GoogleGenAI } from "@google/genai";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  await dbConnect();

  // ================= GET =================
  if (req.method === "GET") {
    const { page = 1, limit = 6 } = req.query;

    const skip = (page - 1) * limit;

    const images = await Gallery.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Gallery.countDocuments();

    return res.status(200).json({
      images,
      totalPages: Math.ceil(total / limit),
    });
  }

  // ================= POST =================
if (req.method === "POST") {
  try {
    await dbConnect();

    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const form = new IncomingForm({ multiples: false });


    const { files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const fileData = files.image;
    const file = Array.isArray(fileData) ? fileData[0] : fileData;

    if (!file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const fileBuffer = await fs.promises.readFile(file.filepath);

    // AI AUTO CAPTIONING
    let aiCaption = "";
    if (process.env.GEMINI_API_KEY) {
      try {
        console.log("Analyzing image with Gemini Vision AI...");
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const mimeType = file.mimetype || "image/jpeg";
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [
            "You are an expert at creating adorable, brief captions for a preschool photo gallery. Create a 3 to 6 word cheerful caption describing what is visually happening in this photo. Do not use quotes, hashtags, or punctuation marks except maybe an exclamation point.",
            {
              inlineData: {
                data: fileBuffer.toString("base64"),
                mimeType: mimeType,
              },
            },
          ],
        });
        aiCaption = response.text.trim();
        console.log("Generated Caption:", aiCaption);
      } catch (aiErr) {
        console.warn("AI Captioning failed, skipping...", aiErr);
      }
    }

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "preschool-gallery" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(fileBuffer);
    });

    const newImage = await Gallery.create({
      imageUrl: result.secure_url,
      publicId: result.public_id,
      caption: aiCaption || null,
    });

    return res.status(200).json(newImage);

  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return res.status(500).json({ message: "Upload failed", error: error.message });
  }
}



  // ================= DELETE =================
  if (req.method === "DELETE") {
    const session = await getSession({ req });
    if (!session)
      return res.status(401).json({ message: "Unauthorized" });

    const { id } = req.query;

    const image = await Gallery.findById(id);
    if (!image)
      return res.status(404).json({ message: "Not found" });

    await cloudinary.uploader.destroy(image.publicId);
    await image.deleteOne();

    return res.status(200).json({ message: "Deleted" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
