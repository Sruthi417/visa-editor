import Hero from "../components/Hero/Hero";
import Navbar from "../components/Nav/Navbar"
import Features from "@/components/Features/Features";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import PhotoTips from "@/components/PhotoTips/PhotoTips";
import Footer from "@/components/Footer/Footer";
export default function Page() {
  return (
    <div className="main-layout">
  <Navbar/>
  <Hero />
  <Features />
  <HowItWorks />
  <PhotoTips />
  <Footer/>
  </div>
)}