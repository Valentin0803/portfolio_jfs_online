"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";

const results = [
  { label: "Abonnés", value: 1500, suffix: "", detail: "Contre environ 900 au départ, soit près de +67 % en un an." },
  { label: "Vues par vidéo", value: 10000, suffix: "+", detail: "Minimum constaté aujourd’hui, contre 150 à 200 vues en moyenne au départ." },
  { label: "Taux d’engagement", value: 6, suffix: " %", detail: "Contre moins de 1 % au début de l’accompagnement." },
  { label: "Ventes attribuées aux vidéos", value: 5, suffix: " ventes", detail: "Sur le mois d’août 2026." },
];

const format = (value: number) => Math.round(value).toLocaleString("fr-FR");

function Counter({ value, suffix, active, delay }: { value: number; suffix: string; active: boolean; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!active || reduceMotion) return;
    const controls = animate(0, value, {
      duration: 1.5,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        if (ref.current) ref.current.textContent = format(latest) + suffix;
      },
    });
    return () => controls.stop();
  }, [active, value, suffix, delay, reduceMotion]);

  return <><span className="sr-only">{format(value)}{suffix}</span><span ref={ref} aria-hidden="true">{format(value)}{suffix}</span></>;
}

export default function ClientResults() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="relative mb-8 overflow-hidden rounded-2xl bg-creme p-6 text-charcoal sm:p-8">
      <motion.div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 origin-left bg-or"
        initial={false} animate={{ scaleX: inView || reduceMotion ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }} />
      <p className="font-dmSans text-xs font-bold uppercase tracking-widest">Guy Hoquet Caen Carpiquet · Un an d’accompagnement</p>
      <dl className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {results.map((result, index) => (
          <motion.div key={result.label} initial={false}
            animate={{ opacity: inView || reduceMotion ? 1 : 0, y: inView || reduceMotion ? 0 : 18 }}
            transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : index * 0.12 }}>
            <dt className="font-dmSans text-sm font-medium">{result.label}</dt>
            <dd className="mt-3 whitespace-nowrap font-unbounded text-3xl font-bold tabular-nums lg:text-4xl">
              <Counter value={result.value} suffix={result.suffix} active={inView} delay={index * 0.12} />
            </dd>
            <dd className="mt-3 font-dmSans text-sm leading-relaxed text-charcoal/70">{result.detail}</dd>
          </motion.div>
        ))}
      </dl>
    </div>
  );
}
