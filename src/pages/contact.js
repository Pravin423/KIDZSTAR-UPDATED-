import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen p-10">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p>Email: info@littlestars.com</p>
        <p>Phone: +91 9876543210</p>
      </div>
      <Footer />
    </>
  );
}
