import type { Metadata } from "next";

import DropPage from "@/components/Drop/DropPage";

export const metadata: Metadata = {
  title: "Drop your photo | FlyFrame",
  description:
    "Drop a photo here to turn it into a passport or visa photo that matches your destination's requirements. It stays on your device.",
};

export default function Page() {
  return <DropPage />;
}
