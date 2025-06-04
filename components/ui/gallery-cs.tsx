import Image from "next/image";

export const GalleryCS = () => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 py-10 md:py-20 gap-4">
      {images.map((src, index) => (
        <div key={index} className="mb-4 break-inside-avoid">
          <Image
            src={src}
            width={250}
            height={250}
            alt=""
            className="w-full object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};

const images = [
  "/projects/COMBAT_STRESS/PHOTO/CombatStress2k24_24.jpg",
  "/projects/COMBAT_STRESS/PHOTO/CombatStress2k24_58.jpg",
  "/projects/COMBAT_STRESS/PHOTO/CombatStress2k24_60.jpg",
  "/projects/COMBAT_STRESS/PHOTO/CombatStress2k24_83.jpg",
  "/projects/COMBAT_STRESS/PHOTO/CombatStress2k24_96.jpg",
  "/projects/COMBAT_STRESS/PHOTO/CombatStress2k24_101.jpg",
  "/projects/COMBAT_STRESS/PHOTO/CombatStress2k24_111.jpg",
  "/projects/COMBAT_STRESS/PHOTO/CombatStress2k24_114.jpg",
  "/projects/COMBAT_STRESS/PHOTO/CombatStress2k24_118.jpg",
  "/projects/COMBAT_STRESS/PHOTO/CombatStress2k24_128.jpg",
  "/projects/COMBAT_STRESS/PHOTO/CombatStress2k24_160.jpg",
  "/projects/COMBAT_STRESS/PHOTO/CombatStress2k24_162.jpg",
  "/projects/COMBAT_STRESS/PHOTO/CombatStress2k24_285.jpg",
  "/projects/COMBAT_STRESS/PHOTO/CombatStress2k24_297.jpg",
];
