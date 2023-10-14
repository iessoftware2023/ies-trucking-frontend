import { FallOutlined, RiseOutlined } from "@ant-design/icons";
import classNames from "classnames";
import React from "react";

interface IProps {
  revenueRatio: number;
  totalIncomeToday: {
    total: number;
    currency: string;
  };
}

export const TodayIncome: React.FC<IProps> = ({
  revenueRatio,
  totalIncomeToday,
}) => {
  return (
    <div className="flex flex-1 items-center justify-between rounded-xl border border-[#E6E6E6] bg-white px-4 py-3">
      <div className="shrink grow basis-0 font-Inter text-base font-normal uppercase leading-normal text-neutral-400">
        Today&apos;s Income
      </div>
      <div className="flex shrink grow basis-0 items-center justify-start gap-4">
        <div className="flex shrink grow basis-0 items-center justify-end gap-2">
          <div className="text-right font-Inter text-sm font-normal leading-[31px] text-neutral-400">
            {totalIncomeToday.currency}
          </div>
          <div className="text-neutral-950 text-right font-Inter text-[22px] font-semibold leading-7">
            {totalIncomeToday.total ?? 0}
          </div>
        </div>
        <div
          className={classNames(
            "flex items-center justify-center gap-1 rounded px-1 py-0.5",
            {
              "bg-[#ECFDF5]": revenueRatio >= 0,
              "bg-re-50": revenueRatio < 0,
            }
          )}
        >
          {revenueRatio >= 0 ? (
            <RiseOutlined className="text-xs text-teal-500" />
          ) : (
            <FallOutlined className="text-xs text-red-500" />
          )}

          <div
            className={classNames(
              "font-Inter text-xs font-normal leading-none",
              {
                "text-teal-500": revenueRatio >= 0,
                "text-red-500": revenueRatio < 0,
              }
            )}
          >
            {Math.abs(revenueRatio)}%
          </div>
        </div>
      </div>
    </div>
  );
};
