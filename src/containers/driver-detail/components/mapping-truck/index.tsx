import React from "react";

import { TruckInfo } from "@/components/elements";
import { IDriverDetail } from "@/models/dashboard-store";

interface MappingTruckProps {
  driver: IDriverDetail;
}

export const MappingTruck: React.FC<MappingTruckProps> = ({ driver }) => {
  return (
    <div className="inline-flex flex-col gap-y-2">
      <span className="font-Inter text-xs font-medium uppercase text-neutral-400">
        Mapping trucks
      </span>
      <div className="flex flex-row flex-wrap gap-4">
        {driver.trucks.map(({ truckType, licensePlate }, idx) => (
          <div key={idx} className="basis-[calc(50%-8px)]">
            <TruckInfo licensePlate={licensePlate} name={truckType.name} />
          </div>
        ))}
      </div>
    </div>
  );
};
