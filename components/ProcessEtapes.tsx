"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
} from "framer-motion";
import { CONTACT_LABEL, CONTACT_URL } from "@/lib/site";

/**
 * Proposition A pour remplacer « Ce qui nous différencie » : le déroulé réel
 * d'un projet, étape par étape. La promesse n'est plus une liste d'arguments
 * mais un parcours, avec ce que le client donne et ce que l'on prend en charge.
 *
 * Les délais affichés sont des exemples : la mention « délai indicatif »
 * apparaît une seule fois, sous la dernière étape.
 */

interface Etape {
  numero: string;
  titre: string;
  texte: string;
  vous: string;
  nous: string;
}

const etapes: Etape[] = [
  {
    numero: "01",
    titre: "Échange",
    texte:
      "Vous nous écrivez, on cale un premier échange de 30 minutes pour comprendre votre activité et vos biens.",
    vous: "30 minutes",
    nous: "Brief et proposition sous 48 h",
  },
  {
    numero: "02",
    titre: "Préparation",
    texte:
      "On écrit le script, on repère les lieux, on gère les autorisations de vol drone. Vous validez, rien d’autre.",
    vous: "Une validation",
    nous: "Préparation complète",
  },
  {
    numero: "03",
    titre: "Tournage",
    texte:
      "Une demi-journée sur place, avec votre conseiller à l’image si vous le souhaitez. Drone, intérieurs, interview.",
    vous: "Une demi-journée",
    nous: "L’équipe, le matériel, la direction",
  },
  {
    numero: "04",
    titre: "Livraison",
    texte:
      "Montage, un aller-retour de retours, puis les fichiers au bon format pour chaque réseau, prêts à publier.",
    vous: "Un retour",
    nous: "Livraison sous 10 jours",
  },
];

/** Courbe ease-out franche, la même que le reste du site. */
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/**
 * Préférence « moins d'animations », lue après le montage : le serveur ne peut
 * pas la connaître, la lire pendant le rendu ferait diverger l'hydratation.
 */
const useMoinsAnimations = () => {
  const [moinsAnimations, setMoinsAnimations] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMoinsAnimations(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return moinsAnimations;
};

const ETAT_CACHE = { opacity: 0, transform: "translateY(16px)" };
const ETAT_VISIBLE = { opacity: 1, transform: "translateY(0px)" };
const TRANSITION_ETAPE = { duration: 0.45, ease: EASE_OUT };
const SANS_ANIMATION = { duration: 0 };

interface EtapeItemProps {
  etape: Etape;
  reducedMotion: boolean;
}

const EtapeItem = ({ etape, reducedMotion }: EtapeItemProps) => {
  const itemRef = useRef<HTMLLIElement>(null);
  // `once` : l'étape s'allume au premier passage et ne clignote plus si le
  // visiteur remonte. `amount` évite qu'elle s'allume avant d'être lisible.
  const inView = useInView(itemRef, { once: true, amount: 0.4 });
  // Sans animation, l'étape est posée à son état final dès le montage ; la
  // couleur du numéro, elle, ne dépend que de la visibilité, sinon le premier
  // rendu client ne correspondrait plus à celui du serveur.
  const atteinte = reducedMotion || inView;

  return (
    <li
      ref={itemRef}
      className="relative pb-14 pl-8 last:pb-0 sm:pl-12 lg:pb-20 lg:pl-16"
    >
      <motion.div
        // Le HTML rendu côté serveur ne dépend jamais de « reduced motion » :
        // seule la transition est neutralisée, l'hydratation reste intacte.
        initial={ETAT_CACHE}
        animate={atteinte ? ETAT_VISIBLE : ETAT_CACHE}
        transition={reducedMotion ? SANS_ANIMATION : TRANSITION_ETAPE}
      >
        <span
          aria-hidden="true"
          className={`block font-unbounded text-4xl font-bold leading-none tabular-nums transition-colors duration-500 sm:text-5xl ${
            inView ? "text-or" : "text-or/30"
          }`}
        >
          {etape.numero}
        </span>

        <h3 className="mt-4 font-unbounded text-2xl font-bold leading-tight text-creme">
          {etape.titre}
        </h3>

        <p className="mt-3 max-w-xl font-dmSans text-base leading-relaxed text-creme/70">
          {etape.texte}
        </p>

        <dl className="mt-6 grid max-w-md grid-cols-2 gap-6 border-t border-creme/10 pt-5">
          <div>
            <dt className="font-dmSans text-xs uppercase tracking-[0.2em] text-creme/50">
              Vous
            </dt>
            <dd className="mt-2 font-dmSans text-sm leading-snug text-creme">
              {etape.vous}
            </dd>
          </div>
          <div>
            <dt className="font-dmSans text-xs uppercase tracking-[0.2em] text-creme/50">
              Nous
            </dt>
            <dd className="mt-2 font-dmSans text-sm leading-snug text-creme">
              {etape.nous}
            </dd>
          </div>
        </dl>
      </motion.div>
    </li>
  );
};

export const ProcessEtapes = () => {
  const reducedMotion = useMoinsAnimations();
  const listeRef = useRef<HTMLOListElement>(null);

  // La ligne se remplit au rythme du scroll, de l'entrée de la liste dans
  // l'écran jusqu'à la sortie de sa dernière étape.
  const { scrollYProgress } = useScroll({
    target: listeRef,
    offset: ["start 0.8", "end 0.6"],
  });
  const ressort = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Le rail est rendu vide côté serveur dans tous les cas : on ne le remplit
  // qu'après le montage, d'un coup quand les animations sont désactivées.
  const remplissage = useMotionValue(0);
  useEffect(() => {
    if (reducedMotion) {
      remplissage.set(1);
      return;
    }
    remplissage.set(ressort.get());
    return ressort.on("change", (valeur) => remplissage.set(valeur));
  }, [reducedMotion, ressort, remplissage]);

  return (
    <section
      id="process-etapes"
      className="border-y border-creme/10 bg-[#100D08] py-24 lg:py-40"
    >
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-14 max-w-2xl lg:mb-20">
          <p className="mb-5 font-dmSans text-xs uppercase tracking-[0.25em] text-or">
            Comment ça se passe
          </p>
          <h2 className="font-unbounded text-3xl font-bold leading-tight text-creme lg:text-5xl">
            Du premier message à la vidéo en ligne
          </h2>
          <p className="mt-6 font-dmSans text-base leading-relaxed text-creme/70">
            Quatre étapes, un seul interlocuteur, et très peu de temps à nous
            accorder.
          </p>
        </div>

        <ol ref={listeRef} className="relative">
          {/* Rail : fond discret, remplissage or piloté par le scroll. */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 top-2 w-px bg-creme/10"
          >
            <motion.div
              className="h-full w-full origin-top bg-or"
              style={{ scaleY: remplissage }}
            />
          </div>

          {etapes.map((etape) => (
            <EtapeItem
              key={etape.numero}
              etape={etape}
              reducedMotion={reducedMotion}
            />
          ))}
        </ol>

        <p className="mt-10 font-dmSans text-xs uppercase tracking-[0.2em] text-creme/40">
          Délai indicatif
        </p>

        <div className="mt-12">
          <Link
            href={CONTACT_URL}
            className="inline-block rounded-full border border-or bg-or px-7 py-4 font-dmSans text-xs font-bold uppercase tracking-widest text-charcoal transition-colors hover:bg-charcoal hover:text-or"
          >
            {CONTACT_LABEL}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProcessEtapes;
