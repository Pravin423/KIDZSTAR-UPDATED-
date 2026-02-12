import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema(
  {
    imageUrl: String,
    publicId: String,
  },
  { timestamps: true }
);

export default mongoose.models.Gallery ||
  mongoose.model("Gallery", GallerySchema);
