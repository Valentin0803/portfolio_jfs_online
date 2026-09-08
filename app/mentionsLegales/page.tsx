import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site jfs-visual.fr : éditeur, hébergeur et informations légales relatives à JFS Visual.",
  alternates: {
    canonical: "/mentionsLegales",
  },
};

export default function mentionsLegales() {
  return (
    <div className="font-dmSans text-creme/70 leading-relaxed mx-auto max-w-3xl px-6 pt-32 pb-24 lg:pt-40 lg:pb-32">
      <h1 className="font-unbounded font-bold text-3xl lg:text-5xl text-creme leading-tight mb-4">MENTIONS LÉGALES</h1>
      <p>
        Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour
        la confiance en l’économie numérique, il est précisé aux utilisateurs du
        site JFS Visual l’identité des différents intervenants dans le cadre de
        sa réalisation et de son suivi.
      </p>
      <br />
      <h2 className="font-unbounded font-medium text-lg lg:text-xl text-creme mt-10 mb-4">Edition du site </h2>
      <p>
        Le présent site, accessible à l’URL jfs-visual.fr (le « Site »), est
        édité par :
      </p>
      <br />
      <p>
        Valentin CHARLOT, résidant 1 le marais des fontaines 61200 Occagnes, de
        nationalité Française (France), né(e) le 08/03/1999, ainsi qu’au R.M.
        sous le numéro 888935624RM61,
      </p>
      <br />
      <h2 className="font-unbounded font-medium text-lg lg:text-xl text-creme mt-10 mb-4">Hébergement</h2>
      <p>
        Le Site est hébergé par la société 1&1 / IONOS, situé 7 Place de la Gare,
        57200 Sarreguemines, (contact téléphonique ou email : (+33) 9 70 80 89
        11).
      </p>
      <br />
      <h2 className="font-unbounded font-medium text-lg lg:text-xl text-creme mt-10 mb-4">Directeur de publication </h2>
      <p>Le Directeur de la publication du Site est Valentin CHARLOT.</p>
      <br />
      <h2 className="font-unbounded font-medium text-lg lg:text-xl text-creme mt-10 mb-4">Nous contacter </h2>
      <span>Par téléphone : +33602344339</span>
      <br />
      <span>Par email : jfsvisual@gmail.com</span>
      <br />
      <span>Par courrier : 1 le marais des fontaines 61200 Occagnes</span>
      <br /> <br />
      <span>Génération des mentions légales par Legalstart.</span>
    </div>
  );
}
