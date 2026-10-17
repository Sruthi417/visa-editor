import type { Metadata } from "next";

import LegalPage from "@/components/Legal/LegalPage";
import { terms } from "@/components/Legal/legalContent";

export const metadata: Metadata = {
  title: "Terms of Service | FlyFrame",
  description:
    "The terms for using FlyFrame to create passport and visa photos, including orders, delivery and what we can and cannot guarantee.",
};

export default function TermsPage() {
  return <LegalPage document={terms} related={{ label: "Privacy Policy", href: "/privacy" }} />;
}
