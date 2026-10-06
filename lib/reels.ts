// Reels verticaux produits par JFS Visual pour les agences immobilières.
// Chaque entrée alimente une carte de <ReelsImmo /> : la vidéo est servie
// depuis public/reels/ (mp4 720x1280 ré-encodé pour rester léger en mobile)
// et renvoie vers le post publié par l'agence sur son propre compte.
export type ReelCategorie = "Biens" | "Vie d’agence" | "Conseils";

export interface Reel {
  /** Identifiant stable, utilisé comme clé de rendu. */
  slug: string;
  /** Chemin public du mp4 (720x1280). */
  src: string;
  /** Chemin public de l'image affichée avant lecture. */
  poster: string;
  /** Présentation de bien, trend ou contenu conseil de l'agence. */
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
    categorie: "Biens",
    titre: "Une maison, du jardin aux intérieurs",
    lieu: "Coulombs (Calvados)",
    agence: AGENCE,
    instagramUrl: "https://www.instagram.com/reel/Dc_faRnNhnW/",
    likes: 84,
    date: "2026-09-07",
  },
  {
    slug: "guy-hoquet-conseils-emprunt",
    src: "/reels/guy-hoquet-conseils-emprunt.mp4",
    poster: "/reels/guy-hoquet-conseils-emprunt.jpg",
    categorie: "Conseils",
    titre: "Trois idées reçues sur l’emprunt",
    lieu: "Jérôme, courtier chez Olisto",
    agence: AGENCE,
    instagramUrl: "https://www.instagram.com/reel/DUi3ZjCAoAD/",
    likes: 83,
    date: "2026-02-09",
  },
  {
    slug: "guy-hoquet-val-d-arry",
    src: "/reels/guy-hoquet-val-d-arry.mp4",
    poster: "/reels/guy-hoquet-val-d-arry.jpg",
    categorie: "Biens",
    titre: "Faire découvrir les espaces de vie",
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
    categorie: "Vie d’agence",
    titre: "Mettre des visages sur l’agence",
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
    categorie: "Vie d’agence",
    titre: "Montrer la personnalité de l’équipe",
    lieu: "Carpiquet (Calvados)",
    agence: AGENCE,
    instagramUrl: "https://www.instagram.com/reel/DcbcWfINP99/",
    likes: 3279,
    date: "2026-08-24",
  },
];

export default reels;
