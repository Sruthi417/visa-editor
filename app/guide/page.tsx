import type { Metadata } from "next";

import GuideHub from "@/components/GuideSection/GuideHub/GuideHub";

const title = "Passport and Visa Photo Guides | FlyFrame";
const description =
  "Practical, step-by-step guides for taking a clean passport or visa photo before you edit it, including how to take one at home with your phone.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

export default function GuideIndexPage() {
  return <GuideHub />;
}
