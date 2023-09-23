import { observer } from "mobx-react-lite";
import React from "react";

import { ActiveDrive } from "./active-drive";
import { ActiveTruck } from "./active-truck";
import { BookingHistory } from "./booking-history";
import { TodayIncome } from "./today-income";
import { TotalBooking } from "./total-booking";
import { TruckLocation } from "./truck-location";

export const DashboardContainer = observer(() => {
  return (
    <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[min-content_min-content_minmax(0,_1fr)]">
      <div className="col-[1/2] flex">
        <TotalBooking />
      </div>
      <div className="col-[1/2] flex md:col-[2/3]">
        <ActiveTruck />
      </div>
      <div className="col-[1/2] flex lg:col-[3/4]">
        <ActiveDrive />
      </div>

      <div className="flex md:col-[1/3] lg:col-[1/3] lg:row-[2/4]">
        <BookingHistory />
      </div>
      <div className="flex md:col-[2/3] md:row-[2/3] lg:col-[3/4] lg:row-[2/3]">
        <TodayIncome />
      </div>
      <div className="flex lg:col-[3/4] lg:row-[3/4]">
        <TruckLocation />
      </div>
    </div>
  );
});
