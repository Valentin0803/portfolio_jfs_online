import { Card, Carousel } from "@/components/ui/apple-cards-carousel";
import Player from "./Player";
import { Gallery } from "./ui/gallery";

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
      <Player
        videoPath="CCAS_DE_CENON/VIDEO/CCAS_Cenon.mp4"
        className="rounded-lg border-4 border-[#918C79] "
        autoplay
        muted
        controls
      />
    ),
  },
  {
    category: "Présentation d'entreprise",
    title: "Künkel",
    src: "/projects/MINIATURES/kunkel.jpg",
    content: (
      <Player
        videoPath="KUNKEL/VIDEO/KUNKEL FPV.mp4"
        className="rounded-lg border-4 border-[#918C79] "
        autoplay
        muted
        controls
      />
    ),
  },
  {
    category: "Motion design",
    title: "Rent a Car",
    src: "/projects/MINIATURES/rentacar.jpg",
    content: (
      <Player
        videoPath="RENT_A_CAR/banniereLNB.mp4"
        className="rounded-lg border-4 border-[#918C79] "
        autoplay
        muted
        controls
      />
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
      <Player
        videoPath="ACS/acs.mp4"
        className="rounded-lg border-4 border-[#918C79] "
        autoplay
        muted
        controls
      />
    ),
  },
  {
    category: "Aftermovie",
    title: "Quartier Ouest",
    src: "/projects/MINIATURES/quartierouest.jpg",
    content: (
      <div className="mx-auto w-fit ">
        <Player
          videoPath="QUARTIER OUEST/Quartier Ouest.mp4"
          className="rounded-lg border-4 border-[#918C79] h-[60vh] pl-auto mx-auto"
          autoplay
          muted
          controls
        />
      </div>
    ),
  },
  {
    category: "Aftermovie",
    title: "Combat stress",
    src: "/projects/MINIATURES/combatStress.jpg",
    content: (
      <div className="mx-auto w-fit">
        <Player
          videoPath="COMBAT STRESS/CS2k24_VF.mp4"
          className="rounded-lg border-4 border-[#918C79] h-[60vh] pl-auto"
          autoplay
          muted
          controls
        />
      </div>
    ),
  },
];
