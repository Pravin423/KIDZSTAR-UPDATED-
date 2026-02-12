import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TeacherTraining() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/teacher", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Application Submitted!");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-10">
        <h1 className="text-3xl font-bold mb-6">
          Teacher Training Application
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <input name="name" placeholder="Full Name"
            onChange={handleChange}
            className="w-full border p-2 rounded" required />

          <input name="email" type="email" placeholder="Email"
            onChange={handleChange}
            className="w-full border p-2 rounded" required />

          <input name="phone" placeholder="Phone"
            onChange={handleChange}
            className="w-full border p-2 rounded" required />

          <input name="qualification" placeholder="Qualification"
            onChange={handleChange}
            className="w-full border p-2 rounded" required />

          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
