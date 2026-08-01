"use client";
import FaqSection from "@/components/FaqSection";
import Hero from "@/components/Hero";
import NosServicesSection from "@/components/NosServicesSection";
import { Team } from "@/components/Team";
import { Process } from "@/components/Process";
import { Contact } from "@/components/Contact";
import { PiedPage } from "@/components/PiedPage";
import { Projects } from "@/components/Projets";
import { BandeauLogo } from "@/components/BandeauLogo";
import { Offres } from "@/components/Offres";

export default function Home() {
  return (
    <div>
      <Hero />
      <BandeauLogo />
      <Offres />
      <Projects />
      <NosServicesSection />
      <Process />
      <Team />
      <FaqSection />
      <Contact />
      <PiedPage />
    </div>
  );
}
