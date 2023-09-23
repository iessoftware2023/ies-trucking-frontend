/* eslint-disable jsx-a11y/anchor-is-valid */

import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import Link from "next/link";
import React, { useMemo } from "react";

import { IDriver } from "@/containers/booking-list/types";
import { IBookingStatus, IOrderStatus } from "@/models/operator";

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "a few seconds",
    m: "1 minute",
    mm: "%d minutes",
    h: "1 hour",
    hh: "%d hours",
    d: "1 day",
    dd: "%d days",
    M: "1 month",
    MM: "%d months",
    y: "1 year",
    yy: "%d years",
  },
});

const TableTotal: React.FC<{ count: number }> = ({ count }) => {
  return <span className="font-medium text-gray-500">Total {count} truck</span>;
};

const TableEmpty: React.FC<{ tabKey: IDriverStatus }> = ({ tabKey }) => {
  const emptyTextObj = {
    all: "There are no trucks in your system. Please check the trucks again.",
    on_the_way_to_pickup:
      "Currently, there are no trucks in on the way to pick-up status. Please check the trucks again.",
    order_pickup:
      "Currently, there are no trucks in on the way to pick-up order status. Please check the trucks again.",
    on_the_way_to_dropoff:
      "Currently, there are no trucks in on the way to delivery status. Please check the trucks again.",
    inactive:
      "Currently, there are no trucks in inactive status. Please check the trucks again.",
  };
  return (
    <div className="flex flex-col items-center gap-y-2 p-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/empty-booking@2x.png"
        className="h-40"
        alt="empty truck"
      />
      <div className="text-lg font-semibold text-gray-800">No trucks</div>
      <div className="max-w-[370px] text-base">{emptyTextObj[tabKey]}</div>
    </div>
  );
};

export interface ITableRow {
  id: string;
  bookingId: string;
  orderId: string;
  code: string;
  status: {
    bookingStatus: IBookingStatus;
    orderStatus: IOrderStatus;
  };
  driver: IDriver;
  drivers: IDriver[];
  pickUpLocation: string;
  pickUpTime: string;
  deliveryLocation: string;
  deliveryTime: string;
  typeOfTruck: string;
  customer: {
    name: string;
    phone: string;
  };
  total: {
    cost: number;
    currency: string;
  };
  typeOfDeliveryItem: string[];
}

export type IDriverStatus =
  | "all"
  | "on_the_way_to_pickup"
  | "order_pickup"
  | "on_the_way_to_dropoff"
  | "inactive";

type IProps = {
  status: IDriverStatus;
  data: ITableRow[];
  isLoading?: boolean;
};

export const TableTrucks: React.FC<IProps> = ({
  status,
  data = [],
  isLoading,
}) => {
  const columns = useMemo<ColumnsType<ITableRow>>(() => {
    return [
      {
        title: "ID",
        dataIndex: "licensePlate",
        key: "licensePlate",
        width: 160,
        align: "center",
        fixed: "left",
        render: (text) => (
          <div className="flex flex-col">
            <span className="font-semibold">{text}</span>
          </div>
        ),
      },
      {
        title: "Type of truck",
        dataIndex: "typeOfTruck",
        key: "typeOfTruck",
        width: 256,
        render: (text) => (
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={encodeURI(`/icons/truck-types/png/${text}.png`)}
              alt=""
              className="mb-0.5 h-3"
            />
            <span>{text}</span>
          </div>
        ),
      },
      {
        title: "Type of delivery Item",
        dataIndex: "typeOfDeliveryItem",
        key: "typeOfDeliveryItem",
        width: 256,
        render(value) {
          return (
            <div className="flex flex-col gap-1">
              {value.map((d) => (
                <div
                  key={d}
                  className="rounded bg-blue-50 px-2 py-1 text-sm text-blue-500"
                >
                  {d}
                </div>
              ))}
            </div>
          );
        },
      },
      {
        title: "Action",
        key: "action",
        fixed: "right",
        width: 128,
        align: "center",
        render: (_, record) => (
          <Space size="middle">
            <Link
              href={`/booking/${record.bookingId}`}
              className="text-blue-500 underline"
            >
              Detail
            </Link>
          </Space>
        ),
      },
    ];
  }, []);

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      scroll={{ x: 1600, y: "calc(100vh - 288px)" }}
      bordered
      loading={isLoading}
      pagination={{
        position: ["bottomCenter"],
        defaultPageSize: 50,
        showSizeChanger: true,
        pageSizeOptions: [10, 25, 50],
        style: { marginBottom: 0 },
        showTotal: (total) => <TableTotal count={total} />,
      }}
      locale={{
        emptyText: <TableEmpty tabKey={status} />,
      }}
    />
  );
};
