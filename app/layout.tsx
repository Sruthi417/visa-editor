import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "FlyFrame | Passport & Visa Photo Maker Online",
  description:
    "Create passport and visa photos in seconds. Upload a photo and FlyFrame crops, resizes and fixes the background to match your destination's requirements.",
  openGraph: {
    title: "FlyFrame | Passport & Visa Photo Maker Online",
    description:
      "Create passport and visa photos in seconds that match your destination's requirements.",
    siteName: "FlyFrame",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body>{children}</body>
    </html>
  );
}