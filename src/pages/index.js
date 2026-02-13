import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeBanner from "@/components/Home/HomeBanner";
import WelcomeBanner from "@/components/Home/WelcomeBanner";
import Cloud from "@/components/Home/Cloud";
import Details from "@/components/Home/Details";

export default function Home() {
  return (
    <>
      <Navbar className="fixed top-0 left-0 right-0 w-full z-3" />
      <div className="bg-[#0D3697] overflow-x-hidden">

        <div className="min-h-screen bg-[url('/homestars.png')] bg-cover bg-center text-center">
          <HomeBanner />


        </div>
        <div >
          <WelcomeBanner />
        </div>
        <div className="mt-[-160px]">
          <Cloud />

        </div>
        <div className="mt-[-190px]">
          <Details />
        </div>





        <Footer />

      </div>

    </>
  );
}
