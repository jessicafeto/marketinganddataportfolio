import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Positioning from "@/components/Positioning";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Packages from "@/components/Packages";
import Studio from "@/components/Studio";
import Journal from "@/components/Journal";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Positioning />
        <Services />
        <Work />
        <Process />
        <Packages />
        <Studio />
        <Journal />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
