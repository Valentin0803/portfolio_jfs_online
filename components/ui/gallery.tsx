import Image from "next/image";

export const Gallery = () => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 py-10 md:py-20 gap-4">
      {images.map((image) => (
        <div key={image.src} className="mb-4 break-inside-avoid">
          <Image
            src={image.src}
            width={250}
            height={250}
            alt={image.alt}
            className="w-full object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};

// Reportage photo réalisé pour Cotral Lab (protection auditive sur mesure) :
// descriptions courtes de ce que montre réellement chaque image.
const images = [
  {
    src: "/projects/COTRAL_LAB/PHOTO/CotralLab (1).jpg",
    alt: "Collaboratrice Cotral Lab à son poste informatique",
  },
  {
    src: "/projects/COTRAL_LAB/PHOTO/CotralLab (2).jpg",
    alt: "Deux collaborateurs Cotral Lab devant un modèle 3D affiché à l'écran",
  },
  {
    src: "/projects/COTRAL_LAB/PHOTO/CotralLab (3).jpg",
    alt: "Deux collaborateurs Cotral Lab au bureau dans les locaux de l'entreprise",
  },
  {
    src: "/projects/COTRAL_LAB/PHOTO/CotralLab (4).jpg",
    alt: "Contrôle d'une protection auditive en laboratoire chez Cotral Lab",
  },
  {
    src: "/projects/COTRAL_LAB/PHOTO/CotralLab (5).jpg",
    alt: "Techniciens Cotral Lab en blouse examinant des embouts auriculaires",
  },
  {
    src: "/projects/COTRAL_LAB/PHOTO/CotralLab (6).jpg",
    alt: "Deux collaborateurs Cotral Lab en blouse dans un couloir de l'atelier",
  },
  {
    src: "/projects/COTRAL_LAB/PHOTO/CotralLab (7).jpg",
    alt: "Trois collaborateurs Cotral Lab traversant un couloir des locaux",
  },
  {
    src: "/projects/COTRAL_LAB/PHOTO/CotralLab (8).jpg",
    alt: "Technicienne Cotral Lab souriante à son poste de travail",
  },
  {
    src: "/projects/COTRAL_LAB/PHOTO/CotralLab (9).jpg",
    alt: "Technicienne Cotral Lab manipulant une petite pièce à son poste",
  },
  {
    src: "/projects/COTRAL_LAB/PHOTO/CotralLab (10).jpg",
    alt: "Technicienne Cotral Lab au poste de contrôle, devant des moules noirs",
  },
  {
    src: "/projects/COTRAL_LAB/PHOTO/CotralLab (11).jpg",
    alt: "Deux techniciens Cotral Lab à un poste d'assemblage, bacs de pièces rouges",
  },
  {
    src: "/projects/COTRAL_LAB/PHOTO/CotralLab (12).jpg",
    alt: "Technicien Cotral Lab en blouse devant l'écran de son poste de production",
  },
  {
    src: "/projects/COTRAL_LAB/PHOTO/CotralLab (13).jpg",
    alt: "Technicien Cotral Lab travaillant sous une lampe d'atelier",
  },
  {
    src: "/projects/COTRAL_LAB/PHOTO/CotralLab (14).jpg",
    alt: "Technicien Cotral Lab scannant une pièce à son poste de travail",
  },
  {
    src: "/projects/COTRAL_LAB/PHOTO/CotralLab (15).jpg",
    alt: "Technicienne Cotral Lab derrière une machine, dans la lumière bleue de l'atelier",
  },
  {
    src: "/projects/COTRAL_LAB/PHOTO/CotralLab (16).jpg",
    alt: "Technicien Cotral Lab entre les rayonnages de stockage",
  },
  {
    src: "/projects/COTRAL_LAB/PHOTO/CotralLab (17).jpg",
    alt: "Technicienne Cotral Lab devant une machine de production",
  },
  {
    src: "/projects/COTRAL_LAB/PHOTO/CotralLab (18).jpg",
    alt: "Deux collaborateurs Cotral Lab préparant un colis dans les locaux",
  },
  {
    src: "/projects/COTRAL_LAB/PHOTO/CotralLab (19).jpg",
    alt: "Deux collaborateurs Cotral Lab consultant un document imprimé",
  },
  {
    src: "/projects/COTRAL_LAB/PHOTO/CotralLab (20).jpg",
    alt: "Collaboratrice Cotral Lab travaillant sur des documents à son bureau",
  },
];
