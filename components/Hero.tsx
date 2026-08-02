import Link from "next/link";

export const Hero = () => {
  return (
    <section
      id="APropos"
      className="relative h-screen min-h-[640px] flex flex-col items-center justify-center text-center overflow-hidden px-6"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          width: "100vw",
          height: "56.25vw",
          minHeight: "100vh",
          minWidth: "177.78vh",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          position: "absolute",
        }}
      >
        <iframe
          src="https://player.vimeo.com/video/1062779681?autoplay=1&muted=1&controls=0&loop=1&background=1"
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen"
          title="JFS Visual — showreel"
        ></iframe>
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,9,7,0.25) 0%, rgba(10,9,7,0.55) 55%, rgba(10,9,7,0.97) 100%)",
        }}
      ></div>

      <div className="relative z-10">
        <div className="text-xs font-dmSans tracking-[0.25em] uppercase text-or mb-7 opacity-90">
          Production vidéo &amp; drone — Normandie
        </div>
        <h1 className="font-unbounded font-extrabold text-[2.6rem] leading-[0.98] tracking-[-0.02em] text-creme max-w-[16ch] mx-auto sm:text-6xl lg:text-[6.5rem]">
          Du contenu vidéo qui <span className="text-or">vend vos biens</span>{" "}
          avant la visite.
        </h1>
        <p className="font-dmSans text-creme/75 max-w-[46ch] mx-auto mt-8 mb-10 text-base lg:text-xl">
          Production vidéo premium pour agences immobilières — tournage,
          montage, drone, gestion administrative incluse. Niveau de
          production au-dessus du standard français.
        </p>
        <Link href="#Offres">
          <button className="px-10 py-[18px] rounded-full bg-or font-dmSans font-bold text-xs tracking-[0.1em] uppercase text-charcoal transform hover:scale-105 hover:bg-charcoal hover:text-or border border-or transition-colors duration-500">
            Découvrir l&apos;Atelier du Réel
          </button>
        </Link>
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
