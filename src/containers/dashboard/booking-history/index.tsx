import { Spin } from "antd";
import classNames from "classnames";
import dayjs from "dayjs";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useCallback, useMemo, useRef, useState } from "react";

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
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

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
          .subtract(day.value, "days")
          .startOf("days")
          .toISOString(),
        endDate: dayjs().endOf("days").toISOString(),
      });
    },
    [isLoading]
  );

  const bookingHistoryView = dashboardStore.bookingHistoryView(
    date.startDate,
    date.endDate
  );

  const options: Highcharts.Options = useMemo(() => {
    return {
      chart: {
        borderWidth: 0,
        borderRadius: 100,
        zooming: {
          type: "x",
        },
      },
      title: {
        text: "",
      },
      time: {
        useUTC: false,
      },
      xAxis: {
        showEmpty: false,
        type: "datetime",
        // categories: bookingHistoryView.map((item) => item[0].toString()),
        // labels: {
        //   formatter: function () {
        //     return dayjs(this.value).format("D/M/YYYY");
        //   },
        // },
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        xDateFormat: "%d/%m/%Y %H:%M",
        headerFormat: '<span style="font-size:12px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="">{series.name}: </td>' +
          `<td style="padding:0"><b>{point.y} </b></td></tr>`,
        footerFormat: "</table>",
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        series: {
          pointStart: dayjs(date.startDate).valueOf(),
          marker: {
            enabled: false,
          },
        },
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1,
            },
            stops: [
              [0, "#a9ccfc"],
              [1, "#f1f5fb"],
            ],
          },
          marker: {
            enabled: false,
            radius: 2,
            symbol: "circle",
            states: {
              hover: {
                enabled: true,
              },
            },
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1,
            },
          },
          threshold: null,
        },
      },
      series: [
        {
          type: "areaspline",
          name: "Total Booking",
          data: bookingHistoryView,
        },
      ],
    };
  }, [bookingHistoryView, date.startDate]);

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
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          ref={chartComponentRef}
        />
      </Spin>
    </div>
  );
};
