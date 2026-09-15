"use client";

import { useState } from "react";
import { Gallery } from "./ui/gallery";
import { GalleryCS } from "./ui/gallery-cs";
import { ExpandingCards } from "./ui/expanding-cards";
import VimeoPlayer from "./VimeoPlayer";
import YouTubePlayer from "./YoutubePlayer";
import Image from "next/image";
import photoStadeRenACar from "@/public/projects/RENT_A_CAR/photostade.png";

export const Projects = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openProject = openIndex !== null ? dataProjets[openIndex] : null;

  return (
    <>
      <section id="NotreTravail" className="w-full bg-charcoal py-24 lg:py-40">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-xl">
            <div className="mb-4 font-dmSans text-xs uppercase tracking-[0.25em] text-or">
              Entreprises &amp; événements
            </div>
            <h2 className="mb-4 font-unbounded text-3xl font-bold leading-tight text-creme lg:text-5xl">
              Des films à l’image de votre entreprise
            </h2>
            <p className="font-dmSans text-creme/70">
              Films de présentation, interviews, visites d’entreprise et
              événements : découvrez une sélection de nos réalisations.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 flex max-w-6xl justify-center px-6">
          <ExpandingCards items={dataProjets} onOpen={setOpenIndex} />
        </div>
      </section>

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
    cover: "/projects/COVERS/vimeo-1013125524.jpg",
    coverAlt:
      "Vue aérienne du quartier desservi par le CCAS de la ville de Cenon",
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
    cover: "/projects/COVERS/vimeo-1013125599.jpg",
    coverAlt: "Vue aérienne du site de la scierie Künkel et de ses stocks de bois",
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
    cover: "/projects/COVERS/rent-a-car-lnb.jpg",
    coverAlt:
      "Porte-drapeau LNB au centre du terrain lors d'un match sponsorisé par Rent a Car",
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
    cover: "/projects/COTRAL_LAB/PHOTO/CotralLab (2).jpg",
    coverAlt:
      "Deux collaborateurs Cotral Lab devant un modèle 3D affiché à l'écran",
    content: <Gallery />,
  },
  {
    category: "Présentation d'entreprise",
    title: "Alpes Connectiques Services",
    src: "/projects/MINIATURES/acs.jpg",
    cover: "/projects/COVERS/youtube-f4WcU0btaQM.jpg",
    coverAlt:
      "Planisphère animé illustrant l'implantation d'Alpes Connectiques Services",
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
    cover: "/projects/COVERS/vimeo-1013125627.jpg",
    coverAlt:
      "Ballon de basket dans le panier lors du tournoi Quartier Ouest 2023",
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
    cover: "/projects/COVERS/combat-stress-2024.jpg",
    coverAlt: "Coureur souriant sur le parcours du D-Day 44 Challenge 2024",
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
