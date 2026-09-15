"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

export interface Projet {
  category: string;
  title: string;
  src: string;
  content: ReactNode;
}

/** Largeur d'une carte en mode épinglé (16:9 → 520 × 292). */
const CARD_WIDTH = 520;
/** Respiration à gauche/droite de la rangée, alignée sur le titre. */
const EDGE_CLASS = "pl-[6vw]";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Index de la carte dont le centre est le plus proche de `target`. */
function closestIndex(centers: number[], target: number) {
  let best = 0;
  let bestDistance = Infinity;
  for (let i = 0; i < centers.length; i += 1) {
    const distance = Math.abs(centers[i] - target);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = i;
    }
  }
  return best;
}

const pad = (n: number) => String(n).padStart(2, "0");

interface CarteProps {
  projet: Projet;
  index: number;
  onOpen: (index: number) => void;
  /** Parallaxe interne de la miniature ; absent hors mode épinglé. */
  parallax?: MotionValue<string>;
  register: (index: number, el: HTMLLIElement | null) => void;
  pinned: boolean;
}

const Carte = ({
  projet,
  index,
  onOpen,
  parallax,
  register,
  pinned,
}: CarteProps) => {
  // Pastille « Voir le projet » qui suit le curseur : décorative, donc on la
  // laisse traîner un peu derrière la souris pour qu'elle ait du poids.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, {
    stiffness: 320,
    damping: 32,
    mass: 0.4,
  });
  const smoothY = useSpring(pointerY, {
    stiffness: 320,
    damping: 32,
    mass: 0.4,
  });
  const pillTransform = useMotionTemplate`translate3d(calc(${smoothX}px - 50%), calc(${smoothY}px - 50%), 0)`;

  const move = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, jump: boolean) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      pointerX.set(x);
      pointerY.set(y);
      // À l'entrée, la pastille apparaît sous le curseur au lieu de venir
      // en volant depuis le coin de la carte.
      if (jump) {
        smoothX.jump(x);
        smoothY.jump(y);
      }
    },
    [pointerX, pointerY, smoothX, smoothY]
  );

  return (
    <li
      ref={(el) => register(index, el)}
      className={
        pinned
          ? "shrink-0"
          : "shrink-0 snap-start w-[82vw] max-w-[520px] sm:w-[60vw]"
      }
      style={pinned ? { width: CARD_WIDTH } : undefined}
    >
      <button
        type="button"
        onClick={() => onOpen(index)}
        onMouseEnter={(e) => move(e, true)}
        onMouseMove={(e) => move(e, false)}
        aria-label={`Voir le projet ${projet.title}, ${projet.category}`}
        className="group relative block w-full overflow-hidden rounded-[2rem] border border-creme/10 bg-[#100D08] text-left transition-colors duration-300 ease-out hover:border-or/40 focus:outline-none focus-visible:border-or/40 focus-visible:ring-2 focus-visible:ring-or focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
          {/* Débord de 6 % : la parallaxe de ±4 % ne peut pas découvrir de vide. */}
          <motion.div
            className="absolute inset-[-6%]"
            style={parallax ? { transform: parallax } : undefined}
          >
            <Image
              src={projet.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 560px, 85vw"
              className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
            />
          </motion.div>

          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />

          <span className="absolute left-4 top-4 rounded-full border border-creme/15 bg-charcoal/60 px-3 py-1 font-dmSans text-[10px] font-bold uppercase tracking-[0.2em] text-creme/90 backdrop-blur">
            {projet.category}
          </span>

          <h3 className="absolute bottom-5 left-5 right-5 font-unbounded text-base font-bold leading-snug text-creme lg:text-lg">
            {projet.title}
          </h3>

          {pinned && (
            <motion.span
              aria-hidden
              style={{ transform: pillTransform }}
              className="pointer-events-none absolute left-0 top-0 whitespace-nowrap rounded-full bg-creme px-4 py-2 font-dmSans text-[11px] font-bold uppercase tracking-[0.18em] text-charcoal opacity-0 transition-opacity duration-200 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100"
            >
              Voir le projet
            </motion.span>
          )}
        </div>
      </button>
    </li>
  );
};

interface ProjetsTrackProps {
  projets: Projet[];
  onOpen: (index: number) => void;
}

