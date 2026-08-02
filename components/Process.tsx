"use client";
import Image from "next/image";
import { Card, CardTitle } from "./ui/card";

export const Process = () => {
  return (
    <section className="md:grid-cols-1 py-24 lg:py-40 bg-charcoal border-y border-white/5">
      <div className="max-w-xl mx-auto mb-16 lg:mb-20 text-center px-6">
        <div className="font-dmSans text-xs tracking-[0.25em] uppercase text-or mb-5">
          Méthode
        </div>
        <h2 className="font-unbounded font-bold text-3xl lg:text-5xl text-creme leading-tight mb-5">
          Processus de création
        </h2>
        <p className="font-dmSans text-creme/70">
          De la prise de rendez-vous initiale à la livraison finale, un
          aller-retour permanent pour votre pleine satisfaction.
        </p>
      </div>
      <div className="hidden mx-auto w-2/3 border-[rgba(255,255,255,0.10)] dark:bg-charcoal bg-gray-100 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] rounded-xl px-10 py-10 lg:block ">
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
            <CardTitle className="font-dmSans font-bold text-2xl bg-[rgba(37,37,37,0.7)] rounded-xl w-fit px-4 h-fit">
              Étape 1
            </CardTitle>
            <h2 className="font-unbounded font-bold text-3xl mt-4 text-creme">
              Démarrage
            </h2>
            <ul className="list-none mt-2">
              <Step title="Prise de rendez-vous" />
            </ul>
            <div className="mt-auto">
              <ImageDescription
                src="/img/calandly.webp"
                className="w-fit rounded-lg mx-auto"
              />
            </div>
          </Card>
        </div>
        <div>
          <Card className="grid h-[500px] grid-rows-[auto,auto,1fr,auto]">
            <CardTitle className="font-dmSans font-bold text-2xl bg-[rgba(37,37,37,0.7)] rounded-xl w-fit px-4 h-fit">
              Étape 2
            </CardTitle>
            <h2 className="font-unbounded font-bold text-3xl mt-4 text-creme">
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
            <CardTitle className="font-dmSans font-bold text-2xl bg-[rgba(37,37,37,0.7)] rounded-xl w-fit px-4 h-fit">
              Étape 3
            </CardTitle>
            <h2 className="font-unbounded font-bold text-3xl mt-4 text-creme">
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
            <CardTitle className="font-dmSans font-bold text-2xl bg-[rgba(37,37,37,0.7)] rounded-xl w-fit px-4 h-fit">
              Étape 4
            </CardTitle>
            <h2 className="font-unbounded font-bold text-3xl mt-4 text-creme">
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
