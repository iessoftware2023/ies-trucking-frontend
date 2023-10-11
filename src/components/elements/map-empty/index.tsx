import Lottie from "lottie-react";
import React from "react";

import streetViewMapLoader from "./street-view-map-loader.json";

interface IProps {
  title: string;
  description: string;
}

export const MapEmpty: React.FC<IProps> = ({ title, description }) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-gray-50 bg-[url('/images/maps/street-view-map-loader.png')] bg-cover">
      <Lottie animationData={streetViewMapLoader} style={{ width: 256 }} />

      <div className="mb-1 text-2xl font-semibold">{title}</div>

      <div className="mb-8 w-1/2 text-center text-base text-gray-400">
        {description}
      </div>
    </div>
  );
};
