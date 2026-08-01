import Link from "next/link";
import { Card, CardTitle, CardDescription } from "./ui/card";

export const Offres = () => {
  return (
    <section id="Offres" className="my-10 lg:my-24">
      <div className="mx-10 lg:mx-36 mb-10">
        <h2 className="font-unbounded font-bold text-or text-3xl mb-4">
          Nos offres
        </h2>
        <p className="font-dmSans text-creme/80 text-lg max-w-2xl">
          De l&apos;accompagnement continu pour agences immobilières aux
          prestations ponctuelles, une offre pour chaque besoin.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6 mx-10 lg:mx-36">
        <div className="rounded-2xl border border-or/40 bg-gradient-to-br from-or/10 to-white/[0.02] p-8 flex flex-col">
          <span className="inline-block w-fit px-3 py-1 rounded-full bg-or text-charcoal font-dmSans font-bold text-xs uppercase tracking-widest mb-4">
            Offre phare
          </span>
          <h3 className="font-unbounded font-bold text-creme text-2xl mb-3">
            L&apos;Atelier du Réel
          </h3>
          <p className="font-dmSans text-creme/80 text-base mb-6">
            Contenu vidéo continu pour agences immobilières, sur 6 mois :
            scripts, tournage, drone, montage, gestion administrative des
            vols incluse, suivi collaboratif via Notion et WhatsApp.
          </p>
          <div className="font-unbounded font-bold text-or text-2xl mt-auto mb-6">
            2 100€ HT/mois
          </div>
          <Link href="#Contact" className="w-fit">
            <button className="px-8 py-3 rounded-full font-dmSans font-bold text-sm uppercase tracking-widest bg-or text-charcoal border border-or hover:bg-charcoal hover:text-or transition-colors duration-300">
              Prendre rendez-vous
            </button>
          </Link>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="dark:bg-[rgba(20,18,14,0.7)] border-white/10">
            <CardTitle className="font-dmSans font-bold text-creme text-base bg-white/5 rounded-xl w-fit px-4 py-1">
              Journée Contenu
            </CardTitle>
            <CardDescription className="text-creme/70">
              1h de préparation/trajet, 2h de tournage, 5h de post-production
              : 5 contenus courts livrés. Ouvert à tous les secteurs.
            </CardDescription>
            <div className="font-unbounded font-bold text-or text-lg mt-4">
              À partir de ~800€
            </div>
          </Card>
          <Card className="dark:bg-[rgba(20,18,14,0.7)] border-white/10">
            <CardTitle className="font-dmSans font-bold text-creme text-base bg-white/5 rounded-xl w-fit px-4 py-1">
              Sur mesure
            </CardTitle>
            <CardDescription className="text-creme/70">
              Vidéo d&apos;entreprise, événementiel, drone à la demande.
              Chaque projet fait l&apos;objet d&apos;un devis dédié.
            </CardDescription>
            <div className="font-unbounded font-bold text-or text-lg mt-4">
              Devis
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Offres;
