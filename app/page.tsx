import FaqSection from "@/components/FaqSection";
import Hero from "@/components/Hero";
import NosServicesSection from "@/components/NosServicesSection";
import { Team } from "@/components/Team";
import { Process } from "@/components/Process";
import { Contact } from "@/components/Contact";
import { Projects } from "@/components/Projets";
import { BandeauLogo } from "@/components/BandeauLogo";
import { ReelsImmo } from "@/components/ReelsImmo";

export default function Home() {
  return (
    <div>
      <Hero />
      <ReelsImmo />
      <NosServicesSection />
      <Projects />
      <BandeauLogo />
      <Process />
      <Team />
      <FaqSection />
      <Contact />
    </div>
  );
}
