"use client";
import { useState } from "react";
//import data
import dataServices from "../public/data/dataServices";
import Service from "./ui/Services";
//import Componenents

const NosServicesSection = () => {
  const [services] = useState(dataServices());
  return (
    <section id="NosServices" className="mb-10 lg:h-[85vh]">
      <h2 className="font-body top-0 text-jaune text-3xl ml-10 mb-5 lg:mb-20 lg:ml-36 ">
        Nos Services
      </h2>
      <div className="flex flex-col justify-center lg:my-auto">
        <div className="line min-h-[1px] bg-white opacity-40"></div>
        {services.map((service) => (
          <Service service={service} key={service.id} />
        ))}
      </div>
    </section>
  );
};

export default NosServicesSection;
