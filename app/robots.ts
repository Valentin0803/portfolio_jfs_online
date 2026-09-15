import type { MetadataRoute } from "next";

// Sur une copie de démonstration (variable NEXT_PUBLIC_NOINDEX=1 côté Vercel),
// on interdit toute indexation pour ne pas créer de doublon du site réel.
const NOINDEX = process.env.NEXT_PUBLIC_NOINDEX === "1";

export default function robots(): MetadataRoute.Robots {
  if (NOINDEX) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://jfs-visual.fr/sitemap.xml",
    host: "https://jfs-visual.fr",
  };
}
