import type { Metadata } from "next";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Nav/Navbar";
import AboutCta from "@/components/about/AboutCta/AboutCta";
import AboutExplore from "@/components/about/AboutExplore/AboutExplore";
import AboutFaq from "@/components/about/AboutFaq/AboutFaq";
import AboutHero from "@/components/about/AboutHero/AboutHero";
import AboutNumbers from "@/components/about/AboutNumbers/AboutNumbers";
import AboutStory from "@/components/about/AboutStory/AboutStory";
import AboutValues from "@/components/about/AboutValues/AboutValues";
import { COUNTRY_COUNT } from "@/components/features/featureData";

const title = "About FlyFrame: Passport and Visa Photos Made at Home";
const description = `FlyFrame turns an everyday photo into a passport or visa photo that meets your country's published rules, in your browser. ${COUNTRY_COUNT} countries and the Schengen visa.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

/** The About page: each section is its own component in components/about. */
export default function AboutPage() {
  return (
    <div className="main-layout">
      <Navbar />
      <main>
        <AboutHero />
        <AboutStory />
        <AboutNumbers />
        <AboutValues />
        <AboutExplore />
        <AboutFaq />
        <AboutCta />
      </main>
      <Footer />
    </div>
  );
}
