import React from "react";

interface IProps {
  name: string;
  licensePlate: string;
}

export const TruckInfo: React.FC<IProps> = ({ name, licensePlate }) => {
  return (
    <div className="inline-flex w-fit flex-col gap-y-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={encodeURI(`/icons/truck-types/png/${name}.png`)}
        alt={name}
        className="h-6 w-fit"
      />
      <div className="flex flex-col gap-y-1">
        <span className="block text-sm font-medium text-[#19191A]">{name}</span>
        <span className="block text-xs font-normal text-neutral-700">
          {licensePlate}
        </span>
      </div>
    </div>
  );
};
