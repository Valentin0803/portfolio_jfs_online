// Unique appel à l'action du site : la prise de rendez-vous de 30 min.
// Toute nouvelle CTA doit importer ces constantes plutôt que réécrire l'URL.
// La réservation se fait désormais sur le site, via la page /rendez-vous qui
// intègre le calendrier zcal.
export const BOOKING_URL = "/rendez-vous";
export const BOOKING_LABEL = "Prendre rendez-vous";

// URL d'invitation interne zcal : la seule qui accepte d'être affichée dans une
// iframe (la page publique renvoie X-Frame-Options: DENY).
export const ZCAL_INVITE_URL = "https://zcal.co/i/SUoouBww";
// Page publique zcal, conservée comme repli hors intégration.
export const ZCAL_PUBLIC_URL = "https://zcal.co/martin-ribot/30min";
