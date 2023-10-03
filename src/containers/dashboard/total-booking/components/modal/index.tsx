import { Modal } from "antd";
import React, { useMemo } from "react";

// import { TableBookings } from "@/containers/booking-list/components";
import { SideBar } from "../sidebar";
import { ITableRow, TableBookings } from "../table-bookings";

interface IProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  statuses: {
    title: string;
    color: string;
    status: string;
    count: number;
  }[];
  onChangeTabKey: (tabKey) => void;
  tabKey: string;
  isLoading: boolean;
  pagination: {
    total: number;
    limit: number;
    page: number;
    pages: number;
  };
  loadData: (page: number, limit: number) => void;
  tableData: ITableRow[];

  onAssignDriver: (bookingId: string, driverId: string) => Promise<boolean>;
  onCancelBooking: (bookingId: string, code: string) => Promise<boolean>;
  onCancelOrder: (orderId: string, code: string) => Promise<boolean>;
}

export const TotalBookingModal: React.FC<IProps> = ({
  isModalOpen,
  handleCancel,
  handleOk,
  tableData,
  statuses,
  // tabKey,
  onChangeTabKey,
  loadData,
  isLoading,
  pagination,
  ...props
}) => {
  const tabKey = useMemo(() => {
    switch (props.tabKey) {
      case "order_placed":
      case "on_the_way_to_pickup":
      case "order_pickup":
      case "on_the_way_to_dropoff":
        return "ON_GOING";
      case "cancelled":
      case "completed":
        return "HISTORY";
      default:
        return "WAITING_ASSIGN";
    }
  }, [props.tabKey]);

  return (
    <Modal
      title="Booking List"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width="90%"
      style={{ top: 32, bottom: 32 }}
    >
      <div className="relative grid grid-cols-[250px_1fr]">
        <SideBar
          statuses={statuses}
          tabKey={props.tabKey}
          onChange={onChangeTabKey}
        />
        <div className="min-h-[500px] overflow-hidden">
          <TableBookings
            tabKey={tabKey}
            data={tableData}
            isLoading={isLoading}
            pagination={pagination}
            loadData={loadData}
            //
            onAssignDriver={props.onAssignDriver}
            onCancelBooking={props.onCancelBooking}
            onCancelOrder={props.onCancelOrder}
          />
        </div>
      </div>
    </Modal>
  );
};
