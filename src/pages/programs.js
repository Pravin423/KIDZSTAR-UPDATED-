import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Programs() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen p-10">
        <h1 className="text-3xl font-bold">Our Programs</h1>
        <ul className="mt-4 list-disc ml-6">
          <li>Play Group</li>
          <li>Nursery</li>
          <li>Junior KG</li>
          <li>Senior KG</li>
        </ul>
      </div>
      <Footer />
    </>
  );
}
