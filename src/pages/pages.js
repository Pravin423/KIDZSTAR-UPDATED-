import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PagesSection() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen p-10">
        <h1 className="text-3xl font-bold">More Pages</h1>
        <p>Additional information about events and activities.</p>
      </div>
      <Footer />
    </>
  );
}
