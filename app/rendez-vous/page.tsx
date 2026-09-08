import type { Metadata } from "next";
import Link from "next/link";
import ZcalWidget from "@/components/ZcalWidget";

export const metadata: Metadata = {
  title: "Prendre rendez-vous",
  description:
    "Réservez 30 minutes en visio avec JFS Visual pour parler de vos contenus vidéo et voir quelle offre correspond à votre agence.",
  alternates: {
    canonical: "/rendez-vous",
  },
};

const POINTS = [
  "Où en est votre communication aujourd'hui",
  "Ce qui fonctionne dans votre secteur",
  "L'offre la plus adaptée, ou aucune",
] as const;

export default function RendezVous() {
  return (
    <section className="px-6 pt-32 pb-24 lg:pt-40 lg:pb-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
        <div className="lg:w-5/12">
          <div className="mb-5 font-dmSans text-xs uppercase tracking-[0.25em] text-or">
            Rendez-vous
          </div>
          <h1 className="font-unbounded text-3xl font-bold leading-tight text-creme lg:text-5xl">
            Réservons 30 minutes
          </h1>
          <p className="mt-7 max-w-[46ch] font-dmSans text-base text-creme/70">
            Une visio de 30 minutes avec Martin, chargé de production, sans
            engagement. On regarde ensemble si l&apos;Atelier du Réel ou une
            Journée Contenu a du sens pour votre agence.
          </p>
          <ul className="mt-8 flex flex-col gap-3">
            {POINTS.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 font-dmSans text-sm text-creme/80"
              >
                <span
                  aria-hidden="true"
                  className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-or"
                />
                {point}
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="mt-9 inline-block font-dmSans text-sm text-creme/60 underline underline-offset-4 transition-colors duration-300 hover:text-or"
          >
            ou écrivez-nous via le formulaire
          </Link>
        </div>

        <div className="lg:w-7/12">
          <div className="rounded-2xl bg-creme p-2 shadow sm:p-4">
            <ZcalWidget />
          </div>
        </div>
      </div>
    </section>
  );
}
