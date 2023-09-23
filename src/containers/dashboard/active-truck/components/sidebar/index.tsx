import React from "react";

export const ActiveTruckSidebar = ({ statuses }) => {
  return (
    <div className="inline-flex flex-col justify-start gap-3">
      {statuses.map((d) => (
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
  );
};
