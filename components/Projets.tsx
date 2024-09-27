import { Card, Carousel } from "@/components/ui/apple-cards-carousel";
import { Gallery } from "./ui/gallery";
import VimeoPlayer from "./VimeoPlayer";
import YouTubePlayer from "./YoutubePlayer";
import Image from "next/image";
import photoStadeRenACar from "@/public/projects/RENT_A_CAR/photostade.png";

export const Projects = () => {
  const cards = dataCarousel.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));
  return (
    <div id="NotreTravail" className="w-full h-full py-10 ">
      <h2 className="font-body top-0 text-jaune text-3xl ml-10 mb-5 lg:ml-36">
        Nos Projets
      </h2>
      <Carousel items={cards} />
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
        className="rounded-lg border-[#918C79] border-4"
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
        className="rounded-lg border-[#918C79] border-4"
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
    src: "/projects/MINIATURES/Cotrallab.jpg",
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
      <div className="mx-60">
        <VimeoPlayer
          videoId="1013125627"
          autoplay={true}
          muted={true}
          controls={true}
          loop={true}
          className="rounded-lg border-[#918C79] border-4"
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
      <div className="lg:mx-60">
        <VimeoPlayer
          videoId="1013125561"
          autoplay={true}
          muted={true}
          controls={true}
          loop={true}
          className="rounded-lg border-[#918C79] border-4"
          vertical={true}
        />
      </div>
    ),
  },
];
