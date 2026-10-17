import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FlyFrame",
    short_name: "FlyFrame",
    description:
      "Create passport and visa photos in seconds that match your destination's requirements.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2b97f0",
    icons: [
      { src: "/images/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/images/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/images/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
