import Hero from "../components/main/hero";
import AboutPara from "../components/main/aboutpara";
import AboutScroll from "../components/main/aboutscroll";
import Toolkit from "../components/main/toolkit";
import Work from "../components/main/work";
import Certs from "../components/main/certs";
import Footer from "../components/main/footer";

export default function Home() {
  return (
    <div className="bg-[#2F2F2F] flex flex-col w-full">
      <Hero />
      <AboutScroll />
      <AboutPara />
      <Toolkit />
      <Work />
      <Certs id = "certs" />
      <Footer id = "footer" />
    </div>
  );
}
