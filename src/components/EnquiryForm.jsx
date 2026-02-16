import React from 'react'
import { useState } from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const EnquiryForm = ({
  isShortForm = false, // default to false for full form
}) => {
  const [submitted, setSubmitted] = useState(false);
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
    setSubmitted(true);
  };
  
  return (
    <div>
      {isShortForm ? (
        /* UI 1: Short Form (e.g., for Sidebar or Footer) */
        <div className={`${poppins.className} ml-[30px] p-6 rounded-2xl max-w-[450px]`}>
          {submitted ? (
            <p className="text-green-300 font-medium">Thanks! We'll call you soon.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input name="childName" placeholder="Child Name" onChange={handleChange}
                className="w-full bg-white/20 border border-white/30 p-2 rounded-lg text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400" required />
              <input name="parentName" placeholder="Parent Name" onChange={handleChange}
                className="w-full bg-white/20 border border-white/30 p-2 rounded-lg text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400" required />
              <input name="email" type="email" placeholder="Email Address" onChange={handleChange}
                className="w-full bg-white/20 border border-white/30 p-2 rounded-lg text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400" required />
              <input name="phone" placeholder="Phone Number" onChange={handleChange}
                className="w-full bg-white/20 border border-white/30 p-2 rounded-lg text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400" required />
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-[#1f2f8f] font-bold py-2 rounded-lg transition-colors">
                Get Call Back
              </button>
            </form>
          )}
        </div>
      ) : (
        /* UI 2: Full Form (e.g., for Admission Page) */
        <div className={`${poppins.className} p-4 md:p-10 flex items-center justify-center bg-transparent`}>
          <div className="w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row">
            {/* Left Side: Info */}
            <div className="md:w-1/3 bg-[#1f2f8f] p-8 text-white flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">Join Kidzstar</h2>
              <p className="text-blue-100 mb-6">Start your child's journey with us today. Fill out the form and our admissions team will guide you through the process.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">✓</div>
                  <span>Safe Environment</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">✓</div>
                  <span>Expert Teachers</span>
                </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="md:w-2/3 p-8 md:p-12">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-[#1f2f8f] mb-2">Thank You!</h2>
                  <p className="text-gray-600">Your application has been submitted successfully.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h1 className="text-3xl font-bold text-[#1f2f8f] mb-6">Admission Enquiry</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Child's Name</label>
                      <input name="childName" placeholder="Enter name" onChange={handleChange} className="w-full border-2 border-gray-100 p-3 rounded-xl focus:border-pink-400 outline-none transition-all" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Parent's Name</label>
                      <input name="parentName" placeholder="Enter name" onChange={handleChange} className="w-full border-2 border-gray-100 p-3 rounded-xl focus:border-pink-400 outline-none transition-all" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Email Address</label>
                      <input name="email" type="email" placeholder="email@example.com" onChange={handleChange} className="w-full border-2 border-gray-100 p-3 rounded-xl focus:border-pink-400 outline-none transition-all" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                      <input name="phone" placeholder="Phone" onChange={handleChange} className="w-full border-2 border-gray-100 p-3 rounded-xl focus:border-pink-400 outline-none transition-all" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Message (Optional)</label>
                    <textarea name="message" rows="3" placeholder="Any specific requirements?" onChange={handleChange} className="w-full border-2 border-gray-100 p-3 rounded-xl focus:border-pink-400 outline-none transition-all" />
                  </div>
                  <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-pink-200 transition-all transform hover:-translate-y-1">
                    Submit Application
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  )
}

export default EnquiryForm
