/* eslint-disable jsx-a11y/anchor-is-valid */

import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import React, { useMemo } from "react";

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

const TableTotal: React.FC<{ count: number }> = ({ count }) => {
  return (
    <span className="font-medium text-gray-500">
      Total {count} driver{count > 1 ? "s" : null}
    </span>
  );
};

const TableEmpty: React.FC<{ tabKey: string }> = ({ tabKey }) => {
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
  name: string;
  phoneNumber: string;
  truckType?: {
    name: string;
  };
}

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

export const TableActiveDrivers: React.FC<IProps> = observer(
  ({ status, data, isLoading, pagination, loadData }) => {
    const columns = useMemo<ColumnsType<ITableRow>>(() => {
      return [
        {
          title: "Driver",
          dataIndex: "name",
          key: "name",
          width: 100,
          align: "center",
          fixed: "left",
          render: (text) => (
            <div className="flex flex-col">
              <span className="font-semibold">{text}</span>
            </div>
          ),
        },
        {
          title: "Phone number",
          dataIndex: "phoneNumber",
          key: "phoneNumber",
          width: 100,
          render: (text) => <span>{phoneFormat(text)}</span>,
        },
        {
          title: "Type of truck",
          dataIndex: "truckType",
          key: "truckType",
          width: 256,
          render: (truckType: ITableRow["truckType"]) => (
            <div>
              {truckType?.name ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={encodeURI(
                    `/icons/truck-types/png/${truckType?.name}.png`
                  )}
                  alt={truckType.name}
                  className="mb-0.5 h-3"
                />
              ) : null}
              <span>{truckType?.name || "Empty"}</span>
            </div>
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
              <Link
                target="_blank"
                href={`/driver/${record.id}`}
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
        scroll={{ x: 800, y: "calc(100vh - 288px)" }}
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
          showTotal: (total) => <TableTotal count={total} />,
        }}
        locale={{
          emptyText: <TableEmpty tabKey={status} />,
        }}
      />
    );
  }
);
