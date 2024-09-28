import { Card, CardDescription, CardTitle } from "./ui/card";
export const TarifSection = () => {
  const handleScroll = (
    e: React.MouseEvent<HTMLButtonElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  return (
    <section id="NosTarifs" className="my-10">
      <div>
        <h2 className="font-leagueSpartan text-jaune text-3xl mx-10 mb-5 lg:mx-36 lg:mt-24">
          Notre tarification
        </h2>
        <span className="font-leagueSpartan text-white text-xl mx-20 mb-5 lg:mx-40">
          Découvrez nos tarifs pour la création de vidéos de présentation
          d&apos;entreprise.
        </span>
      </div>
      <div className="grid lg:grid-cols-3 gap-8 mt-10 sm:mx-24 xl:mx-56">
        <Card className="grid">
          <CardTitle className="font-leagueSpartan font-bold text-2xl bg-[rgba(65,65,65,0.7)] rounded-xl w-fit px-4 h-fit">
            Pack Vidéo Essentielle
          </CardTitle>

          <CardDescription className="mt-5">
            Parfait pour une vidéo simple et efficace qui met en avant votre
            entreprise.
          </CardDescription>
          <h2 className="font-leagueSpartan font-bold text-3xl mt-4 text-center">
            1480€ HT
          </h2>
          <hr className="opacity-50 my-6" />
          <ul className="list-none mt-2">
            <Step title="Pré-production" />
            <Step title="Script basique" />
            <Step title="1/2 journée de tournage" />
            <Step title="Post production" />
            <Step title="Sound design simple" />
          </ul>
          <hr className="opacity-50 my-6" />
          <div className="h-[5vh]  place-self-end justify-self-center">
            <button
              onClick={(e) => handleScroll(e, "#Contact")}
              className="py-3 px-5 rounded-full font-bold bg-jaune border-jaune border text-black tracking-widest uppercase transform hover:scale-105 hover:bg-[rgba(40,40,40,0.70)] hover:border-jaune hover:text-white transition-colors duration-500"
            >
              Prenez rendez-vous
            </button>
          </div>
        </Card>
        <Card className="grid  border-jaune border-4">
          <CardTitle className="font-leagueSpartan font-bold text-2xl bg-[rgba(65,65,65,0.7)] rounded-xl w-fit px-4 h-fit">
            Pack Vidéo Avancée
          </CardTitle>
          <CardDescription className="mt-5">
            Idéale pour des vidéos plus dynamique et impactante.
          </CardDescription>
          <h2 className="font-leagueSpartan font-bold text-3xl mt-4 text-center">
            2980€ HT
          </h2>
          <hr className="opacity-50 my-6" />
          <ul className="list-none mt-2">
            <Step title="Pré-production avancée" />
            <Step title="Script détaillé" />
            <Step title="1 journée de tournage avec drone" />
            <Step title="Post production avancée" />
            <Step title="Sound design professionnel" />
            <Step title="Sous-titres" />
          </ul>
          <br />
          <span className="italic text-sm">
            Bonus: pack de 10 photos professionnelles de l&apos;équipe ou des
            locaux
          </span>
          <hr className="opacity-50 my-6" />
          <div className="h-[5vh] place-self-end justify-self-center">
            <button
              onClick={(e) => handleScroll(e, "#Contact")}
              className="py-3 px-5 rounded-full font-bold bg-jaune border-jaune border text-black tracking-widest uppercase transform hover:scale-105 hover:bg-[rgba(40,40,40,0.70)] hover:border-jaune hover:text-white transition-colors duration-500"
            >
              Prenez rendez-vous
            </button>
          </div>
        </Card>
        <Card className="grid">
          <CardTitle className="font-leagueSpartan font-bold text-2xl bg-[rgba(65,65,65,0.7)] rounded-xl px-4 h-fit w-fit">
            Vidéo Premium
          </CardTitle>
          <CardDescription className="mt-5">
            Une vidéo immersive pour sublimer votre marque et maximiser
            l&apos;impact visuel.
          </CardDescription>
          <h2 className="font-leagueSpartan font-bold text-3xl mt-4 text-center">
            4980€ HT
          </h2>
          <hr className="opacity-50 my-6" />
          <ul className="list-none mt-2">
            <Step title="Pré-production approfondie" />
            <Step title="Script détaillé et storyboarding" />
            <Step title="2 journées de tournage avec drone" />
            <Step title="Post production haut de gamme" />
            <Step title="Sound design sur mesure" />
            <Step title="Sous-titres (possible en multilingue)" />
            <Step title="Déclinaison de la vidéo pour réseaux sociaux (9/16 ou carré)" />
            <Step title="Pack de 20 photos professionnelles de l'équipe ou des locaux " />
            <Step title="Vidéo livée en 4k avec correction colorimétrique avancée" />
          </ul>
          <br />
          <span className="italic text-sm">
            Bonus: Animation de votre logo en motion design pour une intro/outro
            percutante.
          </span>
          <hr className="opacity-50 my-6" />
          <div className="h-[5vh]  place-self-end justify-self-center">
            <button
              onClick={(e) => handleScroll(e, "#Contact")}
              className="py-3 px-5 rounded-full font-bold bg-jaune border-jaune border text-black tracking-widest uppercase transform hover:scale-105 hover:bg-[rgba(40,40,40,0.70)] hover:border-jaune hover:text-white transition-colors duration-500"
            >
              Prenez rendez-vous
            </button>
          </div>
        </Card>
      </div>

      <div className="font-leagueSpartan pl-10 lg:pt-10 lg:ml-56">
        <span>*Voix off professionnel sous devis</span> <br />
        <span>**Prix hors déplacement 1€HT/km</span>
      </div>
    </section>
  );
};

const Step = ({ title }: { title: string }) => {
  return (
    <li className="flex gap-2 items-start">
      <CheckIcon />
      <p className="text-white">{title}</p>
    </li>
  );
};
const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
};
