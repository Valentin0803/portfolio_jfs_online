import localFont from "next/font/local";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Head from "next/head";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-leagueSpartan",
});

const akira = localFont({
  src: [
    {
      path: "../public/fonts/Akira/AkiraBold.otf",
      weight: "700",
    },
  ],
  variable: "--font-akira",
});

export const metadata = {
  title: "JFS Visual",
  description:
    "De la captation d’événement sur terre ou dans les airs, à la présentation de votre entreprise en passant par la photographie événementielle nous saurons réaliser votre projet.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${leagueSpartan.variable} ${akira.variable} dark`}
      suppressHydrationWarning
    >
      <GoogleAnalytics gaId="G-BYDD8ELGMN" />

      <SpeedInsights />
      <Analytics />
      <Head>
        <title>JFS Visual</title>
        <meta
          name="description"
          content="De la captation d’événement sur terre ou dans les airs, à la présentation de votre entreprise en passant par la photographie événementielle nous saurons réaliser votre projet."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
