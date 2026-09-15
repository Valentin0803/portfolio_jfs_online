import CarrouselLogo from "./CarrouselLogo";

export const BandeauLogo = () => {
  const logos = [
    "/img/logo/webp/Kunkel_Palettes_Bois_Logo.webp",
    "/img/logo/webp/cescop.webp",
    "/img/logo/webp/combatStress.webp",
    "/img/logo/webp/logo-acs.webp",
    "/img/logo/webp/ccasCenon.webp",
    "/img/logo/webp/logo-artso.webp",
    "/img/logo/webp/logo-cotral.webp",
    "/img/logo/webp/Rent-a-car.webp",
    "/img/logo/webp/aritsan-artipole.webp",
  ];
  return (
    <div className="mask-fade py-16 lg:py-24">
      <h2 className="text-center font-unbounded font-bold text-2xl lg:text-3xl mb-10 text-creme">
        Ils nous ont fait confiance
      </h2>
      <CarrouselLogo logos={logos} />
    </div>
  );
};
