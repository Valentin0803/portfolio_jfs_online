import { cn } from "@/lib/utils";
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
    <div className="w-full mx-auto mb-10">
      <h2 className="font-leagueSpartan text-jaune text-3xl my-10 mx-10 lg:mx-36">
        FAQ
      </h2>
      {faqData.map((item, index) => (
        <div key={index} className="mb-4">
          <div className="line min-h-[1px] bg-white opacity-50"></div>
          <button
            className="w-full text-left flex justify-between items-center py-2 px-10 lg:px-36 text-lg font-leagueSpartan focus:outline-none"
            onClick={() => toggleAccordion(index)}
          >
            <span>{item.question}</span>
            <span>{activeIndex === index ? "-" : "+"}</span>
          </button>
          <motion.div
            key={index}
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
            <div className="font-leagueSpartan mx-10 pl-4 pr-4 pb-2 lg:mx-44">
              {item.answer}
            </div>
          </motion.div>
        </div>
      ))}
      <div className="line min-h-[1px] bg-white opacity-50"></div>
    </div>
  );
};

export default FaqSection;
