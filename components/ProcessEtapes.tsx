"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";
import { CONTACT_LABEL, CONTACT_URL } from "@/lib/site";

/**
 * Section hybride « Comment ça se passe » : le déroulé réel d'un projet en
 * quatre étapes, avec le rail or piloté par le scroll, mais des titres traités
 * comme un manifeste, en très grand, révélés mot par mot à l'entrée dans
 * l'écran.
 *
 * Les délais affichés sont des exemples : la mention « délai indicatif »
 * apparaît une seule fois, sous la liste.
 */

interface Segment {
  texte: string;
  /** Le mot clé de la phrase, affiché en or. */
  accent?: boolean;
}

interface Etape {
  numero: string;
  segments: Segment[];
  texte: string;
  vous: string;
  nous: string;
}

const etapes: Etape[] = [
  {
    numero: "01",
    segments: [{ texte: "On" }, { texte: "échange.", accent: true }],
    texte:
      "Vous nous écrivez, on cale un premier échange de 30 minutes pour comprendre votre activité et vos biens.",
    vous: "30 minutes",
    nous: "Brief et proposition sous 48 h",
  },
  {
    numero: "02",
    segments: [{ texte: "On" }, { texte: "prépare tout.", accent: true }],
    texte:
      "On écrit le script, on repère les lieux, on gère les autorisations de vol drone. Vous validez, rien d’autre.",
    vous: "Une validation",
    nous: "Préparation complète",
  },
  {
    numero: "03",
    segments: [{ texte: "On" }, { texte: "tourne.", accent: true }],
    texte:
      "Une journée sur place, avec votre conseiller à l’image si vous le souhaitez. Drone, intérieurs, interview.",
    vous: "Une journée",
    nous: "L’équipe, le matériel, la direction",
  },
  {
    numero: "04",
    segments: [{ texte: "Nous" }, { texte: "publions.", accent: true }],
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

const phraseVariants: Variants = { cachee: {}, visible: {} };

// Les mots ne partent pas de zéro : ils restent lisibles en filigrane, la
// révélation les amène au premier plan plutôt que de les faire apparaître.
const motVariants: Variants = {
  cachee: { opacity: 0.15, transform: "translateY(10px)" },
  visible: { opacity: 1, transform: "translateY(0px)" },
};

const detailVariants: Variants = {
  cachee: { opacity: 0, transform: "translateY(10px)" },
  visible: { opacity: 1, transform: "translateY(0px)" },
};

// Les durées vivent dans les props et non dans les variantes : une variante
// qui embarque sa transition ne peut plus être neutralisée d'un seul endroit.
const TRANSITION_PHRASE = { staggerChildren: 0.04 };
const TRANSITION_MOT = { duration: 0.5, ease: EASE_OUT };
const TRANSITION_DETAIL = { duration: 0.5, ease: EASE_OUT, delay: 0.3 };
const SANS_ANIMATION = { duration: 0, staggerChildren: 0, delay: 0 };

/** La phrase complète, pour l'étiquette accessible du titre découpé en mots. */
const phraseComplete = (segments: Segment[]) =>
  segments.map((segment) => segment.texte).join(" ");

/** Découpe les segments en mots, en gardant l'information d'accent. */
const decouperEnMots = (segments: Segment[]) =>
  segments.flatMap((segment, indexSegment) =>
    segment.texte.split(" ").map((mot, indexMot) => ({
      mot,
      accent: Boolean(segment.accent),
      cle: `${indexSegment}-${indexMot}`,
    })),
  );

interface EtapeItemProps {
  etape: Etape;
  premiere: boolean;
  reducedMotion: boolean;
}

const EtapeItem = ({ etape, premiere, reducedMotion }: EtapeItemProps) => {
  const itemRef = useRef<HTMLLIElement>(null);
  // `once` : l'étape s'allume au premier passage et ne clignote plus si le
  // visiteur remonte. `amount` évite qu'elle s'allume avant d'être lisible.
  const inView = useInView(itemRef, { once: true, amount: 0.35 });

  // Sans animation, le texte se pose à l'état final dès le montage, sans
  // attendre le scroll ni jouer la moindre transition.
  const revelation = reducedMotion
    ? ({ animate: "visible" } as const)
    : ({
        whileInView: "visible",
        viewport: { once: true, amount: 0.35 },
      } as const);

  return (
    <li
      ref={itemRef}
      className={`relative py-16 pl-8 sm:pl-12 lg:py-24 lg:pl-16 ${
        premiere ? "" : "border-t border-creme/10"
      }`}
    >
      <span
        aria-hidden="true"
        className={`block font-unbounded text-xl font-bold leading-none tabular-nums transition-colors duration-500 sm:text-2xl ${
          inView ? "text-or" : "text-or/30"
        }`}
      >
        {etape.numero}
      </span>

      <motion.h3
        // Le titre est découpé en mots pour la révélation : l'étiquette rend la
        // phrase d'un seul tenant aux lecteurs d'écran.
        aria-label={phraseComplete(etape.segments)}
        variants={phraseVariants}
        initial="cachee"
        transition={reducedMotion ? SANS_ANIMATION : TRANSITION_PHRASE}
        {...revelation}
        className="mt-6 font-unbounded text-3xl font-extrabold leading-[1.05] tracking-[-0.02em] text-creme sm:text-5xl lg:text-6xl"
      >
        {decouperEnMots(etape.segments).map(({ mot, accent, cle }) => (
          <motion.span
            key={cle}
            variants={motVariants}
            transition={reducedMotion ? SANS_ANIMATION : TRANSITION_MOT}
            className={`mr-[0.22em] inline-block ${accent ? "text-or" : ""}`}
          >
            {mot}
          </motion.span>
        ))}
      </motion.h3>

      <motion.div
        variants={detailVariants}
        initial="cachee"
        transition={reducedMotion ? SANS_ANIMATION : TRANSITION_DETAIL}
        {...revelation}
      >
        <p className="mt-8 max-w-xl font-dmSans text-base leading-relaxed text-creme/70 lg:text-lg">
          {etape.texte}
        </p>

        <dl className="mt-8 grid max-w-md grid-cols-2 gap-6">
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
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-10 max-w-2xl lg:mb-16">
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
            className="absolute bottom-0 left-0 top-0 w-px bg-creme/10"
          >
            <motion.div
              className="h-full w-full origin-top bg-or"
              style={{ scaleY: remplissage }}
            />
          </div>

          {etapes.map((etape, index) => (
            <EtapeItem
              key={etape.numero}
              etape={etape}
              premiere={index === 0}
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
