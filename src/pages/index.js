import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-pink-50 text-center p-10">
        <h1 className="text-4xl font-bold text-pink-600">
          Welcome to Little Stars Preschool
        </h1>
        <p className="mt-4 text-lg">
          A place where learning begins with joy.
        </p>
      </div>
      <Footer />
    </>
  );
}
