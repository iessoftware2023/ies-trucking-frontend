import Lottie from "lottie-react";
import React from "react";

import streetViewMapLoader from "./street-view-map-loader.json";

export const MapsWaitingAssign = () => {
  return (
    <div className="flex h-content flex-1 items-center justify-center bg-gray-50 bg-[url('/images/maps/street-view-map-loader.png')] bg-cover">
      <Lottie animationData={streetViewMapLoader} style={{ width: 256 }} />
    </div>
  );
};
