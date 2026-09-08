"use client";

import { useState } from "react";
import { Gallery } from "./ui/gallery";
import { GalleryCS } from "./ui/gallery-cs";
import VimeoPlayer from "./VimeoPlayer";
import YouTubePlayer from "./YoutubePlayer";
import Image from "next/image";
import { ProjetsTrack } from "./ProjetsTrack";
import photoStadeRenACar from "@/public/projects/RENT_A_CAR/photostade.png";

export const Projects = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openProject = openIndex !== null ? dataProjets[openIndex] : null;

  return (
    <>
      {/* La galerie (épinglée en desktop, rail défilant ailleurs) porte
          l'ancre #NotreTravail : on arrive donc au début de la traversée. */}
      <ProjetsTrack projets={dataProjets} onOpen={setOpenIndex} />

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
    </>
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
