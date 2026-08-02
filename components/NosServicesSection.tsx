"use client";
import { useState } from "react";
import dataServices, { ServiceType } from "../public/data/dataServices";
import Service from "./ui/Services";

const NosServicesSection = () => {
  const [services] = useState(dataServices());
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
      <div className="max-w-3xl mx-auto">
        {services.map((service: ServiceType, index: number) => (
          <Service service={service} index={index} key={index} />
        ))}
      </div>
    </section>
  );
};

export default NosServicesSection;
