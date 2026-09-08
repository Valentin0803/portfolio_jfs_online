import FaqSection from "@/components/FaqSection";
import Hero from "@/components/Hero";
import NosServicesSection from "@/components/NosServicesSection";
import { Team } from "@/components/Team";
import { Process } from "@/components/Process";
import { Contact } from "@/components/Contact";
import { Projects } from "@/components/Projets";
import { BandeauLogo } from "@/components/BandeauLogo";
import { Offres } from "@/components/Offres";
import { ReelsImmo } from "@/components/ReelsImmo";

export default function Home() {
  return (
    <div>
      <Hero />
      <ReelsImmo />
      <BandeauLogo />
      <Offres />
      <FaqSection />
      <Projects />
      <NosServicesSection />
      <Process />
      <Team />
      <Contact />
    </div>
  );
}
