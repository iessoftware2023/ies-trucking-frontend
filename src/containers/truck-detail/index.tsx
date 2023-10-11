import { observer } from "mobx-react-lite";
import dynamic from "next/dynamic";
import React from "react";

import { TruckInfo } from "@/components/elements";
import { useStores } from "@/models";

import { TodayIncome, TruckInfos } from "./components";

const TrackingMap = dynamic(
  () => import("./components").then((m) => m.TrackingMap),
  {
    ssr: false,
  }
);

const ParkingMap = dynamic(
  () => import("./components").then((m) => m.ParkingMaps),
  {
    ssr: false,
  }
);

export const TruckDetailContainer = observer(() => {
  const {
    dashboardStore: {
      truckDetail: { truck, revenueData },
    },
  } = useStores();

  return (
    <div className="flex min-h-[calc(100vh-72px)] flex-row items-start gap-10 bg-white px-6 py-4">
      <div className="flex-[1.7] rounded-2xl py-4 px-3">
        <h3 className="font-Inter text-2xl font-semibold text-neutral-black">
          {truck.licensePlate}
        </h3>
        <div className="my-3 h-[1px] bg-[#E1E1E2]" />
        <div className="flex flex-col gap-y-4">
          <TruckInfo name={truck.truckType.name} label="Type of Truck" />
          <TruckInfos truck={truck} />
        </div>
      </div>
      <div className="sticky top-[88px] flex flex-1 flex-col gap-y-6">
        <TodayIncome
          revenueRatio={revenueData.revenueRatio}
          totalIncomeToday={revenueData.totalIncomeToday}
        />
        <div className="flex h-[500px] overflow-hidden rounded-xl">
          {truck.orders.length ? (
            <TrackingMap orders={truck.orders} />
          ) : (
            <ParkingMap
              parkingLocation={{
                lat: truck.parking.location.coordinates[1],
                lng: truck.parking.location.coordinates[0],
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
});
