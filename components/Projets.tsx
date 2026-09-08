"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gallery } from "./ui/gallery";
import { GalleryCS } from "./ui/gallery-cs";
import VimeoPlayer from "./VimeoPlayer";
import YouTubePlayer from "./YoutubePlayer";
import Image from "next/image";
import photoStadeRenACar from "@/public/projects/RENT_A_CAR/photostade.png";

const PlayIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5 translate-x-[1px]"
  >
    <path d="M8 5.5v13l11-6.5z" />
  </svg>
);

export const Projects = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openProject = openIndex !== null ? dataProjets[openIndex] : null;

  return (
    <section id="NotreTravail" className="w-full py-24 lg:py-40">
      <div className="max-w-xl mx-auto mb-16 lg:mb-20 text-center px-6">
        <div className="font-dmSans text-xs tracking-[0.25em] uppercase text-or mb-5">
          Réalisations
        </div>
        <h2 className="font-unbounded font-bold text-3xl lg:text-5xl text-creme leading-tight mb-5">
          Nos derniers tournages
        </h2>
        <p className="font-dmSans text-creme/70">
          Une sélection de projets récents — agences immobilières,
          entreprises, événements.
        </p>
      </div>

      {/* Grille sobre : toutes les cartes ont le même poids, toutes s'ouvrent
          au clic. Pas de carte « active », donc plus rien qui laisse croire
          que seule celle du milieu est cliquable. */}
      <div className="mx-6 grid gap-6 sm:grid-cols-2 lg:mx-auto lg:max-w-6xl lg:grid-cols-3 lg:gap-8">
        {dataProjets.map((projet, index) => (
          <motion.div
            key={projet.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: Math.min(index, 5) * 0.06,
            }}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Voir le projet ${projet.title} — ${projet.category}`}
              className="group block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-or focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal rounded-[2rem]"
            >
              <div className="relative aspect-video overflow-hidden rounded-[2rem] border border-creme/10 bg-[#100D08] transition-colors duration-500 group-hover:border-or/40 group-focus-visible:border-or/40">
                <Image
                  src={projet.src}
                  alt={projet.title}
                  fill
                  sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />

                <span className="absolute left-4 top-4 rounded-full border border-creme/15 bg-charcoal/60 px-3 py-1 font-dmSans text-[10px] font-bold uppercase tracking-[0.2em] text-creme/90 backdrop-blur">
                  {projet.category}
                </span>

                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-or/40 bg-charcoal/70 text-creme backdrop-blur transition-colors duration-300 group-hover:border-or group-hover:text-or">
                    <PlayIcon />
                  </span>
                </span>
              </div>

              <h3 className="mt-5 font-dmSans font-bold text-creme text-sm leading-snug">
                {projet.title}
              </h3>
            </button>
          </motion.div>
        ))}
      </div>

      {openProject && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-charcoal/90 backdrop-blur-sm p-6"
          onClick={() => setOpenIndex(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl bg-charcoal border border-white/10 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenIndex(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 text-creme flex items-center justify-center hover:bg-or hover:text-charcoal transition-colors duration-200"
              aria-label="Fermer"
            >
              ✕
            </button>
            <span className="inline-block px-3 py-1 rounded-full bg-or text-charcoal font-dmSans font-bold text-xs uppercase tracking-widest mb-3">
              {openProject.category}
            </span>
            <h3 className="font-unbounded font-bold text-creme text-xl mb-4">
              {openProject.title}
            </h3>
            {openProject.content}
          </div>
        </div>
      )}
    </section>
  );
};


const dataProjets = [
  {
    category: "Présentation d'entreprise",
    title: "CCAS de Cenon",
    src: "/projects/MINIATURES/CCAS.jpg",
    content: (
      <VimeoPlayer
        videoId="1013125524"
        autoplay={true}
        muted={true}
        controls={true}
        loop={true}
        className="rounded-lg border-or/30 border-4"
      />
    ),
  },
  {
    category: "Présentation d'entreprise",
    title: "Künkel",
    src: "/projects/MINIATURES/kunkel.jpg",
    content: (
      <VimeoPlayer
        videoId="1013125599"
        autoplay={true}
        muted={true}
        controls={true}
        loop={true}
        className="rounded-lg border-or/30 border-4"
      />
    ),
  },
  {
    category: "Motion design",
    title: "Rent a Car",
    src: "/projects/MINIATURES/rentacar.jpg",
    content: (
      <div>
        <VimeoPlayer
          videoId="1013125482"
          autoplay={true}
          muted={true}
          controls={true}
          loop={true}
          className="rounded-lg "
        />
        <Image
          src={photoStadeRenACar}
          width={700}
          height={700}
          alt="Photo stade motion design rent a car"
          className="mx-auto"
        />
      </div>
    ),
  },
  {
    category: "Marque employeurs",
    title: "Cotral Lab",
    src: "/projects/MINIATURES/cotrallab.jpg",
    content: <Gallery />,
  },
  {
    category: "Présentation d'entreprise",
    title: "Alpes Connectiques Services",
    src: "/projects/MINIATURES/acs.jpg",
    content: (
      <YouTubePlayer
        videoId="f4WcU0btaQM" // Remplace par l'ID de ta vidéo
        autoplay={true}
        muted={true}
        controls={true}
        loop={true}
        className="rounded-lg shadow-lg" // Ajouter des classes ici
      />
    ),
  },
  {
    category: "Aftermovie",
    title: "Quartier Ouest",
    src: "/projects/MINIATURES/quartierouest.jpg",
    content: (
      <div className="lg:mx-60">
        <VimeoPlayer
          videoId="1013125627"
          autoplay={true}
          muted={true}
          controls={true}
          loop={true}
          className="rounded-lg border-or/30 border-4"
          vertical={true}
        />
      </div>
    ),
  },
  {
    category: "Aftermovie",
    title: "Combat stress",
    src: "/projects/MINIATURES/combatStress.jpg",
    content: (
      <div>
        <div className="lg:mx-60">
          <VimeoPlayer
            videoId="1013125561"
            autoplay={true}
            muted={true}
            controls={true}
            loop={true}
            className="rounded-lg border-or/30 border-4"
            vertical={true}
          />
        </div>
        <div>
          <GalleryCS />
        </div>
      </div>
    ),
  },
];