export const ProjetsTrack = ({ projets, onOpen }: ProjetsTrackProps) => {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const centersRef = useRef<number[]>([]);

  const [isLarge, setIsLarge] = useState(false);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);

  // L'épinglage n'a de sens qu'au-delà de lg et si le visiteur ne demande pas
  // moins de mouvement : sinon on sert la rangée défilante à tout le monde.
  const pinned = isLarge && !reduceMotion;

  useIsomorphicLayoutEffect(() => {
    const query = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const sync = () => setIsLarge(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const register = useCallback((index: number, el: HTMLLIElement | null) => {
    cardRefs.current[index] = el;
  }, []);

  // Toutes les lectures de géométrie se font ici (montage, ResizeObserver,
  // resize fenêtre) et jamais dans un handler de scroll.
  useEffect(() => {
    const track = pinned ? trackRef.current : scrollerRef.current;
    if (!track) return;

    const measure = () => {
      const width = window.innerWidth;
      const travel = Math.max(0, track.scrollWidth - width);
      setDistance((prev) => (prev === travel ? prev : travel));
      centersRef.current = cardRefs.current.map((el) =>
        el ? el.offsetLeft + el.offsetWidth / 2 : 0
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned, projets.length]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Ressort léger : il gomme le crantage de la molette sans introduire de
  // retard perceptible entre le scroll et la rangée.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.5,
  });
  const progress = pinned ? smooth : scrollYProgress;

  const translate = useTransform(progress, [0, 1], [0, -distance]);
  const trackTransform = useMotionTemplate`translate3d(${translate}px, 0, 0)`;
  const parallaxPercent = useTransform(progress, [0, 1], [-4, 4]);
  const parallax = useMotionTemplate`translateX(${parallaxPercent}%)`;
  const barScale = useTransform(progress, [0, 1], [0.04, 1]);

  // Le compteur suit la carte mise en avant par la traversée : on balaie les
  // centres mesurés du premier au dernier au fil de la progression, ce qui
  // ancre bien 01/07 au départ et 07/07 quand la rangée est au bout (viser le
  // centre du viewport laisserait le compteur bloqué à 06 en fin de course).
  useMotionValueEvent(progress, "change", (value) => {
    if (!pinned) return;
    const centers = centersRef.current;
    if (centers.length < 2) return;
    const first = centers[0];
    const last = centers[centers.length - 1];
    const next = closestIndex(centers, first + value * (last - first));
    setActive((prev) => (prev === next ? prev : next));
  });

  // Version défilante : l'index suit la carte la plus centrée dans le rail.
  const onScrollerScroll = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const target = scroller.scrollLeft + scroller.clientWidth / 2;
    const next = closestIndex(centersRef.current, target);
    setActive((prev) => (prev === next ? prev : next));
  }, []);

  const compteur = (
    <span className="font-dmSans text-xs tracking-[0.25em] text-creme/60">
      <span className="text-or">{pad(active + 1)}</span> / {pad(projets.length)}
    </span>
  );

  const entete = (
    <div className="max-w-xl">
      <div className="mb-4 font-dmSans text-xs uppercase tracking-[0.25em] text-or">
        Entreprises &amp; événements
      </div>
      <h2 className="mb-4 font-unbounded text-3xl font-bold leading-tight text-creme lg:text-5xl">
        Des films à l’image de votre entreprise
      </h2>
      <p className="font-dmSans text-creme/70">
        Films de présentation, interviews, visites d’entreprise et événements :
        découvrez une sélection de nos réalisations.
      </p>
    </div>
  );

  const cartes = projets.map((projet, index) => (
    <Carte
      key={projet.title}
      projet={projet}
      index={index}
      onOpen={onOpen}
      parallax={pinned ? parallax : undefined}
      register={register}
      pinned={pinned}
    />
  ));

  if (pinned) {
    return (
      <section
        id="NotreTravail"
        ref={containerRef}
        style={{ height: `calc(${distance}px + 100vh)` }}
        className="relative w-full bg-charcoal"
      >
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-charcoal">
          <div className={`shrink-0 pr-6 pt-32 ${EDGE_CLASS}`}>{entete}</div>

          <div className="flex min-h-0 flex-1 items-center">
            <motion.ul
              ref={trackRef}
              style={{ transform: trackTransform, willChange: "transform" }}
              className={`relative flex w-max items-center gap-8 ${EDGE_CLASS}`}
            >
              {cartes}
              <li aria-hidden className="w-[6vw] shrink-0" />
            </motion.ul>
          </div>

          <div className={`shrink-0 pb-12 pr-[6vw] ${EDGE_CLASS}`}>
            <div className="flex items-center gap-6">
              <div className="h-px flex-1 overflow-hidden bg-creme/10">
                <motion.div
                  style={{ scaleX: barScale, transformOrigin: "left" }}
                  className="h-px w-full bg-or"
                />
              </div>
              {compteur}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="NotreTravail"
      ref={containerRef}
      className="w-full overflow-hidden py-24 lg:py-32"
    >
      <div className="px-6 lg:px-[6vw]">{entete}</div>

      <ul
        ref={scrollerRef}
        onScroll={onScrollerScroll}
        className="relative mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-6 px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:gap-8 lg:scroll-pl-[6vw] lg:px-[6vw]"
      >
        {cartes}
        <li aria-hidden className="w-px shrink-0 lg:w-[5vw]" />
      </ul>

      <div className="px-6 lg:px-[6vw]">{compteur}</div>
    </section>
  );
};
