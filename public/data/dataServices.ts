import type { StaticImageData } from "next/image";
import aerienne from "@/public/reels/guy-hoquet-coulombs.jpg";
import bien from "@/public/reels/guy-hoquet-val-d-arry.jpg";
import equipe from "@/public/reels/guy-hoquet-equipe.jpg";
import interview from "@/public/reels/guy-hoquet-conseils-emprunt.jpg";
import evenement from "@/public/projects/COMBAT_STRESS/PHOTO/CombatStress2k24_24.jpg";
import photo from "@/public/projects/COTRAL_LAB/PHOTO/CotralLab (20).jpg";

type ServiceType = {
  /** Identifiant stable, utilisé pour les clés et les ancres d'accessibilité. */
  slug: string;
  titleTop: string;
  descriptionService: string;
  image: StaticImageData;
  imageAlt: string;
  /** À qui s'adresse le savoir-faire, affiché en badge sous l'image. */
  pourQui: string;
};

function dataServices(): ServiceType[] {
  return [
    {
      slug: "video-de-bien",
      titleTop: "Vidéo de bien",
      descriptionService:
        "Un reel vertical qui donne envie de visiter : drone, intérieurs et votre conseiller à l'image. Monté au format des réseaux de l'agence et livré prêt à publier.",
      image: bien,
      imageAlt:
        "Maison avec pergola et salon de jardin présentée par un conseiller à l'ouest de Caen",
      pourQui: "Agences immobilières",
    },
    {
      slug: "drone",
      titleTop: "Drone FPV et stabilisé",
      descriptionService:
        "Des plans aériens larges pour situer un lieu, des traversées FPV pour le faire vivre de l'intérieur. Autorisations de vol gérées de bout en bout.",
      image: aerienne,
      imageAlt: "Vue aérienne d'une maison avec piscine à Coulombs",
      pourQui: "Immobilier, entreprise, événement",
    },
    {
      slug: "contenu-agence",
      titleTop: "Contenu d'agence",
      descriptionService:
        "Votre équipe, les portraits de vos conseillers, les coulisses et les formats du moment. De quoi alimenter vos réseaux toute l'année, pas seulement quand un mandat rentre.",
      image: equipe,
      imageAlt: "L'équipe Guy Hoquet Caen Carpiquet réunie dans son agence",
      pourQui: "Agences immobilières",
    },
    {
      slug: "film-entreprise",
      titleTop: "Interview et film d'entreprise",
      descriptionService:
        "Présentation d'activité, témoignage client ou marque employeur. On prépare les questions, on filme et on monte pour que le message reste clair.",
      image: interview,
      imageAlt: "Un courtier interviewé face caméra dans les locaux de l'agence",
      pourQui: "Entreprises",
    },
    {
      slug: "evenement",
      titleTop: "Événement",
      descriptionService:
        "Aftermovie et couverture photo, du séminaire à la course caritative. On capte l'ambiance sans figer vos invités devant l'objectif.",
      image: evenement,
      imageAlt:
        "Un coureur en pleine épreuve pendant l'événement caritatif Combat Stress",
      pourQui: "Entreprises et collectivités",
    },
    {
      slug: "photo",
      titleTop: "Photo",
      descriptionService:
        "Biens, portraits d'équipe et produits, traités avec la même exigence que la vidéo. Des images cohérentes avec le reste de votre communication.",
      image: photo,
      imageAlt: "Une collaboratrice Cotral Lab à son poste de travail",
      pourQui: "Tous secteurs",
    },
  ];
}

export type { ServiceType };
export default dataServices;
