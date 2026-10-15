import Hero from "../components/Hero/Hero";
import Navbar from "../components/Nav/Navbar"
import Footer from "@/components/Footer/Footer";
export default function Page() {
  return (
    <div className="main-layout">
  <Navbar/>
  <Hero />
  <Footer/>
  </div>
)}