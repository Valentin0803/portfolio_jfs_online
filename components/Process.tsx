"use client";
import Image from "next/image";
import { Card, CardTitle } from "./ui/card";

export const Process = () => {
  return (
    <section className="md:grid-cols-1 pb-10 pt-10 bg-[#918C79]">
      <div>
        <h2 className="font-leagueSpartan top-0 text-white text-center text-4xl mx-10 mb-10 lg:mx-40">
          Processus de création d&apos;une vidéo
        </h2>
        <p className="font-leagueSpartan lg:mx-52 xl:mx-80 md:mx-20 mx-5 mb-10">
          Nous suivons un processus rigoureux pour garantir la qualité et la
          satisfaction de nos clients à chaque étape de la production vidéo. De
          la prise de rendez-vous initiale à la livraison finale, notre équipe
          travaille en étroite collaboration avec vous. Cela inclut une phase de
          pré-production détaillée, où nous élaborons le script et définissons
          les besoins spécifiques, jusqu&apos;au tournage et à la
          post-production. Chaque projet est peaufiné à travers un processus
          d&apos;aller-retour pour que vous soyez pleinement satisfait avant la
          livraison finale de votre vidéo.
        </p>
      </div>
      <div className="hidden mx-auto w-2/3 border-[rgba(255,255,255,0.10)] dark:bg-gris bg-gray-100 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] rounded-xl px-10 py-10 lg:block ">
        <Image
          src="/img/graphiqueProcess.webp"
          height={800}
          width={1600}
          alt=""
        />
      </div>
      <div className="grid xl:grid-cols-4 md:grid-cols-2 lg:mx-40 md:mx-10 gap-5 mt-10">
        <div>
          <Card className="grid h-[500px] grid-rows-[auto,auto,1fr,auto]">
            <CardTitle className="font-leagueSpartan font-bold text-2xl bg-[rgba(37,37,37,0.7)] rounded-xl w-fit px-4 h-fit">
              Étape 1
            </CardTitle>
            <h2 className="font-leagueSpartan font-bold text-3xl mt-4">
              Démarrage
            </h2>
            <ul className="list-none mt-2">
              <Step title="Prise de rendez-vous" />
            </ul>
            <div className="mt-auto">
              <ImageDescription
                src="/img/calandly.webp"
                className="w-60 rounded-lg mt-5 ml-2"
              />
            </div>
          </Card>
        </div>
        <div>
          <Card className="grid h-[500px] grid-rows-[auto,auto,1fr,auto]">
            <CardTitle className="font-leagueSpartan font-bold text-2xl bg-[rgba(37,37,37,0.7)] rounded-xl w-fit px-4 h-fit">
              Étape 2
            </CardTitle>
            <h2 className="font-leagueSpartan font-bold text-3xl mt-4">
              Pré-production
            </h2>
            <ul className="list-none mt-2">
              <Step title="Visioconférence" />
              <Step title="Ecriture de script" />
              <Step title="Planification" />
              <Step title="Demande d'autorisation" />
            </ul>
            <div className="my-auto">
              <ImageDescription
                src="/img/google-meet.webp"
                className="w-[95%] mx-auto rounded-lg "
              />
            </div>
          </Card>
        </div>
        <div>
          <Card className="grid h-[500px] grid-rows-[auto,auto,1fr,auto]">
            <CardTitle className="font-leagueSpartan font-bold text-2xl bg-[rgba(37,37,37,0.7)] rounded-xl w-fit px-4 h-fit">
              Étape 3
            </CardTitle>
            <h2 className="font-leagueSpartan font-bold text-3xl mt-4">
              Production
            </h2>
            <ul className="list-none mt-2">
              <Step title="Tournage" />
              <Step title="Enregistrement voix-off" />
            </ul>
            <div className="my-auto">
              <ImageDescription
                src="/img/production.webp"
                className="w-full my-auto"
              />
            </div>
          </Card>
        </div>
        <div>
          <Card className="grid h-[500px] grid-rows-[auto,auto,1fr,auto]">
            <CardTitle className="font-leagueSpartan font-bold text-2xl bg-[rgba(37,37,37,0.7)] rounded-xl w-fit px-4 h-fit">
              Étape 4
            </CardTitle>
            <h2 className="font-leagueSpartan font-bold text-3xl mt-4">
              Post-production et livraison
            </h2>
            <ul className="list-none mt-2">
              <Step title="Montage et Etalonnage" />
              <Step title="Musique et SFX" />
              <Step title="Aller-retour" />
              <Step title="Livraison" />
            </ul>
            <div className="mt-auto">
              <ImageDescription
                src="/img/post production.webp"
                className="h-fit"
              />
            </div>
          </Card>
        </div>
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

const ImageDescription = ({
  src,
  className,
}: {
  src: string;
  className: string;
}) => {
  return (
    <div className="min-h-20 max-h-48 bg-[rgba(31,31,31,0.7)] rounded-xl overflow-hidden my-auto">
      <Image
        src={src}
        width={500}
        height={500}
        alt=""
        className={className}
        quality={90}
      />
    </div>
  );
};
