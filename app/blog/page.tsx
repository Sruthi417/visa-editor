import type { Metadata } from "next";

import BlogHub from "@/components/BlogSection/BlogHub/BlogHub";

const title = "Passport and Visa Photo Blog | FlyFrame";
const description =
  "Practical articles on taking your own passport or visa photo, from choosing a camera to getting the settings right.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

export default function BlogIndexPage() {
  return <BlogHub />;
}
