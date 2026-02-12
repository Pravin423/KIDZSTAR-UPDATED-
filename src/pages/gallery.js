import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gallery?page=1&limit=100")
      .then(res => res.json())
      .then(data => {
        setImages(data.images || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen p-10">
        <h1 className="text-3xl font-bold mb-6">Gallery</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img) => (
              <img
                key={img._id}
                src={img.imageUrl}
                alt="Gallery"
                className="rounded-lg shadow w-full h-64 object-cover"
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
