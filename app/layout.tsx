import type { Metadata } from "next";
import { Unbounded, DM_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import { PiedPage } from "@/components/PiedPage";
import MobileCta from "@/components/MobileCta";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-unbounded",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dmSans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jfs-visual.fr"),
  title: {
    default: "Production vidéo immobilière, Normandie et Savoie | JFS Visual",
    template: "%s | JFS Visual",
  },
  description:
    "Production vidéo, photo et drone pour agences immobilières en Normandie et en Savoie. Tournage, montage et gestion administrative incluse pour valoriser vos biens.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "JFS Visual",
    url: "https://jfs-visual.fr",
    title: "Production vidéo immobilière, Normandie et Savoie | JFS Visual",
    description:
      "Production vidéo, photo et drone pour agences immobilières en Normandie et en Savoie. Tournage, montage et gestion administrative incluse pour valoriser vos biens.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Production vidéo immobilière, Normandie et Savoie | JFS Visual",
    description:
      "Production vidéo, photo et drone pour agences immobilières en Normandie et en Savoie. Tournage, montage et gestion administrative incluse pour valoriser vos biens.",
  },
  icons: {
    icon: [
      {
        rel: "icon",
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/favicon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/favicon-64x64.png",
        sizes: "64x64",
        type: "image/png",
      },
    ],
  },
};

// Données structurées pour le SEO local. Toutes les informations
// (raison sociale, adresse, téléphone, email) proviennent de la page
// Mentions légales ; les réseaux sociaux du composant PiedPage.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "JFS Visual",
  url: "https://jfs-visual.fr",
  image: "https://jfs-visual.fr/opengraph-image",
  description:
    "Production vidéo, photo et drone pour agences immobilières en Normandie et en Savoie. Tournage, montage et gestion administrative incluse pour valoriser vos biens.",
  telephone: "+33602344339",
  email: "jfsvisual@gmail.com",
  founder: {
    "@type": "Person",
    name: "Valentin Charlot",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "1 le marais des fontaines",
    postalCode: "61200",
    addressLocality: "Occagnes",
    addressRegion: "Normandie",
    addressCountry: "FR",
  },
  // Deuxième implantation : Aix-les-Bains (Savoie). Pas d'adresse postale
  // publiée pour l'instant, seule la ville est déclarée.
  location: [
    {
      "@type": "Place",
      name: "JFS Visual, Normandie",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Occagnes",
        addressRegion: "Normandie",
        addressCountry: "FR",
      },
    },
    {
      "@type": "Place",
      name: "JFS Visual, Savoie",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Aix-les-Bains",
        postalCode: "73100",
        addressRegion: "Auvergne-Rhône-Alpes",
        addressCountry: "FR",
      },
    },
  ],
  areaServed: [
    { "@type": "City", name: "Caen" },
    { "@type": "AdministrativeArea", name: "Calvados" },
    { "@type": "AdministrativeArea", name: "Normandie" },
    { "@type": "City", name: "Aix-les-Bains" },
    { "@type": "City", name: "Chambéry" },
    { "@type": "City", name: "Annecy" },
    { "@type": "AdministrativeArea", name: "Savoie" },
    { "@type": "AdministrativeArea", name: "Haute-Savoie" },
    { "@type": "AdministrativeArea", name: "Auvergne-Rhône-Alpes" },
  ],
  sameAs: [
    "https://www.instagram.com/jfsvisual/",
    "https://www.linkedin.com/company/jfs-visual/",
    "https://www.tiktok.com/@jfs_visual",
    "https://www.youtube.com/@jfsvisual8964",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${unbounded.variable} ${dmSans.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        {/* La vidéo du hero est une iframe Vimeo : on anticipe la résolution
            DNS et la négociation TLS plutôt que de les payer au chargement. */}
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="dns-prefetch" href="https://player.vimeo.com" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? ''} />
        <SpeedInsights />
        <Analytics />
        <ScrollProgress />
        <Nav />
        {children}
        <PiedPage />
        <MobileCta />
      </body>
    </html>
  );
}
