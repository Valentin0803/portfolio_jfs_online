"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Comment définissez-vous le budget d’un projet ?",
    answer:
      "Nous partons de votre objectif, des contenus à produire, des lieux de tournage et des supports de diffusion. Ces éléments nous permettent de préparer un devis adapté à votre besoin. Le périmètre et le budget sont définis ensemble avant de démarrer.",
  },
  {
    question: "Peut-on travailler ensemble ponctuellement ou régulièrement ?",
    answer:
      "Les deux sont possibles. Nous pouvons réaliser un film, couvrir un événement ou vous accompagner dans la création régulière de contenus. Le rythme et les formats se définissent selon votre activité et vos besoins.",
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
      "Oui, en fonction de la zone de vol et du type d'événement : espaces publics, zones urbaines, sites sensibles. C'est justement une partie du travail qu'on prend en charge pour vous : notifications préfecture et démarches administratives sont gérées de bout en bout, pour un tournage en toute conformité.",
  },
  {
    question: "Est-ce que je m’engage en vous contactant ?",
    answer:
      "Non. Écrivez-nous via le formulaire de contact pour nous parler de votre activité et de votre projet. Ce premier échange est sans engagement.",
  },
  {
    question: "Comment se déroule un projet avec vous ?",
    answer:
      "Nous commençons par préciser votre besoin, puis préparons le contenu et organisons le tournage. Après le montage, vous nous faites vos retours avant la livraison des fichiers. Le calendrier, les formats et votre participation sont précisés ensemble en amont.",
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
