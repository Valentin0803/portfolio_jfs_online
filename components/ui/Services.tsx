import { ServiceType } from "@/public/data/dataServices";

const Service = ({
  service,
  index,
}: {
  service: ServiceType;
  index: number;
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[100px_1fr_320px] gap-4 lg:gap-10 items-start py-9 lg:py-11 border-t border-white/10 last:border-b px-6 lg:px-0">
      <div className="font-unbounded font-bold text-sm text-or pt-1">
        {String(index + 1).padStart(2, "0")}
      </div>
      <h3 className="font-unbounded font-bold text-2xl lg:text-3xl text-creme leading-tight">
        {service.titleTop}
      </h3>
      <p className="font-dmSans text-sm text-creme/60 leading-relaxed">
        {service.descriptionService}
      </p>
    </div>
  );
};

export default Service;
