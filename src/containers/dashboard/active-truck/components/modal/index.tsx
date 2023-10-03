import { Modal } from "antd";
import classNames from "classnames";
import React from "react";

import { ITruck } from "@/models/dashboard-store";

import { IPagination } from "../../types";
import { TableActiveTrucks } from "../table";

interface IProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  data: ITruck[];
  statuses: { status: string; title: string; count: number }[];
  statusKey: string;
  onChangeTabKey: (statusKey: string) => void;
  isLoading: boolean;
  loadData: (page: number, limit: number) => void;
  pagination: IPagination;
}

export const ListActiveTruckModal: React.FC<IProps> = ({
  isModalOpen,
  handleCancel,
  handleOk,
  statuses,
  statusKey,
  onChangeTabKey,
  data,
  isLoading,
  loadData,
  pagination,
}) => {
  const handleOnChangeStatusKey = (statusKey: string) => () => {
    onChangeTabKey(statusKey);
  };
  return (
    <Modal
      title="Active Trucks"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width="90%"
      style={{ top: 32, bottom: 32 }}
    >
      <div className="relative grid grid-cols-[250px_1fr]">
        <div className="sticky inset-y-0 left-0 h-full">
          <div className="flex flex-col gap-2 p-6">
            {statuses.map((d) => (
              <div
                key={d.status}
                aria-hidden="true"
                onClick={handleOnChangeStatusKey(d.status)}
                className={classNames(
                  "inline-flex w-fit cursor-pointer flex-col justify-center border-b-2 py-2 hover:border-b-yellow-500 border-b-transparent",
                  { "border-b-yellow-500": statusKey === d.status }
                )}
              >
                <div className="font-Inter text-base font-medium leading-snug text-neutral-400">
                  {d.title} ({d.count})
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="min-h-[500px] overflow-hidden">
          <TableActiveTrucks
            data={data}
            status={statusKey}
            isLoading={isLoading}
            loadData={loadData}
            pagination={pagination}
          />
        </div>
      </div>
    </Modal>
  );
};
