/* eslint-disable jsx-a11y/anchor-is-valid */

import { Dropdown, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import _ from "lodash";
import Link from "next/link";
import React, { useMemo } from "react";

import { IBookingStatus, IOrderStatus } from "@/models/operator";
import { currencyFormat } from "@/utils/number";
import { phoneFormat, pluralize } from "@/utils/string";

import { IDriver, ITrackingTabKey } from "../../types";
import { AssignDriver } from "../assign-driver";
import { OrderStatus } from "../order-status";
import { checkCanAssignDriver, checkCanCancelBooking } from "./utils";

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

const RenderCountdown: React.FC<{ date: string }> = ({ date }) => {
  const dateObj = dayjs(date);

  if (dayjs().isAfter(dateObj)) {
    return <span className="text-red-400">Overtime</span>;
  }

  const dateStr = `${dateObj.fromNow(true)} left`;

  return <span className="text-blue-400">{_.capitalize(dateStr)}</span>;
};

const RenderAddress: React.FC<{ address: string }> = ({ address }) => {
  // const parsed = parseAddress(address);

  return (
    <div className="flex flex-col">
      {address}
      {/* <span className="font-semibold">{parsed.firstLine}</span>
      <span>{parsed.secondLine}</span> */}
    </div>
  );
};

const RenderDate: React.FC<{ date: string }> = ({ date }) => {
  return (
    <div className="flex flex-col">
      <span>{dayjs(date).format("ddd DD MMM")}</span>
      <span>{dayjs(date).format("hh:mm A")}</span>
    </div>
  );
};

const TableTotal: React.FC<{ tabKey: ITrackingTabKey; count: number }> = ({
  tabKey,
  count,
}) => {
  return (
    <span className="font-medium text-gray-500">
      Total{" "}
      {tabKey === "WAITING_ASSIGN"
        ? pluralize(count, "booking")
        : pluralize(count, "order")}
    </span>
  );
};

const TableEmpty: React.FC<{ tabKey: ITrackingTabKey }> = ({ tabKey }) => {
  return (
    <div className="flex flex-col items-center p-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/empty-booking@2x.png" className="mb-2 h-40" alt="" />

      <div className="text-lg font-semibold text-gray-800">
        Your {tabKey === "WAITING_ASSIGN" ? "booking" : "order"} is empty
      </div>

      <div className="text-base">
        Make it easier to receive{" "}
        {tabKey === "WAITING_ASSIGN" ? "booking" : "order"} and track everything
        here
      </div>
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
  tabKey: ITrackingTabKey;
  pagination: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };

  data: ITableRow[];
  isLoading?: boolean;
  loadData: (page: number, pageSize: number) => void;

  onAssignDriver: (bookingId: string, driverId: string) => Promise<boolean>;
  onCancelBooking: (bookingId: string, code: string) => Promise<boolean>;
  onCancelOrder: (orderId: string, code: string) => Promise<boolean>;
};

export const TableBookings: React.FC<IProps> = ({
  tabKey,
  data = [],
  isLoading,
  pagination,
  onAssignDriver,
  onCancelBooking,
  onCancelOrder,
  loadData,
}) => {
  const columns = useMemo<ColumnsType<ITableRow>>(() => {
    return [
      {
        title: "ID",
        dataIndex: "code",
        key: "code",
        width: 160,
        align: "center",
        fixed: "left",
        render: (text, record) => (
          <div className="flex flex-col">
            <span className="font-semibold">#{text}</span>

            {record.rowType === "BOOKING" && (
              <RenderCountdown date={record.pickUpTime} />
            )}
          </div>
        ),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: 196,
        align: "center",
        render: (_) => (
          <OrderStatus
            bookingStatus={_.bookingStatus}
            orderStatus={_.orderStatus}
          />
        ),
      },
      {
        title: "Driver",
        dataIndex: "driver",
        key: "driver",
        width: 224,
        render: (driver: IDriver, record) => (
          <AssignDriver
            bookingId={record.id}
            driver={driver}
            driverOptions={record.drivers}
            onAssignDriver={onAssignDriver}
            readOnly={
              !checkCanAssignDriver(
                record.status.bookingStatus,
                record.status.orderStatus
              )
            }
          />
        ),
      },
      {
        title: "Pick-up location",
        dataIndex: "pickUpLocation",
        key: "pickUpLocation",
        width: 256,
        render: (text) => <RenderAddress address={text} />,
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
        render: (text) => <RenderAddress address={text} />,
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
        title: "Customer",
        dataIndex: "customer",
        key: "customer",
        width: 200,
        render: (text) => (
          <div className="flex flex-col">
            <span className="font-semibold">{text.name}</span>
            <span>{phoneFormat(text.phone)}</span>
          </div>
        ),
      },
      {
        title: "Total",
        key: "total",
        fixed: "right",
        width: 128,
        align: "center",
        // order?.status === "cancelled" ? 0 : booking?.cost
        render: (_, record) => {
          let cost = record.total.cost;

          if (
            record.rowType === "ORDER" &&
            record.status?.orderStatus === "cancelled"
          ) {
            cost = 0;
          }

          return (
            <span>
              {currencyFormat(cost, {
                currency: record.total.currency,
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
              target="_blank"
              href={`/booking/${record.bookingId}`}
              className="text-blue-500 underline"
            >
              Detail
            </Link>

            {checkCanCancelBooking(
              record.status.bookingStatus,
              record.status.orderStatus
            ) && (
              <Dropdown
                menu={{
                  items: [
                    record.rowType === "BOOKING"
                      ? {
                          key: "CANCEL_BOOKING",
                          label: "Cancel Booking",
                        }
                      : {
                          key: "CANCEL_ORDER",
                          label: "Cancel Order",
                        },
                  ],
                  onClick: (event) => {
                    if (event.key === "CANCEL_BOOKING") {
                      onCancelBooking?.(record?.bookingId, record?.code);
                    }
                    if (event.key === "CANCEL_ORDER") {
                      onCancelOrder?.(record?.orderId, record?.code);
                    }
                  },
                }}
              >
                <a className="text-blue-500 underline">More</a>
              </Dropdown>
            )}
          </Space>
        ),
      },
    ];
  }, [onAssignDriver, onCancelBooking, onCancelOrder]);

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
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: [10, 25, 50],
        style: { marginBottom: 0 },
        total: pagination.total,
        current: pagination.page,
        pageSize: pagination.limit,
        onChange(page, pageSize) {
          loadData(page, pageSize);
        },
        showTotal: (total) => <TableTotal tabKey={tabKey} count={total} />,
      }}
      locale={{
        emptyText: <TableEmpty tabKey={tabKey} />,
      }}
    />
  );
};
