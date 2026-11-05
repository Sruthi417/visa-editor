import Hero from "@/components/landing/Hero/Hero";
import Navbar from "../components/Nav/Navbar";
import Features from "@/components/landing/Features/Features";
import HowItWorks from "@/components/landing/HowItWorks/HowItWorks";
import PhotoTips from "@/components/landing/PhotoTips/PhotoTips";
import Pricing from "@/components/landing/Pricing/Pricing";
import Faq from "@/components/landing/Faq/Faq";
import Review from "@/components/landing/Review/Review";
import Footer from "@/components/Footer/Footer";
export default function Page() {
  return (
    <div className="main-layout">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <PhotoTips />
      {/* <Pricing /> */}
      <Review />
      <Faq />
      <Footer />
    </div>
  );
}
