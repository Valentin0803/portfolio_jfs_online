import type { Metadata } from "next";
import ProcessEtapes from "@/components/ProcessEtapes";
import ProcessManifeste from "@/components/ProcessManifeste";
import VideoPlayer from "@/components/ui/video-player";
import { boubetVideo } from "@/lib/media";

/**
 * Page d'aperçu temporaire : elle sert uniquement à montrer au client les deux
 * pistes de remplacement de la section « Ce qui nous différencie ». Elle n'est
 * ni dans le menu, ni dans le sitemap, et reste hors des moteurs de recherche.
 */
export const metadata: Metadata = {
  title: "Aperçu Process",
  robots: { index: false, follow: false },
};

export default function ApercuProcess() {
  return (
    // Le bandeau se pose juste sous la barre de navigation fixe (64 px au
    // doigt, 72 px sur grand écran) pour ne jamais recouvrir le logo.
    <main className="pt-16 lg:pt-[4.5rem]">
      <div className="sticky top-16 z-[60] lg:top-[4.5rem] bg-or py-2 text-center font-dmSans text-xs uppercase tracking-widest text-charcoal">
        Aperçu temporaire, deux propositions, non visible dans le menu
      </div>

      <h2 className="px-6 pt-16 font-unbounded text-xl font-bold text-or sm:text-2xl">
        Proposition A
      </h2>
      <ProcessEtapes />

      <div className="my-16 border-t border-creme/10" />

      <h2 className="px-6 pt-16 font-unbounded text-xl font-bold text-or sm:text-2xl">
        Proposition B
      </h2>
      <ProcessManifeste />

      <div className="my-16 border-t border-creme/10" />

      <h2 className="px-6 pt-16 font-unbounded text-xl font-bold text-or sm:text-2xl">
        Proposition C : lecteur vidéo maison
      </h2>
      <section className="px-6 pb-24 pt-10">
        <div className="mx-auto w-full max-w-[420px]">
          <VideoPlayer asset={boubetVideo} />
        </div>
      </section>
    </main>
  );
}
