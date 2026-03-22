import { useEffect, useState, useRef } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminHeader from "@/components/AdminHeader";
import {
  Upload, Trash2, ImagePlus, ChevronLeft, ChevronRight,
  X, CheckCircle, AlertCircle, Loader2,
} from "lucide-react";

export default function AdminGallery() {
  const fileInputRef = useRef();

  const [images, setImages]           = useState([]);
  const [preview, setPreview]         = useState(null);
  const [file, setFile]               = useState(null);
  const [loading, setLoading]         = useState(true);
  const [uploading, setUploading]     = useState(false);
  const [deletingId, setDeletingId]   = useState(null);
  const [isDragging, setIsDragging]   = useState(false);
  const [toast, setToast]             = useState(null); // { type: 'success'|'error', msg }
  const [confirmDelete, setConfirmDelete] = useState(null); // img._id to delete
  const [page, setPage]               = useState(1);
  const [totalPages, setTotalPages]   = useState(1);

  useEffect(() => { fetchImages(1); }, []);

  // Auto-dismiss toast after 3 s
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const showToast = (type, msg) => setToast({ type, msg });

  const fetchImages = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const res  = await fetch(`/api/gallery?page=${pageNumber}&limit=9`);
      const data = await res.json();
      setImages(data.images || []);
      setTotalPages(data.totalPages || 1);
      setPage(pageNumber);
    } catch {
      showToast("error", "Failed to load images");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (selectedFile) => {
    if (!selectedFile) return;
    if (!selectedFile.type.startsWith("image/")) {
      showToast("error", "Please select a valid image file");
      return;
    }
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const cancelPreview = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/gallery", { method: "POST", body: formData });
      if (res.ok) {
        cancelPreview();
        fetchImages(page);
        showToast("success", "Image uploaded successfully!");
      } else {
        showToast("error", "Upload failed. Please try again.");
      }
    } catch {
      showToast("error", "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    setConfirmDelete(null);
    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchImages(page);
        showToast("success", "Image deleted.");
      } else {
        showToast("error", "Delete failed. Please try again.");
      }
    } catch {
      showToast("error", "Delete failed. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50/80">
        <AdminHeader />

        {/* ── Toast ──────────────────────────────────────────────────────── */}
        {toast && (
          <div className={`fixed top-20 right-6 z-50 flex items-center gap-3 px-4 py-3
            rounded-xl shadow-lg border text-sm font-semibold
            transition-all duration-300 animate-[slideIn_0.2s_ease]
            ${toast.type === "success"
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-red-50 border-red-200 text-red-700"
            }`}>
            {toast.type === "success"
              ? <CheckCircle size={16} />
              : <AlertCircle size={16} />}
            {toast.msg}
            <button onClick={() => setToast(null)} className="ml-1 opacity-60 hover:opacity-100">
              <X size={14} />
            </button>
          </div>
        )}

        {/* ── Delete Confirm Modal ────────────────────────────────────────── */}
        {confirmDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setConfirmDelete(null)} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6">
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <Trash2 size={26} className="text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 text-center mb-1">Delete Image?</h3>
              <p className="text-sm text-gray-500 text-center mb-6">
                This photo will be permanently removed from the gallery.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(confirmDelete)}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-all"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* ── Page Header ─────────────────────────────────────────────── */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gallery Management</h1>
              <p className="text-sm text-gray-500 mt-0.5">Upload and manage school photos</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-lg">
              <ImagePlus size={15} className="text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">
                {images.length} photo{images.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* ── Upload Area ─────────────────────────────────────────────── */}
          {!preview ? (
            <div
              onClick={() => fileInputRef.current.click()}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFileChange(e.dataTransfer.files[0]); }}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
                transition-all duration-300 mb-8
                ${isDragging
                  ? "border-blue-400 bg-blue-50 scale-[1.01]"
                  : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/30"
                }`}
            >
              <input
                type="file"
                accept="image/*"
                hidden
                ref={fileInputRef}
                onChange={(e) => handleFileChange(e.target.files[0])}
              />
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Upload size={26} className="text-blue-600" />
              </div>
              <p className="text-gray-700 font-semibold text-base mb-1">
                {isDragging ? "Drop your image here!" : "Drag & drop an image here"}
              </p>
              <p className="text-gray-400 text-sm mb-4">or click to browse your files</p>
              <span className="inline-block px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all">
                Choose Image
              </span>
            </div>
          ) : (
            /* ── Preview Panel ───────────────────────────────────────────── */
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900">Preview</h2>
                <button
                  onClick={cancelPreview}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-all"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full sm:w-56 h-40 object-cover rounded-xl border border-gray-100 shadow-sm"
                />
                <div className="flex flex-col justify-between gap-4 flex-1">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Selected file</p>
                    <p className="text-sm font-semibold text-gray-800 break-all">{file?.name}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {file ? (file.size / 1024).toFixed(1) + " KB" : ""}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={cancelPreview}
                      className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpload}
                      disabled={uploading}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-green-600 hover:bg-green-700
                        text-white text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                      {uploading
                        ? <><Loader2 size={15} className="animate-spin" /> Uploading…</>
                        : <><Upload size={15} /> Upload Image</>}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Image Grid ──────────────────────────────────────────────── */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-2xl h-56 animate-pulse" />
              ))}
            </div>
          ) : images.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ImagePlus size={24} className="text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">No images uploaded yet</p>
              <p className="text-gray-400 text-sm mt-1">Upload your first photo above</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {images.map((img) => (
                  <div
                    key={img._id}
                    className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
                  >
                    <div className="relative overflow-hidden h-52">
                      <img
                        src={img.imageUrl}
                        alt="Gallery"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                    </div>

                    {/* Delete button */}
                    <div className="p-3 flex items-center justify-between">
                      <span className="text-xs text-gray-400 truncate max-w-[140px]">
                        {img.imageUrl?.split("/").pop() || "image"}
                      </span>
                      <button
                        onClick={() => setConfirmDelete(img._id)}
                        disabled={deletingId === img._id}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                          bg-red-50 text-red-600 border border-red-100
                          hover:bg-red-600 hover:text-white hover:border-red-600
                          disabled:opacity-50 disabled:cursor-not-allowed
                          transition-all duration-200"
                      >
                        {deletingId === img._id
                          ? <Loader2 size={13} className="animate-spin" />
                          : <Trash2 size={13} />}
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <button
                    onClick={() => fetchImages(page - 1)}
                    disabled={page === 1}
                    className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center
                      text-gray-500 hover:bg-white hover:border-gray-300
                      disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      onClick={() => fetchImages(n)}
                      className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all
                        ${n === page
                          ? "bg-blue-600 text-white shadow-sm"
                          : "border border-gray-200 text-gray-500 hover:bg-white"}`}
                    >
                      {n}
                    </button>
                  ))}

                  <button
                    onClick={() => fetchImages(page + 1)}
                    disabled={page === totalPages}
                    className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center
                      text-gray-500 hover:bg-white hover:border-gray-300
                      disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
