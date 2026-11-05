import type { Metadata } from "next";

import CompareHub from "@/components/CompareSection/CompareHub/CompareHub";

const title = "Compare FlyFrame with Other Photo Tools | FlyFrame";
const description =
  "See how FlyFrame compares with other passport and visa photo tools, feature by feature, based on what each one states publicly.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

export default function CompareIndexPage() {
  return <CompareHub />;
}
