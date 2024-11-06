"use client";
import FaqSection from "@/components/FaqSection";
import Hero from "@/components/Hero";
import NosServicesSection from "@/components/NosServicesSection";
import { Team } from "@/components/Team";
import { Process } from "@/components/Process";
import { TarifSection } from "@/components/Tarifs";
import { Contact } from "@/components/Contact";
import { PiedPage } from "@/components/PiedPage";
import { Projects } from "@/components/Projets";
import { BandeauLogo } from "@/components/BandeauLogo";

import { GoogleAnalytics } from "nextjs-google-analytics";

export default function Home() {
  return (
    <div>
      <GoogleAnalytics trackPageViews />
      <Hero />
      <BandeauLogo />
      <Projects />
      <NosServicesSection />
      <Process />
      <TarifSection />
      <Team />
      <FaqSection />
      <Contact />
      <PiedPage />
    </div>
  );
}
