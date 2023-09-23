import { ArrowRightOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";

interface IProps {
  total: number;
  totalActive: number;
  analytics: {
    title: string;
    color: string;
    status: string;
    count: number;
  }[];
  openModal: () => void;
}

export const ActiveTruckDashboard: React.FC<IProps> = ({
  total,
  totalActive,
  analytics,
  openModal,
}) => {
  return (
    <div className="flex flex-1 flex-col gap-y-8 rounded border border-[#E6EDFF] bg-white px-3 py-4">
      <div className="inline-flex h-[150px] flex-col items-center justify-center gap-1.5 rounded-lg bg-[url('/images/active-truck-bg.png')] bg-cover px-4 py-3 shadow">
        <div className="flex flex-col items-start justify-start self-stretch">
          <div className="font-Inter text-base font-normal leading-normal text-black">
            Active Truck
          </div>
          <div className="font-Inter text-[32px] font-semibold leading-[48px] text-neutral-900">
            {totalActive}/{total}
          </div>
        </div>
      </div>
      <div className="inline-flex items-start justify-start overflow-hidden rounded">
        {analytics
          .filter((analytic) => analytic.status !== "all")
          .map((analytic) => (
            <Tooltip
              key={analytic.status}
              title={`${analytic.title}: ${analytic.count}`}
            >
              <div
                className="h-2 cursor-pointer"
                style={{
                  backgroundColor: analytic.color,
                  width: `${(analytic.count / total) * 100}%`,
                }}
              />
            </Tooltip>
          ))}
      </div>
      <div className="inline-flex flex-col justify-start gap-3">
        {analytics.map((d) => (
          <div
            key={d.status}
            className="inline-flex flex-1 items-center justify-between"
          >
            <div className="flex items-center justify-start gap-1.5">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: d.color }}
              />
              <span className="font-Inter text-sm font-normal leading-tight text-zinc-600">
                {d.title}
              </span>
            </div>
            <div className="text-right font-Inter text-lg font-bold leading-relaxed text-zinc-600">
              {d.count}
            </div>
          </div>
        ))}
      </div>
      <div
        className="inline-flex cursor-pointer items-center justify-start gap-3 text-indigo-600"
        onClick={openModal}
        aria-hidden="true"
      >
        <div className="font-Inter text-xs font-normal leading-tight">
          View detail
        </div>
        <ArrowRightOutlined />
      </div>
    </div>
  );
};
