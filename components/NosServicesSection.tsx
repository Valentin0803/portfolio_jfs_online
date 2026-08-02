"use client";
import { useMemo } from "react";
import dataServices from "../public/data/dataServices";
import { RulerCarousel, type CarouselItem } from "./ui/ruler-carousel";

const NosServicesSection = () => {
  const items = useMemo<CarouselItem[]>(
    () =>
      dataServices().map((service, index) => ({
        id: index,
        title: service.titleTop,
        description: service.descriptionService,
      })),
    []
  );

  return (
    <section id="NosServices" className="py-24 lg:py-40 bg-[#100D08]">
      <div className="max-w-xl mx-auto mb-16 lg:mb-20 text-center px-6">
        <div className="font-dmSans text-xs tracking-[0.25em] uppercase text-or mb-5">
          Ce qu&apos;on fait
        </div>
        <h2 className="font-unbounded font-bold text-3xl lg:text-5xl text-creme leading-tight">
          Nos services
        </h2>
      </div>
      <RulerCarousel originalItems={items} />
    </section>
  );
};

export default NosServicesSection;
