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
        <Link href={CONTACT_URL} className="inline-block px-10 py-[18px] rounded-full bg-or font-dmSans font-bold text-xs tracking-[0.1em] uppercase text-charcoal hover:bg-charcoal hover:text-or border border-or transition-colors duration-300">
            {CONTACT_LABEL}
        </Link>
        <p className="font-dmSans text-xs text-creme/60 mt-4">
          Un premier échange, sans engagement
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3 font-dmSans text-sm">
          <Link href="#Immobilier" className="rounded-full border border-or/60 bg-charcoal/60 px-6 py-3 text-creme transition-colors hover:border-or hover:text-or">
            Immobilier <span aria-hidden="true">↗</span>
          </Link>
          <Link href="#NotreTravail" className="rounded-full border border-creme/30 bg-charcoal/60 px-6 py-3 text-creme transition-colors hover:border-or hover:text-or">
            Entreprises &amp; événements <span aria-hidden="true">↗</span>
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
