"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { CONTACT_LABEL, CONTACT_URL } from "@/lib/site";

/**
 * Proposition B pour remplacer « Ce qui nous différencie » : un manifeste
 * typographique. Trois affirmations très courtes, chacune sur son bloc, avec
 * une ligne de preuve concrète en dessous. Le texte se révèle mot par mot à
 * l'entrée dans l'écran, une seule fois.
 *
 * Le rendu HTML est strictement le même avec ou sans « prefers-reduced-motion » :
 * seule la façon d'atteindre l'état final change, pour ne pas casser
 * l'hydratation côté client.
 */

interface Segment {
  texte: string;
  /** Le mot clé de la phrase, affiché en or. */
  accent?: boolean;
}

interface Affirmation {
  segments: Segment[];
  preuve: string;
}

const affirmations: Affirmation[] = [
  {
    segments: [
      { texte: "Vous n’avez" },
      { texte: "rien à gérer.", accent: true },
    ],
    preuve:
      "Script, repérages, autorisations, tournage, montage : un seul interlocuteur.",
  },
  {
    segments: [
      { texte: "Le drone," },
      { texte: "on s’en occupe,", accent: true },
      { texte: "autorisations comprises." },
    ],
    preuve:
      "Télépilotes déclarés, notifications préfecture et démarches administratives gérées de bout en bout.",
  },
  {
    segments: [
      { texte: "Vos vidéos arrivent" },
      { texte: "prêtes à publier.", accent: true },
    ],
    preuve:
      "Formats verticaux et horizontaux, sous-titres, livrés au bon format pour chaque réseau.",
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

const preuveVariants: Variants = {
  cachee: { opacity: 0, transform: "translateY(10px)" },
  visible: { opacity: 1, transform: "translateY(0px)" },
};

// Les durées vivent dans les props et non dans les variantes : une variante
// qui embarque sa transition ne peut plus être neutralisée d'un seul endroit.
const TRANSITION_PHRASE = { staggerChildren: 0.04 };
const TRANSITION_MOT = { duration: 0.5, ease: EASE_OUT };
const TRANSITION_PREUVE = { duration: 0.5, ease: EASE_OUT, delay: 0.25 };
const SANS_ANIMATION = { duration: 0, staggerChildren: 0, delay: 0 };

/** Découpe les segments en mots, en gardant l'information d'accent. */
const decouperEnMots = (segments: Segment[]) =>
  segments.flatMap((segment, indexSegment) =>
    segment.texte.split(" ").map((mot, indexMot) => ({
      mot,
      accent: Boolean(segment.accent),
      cle: `${indexSegment}-${indexMot}`,
    })),
  );

export const ProcessManifeste = () => {
  const reducedMotion = useMoinsAnimations();

  // Sans animation, le texte se pose à l'état final dès le montage, sans
  // attendre le scroll ni jouer la moindre transition.
  const revelation = reducedMotion
    ? ({ animate: "visible" } as const)
    : ({
        whileInView: "visible",
        viewport: { once: true, amount: 0.4 },
      } as const);

  return (
    <section
      id="process-manifeste"
      className="border-y border-creme/10 bg-charcoal py-24 lg:py-40"
    >
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-16 font-dmSans text-xs uppercase tracking-[0.25em] text-or lg:mb-24">
          Notre engagement
        </p>

        {affirmations.map((affirmation, index) => (
          <div
            key={affirmation.preuve}
            className={`flex min-h-[50vh] flex-col justify-center py-12 ${
              index > 0 ? "border-t border-or/25" : ""
            }`}
          >
            <motion.p
              variants={phraseVariants}
              initial="cachee"
              transition={reducedMotion ? SANS_ANIMATION : TRANSITION_PHRASE}
              {...revelation}
              className="font-unbounded text-4xl font-extrabold leading-[1.02] tracking-[-0.02em] text-creme sm:text-6xl lg:text-7xl"
            >
              {decouperEnMots(affirmation.segments).map(
                ({ mot, accent, cle }) => (
                  <motion.span
                    key={cle}
                    variants={motVariants}
                    transition={reducedMotion ? SANS_ANIMATION : TRANSITION_MOT}
                    className={`mr-[0.22em] inline-block ${
                      accent ? "text-or" : ""
                    }`}
                  >
                    {mot}
                  </motion.span>
                ),
              )}
            </motion.p>

            <motion.p
              variants={preuveVariants}
              initial="cachee"
              transition={reducedMotion ? SANS_ANIMATION : TRANSITION_PREUVE}
              {...revelation}
              className="mt-8 max-w-md font-dmSans text-base leading-relaxed text-creme/60"
            >
              {affirmation.preuve}
            </motion.p>
          </div>
        ))}

        <div className="mt-16 border-t border-or/25 pt-16">
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

export default ProcessManifeste;
