/* eslint-disable jsx-a11y/anchor-is-valid */

import { Dropdown, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useMemo } from "react";

import { currencyFormat } from "@/utils/number";
import { parseAddress, phoneFormat, pluralize } from "@/utils/string";

import { IDriver, ITrackingTabKey } from "../../types";
import { checkCanAssignDriver, checkCanCancelBooking } from "../../utils";
import { AssignDriver } from "../assign-driver";
import { OrderStatus } from "../order-status";

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

const RenderAddress: React.FC<{ address: string }> = ({ address }) => {
  const parsed = parseAddress(address);

  return (
    <div className="flex flex-col">
      <span className="font-semibold">{parsed.firstLine}</span>
      <span>{parsed.secondLine}</span>
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
  id: string;
  code: string;
  status: string;
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
  tabKey?: ITrackingTabKey;
  data: ITableRow[];
  isLoading?: boolean;
  onAssignDriver: (bookingId: string, driverId: string) => Promise<boolean>;
  onCancelBooking?: (bookingId: string) => Promise<boolean>;
};

export const TableOrders: React.FC<IProps> = ({
  tabKey,
  data = [],
  isLoading,
  onAssignDriver,
  onCancelBooking,
}) => {
  const columns = useMemo<ColumnsType<ITableRow>>(() => {
    return [
      {
        title: "ID",
        dataIndex: "code",
        key: "code",
        width: 128,
        align: "center",
        fixed: "left",
        render: (text, record) => (
          <div className="flex flex-col">
            <span>{text}</span>
            <span className="text-blue-400">
              {dayjs(record.pickUpTime).fromNow(true)} left
            </span>
          </div>
        ),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: 196,
        align: "center",
        render: (text) => <OrderStatus status={text} />,
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
            readOnly={!checkCanAssignDriver(record.status)}
          />
        ),
      },
      {
        title: "Pick up location",
        dataIndex: "pickUpLocation",
        key: "pickUpLocation",
        width: 256,
        render: (text) => <RenderAddress address={text} />,
      },
      {
        title: "Pick up time",
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
        render: (_, record) => (
          <span>
            {currencyFormat(record.total.cost, {
              currency: record.total.currency,
            })}
          </span>
        ),
      },
      {
        title: "Action",
        key: "action",
        fixed: "right",
        width: 128,
        align: "center",
        render: (_, record) => (
          <Space size="middle">
            <a className="text-blue-500 underline">Detail</a>

            {checkCanCancelBooking(record.status) && (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "CANCEL",
                      label: "Cancel Booking",
                    },
                  ],
                  onClick: (event) => {
                    if (event.key === "CANCEL") {
                      onCancelBooking?.(record.id);
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
  }, [onAssignDriver, onCancelBooking]);

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
        showTotal: (total) => <TableTotal tabKey={tabKey} count={total} />,
      }}
      locale={{
        emptyText: <TableEmpty tabKey={tabKey} />,
      }}
    />
  );
};
