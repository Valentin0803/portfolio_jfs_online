"use client";
import { ServiceType } from "@/public/data/dataServices";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

const Service = ({ service }: { service: ServiceType }) => {
  const textRef = useRef(null);

  useGSAP(() => {
    const textElements = textRef.current;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textElements,
        start: "center 100%",
        end: "center 50%",
        scrub: 1,
      },
    });
    tl.to(textElements, {
      backgroundSize: "100%",
      ease: "none",
    });
  });

  return (
    <div className="service">
      <div className="heading-mask">
        <div className="heading-mask-top flex items-start justify-center h-[30vh] lg:h-[12vh]">
          <h2
            ref={textRef}
            className="titreService flex items-center relative h-full w-full font-akira text-xl"
          >
            <span className="pl-10 lg:pl-36 lg:text-5xl">
              {service.titleTop}
            </span>
            <span className="spanMask lg:pl-32">
              <p className="flex bg-jaune font-leagueSpartan text-black text-base px-5 lg:px-10">
                {service.descriptionService}
              </p>
            </span>
          </h2>
        </div>
      </div>
      <div className="line min-h-[1px] bg-white opacity-40"></div>
    </div>
  );
};

export default Service;
