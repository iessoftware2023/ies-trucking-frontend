import { ArrowRightOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";

interface IProps {
  analytics: {
    title: string;
    color: string;
    status: string;
    count: number;
  }[];
  openModal: () => void;
  total: number;
}

export const TotalBookingDashboard: React.FC<IProps> = ({
  total,
  analytics,
  openModal,
}) => {
  return (
    <div className="flex flex-1 flex-col gap-y-8 rounded border border-[#E6EDFF] bg-white px-3 py-4">
      <div className="flex flex-col gap-y-4">
        <div className="inline-flex items-start justify-start gap-2.5">
          <div className="flex items-center justify-start gap-4 self-stretch">
            <div className="inline-flex flex-col items-start justify-start">
              <h2 className="font-Inter text-4xl font-semibold leading-[42px] text-black">
                {total}
              </h2>
              <div className="font-Inter text-base font-normal leading-normal text-black">
                Total Booking
              </div>
            </div>
          </div>
        </div>
        <div className="inline-flex items-start justify-start self-stretch overflow-hidden rounded">
          {analytics.map((analytic) => (
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
      </div>
      <div className="flex flex-1 flex-wrap">
        <div className="flex flex-1 flex-row flex-wrap gap-y-2 gap-x-3">
          {analytics.map((analytic) => (
            <div
              key={analytic.status}
              className="flex flex-1 basis-[calc(50%-6px)] flex-col gap-y-1"
            >
              <div className="inline-flex items-center justify-start gap-1.5">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: analytic.color }}
                />
                <span className="font-Inter text-sm font-normal leading-tight text-zinc-600">
                  {analytic.title}
                </span>
              </div>
              <div className="flex flex-col gap-2.5 pl-1.5">
                <div className="font-Inter text-lg font-semibold leading-relaxed text-zinc-800">
                  {analytic.count}
                </div>
              </div>
            </div>
          ))}
        </div>
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
