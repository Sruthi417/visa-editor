import type { Metadata } from "next";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Nav/Navbar";
import FeaturesCountries from "@/components/features/FeaturesCountries/FeaturesCountries";
import FeaturesCta from "@/components/features/FeaturesCta/FeaturesCta";
import FeaturesFaq from "@/components/features/FeaturesFaq/FeaturesFaq";
import FeaturesHero from "@/components/features/FeaturesHero/FeaturesHero";
import FeaturesOptions from "@/components/features/FeaturesOptions/FeaturesOptions";
import FeaturesPrivacy from "@/components/features/FeaturesPrivacy/FeaturesPrivacy";
import FeaturesShowcase from "@/components/features/FeaturesShowcase/FeaturesShowcase";
import FeaturesTool from "@/components/features/FeaturesTool/FeaturesTool";
import Work from "@/components/features/Work/Work";
import { COUNTRY_COUNT, SPEC_COUNT } from "@/components/features/featureData";

const title = "Passport & Visa Photo Editor Features | FlyFrame";
const description = `Automatic cropping, background replacement and seven requirement checks for ${SPEC_COUNT} passport and visa photo specs in ${COUNTRY_COUNT} countries, all in your browser.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

/** The features page: each section is its own component in components/features. */
export default function FeaturesPage() {
  return (
    <div className="main-layout">
      <Navbar />
      <main>
        <FeaturesHero />
        <FeaturesShowcase />
        <Work />
        <FeaturesTool />
        <FeaturesPrivacy />
        <FeaturesOptions />
        <FeaturesCountries />

        <FeaturesFaq />
        <FeaturesCta />
      </main>
      <Footer />
    </div>
  );
}
