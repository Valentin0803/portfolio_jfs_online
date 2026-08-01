import { Unbounded, DM_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
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
      className={`${unbounded.variable} ${dmSans.variable} dark`}
      suppressHydrationWarning
    >
      <body>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? ''} />
        <SpeedInsights />
        <Analytics />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
