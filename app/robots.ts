import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://jfs-visual.fr/sitemap.xml",
    host: "https://jfs-visual.fr",
  };
}
