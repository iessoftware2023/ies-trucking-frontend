import { Tag } from "antd";
import classNames from "classnames";
import React, { useMemo } from "react";

import { ITruckDetail } from "@/models/dashboard-store";

interface IProps {
  truck: ITruckDetail;
}

export const TruckInfos: React.FC<IProps> = ({ truck }) => {
  const companyInfos = useMemo(() => {
    return [
      {
        label: "PARKING LOT",
        value: truck.parking.name,
        isFull: false,
      },
      {
        label: "MAXIMUM ALLOWABLE WEIGHT",
        value: truck.truckType.weightLimit + " Tons",
        isFull: false,
      },
      {
        label: "DESCRIPTIONS",
        value: truck.truckType.description,
        isFull: true,
      },
      {
        label: "TOTAL SIZE (Length x Width x Height)",
        value: `${truck.truckType.length}m x ${truck.truckType.width}m x ${truck.truckType.height}m`,
        isFull: false,
      },
      {
        label: "TYPE OF DELIVERY ITEM",
        value: truck.truckType.cargoTypes.map((item) => item.name),
        isFull: false,
      },
    ];
  }, [
    truck.parking.name,
    truck.truckType.cargoTypes,
    truck.truckType.description,
    truck.truckType.height,
    truck.truckType.length,
    truck.truckType.weightLimit,
    truck.truckType.width,
  ]);

  return (
    <div className="flex flex-row flex-wrap gap-4">
      {companyInfos.map(({ label, value, isFull }) => (
        <div
          key={label}
          className={classNames(
            isFull ? "basis-full" : "basis-[calc(50%-8px)]"
          )}
        >
          <div className="flex flex-col gap-y-1">
            <span className="font-Inter text-xs font-medium text-neutral-400">
              {label}
            </span>
            {Array.isArray(value) ? (
              <div className="flex flex-wrap gap-2">
                {value.map((item) => (
                  <Tag
                    key={item}
                    bordered={false}
                    className="bg-[#EFF0F4] font-Inter text-sm font-medium text-[#5F6C91]"
                  >
                    {item}
                  </Tag>
                ))}
              </div>
            ) : (
              <span className="font-Inter text-sm font-medium text-neutral-black">
                {value ?? "Empty"}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
