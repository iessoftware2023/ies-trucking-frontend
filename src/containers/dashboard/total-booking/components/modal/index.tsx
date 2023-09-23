import { Modal, Spin } from "antd";
import React from "react";

// import { TableBookings } from "@/containers/booking-list/components";
import { IOrder } from "@/models/operator";

import { SideBar } from "../sidebar";
import { TableBookings } from "../table-bookings";

interface IProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  data: IOrder[];
  statuses: {
    title: string;
    color: string;
    status: string;
    count: number;
  }[];
  onChangeTabKey: (tabKey) => void;
  tabKey: string;
  isLoading: boolean;
}

export const TotalBookingModal: React.FC<IProps> = ({
  isModalOpen,
  handleCancel,
  handleOk,
  data,
  statuses,
  tabKey,
  onChangeTabKey,
  isLoading,
}) => {
  return (
    <Modal
      title="Booking List"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width="90%"
    >
      <div className="relative grid grid-cols-[250px_1fr]">
        <SideBar
          statuses={statuses}
          tabKey={tabKey}
          onChange={onChangeTabKey}
        />
        <div className="min-h-[500px] overflow-hidden">
          <TableBookings data={data} isLoading={isLoading} tabKey={tabKey} />
        </div>
      </div>
    </Modal>
  );
};
