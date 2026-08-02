"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Proposez-vous des services de drone pour la capture aérienne ?",
    answer:
      "Nous offrons des prestations de prises de vue aérienne avec des drones stabilisés comme le Mavic, ainsi qu'avec des drones FPV pour des captures dynamiques et immersives. Nous proposons également nos services de télépilotage de drone en tant que prestataire pour d'autres sociétés de production.",
  },
  {
    question:
      "Est-il nécessaire d'obtenir des autorisations spécifiques pour filmer avec un drone ?",
    answer:
      "Oui, il est souvent nécessaire d'obtenir des autorisations spécifiques pour filmer avec un drone, en fonction de la zone de vol et du type d'événement. Certaines zones, comme les espaces publics, les zones urbaines ou les sites sensibles, nécessitent des démarches administratives et des autorisations de la part des autorités compétentes. En tant que professionnels certifiés, nous nous chargeons de gérer ces aspects pour vous assurer un tournage en toute conformité avec la réglementation en vigueur.",
  },
  {
    question: "Aidez-vous à élaborer le script et le storyboard ?",
    answer:
      "Oui, nous offrons un accompagnement complet dans l'élaboration du script et du storyboard. Nous travaillons en étroite collaboration avec vous pour comprendre vos besoins, définir le message clé à transmettre, et concevoir un scénario visuel qui reflète votre vision. Cela nous permet d'assurer une cohérence artistique et technique tout au long du projet.",
  },
  {
    question: "Combien de temps prend la post-production d'une vidéo ?",
    answer:
      "La durée de la post-production dépend de plusieurs facteurs, tels que la complexité du projet, la durée de la vidéo, le nombre d'effets spéciaux ou d'animations à intégrer, et les révisions demandées. En général, cela peut varier de quelques jours à plusieurs semaines. Nous discutons toujours des délais dès le début du projet pour vous fournir un calendrier adapté à vos besoins.",
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
      </div>
    </div>
  );
};

export default FaqSection;
