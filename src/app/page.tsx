import Hero from "../components/main/hero";
import AboutPara from "../components/main/aboutpara";
import AboutScroll from "../components/main/aboutscroll";
import Toolkit from "../components/main/toolkit";

export default function Home() {
  return (
    <div className = "bg-[#2F2F2F] flex flex-col items-center">
      <Hero />
      <AboutScroll />
      <AboutPara />
      <Toolkit />
    </div>
  )
}
