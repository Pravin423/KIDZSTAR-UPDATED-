import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeBanner from "@/components/Home/HomeBanner";

export default function Home() {
  return (
    <>
    <div className="bg-[#0D3697] overflow-x-hidden">
      <Navbar className="fixed top-0 left-0 right-0 w-full z-3" />
      <div className="min-h-screen bg-[url('/homestars.png')] bg-cover bg-center text-center">
      <HomeBanner/>
      <HomeBanner/>
      
       
      </div>
      <Footer />

    </div>
      c
    </>
  );
}
