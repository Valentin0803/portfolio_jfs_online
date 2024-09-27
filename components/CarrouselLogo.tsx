import Image from "next/image";

interface CarrouselLogoProps {
  logos: string[];
}

const CarrouselLogo: React.FC<CarrouselLogoProps> = ({ logos }) => {
  return (
    <div className="relative overflow-hidden w-full h-36">
      {/* Masque avec un dégradé aux extrémités */}
      <div className="relative flex gap-14 animate-scroll whitespace-nowrap ">
        {/* Original logos */}
        {logos.map((logo, index) => (
          <div key={index} className="flex-none w-24 h-36">
            <Image
              src={logo}
              alt={`Logo ${index + 1}`}
              width={150}
              height={150}
              className="object-contain w-full h-full"
            />
          </div>
        ))}

        {/* Duplicate logos */}
        {logos.map((logo, index) => (
          <div key={`duplicate-${index}`} className="flex-none w-24 h-36">
            <Image
              src={logo}
              alt={`Logo ${index + 1}`}
              width={150}
              height={150}
              className="object-contain w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarrouselLogo;
