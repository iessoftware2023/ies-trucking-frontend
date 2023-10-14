import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { toJS } from "mobx";
import Link from "next/link";
import React, { useMemo } from "react";

import { AssignDriver } from "@/containers/booking-list/components/assign-driver";
import { IDriver } from "@/containers/booking-list/types";
import { IBookingStatus, IOrder, IOrderStatus } from "@/models/operator";
import { currencyFormat } from "@/utils/number";
import { phoneFormat } from "@/utils/string";

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

const RenderAddress: React.FC<{ address: string }> = ({ address }) => {
  // const parsed = parseAddress(address);

  return <div className="flex flex-col">{address}</div>;
};

const RenderDate: React.FC<{ date: string }> = ({ date }) => {
  return (
    <div className="flex flex-col">
      <span>{dayjs(date).format("ddd DD MMM")}</span>
      <span>{dayjs(date).format("hh:mm A")}</span>
    </div>
  );
};

const TableTotal: React.FC<{ count: number }> = ({ count }) => {
  return (
    <span className="font-medium text-gray-500">Total {count} booking</span>
  );
};

const TableEmpty: React.FC<{ tabKey: string; isLoading: boolean }> = ({
  tabKey,
  isLoading,
}) => {
  const emptyTextObj = {
    all: "There are no bookings in your system. Please check the bookings again.",
    order_placed:
      "Currently, there are no bookings in Order placed status. Please check the bookings again.",
    on_the_way_to_pickup:
      "Currently, there are no bookings in on the way to pick-up status. Please check the bookings again.",
    order_pickup:
      "Currently, there are no bookings in pick-up order status. Please check the bookings again.",
    on_the_way_to_dropoff:
      "Currently, there are no bookings in on the way to delivery status. Please check the bookings again.",
    completed:
      "Currently, there are no bookings in delivery completed status. Please check the bookings again.",
    cancelled:
      "Currently, there are no bookings in order cancelled status. Please check the bookings again.",
  };
  return (
    <div className="flex flex-col items-center gap-y-2 p-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/empty-booking@2x.png"
        className="h-40"
        alt="empty truck"
      />
      {!isLoading ? (
        <>
          <div className="text-lg font-semibold text-gray-800">No trucks</div>
          <div className="max-w-[370px] text-base">{emptyTextObj[tabKey]}</div>
        </>
      ) : null}
    </div>
  );
};

export interface ITableRow {
  rowType: "BOOKING" | "ORDER";
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
}

type IProps = {
  tabKey: string;

  data: IOrder[];
  loadData: (page: number, pageSize: number) => void;
  isLoading?: boolean;
  pagination: {
    total: number;
    limit: number;
    page: number;
    pages: number;
  };
};

export const TableBookings: React.FC<IProps> = ({
  tabKey,
  data = [],
  isLoading,
  pagination,
  loadData,
}) => {
  console.log(
    "📢 data",
    data.map((d) => toJS(d))
  );
  const columns = useMemo<ColumnsType<IOrder>>(() => {
    return [
      {
        title: "ID",
        dataIndex: "code",
        key: "code",
        width: 160,
        align: "center",
        fixed: "left",
        render: (_, record) => (
          <div className="flex flex-col">
            <span className="font-semibold">#{record.booking.code}</span>
          </div>
        ),
      },
      {
        title: "Driver",
        dataIndex: "driver",
        key: "driver",
        width: 224,
        render: (driver: IDriver, record) => {
          return driver.id ? (
            <AssignDriver bookingId={record.id} driver={driver} readOnly />
          ) : (
            <span>Unassigned</span>
          );
        },
      },
      {
        title: "Pick-up location",
        dataIndex: "pickUpLocation",
        key: "pickUpLocation",
        width: 256,
        render: (_, record) => (
          <RenderAddress address={record.booking.pickup.address} />
        ),
      },
      {
        title: "Pick-up time",
        dataIndex: "pickUpTime",
        key: "pickUpTime",
        width: 128,
        render: (text) => <RenderDate date={text} />,
      },
      {
        title: "Delivery location",
        dataIndex: "deliveryLocation",
        key: "deliveryLocation",
        width: 256,
        render: (_, record) => (
          <RenderAddress address={record.booking.dropoff.address} />
        ),
      },
      {
        title: "Delivery time",
        dataIndex: "deliveryTime",
        key: "deliveryTime",
        width: 128,
        render: (text) => <RenderDate date={text} />,
      },
      {
        title: "Type of truck",
        dataIndex: "typeOfTruck",
        key: "typeOfTruck",
        width: 256,
        render: (text, record) => (
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={encodeURI(
                `/icons/truck-types/png/${record.truck.truckType.name}.png`
              )}
              alt=""
              className="mb-0.5 h-3"
            />
            <span>{record.truck.truckType.name}</span>
          </div>
        ),
      },
      {
        title: "Customer",
        dataIndex: "customer",
        key: "customer",
        width: 200,
        render: (_, record) => (
          <div className="flex flex-col">
            <span className="font-semibold">
              {record.booking.pickup.fullName}
            </span>
            <span>{phoneFormat(record.booking.pickup.phoneNumber)}</span>
          </div>
        ),
      },
      {
        title: "Total",
        key: "total",
        fixed: "right",
        width: 128,
        align: "center",
        render: (_, record) => {
          let cost = record.booking.cost;

          if (record.status === "cancelled") {
            cost = 0;
          }

          return (
            <span>
              {currencyFormat(cost, {
                currency: record.booking.currency,
              })}
            </span>
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
              href={`/booking/${record.booking.id}`}
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
        total: pagination.total,
        current: pagination.page,
        pageSize: pagination.limit,
        onChange(page, pageSize) {
          loadData(page, pageSize);
        },
      }}
      locale={{
        emptyText: <TableEmpty tabKey={tabKey} isLoading={isLoading} />,
      }}
    />
  );
};
