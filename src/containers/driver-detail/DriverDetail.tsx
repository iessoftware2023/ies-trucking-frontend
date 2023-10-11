import { observer } from "mobx-react-lite";
import dynamic from "next/dynamic";
import React from "react";

import { MapEmpty, OrderStatus } from "@/components/elements";
import { useStores } from "@/models";
import { phoneFormat } from "@/utils/string";

import { UserItem } from "../booking-list/components/user-item";
import { CompanyInfo, MappingTruck, TodayIncome } from "./components";

const TrackingMap = dynamic(
  () => import("./components").then((m) => m.TrackingMap),
  {
    ssr: false,
  }
);

export const DriverDetailContainer = observer(() => {
  const {
    dashboardStore: {
      driverDetail: { driver, revenueData },
    },
  } = useStores();

  return (
    <div className="flex min-h-[calc(100vh-72px)] flex-row items-start gap-10 bg-white px-6 py-4">
      <div className="flex-[1.7] rounded-2xl bg-[#F3F2F7] py-4 px-3">
        <UserItem
          name={driver.name}
          description={phoneFormat(driver.phoneNumber)}
          isSelect={false}
          id="1"
        />
        <div className="my-3 h-[1px] bg-[#E1E1E2]" />
        <div className="flex flex-col gap-y-4">
          {driver.orders.length ? (
            <div className="inline-flex w-fit flex-col gap-1">
              <span className="font-Inter text-xs font-medium uppercase text-neutral-400">
                Status
              </span>
              <OrderStatus
                orderStatus={driver.orders.at(0)?.status}
                bookingStatus="confirmed"
              />
            </div>
          ) : null}
          <MappingTruck driver={driver} />
        </div>
        <div className="my-3 h-[1px] bg-[#E1E1E2]" />
        <CompanyInfo enterprise={driver.enterprise} />
      </div>
      <div className="sticky top-[88px] flex flex-1 flex-col gap-y-6">
        <TodayIncome
          revenueRatio={revenueData.revenueRatio}
          totalIncomeToday={revenueData.totalIncomeToday}
        />
        <div className="flex h-[500px] overflow-hidden rounded-xl">
          {driver.orders.length ? (
            <TrackingMap driver={driver} />
          ) : (
            <MapEmpty
              title="No driver location"
              description="Currently, driver's location information is not available. Please try again later."
            />
          )}
        </div>
      </div>
    </div>
  );
});
