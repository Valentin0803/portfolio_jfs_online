import Image from "next/image";

interface CarrouselLogoProps {
  logos: string[];
}

// Nombre de copies de la série de logos. La piste est en `w-max`, donc sa
// largeur vaut exactement COPIES fois la série : la translation d'une série
// (100 / COPIES pour cent) ramène pile au point de départ, sans saut. Trois
// copies garantissent qu'un très grand écran ne voit jamais de vide.
const COPIES = 3;

const CarrouselLogo: React.FC<CarrouselLogoProps> = ({ logos }) => {
  return (
    <div className="relative overflow-hidden w-full h-36">
      <div className="flex w-max animate-scroll will-change-transform motion-reduce:animate-none">
        {Array.from({ length: COPIES }).map((_, copie) =>
          logos.map((logo, index) => (
            <div
              key={`${copie}-${index}`}
              className="flex-none w-24 h-36 mr-14"
              aria-hidden={copie > 0 ? true : undefined}
            >
              <Image
                src={logo}
                alt={copie === 0 ? `Logo client ${index + 1}` : ""}
                width={150}
                height={150}
                className="object-contain w-full h-full"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CarrouselLogo;
