import { TextGenerateEffect } from "./ui/text-generate-effect";
import Link from "next/link";
import VimeoPlayer from "./VimeoPlayer";

export const Hero = () => {
  const words =
    "Production vidéo premium pour agences immobilières — tournage, montage, drone, gestion administrative incluse. Niveau de production au-dessus du standard français.";
  return (
    <section
      id="APropos"
      className="gap-10 px-5 pb-10 pt-44 lg:pt-20 lg:px-28 lg:mb-24 "
    >
      <div className="content-center items-center px-5 my-auto lg:mx-14 sm:mx-1 lg:order-1">
        <div className="text-center">
          <div className="pb-10 h-3/4">
            <h1 className="font-unbounded font-extrabold text-2xl lg:text-4xl tracking-[.02em] text-creme">
              Du contenu vidéo qui <span className="text-or">vend vos biens</span> avant
              la visite.
            </h1>
            <div>
              <TextGenerateEffect
                words={words}
                className=" text-3xl pt-5 font-dmSans font-thin text-creme"
              />
            </div>
          </div>
          <div className="w-2/3 mx-auto">
            <VimeoPlayer
              videoId="1062779681" // Remplace par l’ID de ta vidéo
              autoplay={true}
              muted={false}
              controls={true}
              loop={true}
              className="rounded-lg"
            />
          </div>
          <div className="pt-12">
            <Link href="#Offres">
              <button className="px-12 py-4 rounded-full bg-or font-dmSans font-bold border-or border text-charcoal tracking-widest uppercase transform hover:scale-105 hover:bg-charcoal hover:border-or hover:text-or transition-colors duration-500">
                Découvrir l&apos;Atelier du Réel
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
