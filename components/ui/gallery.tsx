import Image from "next/image";

export const Gallery = () => {
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
  "/projects/COTRAL_LAB/PHOTO/CotralLab (1).jpg",
  "/projects/COTRAL_LAB/PHOTO/CotralLab (2).jpg",
  "/projects/COTRAL_LAB/PHOTO/CotralLab (3).jpg",
  "/projects/COTRAL_LAB/PHOTO/CotralLab (4).jpg",
  "/projects/COTRAL_LAB/PHOTO/CotralLab (5).jpg",
  "/projects/COTRAL_LAB/PHOTO/CotralLab (6).jpg",
  "/projects/COTRAL_LAB/PHOTO/CotralLab (7).jpg",
  "/projects/COTRAL_LAB/PHOTO/CotralLab (8).jpg",
  "/projects/COTRAL_LAB/PHOTO/CotralLab (9).jpg",
  "/projects/COTRAL_LAB/PHOTO/CotralLab (10).jpg",
  "/projects/COTRAL_LAB/PHOTO/CotralLab (11).jpg",
  "/projects/COTRAL_LAB/PHOTO/CotralLab (12).jpg",
  "/projects/COTRAL_LAB/PHOTO/CotralLab (13).jpg",
  "/projects/COTRAL_LAB/PHOTO/CotralLab (14).jpg",
  "/projects/COTRAL_LAB/PHOTO/CotralLab (15).jpg",
  "/projects/COTRAL_LAB/PHOTO/CotralLab (16).jpg",
  "/projects/COTRAL_LAB/PHOTO/CotralLab (17).jpg",
  "/projects/COTRAL_LAB/PHOTO/CotralLab (18).jpg",
  "/projects/COTRAL_LAB/PHOTO/CotralLab (19).jpg",
  "/projects/COTRAL_LAB/PHOTO/CotralLab (20).jpg",
];
