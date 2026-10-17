import type { Metadata } from "next";

import LegalPage from "@/components/Legal/LegalPage";
import { privacy } from "@/components/Legal/legalContent";

export const metadata: Metadata = {
  title: "Privacy Policy | FlyFrame",
  description:
    "How FlyFrame handles your information. Your photo is processed on your device and is not uploaded to be edited.",
};

export default function PrivacyPage() {
  return <LegalPage document={privacy} related={{ label: "Terms of Service", href: "/terms" }} />;
}
