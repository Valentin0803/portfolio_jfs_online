import Image from "next/image";

export const GalleryCS = () => {
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

// Couverture photo du D-Day 44 Challenge 2024 de l'association Combat Stress,
// couru sur les sites du Débarquement en Normandie.
const images = [
  {
    src: "/projects/COMBAT_STRESS/PHOTO/CombatStress2k24_24.jpg",
    alt: "Marcheur du D-Day 44 Challenge Combat Stress, bâtons en main",
  },
  {
    src: "/projects/COMBAT_STRESS/PHOTO/CombatStress2k24_58.jpg",
    alt: "Portrait d'un participant du D-Day 44 Challenge Combat Stress",
  },
  {
    src: "/projects/COMBAT_STRESS/PHOTO/CombatStress2k24_60.jpg",
    alt: "Participant du D-Day 44 Challenge Combat Stress saluant l'objectif",
  },
  {
    src: "/projects/COMBAT_STRESS/PHOTO/CombatStress2k24_83.jpg",
    alt: "Deux participants Combat Stress marchant sur une plage du Débarquement",
  },
  {
    src: "/projects/COMBAT_STRESS/PHOTO/CombatStress2k24_96.jpg",
    alt: "Groupe de participants Combat Stress rassemblé sous les drapeaux britannique et français",
  },
  {
    src: "/projects/COMBAT_STRESS/PHOTO/CombatStress2k24_101.jpg",
    alt: "Deux participants Combat Stress devant les drapeaux britannique et français",
  },
  {
    src: "/projects/COMBAT_STRESS/PHOTO/CombatStress2k24_111.jpg",
    alt: "Médailles du D-Day 44 Challenge Combat Stress 2024",
  },
  {
    src: "/projects/COMBAT_STRESS/PHOTO/CombatStress2k24_114.jpg",
    alt: "Participant franchissant la ligne d'arrivée, banderole Combat Stress en main",
  },
  {
    src: "/projects/COMBAT_STRESS/PHOTO/CombatStress2k24_118.jpg",
    alt: "Trois participants médaillés du D-Day 44 Challenge sur Pegasus Bridge",
  },
  {
    src: "/projects/COMBAT_STRESS/PHOTO/CombatStress2k24_128.jpg",
    alt: "Deux marcheurs Combat Stress portant un drapeau britannique sur un chemin normand",
  },
  {
    src: "/projects/COMBAT_STRESS/PHOTO/CombatStress2k24_160.jpg",
    alt: "Deux marcheurs Combat Stress avec bâtons sur un sentier de campagne",
  },
  {
    src: "/projects/COMBAT_STRESS/PHOTO/CombatStress2k24_162.jpg",
    alt: "Deux participants Combat Stress marquant une pause pendant l'épreuve",
  },
  {
    src: "/projects/COMBAT_STRESS/PHOTO/CombatStress2k24_285.jpg",
    alt: "Groupe de participants Combat Stress avançant ensemble sur la route",
  },
  {
    src: "/projects/COMBAT_STRESS/PHOTO/CombatStress2k24_297.jpg",
    alt: "Participant Combat Stress célébrant son arrivée, banderole déployée",
  },
];
