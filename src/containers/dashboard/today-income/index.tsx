import { RiseOutlined } from "@ant-design/icons";
import React from "react";

export const TodayIncome = () => {
  return (
    <div className="flex flex-1 items-center justify-between rounded border border-sky-100 bg-white px-4 py-3">
      <div className="shrink grow basis-0 font-Inter text-base font-normal leading-normal text-black">
        Today&apos;s Income
      </div>
      <div className="flex shrink grow basis-0 items-center justify-start gap-4">
        <div className="flex shrink grow basis-0 items-center justify-end gap-2">
          <div className="text-right font-Inter text-sm font-normal leading-[31px] text-neutral-400">
            AUD
          </div>
          <div className="text-neutral-950 text-right font-Inter text-[22px] font-semibold leading-7">
            73,276
          </div>
        </div>
        <div className="flex items-center justify-center gap-1 rounded bg-emerald-50 px-1 py-0.5">
          <RiseOutlined className="text-xs text-teal-500" />
          <div className="font-Inter text-xs font-normal leading-none text-teal-500">
            11.2%
          </div>
        </div>
      </div>
    </div>
  );
};
