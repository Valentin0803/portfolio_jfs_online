import Link from "next/link";
import { Card, CardTitle, CardDescription } from "./ui/card";

export const Offres = () => {
  return (
    <section id="Offres" className="py-24 lg:py-40">
      <div className="max-w-xl mx-auto mb-16 lg:mb-20 text-center px-6">
        <div className="font-dmSans text-xs tracking-[0.25em] uppercase text-or mb-5">
          Offres
        </div>
        <h2 className="font-unbounded font-bold text-3xl lg:text-5xl text-creme leading-tight">
          Un accompagnement pour chaque besoin
        </h2>
      </div>

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6 mx-6 lg:max-w-5xl lg:mx-auto">
        <div className="relative overflow-hidden rounded-lg border border-or/25 bg-[#100D08] p-10 lg:p-14 flex flex-col">
          <div
            className="absolute -top-[40%] -right-[20%] w-[70%] h-[140%] pointer-events-none"
            style={{
              background:
                "radial-gradient(closest-side, rgba(201,162,75,0.35), transparent 70%)",
            }}
          />
          <span className="relative inline-block w-fit px-4 py-1.5 rounded-full bg-or text-charcoal font-dmSans font-bold text-xs uppercase tracking-widest mb-6">
            Offre phare
          </span>
          <h3 className="relative font-unbounded font-bold text-creme text-3xl mb-4">
            L&apos;Atelier du Réel
          </h3>
          <p className="relative font-dmSans text-creme/75 text-base mb-8 max-w-[42ch]">
            Contenu vidéo continu pour agences immobilières, sur 6 mois :
            scripts, tournage, drone, montage, gestion administrative des
            vols incluse, suivi collaboratif via Notion et WhatsApp.
          </p>
          <div className="relative font-unbounded font-bold text-or text-4xl mt-auto mb-7">
            2 100€ HT/mois
          </div>
          <Link href="#Contact" className="relative w-fit">
            <button className="px-9 py-4 rounded-full font-dmSans font-bold text-xs uppercase tracking-widest bg-or text-charcoal border border-or hover:bg-charcoal hover:text-or transition-colors duration-300">
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
