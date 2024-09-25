import ClientLayout from "@/components/ClientLayout"; // Composant client pour la logique client
import { Inter, League_Spartan } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { metadata } from "./metadata";

const inter = Inter({ subsets: ["latin"] });
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

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${leagueSpartan.variable} ${akira.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-gris text-blanc h-full w-full">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
