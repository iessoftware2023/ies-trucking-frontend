/* eslint-disable tailwindcss/no-contradicting-classname */
import { Spin } from "antd";
import { observer } from "mobx-react-lite";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import _JSXStyle from "styled-jsx/style";

import { useInterval } from "@/hooks";
import { useStores } from "@/models";

import { REFRESH_DATA_INTERVAL } from "../total-booking/constants";

const TrackingMaps = dynamic(
  () => import("./components").then((m) => m.TrackingMaps),
  {
    ssr: false,
  }
);

export const TruckLocation = observer(() => {
  const { dashboardStore } = useStores();

  const { parkingLocationView, truckLocationView } = dashboardStore.geoLocation;

  const [isLoading, setIsLoading] = useState(false);

  useInterval(async () => {
    setIsLoading(true);
    await dashboardStore.getGeoLocation();
    setIsLoading(false);
  }, REFRESH_DATA_INTERVAL);
  return (
    <>
      <_JSXStyle jsx>{`
        .ant-spin-wrapper {
          display: flex;
          flex: 1;
        }
        .ant-spin-wrapper .ant-spin-container {
          display: flex;
          flex: 1;
        }
      `}</_JSXStyle>
      <Spin
        wrapperClassName="ant-spin-wrapper"
        style={{ display: "flex" }}
        spinning={isLoading}
      >
        <div className="h-[350px] flex-1 rounded border border-sky-100 bg-white">
          <div className="relative z-1 bg-gradient-to-b from-white to-white/30">
            <div className="shrink grow basis-0 p-4 pb-8 font-Inter text-base font-normal leading-normal text-black">
              Truck Location
            </div>
          </div>
          <div className="mt-[-16px] h-full w-full overflow-hidden rounded-b">
            <TrackingMaps
              packings={parkingLocationView.map((packing) => packing.location)}
              trucks={truckLocationView.map((truck) => truck.location)}
            />
          </div>
        </div>
      </Spin>
    </>
  );
});
