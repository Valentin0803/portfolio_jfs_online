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

// Coordonnées identiques à celles de la page Contact (app/contact/page.tsx),
// dupliquées volontairement pour garder les deux pages autonomes.
const TELEPHONE = "+33602344339";
const TELEPHONE_AFFICHE = "+33 6 02 34 43 39";
const EMAIL = "jfsvisual@gmail.com";

// Même style que les libellés du formulaire de Contact.
const LABEL =
  "mb-4 block font-dmSans text-xs uppercase tracking-[0.2em] text-creme/60";

const POINTS = [
  "Où en est votre communication aujourd'hui",
  "Ce qui fonctionne dans votre secteur",
  "L'offre la plus adaptée, ou aucune",
] as const;

export default function RendezVous() {
  return (
    // Mêmes marges que la page Contact : la pilule rendez-vous fixe est masquée
    // ici (voir components/MobileCta) mais l'espacement bas reste identique.
    <section className="px-6 pt-32 pb-32 lg:pt-40 lg:pb-32">
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
            engagement. On regarde ensemble si une de nos offres a du sens pour
            votre agence.
          </p>

          <div className="mt-10 flex flex-col gap-4 font-dmSans text-sm">
            <a
              href={`tel:${TELEPHONE}`}
              className="w-fit text-creme transition-colors duration-300 hover:text-or"
            >
              {TELEPHONE_AFFICHE}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="w-fit text-creme transition-colors duration-300 hover:text-or"
            >
              {EMAIL}
            </a>
            <div className="flex flex-col gap-1 text-creme/60">
              <span>Caen · Normandie</span>
              <span>Aix-les-Bains · Chambéry · Annecy · Savoie</span>
            </div>
          </div>

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

          <div className="mt-10 rounded-2xl border border-creme/10 bg-[#100D08] p-6">
            <p className="font-dmSans text-sm text-creme/80">
              Vous préférez écrire ?
            </p>
            <Link href="/contact" className="mt-5 inline-block w-fit">
              <button className="rounded-full border border-or/40 px-6 py-2.5 font-dmSans text-xs font-bold uppercase tracking-widest text-creme transition-colors duration-300 hover:border-or hover:text-or">
                Nous écrire
              </button>
            </Link>
            <p className="mt-3 font-dmSans text-xs text-creme/60">
              Réponse sous 48 h
            </p>
          </div>
        </div>

        <div className="lg:w-7/12">
          <div className="rounded-[2rem] border border-creme/10 bg-[#100D08] p-6 sm:p-10">
            <span className={LABEL}>Choisissez votre créneau</span>
            {/* Le widget zcal impose son fond blanc : on l'enveloppe pour
                arrondir ses angles sur le fond sombre de la carte. */}
            <div className="overflow-hidden rounded-2xl bg-creme">
              <ZcalWidget />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
