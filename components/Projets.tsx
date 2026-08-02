"use client";

import { useState } from "react";
import CarouselStacked from "@/components/ui/carousel-07";
import { Gallery } from "./ui/gallery";
import { GalleryCS } from "./ui/gallery-cs";
import VimeoPlayer from "./VimeoPlayer";
import YouTubePlayer from "./YoutubePlayer";
import Image from "next/image";
import photoStadeRenACar from "@/public/projects/RENT_A_CAR/photostade.png";

export const Projects = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openProject = openIndex !== null ? dataCarousel[openIndex] : null;

  return (
    <div id="NotreTravail" className="w-full h-full py-24 lg:py-40">
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

      <CarouselStacked
        slides={dataCarousel.map((c) => ({
          image: c.src,
          title: c.title,
          description: c.category,
          badge: c.category,
        }))}
        onSlideClick={(i) => setOpenIndex(i)}
      />

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
    </div>
  );
};

const dataCarousel = [
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
