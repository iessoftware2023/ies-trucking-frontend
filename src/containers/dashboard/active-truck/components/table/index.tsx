/* eslint-disable jsx-a11y/anchor-is-valid */

import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { toJS } from "mobx";
import Link from "next/link";
import React, { useMemo } from "react";

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
  return (
    <span className="font-medium text-gray-500">
      Total {count} truck{count > 1 ? "s" : null}
    </span>
  );
};

const TableEmpty: React.FC<{ tabKey: string }> = ({ tabKey }) => {
  const emptyTextObj = {
    all: "There are no trucks in your system. Please check the trucks again.",
    on_the_way_to_pickup:
      "Currently, there are no trucks in on the way to pick-up status. Please check the trucks again.",
    order_pickup:
      "Currently, there are no trucks in on the way to pick-up order status.Please check the trucks again.",
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
      <div className="max-w-[420px] whitespace-pre-line text-base">
        {emptyTextObj[tabKey]}
      </div>
    </div>
  );
};

export interface ITableRow {
  id: string;
  licensePlate: string;
  truckType: {
    name: string;
    cargoTypes: {
      name: string;
    }[];
  };
}

export type IDriverStatus =
  | "all"
  | "on_the_way_to_pickup"
  | "order_pickup"
  | "on_the_way_to_dropoff"
  | "inactive";

type IProps = {
  status: string;
  data: ITableRow[];
  isLoading?: boolean;
  pagination: {
    total: number;
    limit: number;
    page: number;
    pages: number;
  };
  loadData: (page: number, pageSize: number) => void;
};

export const TableActiveTrucks: React.FC<IProps> = ({
  status,
  data = [],
  isLoading,
  pagination,
  loadData,
}) => {
  const columns = useMemo<ColumnsType<ITableRow>>(() => {
    return [
      {
        title: "ID",
        dataIndex: "licensePlate",
        key: "licensePlate",
        width: 80,
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
        dataIndex: "truckType",
        key: "truckType",
        width: 160,
        render: (_, record) => (
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={encodeURI(
                `/icons/truck-types/png/${record.truckType.name}.png`
              )}
              alt=""
              className="mb-0.5 h-3"
            />
            <span>{record.truckType.name}</span>
          </div>
        ),
      },
      {
        title: "Type of delivery item",
        dataIndex: "truckType",
        key: "truckType",
        width: 250,
        render(truckType: ITableRow["truckType"]) {
          return (
            <div className="flex flex-row flex-wrap gap-1">
              {truckType.cargoTypes.map((cargoType) => (
                <div
                  key={cargoType.name}
                  className="rounded bg-[#EFF0F4] px-2 py-1 text-sm text-[#5F6C91]"
                >
                  {cargoType.name}
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
        width: 40,
        align: "center",
        render: (_, record) => (
          <Space size="middle">
            <Link
              target="_blank"
              href={`/truck/${record.id}`}
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
      scroll={{ x: 500, y: "calc(100vh - 288px)" }}
      bordered
      loading={isLoading}
      pagination={{
        position: ["bottomCenter"],
        defaultPageSize: 50,
        showSizeChanger: true,
        pageSizeOptions: [10, 25, 50],
        style: { marginBottom: 0 },
        total: pagination.total,
        current: pagination.page,
        pageSize: pagination.limit,
        onChange(page, pageSize) {
          loadData(page, pageSize);
        },
        showTotal: (total) => <TableTotal count={total} />,
      }}
      locale={{
        emptyText: <TableEmpty tabKey={status} />,
      }}
    />
  );
};
