import { TextGenerateEffect } from "./ui/text-generate-effect";
import Link from "next/link";
import VimeoPlayer from "./VimeoPlayer";

export const Hero = () => {
  const words =
    "De la captation d’événement sur terre ou dans les airs, à la présentation de votre entreprise en passant par la photographie événementielle nous saurons réaliser votre projet.";
  return (
    <section
      id="APropos"
      className="grid lg:grid-cols-2 gap-10 px-5 pb-10 pt-44 lg:pt-56 lg:px-28 lg:mb-24 row content-start"
    >
      <div className="w-full lg:order-2 lg:pr-10">
        <VimeoPlayer
          videoId="1013125657" // Remplace par l'ID de ta vidéo
          autoplay={true}
          muted={true}
          controls={false}
          loop={true}
          className="rounded-lg"
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
