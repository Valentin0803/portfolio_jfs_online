import { v4 as uuidv4 } from "uuid";

function dataServices() {
  return [
    {
      id: uuidv4(),
      titleTop: "Présenation d'entreprise",
      titleMask: "",
      descriptionService:
        "Chez JFS Visual, nous mettons notre expertise en vidéo, photographie et drone FPV au service de vos projets. Basée en Normandie et fondée par trois professionnels passionnés, notre équipe s'engage à vous offrir des solutions visuelles uniques et sur mesure. Que vous ayez besoin de vidéos d’entreprise, de contenus promotionnels ou de photos de haute qualité, JFS Visual vous accompagne à chaque étape. Avec un fort engagement envers la satisfaction client, nous transformons vos idées en réalité grâce à des productions visuelles de qualité.",
    },
    {
      id: uuidv4(),
      titleTop: "Visite virtuel immersive",
      titleMask: "",
      descriptionService:
        "Mettez en avant vos locaux ou événements de manière originale grâce à notre service de visites virtuelles immersives en drone FPV. Ce format moderne et percutant est idéal pour booster votre communication digitale et attirer l’attention sur vos réseaux sociaux et votre site internet.",
    },
    {
      id: uuidv4(),
      titleTop: "Drone FPV et drone stabilisé",
      titleMask: "",
      descriptionService:
        "Le drone FPV est conçu pour les prises de vue immersives et dynamiques, offrant des perspectives inédites, notamment pour les vidéos d'action, les clips publicitaires ou les visites immersives de locaux. Il permet de suivre des mouvements rapides avec précision. Le drone stabilisé, quant à lui, assure des plans aériens lisses et stables, idéal pour capturer des paysages, des bâtiments ou des événements en toute sérénité.",
    },
    {
      id: uuidv4(),
      titleTop: "Couverture d'événement",
      titleMask: "",
      descriptionService:
        "Nous offrons un service de couverture complète de vos événements, capturant chaque moment clé à travers des aftermovies dynamiques et des photos professionnelles. Que ce soit pour des conférences, des festivals ou des événements d'entreprise, notre équipe assure une production de haute qualité, reflétant l'essence de votre événement. ",
    },
    {
      id: uuidv4(),
      titleTop: "Photographie",
      titleMask: "",
      descriptionService:
        "Bénéficiez d’un service de photographie sur-mesure pour vos événements, vos produits ou vos espaces. Nos photographes sont experts dans la création d’images de qualité, idéales pour vos campagnes marketing, vos réseaux sociaux ou vos souvenirs personnels. Capturez des photos uniques qui reflètent l’essence de votre projet ou de votre entreprise. ",
    },
  ];
}

export default dataServices;
