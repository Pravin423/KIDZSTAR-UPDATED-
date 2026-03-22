import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeBanner from "@/components/Home/HomeBanner";
import WelcomeBanner from "@/components/Home/WelcomeBanner";
import Cloud from "@/components/Home/Cloud";
import Details from "@/components/Home/Details";
import Cloud2 from "@/components/Home/Cloud2";
import PhotoGallery from "@/components/AboutUs/PhotoGallery";



export default function Home() {
  return (
    <>
      <Navbar className="fixed top-0 left-0 right-0 w-full z-50" />
      <div className="bg-[#0D3697] overflow-x-hidden">

        <div className="min-h-screen bg-[url('/homestars.png')] bg-cover bg-center text-center">
          <HomeBanner />


        </div>
        <div  >
          <WelcomeBanner />
        </div>
        {/* Cloud — desktop only */}
        <div className="hidden md:block md:mt-[-160px]">
          <Cloud />
        </div>

        {/* Details — no negative margin on mobile; cloud 10px tail connects naturally */}
        <div className="mt-0 md:mt-[-190px]">
          <Details />
        </div>
        <div className="relative z-20 bg-white">
          <PhotoGallery />
        </div>

        {/* Footer */}
        <div className="mt-4 md:mt-[-160px]">
          <Footer />
        </div>



      </div>

    </>
  );
}
