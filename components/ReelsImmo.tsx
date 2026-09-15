"use client";

import { useEffect, useRef, useState } from "react";
import { reels, type Reel } from "@/lib/reels";

/**
 * Part de la carte qui doit être visible pour que la lecture démarre : en
 * dessous de la moitié, on regarde une vignette qui passe, pas un reel.
 */
const PLAY_THRESHOLD = 0.5;

const SoundOffIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M11 5 6 9H3v6h3l5 4z" />
    <line x1="16" y1="9" x2="22" y2="15" />
    <line x1="22" y1="9" x2="16" y2="15" />
  </svg>
);

const SoundOnIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M11 5 6 9H3v6h3l5 4z" />
    <path d="M15.5 8.5a5 5 0 0 1 0 7" />
    <path d="M18.5 5.5a9 9 0 0 1 0 13" />
  </svg>
);

interface ReelCardProps {
  reel: Reel;
  /** Vrai quand cette carte est celle dont le son est activé. */
  hasSound: boolean;
  onToggleSound: (slug: string) => void;
  /** Le visiteur a demandé moins d'animations : ni autoplay ni son piloté. */
  reducedMotion: boolean;
}

const ReelCard = ({
  reel,
  hasSound,
  onToggleSound,
  reducedMotion,
}: ReelCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Lecture pilotée par la visibilité : le reel démarre quand on arrive
  // dessus et s'arrête dès qu'il sort du champ, pour ne pas faire tourner
  // six vidéos en parallèle.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Un refus d'autoplay laisse simplement le poster affiché.
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: PLAY_THRESHOLD },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [reducedMotion]);

  // `muted` n'est pas piloté par React sur les éléments média : on le pose
  // nous-mêmes à chaque changement d'état.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = reducedMotion ? true : !hasSound;
  }, [hasSound, reducedMotion]);

  return (
    <article className="w-[78vw] shrink-0 snap-center sm:w-[300px]">
      <div className="relative aspect-[9/16] overflow-hidden rounded-[2rem] border border-creme/10 bg-[#100D08] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={reel.src}
          poster={reel.poster}
          muted
          loop
          playsInline
          preload="metadata"
          controls={reducedMotion}
        />

        <span className="absolute left-4 top-4 rounded-full border border-creme/15 bg-charcoal/60 px-3 py-1 font-dmSans text-[10px] font-bold uppercase tracking-[0.2em] text-creme/90 backdrop-blur">
          {reel.categorie}
        </span>

        {!reducedMotion && (
          <button
            type="button"
            onClick={() => onToggleSound(reel.slug)}
            aria-label={
              hasSound
                ? `Couper le son : ${reel.titre}`
                : `Activer le son : ${reel.titre}`
            }
            className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-or/40 bg-charcoal/70 text-creme backdrop-blur transition-colors duration-300 hover:border-or hover:text-or"
          >
            {hasSound ? <SoundOnIcon /> : <SoundOffIcon />}
          </button>
        )}
      </div>

      <h3 className="mt-5 font-dmSans font-bold text-creme text-sm leading-snug">
        {reel.titre}
      </h3>
      <p className="mt-1 font-dmSans text-sm text-creme/60">{reel.lieu}</p>
      <a
        href={reel.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block font-dmSans text-xs text-or hover:underline"
      >
        Voir le post de l&apos;agence ↗
      </a>
      {reel.likes ? (
        <p className="mt-1 font-dmSans text-xs text-creme/50">
          {reel.likes.toLocaleString("fr-FR")} likes sur le compte de l&apos;agence
        </p>
      ) : null}
    </article>
  );
};

/**
 * Vitrine des reels immobiliers : la preuve par l'image de ce que JFS Visual
 * produit pour les agences, avant toute promesse commerciale.
 */
export const ReelsImmo = () => {
  // Un seul reel peut avoir le son : activer celui-ci coupe les autres.
  const [soundSlug, setSoundSlug] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const toggleSound = (slug: string) =>
    setSoundSlug((current) => (current === slug ? null : slug));

  return (
    <section id="Immobilier" className="py-24 lg:py-40">
      <div className="max-w-3xl mx-auto mb-16 lg:mb-20 text-center px-6">
        <div className="font-dmSans text-xs tracking-[0.25em] uppercase text-or mb-5">
          Immobilier
        </div>
        <h2 className="font-unbounded font-bold text-3xl lg:text-5xl text-creme leading-tight">
          Vos biens attirent l’œil. Votre agence gagne en visibilité.
        </h2>
        <p className="font-dmSans text-creme/70 mt-6 text-base max-w-xl mx-auto">
          Présenter vos biens, faire connaître votre équipe et alimenter vos
          réseaux : découvrez les contenus créés pour Guy Hoquet Caen Carpiquet.
        </p>
      </div>

      {/* Défilement horizontal aimanté sur mobile, rangée centrée qui passe à
          la ligne sur desktop : la même mise en page tient de 1 à 6 reels.
          `w-fit max-w-full` centre la rangée tant qu'elle tient dans l'écran,
          et la laisse défiler dès qu'elle déborde. */}
      <div className="px-6">
        <div className="mx-auto flex w-fit max-w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:overflow-visible lg:gap-8 [&::-webkit-scrollbar]:hidden">
          {reels.map((reel) => (
            <ReelCard
              key={reel.slug}
              reel={reel}
              hasSound={soundSlug === reel.slug}
              onToggleSound={toggleSound}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReelsImmo;
