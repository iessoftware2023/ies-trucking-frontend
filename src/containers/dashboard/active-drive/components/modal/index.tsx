import { Modal } from "antd";
import classNames from "classnames";
import React from "react";

import { TableActiveDrivers } from "../table";

interface IProps {
  statusKey: string;
  isModalOpen: boolean;
  onChangeTabKey: (statusKey: string) => void;
  data: { status: string; title: string; value: number }[];
  statuses: { status: string; title: string; count: number }[];
  handleOk: () => void;
  handleCancel: () => void;
}

export const ListActiveDriverModal: React.FC<IProps> = ({
  isModalOpen,
  handleCancel,
  handleOk,
  statuses,
  statusKey,
  onChangeTabKey,
}) => {
  const handleOnChangeStatusKey = (statusKey: string) => () => {
    onChangeTabKey(statusKey);
  };
  return (
    <Modal
      title="Active Drivers"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width="90%"
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
          <TableActiveDrivers data={[]} isLoading={false} status={statusKey} />
        </div>
      </div>
    </Modal>
  );
};
