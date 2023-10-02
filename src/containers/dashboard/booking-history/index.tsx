import { Spin } from "antd";
import classNames from "classnames";
import dayjs from "dayjs";
import Image from "next/image";
import bookingHistoryChart from "public/images/booking-history-chart.png";
import React, { useCallback, useState } from "react";

import { REFRESH_DATA_INTERVAL } from "@/containers/booking-list/constants";
import { useInterval } from "@/hooks";
import { useStores } from "@/models";

const rangeDates: {
  key: number;
  title: string;
  value: number;
}[] = [
  {
    key: 7,
    title: "7 days",
    value: 7,
  },
  {
    key: 15,
    title: "15 days",
    value: 15,
  },
  {
    key: 30,
    title: "30 days",
    value: 30,
  },
];

export const BookingHistory = () => {
  const [day, setDay] = useState(rangeDates[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState({
    startDate: dayjs()
      .subtract(rangeDates[0].value, "day")
      .startOf("day")
      .toISOString(),
    endDate: dayjs().endOf("day").toISOString(),
  });

  const { dashboardStore } = useStores();

  const changeRangeDate = useCallback(
    (day) => {
      if (isLoading) return;
      setDay(day);
      setDate({
        startDate: dayjs()
          .subtract(day.value, "day")
          .startOf("day")
          .toISOString(),
        endDate: dayjs().endOf("day").toISOString(),
      });
    },
    [isLoading]
  );

  useInterval(
    async () => {
      setIsLoading(true);
      await dashboardStore.getBookingHistory({
        startDate: date.startDate,
        endDate: date.endDate,
      });
      setIsLoading(false);
    },
    REFRESH_DATA_INTERVAL,
    [dashboardStore, date.endDate, date.startDate]
  );

  return (
    <div className="flex flex-1 flex-col gap-2.5 rounded border border-sky-100 bg-white p-4">
      <div className="inline-flex items-center justify-between self-stretch">
        <div className="inline-flex flex-col items-start justify-start">
          <div className="font-Inter text-base font-normal leading-normal text-black">
            Booking History
          </div>
        </div>
        <div className="flex items-start justify-start gap-6 self-stretch">
          <div className="flex items-end justify-center gap-3">
            {rangeDates.map((d) => (
              <div
                aria-hidden="true"
                onClick={() => changeRangeDate(d)}
                key={d.key}
                className={classNames(
                  "flex cursor-pointer items-center justify-center gap-2.5 rounded bg-indigo-600/10 px-2 py-0.5 hover:bg-indigo-600/50",
                  {
                    "bg-indigo-600/50": d.title === day?.title,
                  }
                )}
              >
                <div className="text-center font-Inter text-xs font-normal leading-[18px] text-indigo-600">
                  {d.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-0 self-stretch border border-stone-300" />
      <Spin spinning={isLoading}>
        <Image src={bookingHistoryChart} alt="booking history chart" />
      </Spin>
    </div>
  );
};
