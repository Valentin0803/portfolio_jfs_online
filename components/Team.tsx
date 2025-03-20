import Lucas from "@/public/team/Lucas.jpg";
import Martin from "@/public/team/Martin.jpg";
import Valentin from "@/public/team/Valentin.jpg";
import { DirectionAwareHover } from "./ui/direction-aware-hover";

export const Team = () => {
  return (
    <div className="mt-10 lg:my-20">
      <h2 className="font-leagueSpartan text-jaune text-3xl ml-10 pb-10 lg:mx-32 lg:my-24 ">
        Notre équipe
      </h2>
      <div className="flex justify-center space-x-3">
        <DirectionAwareHover
          imageUrl={Valentin}
          className="w-auto h-96 lg:h-[900px]"
        >
          <p className="font-bold text-4xl">CHARLOT Valentin</p>
          <p className="font-body text-jaune text-xl tracking-[.25em]">
            Vidéaste & pilote de drone
          </p>
        </DirectionAwareHover>
        <DirectionAwareHover
          imageUrl={Martin}
          className="w-auto h-96 lg:h-[900px]"
        >
          <p className="font-bold text-4xl">RIBOT Martin</p>
          <p className="font-body text-jaune text-xl tracking-[.25em]">
            Chargé de production
          </p>

          <p className="font-body text-white text-l tracking-[.25em]">
            tel : 07.81.10.37.21
          </p>
        </DirectionAwareHover>
        <DirectionAwareHover
          imageUrl={Lucas}
          className="w-auto h-96 lg:h-[900px] max-h-[1000px]"
        >
          <p className="font-bold text-4xl">MOREL Lucas</p>
          <p className="font-body text-jaune text-xl tracking-[.25em]">
            Vidéaste & pilote de drone
          </p>
        </DirectionAwareHover>
      </div>
    </div>
  );
};
