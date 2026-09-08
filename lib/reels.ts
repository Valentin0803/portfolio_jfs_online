// Reels verticaux produits par JFS Visual pour les agences immobilières.
// Chaque entrée alimente une carte de <ReelsImmo /> : la vidéo est servie
// depuis public/reels/ (mp4 720x1280 ré-encodé pour rester léger en mobile)
// et renvoie vers le post publié par l'agence sur son propre compte.
export interface Reel {
  /** Identifiant stable, utilisé comme clé de rendu. */
  slug: string;
  /** Chemin public du mp4 (720x1280). */
  src: string;
  /** Chemin public de l'image affichée avant lecture. */
  poster: string;
  /** Le bien filmé, tel qu'annoncé par l'agence. */
  titre: string;
  lieu: string;
  agence: string;
  /** Post Instagram de l'agence reprenant le reel. */
  instagramUrl: string;
  /** Date de publication, au format ISO. */
  date: string;
}

export const reels: Reel[] = [
  {
    slug: "guy-hoquet-coulombs",
    src: "/reels/guy-hoquet-coulombs.mp4",
    poster: "/reels/guy-hoquet-coulombs.jpg",
    titre: "Maison 183 m² avec piscine chauffée, 1 300 m² de jardin",
    lieu: "Coulombs (Calvados)",
    agence: "Guy Hoquet Caen Carpiquet",
    instagramUrl: "https://www.instagram.com/reel/Dc_faRnNhnW/",
    date: "2026-09-07",
  },
];

export default reels;
