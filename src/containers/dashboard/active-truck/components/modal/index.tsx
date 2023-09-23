/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Modal } from "antd";
import React from "react";

import { IDriverStatus, TableTrucks } from "../table";

interface IProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  data: { status: string; title: string; value: number }[];
  statuses: { status: IDriverStatus; title: string; value: number }[];
  statusKey: IDriverStatus;
  onChangeStatusKey: (statusKey: IDriverStatus) => void;
}

export const ListTruckModal: React.FC<IProps> = ({
  isModalOpen,
  handleCancel,
  handleOk,
  statuses,
  statusKey,
  onChangeStatusKey,
}) => {
  const handleOnChangeStatusKey = (statusKey: IDriverStatus) => () => {
    onChangeStatusKey(statusKey);
  };
  return (
    <Modal
      title="Booking List"
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
                onClick={handleOnChangeStatusKey(d.status)}
                className={`inline-flex w-fit cursor-pointer flex-col justify-center border-b-2 ${
                  statusKey === d.status
                    ? "border-b-yellow-500"
                    : "border-b-transparent"
                } py-2 hover:border-b-yellow-500`}
              >
                <div className="font-Inter text-base font-medium leading-snug text-neutral-400">
                  {d.title} ({d.value})
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="min-h-[500px] overflow-hidden">
          <TableTrucks data={[]} isLoading={false} status={statusKey} />
        </div>
      </div>
    </Modal>
  );
};
