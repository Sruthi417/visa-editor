import Hero from "../components/Hero/Hero";
import Navbar from "../components/Nav/Navbar";
import Features from "@/components/Features/Features";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import PhotoTips from "@/components/PhotoTips/PhotoTips";
import Pricing from "@/components/Pricing/Pricing";
import Faq from "@/components/Faq/Faq";
import Review from "@/components/Review/Review";
import Footer from "@/components/Footer/Footer";
export default function Page() {
  return (
    <div className="main-layout">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <PhotoTips />
      <Pricing />
      <Review />
      <Faq />
      <Footer />
    </div>
  );
}
