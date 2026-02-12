import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GalleryPage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("/api/gallery")
      .then(res => res.json())
      .then(data => setImages(data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-10">
        <h1 className="text-3xl font-bold mb-6">Gallery</h1>

        <div className="grid grid-cols-3 gap-4">
          {images.map(img => (
            <img
              key={img._id}
              src={img.imageUrl}
              className="rounded shadow"
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
