import { useEffect, useState, useRef } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminHeader from "@/components/AdminHeader";

export default function AdminGallery() {
  const fileInputRef = useRef();

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchImages(1);
  }, []);

  const fetchImages = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/gallery?page=${pageNumber}&limit=6`);
      const data = await res.json();

      setImages(data.images || []);
      setTotalPages(data.totalPages || 1);
      setPage(pageNumber);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (selectedFile) => {
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/gallery", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setFile(null);
      setPreview(null);
      fetchImages(page);
    } else {
      alert("Upload failed");
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/gallery?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      fetchImages(page);
    } else {
      alert("Delete failed");
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />

        <div className="p-10">
          <h1 className="text-3xl font-bold mb-6">Gallery Management</h1>

          {/* Upload Box */}
          <div
            className="border-2 border-dashed border-gray-400 p-10 text-center bg-white rounded-lg mb-6 cursor-pointer hover:border-blue-500"
            onClick={() => fileInputRef.current.click()}
            onDrop={(e) => {
              e.preventDefault();
              handleFileChange(e.dataTransfer.files[0]);
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <p>Drag & Drop Image Here or Click to Upload</p>

            <input
              type="file"
              accept="image/*"
              hidden
              ref={fileInputRef}
              onChange={(e) => handleFileChange(e.target.files[0])}
            />
          </div>

          {/* Preview */}
          {preview && (
            <div className="mb-6 bg-white p-6 rounded-lg shadow">
              <h2 className="mb-4 font-semibold">Preview</h2>
              <img
                src={preview}
                alt="Preview"
                className="w-64 rounded-lg shadow mb-4"
              />
              <button
                onClick={handleUpload}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Confirm Upload
              </button>
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {/* Image Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((img) => (
                  <div
                    key={img._id}
                    className="bg-white p-4 rounded-lg shadow"
                  >
                    <img
                      src={img.imageUrl}
                      alt="Gallery"
                      className="rounded-lg mb-3 w-full h-48 object-cover"
                    />

                    <button
                      onClick={() => handleDelete(img._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg w-full"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex gap-3 justify-center">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => fetchImages(index + 1)}
                      className={`px-4 py-2 rounded-lg ${
                        page === index + 1
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
