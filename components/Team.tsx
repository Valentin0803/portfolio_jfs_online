import Image from "next/image";
import Lucas from "@/public/team/Lucas.jpg";
import Martin from "@/public/team/Martin.jpg";
import Valentin from "@/public/team/Valentin.jpg";
import { WHATSAPP_LABEL, WHATSAPP_URL } from "@/lib/site";

const team = [
  {
    image: Valentin,
    name: "Valentin Charlot",
    role: "Vidéaste, photographe et pilote de drones",
    lieu: "Caen",
    mission: "Cadre, pilote les drones et monte vos films.",
    contact: false,
  },
  {
    image: Martin,
    name: "Martin Ribot",
    role: "Chargé de production",
    lieu: "Caen",
    mission: "Votre interlocuteur, du premier message à la livraison.",
    contact: true,
  },
  {
    image: Lucas,
    name: "Lucas Morel",
    role: "Vidéaste, photographe et pilote de drones",
    lieu: "Aix-les-Bains",
    mission: "Filme, photographie et pilote les drones en Savoie.",
    contact: false,
  },
];

const WhatsAppIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 32 32" className="h-4 w-4 fill-current">
    <path d="M16.004 3C8.833 3 3 8.83 3 16a12.9 12.9 0 0 0 1.93 6.8L3 29l6.39-1.87A13 13 0 1 0 16.004 3Zm0 23.6a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.79 1.11 1.14-3.7-.25-.4A10.6 10.6 0 1 1 16.004 26.6Zm5.83-7.95c-.32-.16-1.89-.93-2.18-1.04-.29-.1-.5-.16-.72.16-.21.32-.82 1.04-1.01 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.15 3.09 1.31 3.3c.16.21 2.26 3.45 5.47 4.84.76.33 1.36.53 1.82.68.77.24 1.46.21 2.01.13.61-.09 1.89-.77 2.16-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z" />
  </svg>
);

export const Team = () => {
  return (
    <section id="APropos" className="py-24 lg:py-40 bg-[#100D08]">
      <div className="max-w-2xl mx-auto mb-16 lg:mb-20 text-center px-6">
        <div className="font-dmSans text-xs tracking-[0.25em] uppercase text-or mb-5">
          L&apos;équipe
        </div>
        <h2 className="font-unbounded font-bold text-3xl lg:text-5xl text-creme leading-tight">
          Une équipe complète, de l&apos;idée à la publication
        </h2>
        <p className="font-dmSans text-creme/70 mt-6 text-base">
          Deux bases, Normandie et Savoie, une seule équipe.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 max-w-6xl mx-auto px-1">
        {team.map((member) => (
          <div
            key={member.name}
            className="group relative h-[420px] lg:h-[520px] overflow-hidden"
          >
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1152px) 33vw, 384px"
              className="object-cover object-top grayscale-[40%] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/20 to-transparent" />

            {member.contact && (
              <span className="absolute left-7 top-7 rounded-full bg-or px-3 py-1 font-dmSans text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal">
                Votre contact
              </span>
            )}

            <div className="absolute left-7 right-7 bottom-7">
              <p className="font-dmSans text-xs tracking-[0.2em] uppercase text-creme/50 mb-2">
                {member.lieu}
              </p>
              <p className="font-unbounded font-bold text-creme text-xl">
                {member.name}
              </p>
              <p className="font-dmSans text-xs tracking-[0.1em] uppercase text-or mt-1.5">
                {member.role}
              </p>
              <p className="font-dmSans text-sm text-creme/75 mt-3 leading-snug">
                {member.mission}
              </p>
              {member.contact && (
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={WHATSAPP_LABEL}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-creme/20 px-4 py-2 font-dmSans text-xs text-creme transition-colors duration-300 hover:border-[#25D366] hover:text-[#25D366]"
                >
                  <WhatsAppIcon />
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
