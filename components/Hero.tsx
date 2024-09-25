import { div } from "framer-motion/client";
import CarrouselLogo from "./CarrouselLogo";
import Player from "./Player";
import { SparklesCore } from "./ui/sparkles";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import Link from "next/link";

export const Hero = () => {
  const words =
    "De la captation d’événement sur terre ou dans les airs, à la présentation de votre entreprise en passant par la photographie événementielle nous saurons réaliser votre projet.";
  const logos = [
    "/img/logo/webp/Kunkel_Palettes_Bois_Logo.webp",
    "/img/logo/webp/cescop.webp",
    "/img/logo/webp/combatStress.webp",
    "/img/logo/webp/logo-acs.webp",
    "/img/logo/webp/ccasCenon.webp",
    "/img/logo/webp/logo-artso.webp",
    "/img/logo/webp/logo-cotral.webp",
    "/img/logo/webp/Rent-a-car.webp",
  ];
  return (
    <section
      id="APropos"
      className="grid lg:grid-cols-2 gap-10 px-5 pb-10 pt-32 lg:pt-56 lg:px-28 lg:mb-24 row content-start"
    >
      <div className="w-full lg:order-2 lg:pr-10">
        <Player
          videoPath="SHOWREEL/TeaserJFS2023.mp4"
          className="rounded-lg border-4 border-[#918C79] "
          autoplay
          muted
        />
      </div>
      <div className="items-center px-5 lg:my-auto lg:mx-14 sm:mx-1 lg:order-1">
        <div className="text-center lg:text-left">
          <h1 className="font-akira text-2xl lg:text-4xl tracking-[.1em]">
            JFS VISUAL
          </h1>
          <h2 className="font-leagueSpartan font-light text-2xl lg:text-4xl text-blanc tracking-[.1em]">
            <span className="text-jaune">PRODUCTION </span>AUDIOVISUEL
          </h2>
          <div>
            <TextGenerateEffect
              words={words}
              className=" text-3xl pt-5 font-leagueSpartan font-thin text-white"
            />
          </div>
          <div className="pt-12">
            <Link href="https://zcal.co/martin-ribot/30min" target="_blank">
              <button className="px-12 py-4 rounded-full bg-jaune font-bold border-jaune border text-black tracking-widest uppercase transform hover:scale-105 hover:bg-gris hover:border-jaune hover:text-white transition-colors duration-500">
                Prenez rendez-vous
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
