import Hero from "../components/main/hero";
import AboutPara from "../components/main/aboutpara";
import AboutScroll from "../components/main/aboutscroll";
import Toolkit from "../components/main/toolkit";
import Work from "../components/main/work";
import Certs from "../components/main/certs";
import Footer from "../components/main/footer";

export default function Home() {
  return (
    // No max-w here — each section manages its own width
    <div className="bg-[#2F2F2F] flex flex-col w-full">
      {/* Full bleed */}
      <Hero />
      <AboutScroll />

      {/* Sections with inner max-w-7xl constraints */}
      <AboutPara />
      <Toolkit />
      <Work />
      <Certs />

      {/* Full bleed footer */}
      <Footer />
    </div>
  );
}
