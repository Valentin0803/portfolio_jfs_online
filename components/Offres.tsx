import Image from "next/image";
import Link from "next/link";
import agence from "@/public/reels/guy-hoquet-equipe.jpg";
import bien from "@/public/reels/guy-hoquet-coulombs.jpg";
import entreprise from "@/public/projects/COTRAL_LAB/PHOTO/CotralLab (11).jpg";

const besoins = [
  {
    titre: "Votre agence",
    objectif: "Faites-vous connaître",
    description: "Des vidéos de votre équipe et de votre expertise pour faire vivre vos réseaux sociaux.",
    image: agence,
    alt: "L’équipe Guy Hoquet Caen Carpiquet réunie dans son agence",
    reference: "Guy Hoquet Caen Carpiquet",
    position: "object-[center_42%]",
    lien: "#Immobilier",
    label: "Voir les contenus d’agence",
  },
  {
    titre: "Vos biens",
    objectif: "Donnez envie de visiter",
    description: "Vidéo, photo et drone pour révéler un lieu et permettre aux acquéreurs de se projeter.",
    image: bien,
    alt: "Vue aérienne d’une maison avec piscine à Coulombs",
    reference: "Coulombs · Normandie",
    position: "object-[center_48%]",
    lien: "#Immobilier",
    label: "Voir les biens en images",
  },
  {
    titre: "Votre entreprise",
    objectif: "Montrez votre savoir-faire",
    description: "Films, interviews et visites immersives pour présenter vos métiers, vos équipes et vos événements.",
    image: entreprise,
    alt: "Un collaborateur Cotral Lab au travail dans son atelier",
    reference: "Cotral Lab",
    position: "object-[62%_center]",
    lien: "#NotreTravail",
    label: "Voir les projets d’entreprise",
  },
];

export const Offres = () => (
  <section id="Accompagnement" className="relative border-y border-creme/10 bg-[#100D08] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
    {/* Préserve les anciens liens vers cette section. */}
    <span id="Offres" className="absolute top-0" aria-hidden="true" />
    <div className="mx-auto max-w-[1440px]">
      <div className="mb-9 flex flex-col gap-5 lg:mb-12 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <div>
          <p className="mb-4 font-dmSans text-xs uppercase tracking-[0.22em] text-or">Ce que nous créons pour vous</p>
          <h2 className="max-w-[20ch] font-unbounded text-3xl font-bold leading-[1.15] text-creme sm:text-4xl lg:text-5xl">Votre activité.<br /><span className="text-or">Nos images.</span></h2>
        </div>
        <p className="max-w-sm font-dmSans text-base leading-relaxed text-creme/75">De l’immobilier à l’entreprise, découvrez ce que nous pouvons réaliser pour vous.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
        {besoins.map((besoin) => (
          <Link key={besoin.titre} href={besoin.lien} className="group flex flex-col overflow-hidden rounded-2xl border border-creme/15 bg-charcoal transition-colors hover:border-or/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-or">
            <div className="relative aspect-[4/3] overflow-hidden md:aspect-[4/5] lg:aspect-[5/4]">
              <Image src={besoin.image} alt={besoin.alt} fill placeholder="blur" sizes="(max-width: 767px) 100vw, (max-width: 1536px) 33vw, 464px" className={`object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105 ${besoin.position}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-5 font-dmSans text-xs font-medium text-white lg:left-7">{besoin.reference}</span>
              <span aria-hidden="true" className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-charcoal/50 text-xl text-white backdrop-blur-sm transition-colors group-hover:bg-or group-hover:text-charcoal">↗</span>
            </div>
            <div className="flex flex-1 flex-col p-6 lg:p-7">
              <p className="mb-3 font-dmSans text-[11px] font-medium uppercase tracking-[0.14em] text-or">{besoin.objectif}</p>
              <h3 className="mb-4 font-unbounded text-2xl font-bold leading-tight text-creme lg:text-[1.7rem]">{besoin.titre}</h3>
              <p className="mb-7 font-dmSans text-base leading-relaxed text-creme/75">{besoin.description}</p>
              <span className="mt-auto border-t border-creme/15 pt-5 font-dmSans text-sm font-medium text-creme transition-colors group-hover:text-or">{besoin.label} <span aria-hidden="true">→</span></span>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <p className="font-dmSans text-sm text-creme/70">Un projet ponctuel ou des contenus réguliers ? Parlons-en.</p>
        <Link href="/contact" className="shrink-0 rounded-full border border-or bg-or px-7 py-4 font-dmSans text-xs font-bold uppercase tracking-widest text-charcoal transition-colors hover:bg-transparent hover:text-or">Parlons de votre projet</Link>
      </div>
    </div>
  </section>
);

export default Offres;
