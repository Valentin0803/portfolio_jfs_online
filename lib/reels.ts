// Reels verticaux produits par JFS Visual pour les agences immobilières.
// Chaque entrée alimente une carte de <ReelsImmo /> : la vidéo est servie
// depuis public/reels/ (mp4 720x1280 ré-encodé pour rester léger en mobile)
// et renvoie vers le post publié par l'agence sur son propre compte.
export type ReelCategorie = "Maison" | "Trend";

export interface Reel {
  /** Identifiant stable, utilisé comme clé de rendu. */
  slug: string;
  /** Chemin public du mp4 (720x1280). */
  src: string;
  /** Chemin public de l'image affichée avant lecture. */
  poster: string;
  /** "Maison" = présentation d'un bien ; "Trend" = contenu réseaux de l'agence. */
  categorie: ReelCategorie;
  /** Le bien filmé (ou le sujet du trend), tel qu'annoncé par l'agence. */
  titre: string;
  lieu: string;
  agence: string;
  /** Post Instagram de l'agence reprenant le reel. */
  instagramUrl: string;
  /** Nombre de likes sur le post de l'agence au moment de l'ajout (preuve sociale). */
  likes?: number;
  /** Date de publication, au format ISO. */
  date: string;
}

const AGENCE = "Guy Hoquet Caen Carpiquet";

export const reels: Reel[] = [
  {
    slug: "guy-hoquet-coulombs",
    src: "/reels/guy-hoquet-coulombs.mp4",
    poster: "/reels/guy-hoquet-coulombs.jpg",
    categorie: "Maison",
    titre: "Maison 183 m² avec piscine chauffée, 1 300 m² de jardin",
    lieu: "Coulombs (Calvados)",
    agence: AGENCE,
    instagramUrl: "https://www.instagram.com/reel/Dc_faRnNhnW/",
    likes: 84,
    date: "2026-09-07",
  },
  {
    slug: "guy-hoquet-authie",
    src: "/reels/guy-hoquet-authie.mp4",
    poster: "/reels/guy-hoquet-authie.jpg",
    categorie: "Maison",
    titre: "Maison familiale 136 m², double garage, terrasse et pergola",
    lieu: "Authie (Calvados)",
    agence: AGENCE,
    instagramUrl: "https://www.instagram.com/reel/Db3ZNMRNKJ8/",
    likes: 43,
    date: "2026-08-10",
  },
  {
    slug: "guy-hoquet-val-d-arry",
    src: "/reels/guy-hoquet-val-d-arry.mp4",
    poster: "/reels/guy-hoquet-val-d-arry.jpg",
    categorie: "Maison",
    titre: "Maison de 2021, pièce de vie 54 m², pergola bioclimatique",
    lieu: "Val d'Arry (Calvados)",
    agence: AGENCE,
    instagramUrl: "https://www.instagram.com/reel/Da0chJTtg9L/",
    likes: 37,
    date: "2026-07-15",
  },
  {
    slug: "guy-hoquet-equipe",
    src: "/reels/guy-hoquet-equipe.mp4",
    poster: "/reels/guy-hoquet-equipe.jpg",
    categorie: "Trend",
    titre: "L'équipe de l'agence, présentée en un trend",
    lieu: "Carpiquet (Calvados)",
    agence: AGENCE,
    instagramUrl: "https://www.instagram.com/reel/DTsz9FzAu8B/",
    likes: 5058,
    date: "2026-01-19",
  },
  {
    slug: "guy-hoquet-trend-aout",
    src: "/reels/guy-hoquet-trend-aout.mp4",
    poster: "/reels/guy-hoquet-trend-aout.jpg",
    categorie: "Trend",
    titre: "Trend réseaux de l'agence",
    lieu: "Carpiquet (Calvados)",
    agence: AGENCE,
    instagramUrl: "https://www.instagram.com/reel/DcbcWfINP99/",
    likes: 3279,
    date: "2026-08-24",
  },
];

export default reels;
