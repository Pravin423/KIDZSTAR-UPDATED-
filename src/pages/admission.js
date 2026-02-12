import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Admission() {
  const [form, setForm] = useState({
    childName: "",
    parentName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/admission", {
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
        <h1 className="text-3xl font-bold mb-6">Admission Enquiry</h1>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <input name="childName" placeholder="Child Name"
            onChange={handleChange}
            className="w-full border p-2 rounded" required />

          <input name="parentName" placeholder="Parent Name"
            onChange={handleChange}
            className="w-full border p-2 rounded" required />

          <input name="email" type="email" placeholder="Email"
            onChange={handleChange}
            className="w-full border p-2 rounded" required />

          <input name="phone" placeholder="Phone"
            onChange={handleChange}
            className="w-full border p-2 rounded" required />

          <textarea name="message" placeholder="Message"
            onChange={handleChange}
            className="w-full border p-2 rounded" />

          <button className="bg-pink-500 text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
