/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ArrowRightOutlined } from "@ant-design/icons";
import React, { useState } from "react";

import { IDriverStatus, ListTruckModal } from "./components";

const statuses: {
  status: IDriverStatus;
  title: string;
  value: number;
  color: string;
}[] = [
  {
    status: "all" as const,
    title: "All",
    value: 43,
    color: "#00DAE8",
  },
  {
    status: "on_the_way_to_pickup",
    title: "On the way to pick-up",
    value: 43,
    color: "#00DAE8",
  },
  {
    status: "order_pickup",
    title: "Pick-up order",
    value: 1,
    color: "#00F5BA",
  },
  {
    status: "on_the_way_to_dropoff",
    title: "On the way to delivery",
    value: 20,
    color: "#009DF5",
  },
  {
    status: "inactive",
    title: "Inactive",
    value: 43,
    color: "#E1E1E2",
  },
];

export const ActiveTruck = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusKey, setStatusKey] = useState<IDriverStatus>("all");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOnChangeStatusKey = (statusKey: IDriverStatus) => {
    console.log(statusKey);
    setStatusKey(statusKey);
  };

  return (
    <>
      <div className="flex flex-1 flex-col gap-y-8 rounded border border-[#E6EDFF] bg-white px-3 py-4">
        <div className="inline-flex h-[150px] flex-col items-center justify-center gap-1.5 rounded-lg bg-[url('/images/active-truck-bg.png')] bg-cover px-4 py-3 shadow">
          <div className="flex flex-col items-start justify-start self-stretch">
            <div className="font-Inter text-base font-normal leading-normal text-black">
              Active Truck
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
        <div
          className="inline-flex cursor-pointer items-center justify-start gap-3 text-indigo-600"
          onClick={showModal}
        >
          <div className="font-Inter text-xs font-normal leading-tight">
            View detail
          </div>
          <ArrowRightOutlined />
        </div>
      </div>
      <ListTruckModal
        data={[]}
        statuses={statuses}
        statusKey={statusKey}
        onChangeStatusKey={handleOnChangeStatusKey}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  );
};
