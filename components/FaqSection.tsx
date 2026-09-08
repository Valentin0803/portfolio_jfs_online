"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { BOOKING_URL } from "@/lib/site";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question:
      "Quelle est la différence entre l'Atelier du Réel et la Journée Contenu ?",
    answer:
      "L'Atelier du Réel est un accompagnement continu sur 6 mois, pensé pour les agences immobilières qui veulent du contenu régulier sur leurs biens et leur agence. La Journée Contenu est une prestation ponctuelle, ouverte à tous les secteurs, pour tester notre travail ou couvrir un besoin ciblé sans engagement dans la durée.",
  },
  {
    question: "Je m'engage sur combien de temps avec l'Atelier du Réel ?",
    answer:
      "L'Atelier du Réel est pensé sur 6 mois — le temps nécessaire pour construire une vraie régularité de contenu et voir les premiers résultats. On en discute ensemble dès le premier échange pour que tout soit clair avant de démarrer.",
  },
  {
    question: "Proposez-vous des services de drone pour la capture aérienne ?",
    answer:
      "Nous offrons des prestations de prises de vue aérienne avec des drones stabilisés comme le Mavic, ainsi qu'avec des drones FPV pour des captures dynamiques et immersives. Nous proposons également nos services de télépilotage de drone en tant que prestataire pour d'autres sociétés de production.",
  },
  {
    question:
      "Est-il nécessaire d'obtenir des autorisations spécifiques pour filmer avec un drone ?",
    answer:
      "Oui, en fonction de la zone de vol et du type d'événement — espaces publics, zones urbaines, sites sensibles. C'est justement une partie du travail qu'on prend en charge pour vous : notifications préfecture et démarches administratives sont gérées de bout en bout, pour un tournage en toute conformité.",
  },
  {
    question: "Est-ce que je m'engage en prenant rendez-vous ?",
    answer:
      "Non. Ce sont 30 minutes en visio pour comprendre votre agence et votre marché. À la fin, on vous dit honnêtement si une de nos offres a du sens pour vous — et si ce n'est pas le cas, on vous le dit aussi. Aucune relance agressive derrière.",
  },
  {
    question: "Combien de temps ça me prend côté agence ?",
    answer:
      "Sur l'Atelier du Réel, comptez environ 1 h par mois de votre côté : la validation des scripts et des montages, via Notion et WhatsApp. Tout le reste est géré par JFS Visual, y compris les autorisations de vol drone. Pour une Journée Contenu, il faut prévoir une demi-journée de présence sur le tournage.",
  },
];

export const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div className="w-full mx-auto py-24 lg:py-40 bg-[#100D08]">
      <div className="max-w-xl mx-auto mb-16 lg:mb-20 text-center px-6">
        <div className="font-dmSans text-xs tracking-[0.25em] uppercase text-or mb-5">
          FAQ
        </div>
        <h2 className="font-unbounded font-bold text-3xl lg:text-5xl text-creme leading-tight">
          Questions fréquentes
        </h2>
      </div>
      <div className="max-w-2xl mx-auto px-6">
        {faqData.map((item, index) => (
          <div key={index} className="border-t border-white/10 last:border-b">
            <button
              className="w-full text-left flex justify-between items-center gap-6 py-7 font-unbounded font-medium text-creme focus:outline-none"
              onClick={() => toggleAccordion(index)}
            >
              <span>{item.question}</span>
              <span className="text-or text-xl shrink-0">
                {activeIndex === index ? "−" : "+"}
              </span>
            </button>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: activeIndex === index ? "auto" : 0,
                opacity: activeIndex === index ? 1 : 0,
              }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.4 },
                opacity: { duration: 0.2 },
              }}
              className="overflow-hidden"
            >
              <p className="font-dmSans text-creme/60 text-sm leading-relaxed pb-7 max-w-[60ch]">
                {item.answer}
              </p>
            </motion.div>
          </div>
        ))}
        <div className="mt-10 text-center">
          <Link
            href={BOOKING_URL}
            className="font-dmSans text-sm text-or hover:underline"
          >
            Une autre question ? Posez-la en 30 min avec Martin →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
