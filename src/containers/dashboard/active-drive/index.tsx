import { ArrowRightOutlined } from "@ant-design/icons";
import React from "react";

const data = [
  {
    status: "On the way to pick-up",
    title: "On the way to pick-up",
    value: 43,
    color: "#00DAE8",
  },
  {
    status: "Pick-up order",
    title: "Pick-up order",
    value: 1,
    color: "#00F5BA",
  },
  {
    status: "On the way to delivery",
    title: "On the way to delivery",
    value: 20,
    color: "#009DF5",
  },
  {
    status: "Inactive",
    title: "Inactive",
    value: 43,
    color: "#E1E1E2",
  },
];

export const ActiveDrive = () => {
  return (
    <div className="flex flex-1 flex-col gap-y-8 rounded border border-[#E6EDFF] bg-white px-3 py-4">
      <div className="inline-flex h-[150px] flex-col items-center justify-center gap-1.5 rounded-lg bg-[url('/images/active-drive-bg.png')] bg-cover px-4 py-3 shadow">
        <div className="flex flex-col items-start justify-start self-stretch">
          <div className="font-Inter text-base font-normal leading-normal text-black">
            Active Drive
          </div>
          <div className="font-Inter text-[32px] font-semibold leading-[48px] text-neutral-900">
            136/256
          </div>
        </div>
      </div>
      <div className="inline-flex items-start justify-start overflow-hidden rounded">
        <div className="h-2 w-14 bg-cyan-400" />
        <div className="h-2 w-[49px] bg-teal-400" />
        <div className="h-2 w-[82px] bg-sky-500" />
        <div className="h-2 shrink grow basis-0 bg-neutral-200" />
      </div>
      <div className="inline-flex flex-col justify-start gap-3">
        {data.map((d) => (
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
              {d.value}
            </div>
          </div>
        ))}
      </div>
      <div className="inline-flex cursor-pointer items-center justify-start gap-3 text-indigo-600">
        <div className="font-Inter text-xs font-normal leading-tight">
          View detail
        </div>
        <ArrowRightOutlined />
      </div>
    </div>
  );
};
