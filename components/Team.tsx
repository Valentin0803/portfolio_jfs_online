import Image from "next/image";
import Lucas from "@/public/team/Lucas.jpg";
import Martin from "@/public/team/Martin.jpg";
import Valentin from "@/public/team/Valentin.jpg";

const team = [
  {
    image: Valentin,
    name: "Valentin Charlot",
    role: "Vidéaste & pilote de drone",
    phone: null as string | null,
  },
  {
    image: Martin,
    name: "Martin Ribot",
    role: "Chargé de production",
    phone: "07.81.10.37.21",
  },
  {
    image: Lucas,
    name: "Lucas Morel",
    role: "Vidéaste & pilote de drone",
    phone: null as string | null,
  },
];

export const Team = () => {
  return (
    <div className="py-24 lg:py-40 bg-[#100D08]">
      <div className="max-w-xl mx-auto mb-16 lg:mb-20 text-center px-6">
        <div className="font-dmSans text-xs tracking-[0.25em] uppercase text-or mb-5">
          L&apos;équipe
        </div>
        <h2 className="font-unbounded font-bold text-3xl lg:text-5xl text-creme leading-tight">
          Trois passionnés, une équipe
        </h2>
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
              className="object-cover object-top grayscale-[40%] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/10 to-transparent" />
            <div className="absolute left-7 right-7 bottom-7">
              <p className="font-unbounded font-bold text-creme text-xl">
                {member.name}
              </p>
              <p className="font-dmSans text-xs tracking-[0.1em] uppercase text-or mt-1.5">
                {member.role}
              </p>
              {member.phone && (
                <p className="font-dmSans text-xs text-creme/60 mt-2">
                  {member.phone}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
