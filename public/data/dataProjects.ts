import { Project } from '@/utils/types';
import { v4 as uuidv4 } from 'uuid';


const dataProjects: Project[] = [
  {
    id: uuidv4(),
    titleProject: "CCAS de Cenon",
    photo: false,
    video: true,
    folderProject: "CCAS_DE_CENON",
    videoSrcName: "CCAS_Cenon.mp4",
    description:
      "Notre équipe a été mandatée par le CCAS de Cenon pour produire une vidéo mettant en lumière le métier d’assistante sociale et éducative à travers le témoignage de Cynthia, l’une de leurs employées. Dans cette vidéo, nous avons interviewé Cynthia pour explorer les divers aspects de son travail, en utilisant de nombreux plans de coupe pour illustrer ses propos. L’objectif était de souligner les avantages et les bénéfices que le CCAS apporte à ses contribuables, tout en encourageant également les candidats potentiels à envisager des opportunités de carrière au sein de cette organisation.",
    secteurActivite: "Développement social",
    entreprise: "CCAS de Cenon",
    miniature: "CCAS Cenon minia.png",
    services:[
      "Interview",
      "Drone",
      "Ecriture de script",
    ]
  },
  {
    id: uuidv4(),
    titleProject: "Künkel immersion",
    photo: false,
    video: true,
    folderProject: "KUNKEL",
    videoSrcName: "KUNKEL FPV.mp4",
    videoRsName: [
      "Reseaux - Atelier palettes sur-mesure.mp4",
      "Reseaux - Atelier palettes.mp4",
      "Reseaux - Atelier scierie.mp4",
      "Reseaux - Ligne de production palettes.mp4",
    ],
    description:
      "Künkel est une entreprise normande basée dans la Manche. Dotée d’exploitation forestière et de sciages, ils se sont développer dans la fabrication de palettes standard et sur-mesures. Fière de leur savoir-faire nous avons été contacté pour réaliser une vidéo ayant pour but de présenter et de faire visiter la chaine de production de manière dynamique. Afin d’alimenter les réseaux sociaux de l’entreprise, nous avons également réalisé des formats verticaux plus adapter au format téléphone.",
    secteurActivite: "Forêt Scierie Palettes Blocks",
    entreprise: "Künkel",
    miniature: "Künkel minia.png",
    services:[
      "Drone",
      "Motion design",
      "Création de contenu",
    ]
  },
  {
    id: uuidv4(),
    titleProject: "Cotral Lab - Shooting marque employeur",
    photo: true,
    video: false,
    folderProject: "COTRAL_LAB",
    miniature: "miniaCotrealLabPhoto.png",
    entreprise: "Cotral Lab",
    description: 'Nous sommes fiers de présenter notre collaboration avec Cotral Lab, une entreprise innovante spécialisée dans la protection auditive. Ce projet passionnant visait à renforcer leur marque employeur en mettant en lumière les divers corps de métiers qui composent leur équipe dynamique et talentueuse.',
    services:[
      "Photographie",
    ],
    secteurActivite:"Equipement auditif"
  },
];

export default dataProjects;
