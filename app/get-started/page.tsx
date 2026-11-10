import type { Metadata } from "next";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Nav/Navbar";
import GetStartedCountries from "@/components/getstarted/GetStartedCountries/GetStartedCountries";
import GetStartedCta from "@/components/getstarted/GetStartedCta/GetStartedCta";
import GetStartedFaq from "@/components/getstarted/GetStartedFaq/GetStartedFaq";
import GetStartedHero from "@/components/getstarted/GetStartedHero/GetStartedHero";
import GetStartedPrepare from "@/components/getstarted/GetStartedPrepare/GetStartedPrepare";
import GetStartedSteps from "@/components/getstarted/GetStartedSteps/GetStartedSteps";
import { COUNTRY_COUNT } from "@/components/features/featureData";

const title = "Get Started: Make Your Passport or Visa Photo | FlyFrame";
const description = `Choose your document and country, upload a photo and see it checked against the official rules, with a free preview. ${COUNTRY_COUNT} countries and the Schengen visa.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

/** The Get started page: each section is its own component in components/getstarted. */
export default function GetStartedPage() {
  return (
    <div className="main-layout">
      <Navbar />
      <main>
        <GetStartedHero />
        <GetStartedPrepare />
        <GetStartedSteps />
        <GetStartedCountries />
        <GetStartedFaq />
        <GetStartedCta />
      </main>
      <Footer />
    </div>
  );
}
