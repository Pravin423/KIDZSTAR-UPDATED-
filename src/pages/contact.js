import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactPage from "@/components/Contact/ContactPage";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us – KidzStar Preschool</title>
        <meta
          name="description"
          content="Get in touch with KidzStar Preschool. Find our locations in Thane and Koparkhairane, call us, send a message, or book a free trial class for your child."
        />
      </Head>

      <Navbar className="fixed top-0 left-0 right-0 w-full z-30" disableScrollEffect={false} />

      {/* Push content below fixed navbar */}
      <div className="pt-[70px]">
        <ContactPage />
      </div>

      <Footer />
    </>
  );
}
