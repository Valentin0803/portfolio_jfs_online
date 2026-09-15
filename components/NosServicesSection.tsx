"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import dataServices from "../public/data/dataServices";

/**
 * Au dessus de cette largeur et avec une vraie souris, la section passe en
 * mode « liste + image qui suit » : le survol change le service affiché.
 * En dessous, ou au doigt, elle reste un accordéon que l'on ouvre au clic.
 */
const POINTER_QUERY = "(min-width: 1024px) and (hover: hover) and (pointer: fine)";

const NosServicesSection = () => {
  const services = useMemo(() => dataServices(), []);
  const reducedMotion = useReducedMotion();

  // Premier service ouvert par défaut : la section ne démarre jamais vide.
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  // L'image reste affichée même quand l'accordéon mobile est entièrement replié.
  const [visualIndex, setVisualIndex] = useState(0);
  const [pointerFollows, setPointerFollows] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(POINTER_QUERY);
    const sync = () => setPointerFollows(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (openIndex !== null) setVisualIndex(openIndex);
  }, [openIndex]);

  const visual = services[visualIndex] ?? services[0];

  // Dernière position connue du pointeur : replier une ligne fait remonter
  // celles du dessous et un autre titre se retrouve sous un curseur immobile.
  // On n'ouvre donc que sur un vrai déplacement, sinon la liste se déroulerait
  // toute seule jusqu'en bas.
  const lastPointer = useRef({ x: -1, y: -1 });

  const handlePointerMove = (index: number, x: number, y: number) => {
    if (!pointerFollows) return;
    if (lastPointer.current.x === x && lastPointer.current.y === y) return;
    lastPointer.current = { x, y };
    setOpenIndex(index);
  };

  const handleClick = (index: number) => {
    if (pointerFollows) {
      setOpenIndex(index);
      return;
    }
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="NosServices"
      className="border-y border-creme/10 bg-[#100D08] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-10 flex flex-col gap-5 lg:mb-16 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div>
            <p className="mb-4 font-dmSans text-xs uppercase tracking-[0.22em] text-or">
              Ce qu’on fait
            </p>
            <h2 className="font-unbounded text-3xl font-bold leading-[1.15] text-creme sm:text-4xl lg:text-5xl">
              Nos services
            </h2>
          </div>
          <p className="max-w-md font-dmSans text-base leading-relaxed text-creme/75">
            D’abord pensés pour les agences immobilières, nos savoir-faire
            servent aussi les entreprises et les événements.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,22rem)] lg:gap-16 xl:grid-cols-[1fr_minmax(0,26rem)]">
          <ul className="border-t border-creme/10">
            {services.map((service, index) => {
              const isOpen = openIndex === index;
              const panelId = `service-panel-${service.slug}`;
              const buttonId = `service-trigger-${service.slug}`;

              return (
                <li key={service.slug} className="border-b border-creme/10">
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onPointerMove={(event) =>
                        handlePointerMove(index, event.clientX, event.clientY)
                      }
                      onFocus={(event) => {
                        // Uniquement au clavier : un focus provoqué par le clic
                        // se battrait avec le repli de l'accordéon mobile.
                        if (event.currentTarget.matches(":focus-visible")) {
                          setOpenIndex(index);
                        }
                      }}
                      onClick={() => handleClick(index)}
                      className="group flex w-full items-baseline gap-4 py-6 text-left focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-or sm:gap-6 lg:py-8"
                    >
                      <span
                        aria-hidden="true"
                        className={`w-6 shrink-0 font-dmSans text-xs tabular-nums transition-colors duration-200 ${
                          isOpen ? "text-or" : "text-creme/40"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`flex-1 font-unbounded text-2xl font-bold leading-tight transition-colors duration-200 lg:text-4xl ${
                          isOpen ? "text-or" : "text-creme"
                        }`}
                      >
                        {service.titleTop}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`shrink-0 self-center font-dmSans text-xl text-or motion-safe:transition-[opacity,transform] motion-safe:duration-200 motion-safe:ease-out ${
                          isOpen
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-2"
                        }`}
                      >
                        →
                      </span>
                    </button>
                  </h3>

                  {/* Dépliage par grid-template-rows : interruptible et sans
                      hauteur calculée en JavaScript. */}
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`grid motion-safe:transition-[grid-template-rows] motion-safe:duration-[250ms] motion-safe:ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-7 pl-10 pr-2 sm:pl-12 lg:pb-8">
                        <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-2xl border border-creme/15 lg:hidden">
                          <Image
                            src={service.image}
                            alt={service.imageAlt}
                            fill
                            placeholder="blur"
                            sizes="(max-width: 1023px) 80vw, 1px"
                            className="object-cover"
                          />
                        </div>
                        <p className="max-w-xl font-dmSans text-base leading-relaxed text-creme/75">
                          {service.descriptionService}
                        </p>
                        <p className="mt-4 font-dmSans text-[11px] uppercase tracking-[0.14em] text-creme/50 lg:hidden">
                          {service.pourQui}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-creme/15 bg-charcoal">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={visual.slug}
                    initial={
                      reducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, transform: "scale(1.04)" }
                    }
                    animate={
                      reducedMotion
                        ? { opacity: 1 }
                        : { opacity: 1, transform: "scale(1)" }
                    }
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: reducedMotion ? 0 : 0.3,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={visual.image}
                      alt={visual.imageAlt}
                      fill
                      placeholder="blur"
                      sizes="(max-width: 1023px) 1px, (max-width: 1279px) 22rem, 26rem"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <p className="mt-5 inline-flex rounded-full border border-creme/15 px-4 py-2 font-dmSans text-[11px] uppercase tracking-[0.14em] text-creme/70">
                {visual.pourQui}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NosServicesSection;
