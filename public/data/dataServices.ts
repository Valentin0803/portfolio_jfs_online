type ServiceType = {
  titleTop: string;
  titleMask: string;
  descriptionService: string;
};

function dataServices(): ServiceType[] {
  return [
    {
      titleTop: "Présentation d'entreprise",
      titleMask: "",
      descriptionService:
        "Nous mettons notre expertise en vidéo, photographie et drone FPV à votre service. Basée en Normandie et fondée par trois passionnés, notre équipe offre des solutions visuelles sur mesure. Que ce soit pour des vidéos d’entreprise, des contenus promotionnels ou des photos de qualité, nous vous accompagne à chaque étape. Fortement engagés envers votre satisfaction, nous transformons vos idées en productions visuelles de qualité.",
    },
    {
      titleTop: "Visite virtuelle immersive",
      titleMask: "",
      descriptionService:
        "Mettez en avant vos locaux ou événements de manière originale grâce à notre service de visites virtuelles immersives en drone FPV. Ce format moderne et percutant est idéal pour booster votre communication digitale et attirer l’attention sur vos réseaux sociaux et votre site internet.",
    },
    {
      titleTop: "Drone FPV et drone stabilisé",
      titleMask: "",
      descriptionService:
        "Le drone FPV est conçu pour les prises de vue immersives et dynamiques, offrant des perspectives inédites, notamment pour les vidéos d'action, les clips publicitaires ou les visites immersives de locaux. Il permet de suivre des mouvements rapides avec précision. Le drone stabilisé, quant à lui, assure des plans aériens lisses et stables, idéal pour capturer des paysages, des bâtiments ou des événements en toute sérénité.",
    },
    {
      titleTop: "Couverture d'événement",
      titleMask: "",
      descriptionService:
        "Nous offrons un service de couverture complète de vos événements, capturant chaque moment clé à travers des aftermovies dynamiques et des photos professionnelles. Que ce soit pour des conférences, des festivals ou des événements d'entreprise, notre équipe assure une production de haute qualité, reflétant l'essence de votre événement.",
    },
    {
      titleTop: "Photographie",
      titleMask: "",
      descriptionService:
        "Bénéficiez d’un service de photographie sur-mesure pour vos événements, vos produits ou vos espaces. Nos photographes sont experts dans la création d’images de qualité, idéales pour vos campagnes marketing, vos réseaux sociaux ou vos souvenirs personnels. Capturez des photos uniques qui reflètent l’essence de votre projet ou de votre entreprise.",
    },
  ];
}

export type { ServiceType };
export default dataServices;
