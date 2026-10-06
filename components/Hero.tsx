import Link from "next/link";
import Image from "next/image";
import poster from "@/public/img/hero-poster.jpg";
import HeroVideo from "./HeroVideo";
import { CONTACT_LABEL, CONTACT_URL } from "@/lib/site";

export const Hero = () => {
  return (
    <section
      className="relative min-h-[800px] lg:min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-6 pt-32 pb-36"
    >
      {/* Image de secours derrière l'iframe : tant que le lecteur Vimeo n'a
          pas chargé (ou s'il ne charge jamais), le premier écran affiche
          cette photo plutôt qu'un aplat noir. */}
      <Image
        src={poster}
        alt=""
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        className="object-cover pointer-events-none"
      />

      {/* Vidéo de fond, voile dégradé et bouton de son : regroupés côté client
          car le voile s'éclaircit quand le visiteur active le son. */}
      <HeroVideo />

      <div className="relative z-10">
        <div className="text-xs font-dmSans tracking-[0.25em] uppercase text-or mb-7 opacity-90">
          Production vidéo &amp; drone · Normandie et Savoie
        </div>
        <h1 className="font-unbounded font-extrabold text-4xl leading-[1.08] tracking-[-0.02em] text-creme max-w-[20ch] mx-auto sm:text-5xl lg:text-7xl">
          Votre savoir-faire mérite <span className="text-or">d’être vu.</span>
        </h1>
        <p className="font-dmSans text-creme/75 max-w-[46ch] mx-auto mt-8 mb-10 text-base lg:text-xl">
          Nous créons les vidéos qui mettent votre activité en lumière.
          Une spécialité : la visibilité des agences immobilières.
          Et la même exigence pour vos films d’entreprise et interviews.
        </p>
        <Link href={CONTACT_URL} className="btn-primary max-[399px]:mx-auto max-[399px]:flex max-[399px]:w-full max-[399px]:max-w-[22rem]">
            {CONTACT_LABEL}
        </Link>
        <div className="mx-auto mt-4 flex w-full max-w-[22rem] flex-col items-stretch justify-center gap-3 min-[400px]:max-w-none min-[400px]:flex-row min-[400px]:items-center">
          <Link href="#Immobilier" className="btn-secondary bg-charcoal/40">
            Immobilier
          </Link>
          <Link href="#NotreTravail" className="btn-secondary bg-charcoal/40">
            Entreprises &amp; événements
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-creme/50 z-10">
        <span className="font-dmSans text-[11px] tracking-[0.2em] uppercase">
          Scroll
        </span>
        <span className="w-px h-10 bg-gradient-to-b from-or to-transparent"></span>
      </div>
    </section>
  );
};
export default Hero;
