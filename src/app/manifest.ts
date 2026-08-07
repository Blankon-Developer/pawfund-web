import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pawfund",
    short_name: "Pawfund",
    description:
      "Pawfund is a Web3 crowdfunding platform for animal welfare, enabling transparent and secure donations using USDC on the Base network.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/x-icon",
      },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  }
}
