import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen p-10">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p>
          Our preschool focuses on early childhood development
          through fun learning activities.
        </p>
      </div>
      <Footer />
    </>
  );
}
