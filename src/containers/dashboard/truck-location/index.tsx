/* eslint-disable tailwindcss/no-contradicting-classname */
import React from "react";

export const TruckLocation = () => {
  return (
    <div className="h-full flex-1 overflow-hidden rounded border border-sky-100 bg-white bg-[url('/images/truck-location-map-bg.png')] bg-cover bg-center bg-no-repeat">
      <div className="flex-1 bg-gradient-to-b from-white via-white to-white/10">
        <div className="shrink grow basis-0 px-4 pt-4 pb-8 font-Inter text-base font-normal leading-normal text-black">
          Truck Location
        </div>
      </div>
    </div>
  );
};
