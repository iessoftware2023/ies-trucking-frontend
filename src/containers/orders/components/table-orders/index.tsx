/* eslint-disable jsx-a11y/anchor-is-valid */

import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";

import { AssignDriver } from "./AssignDriver";

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

interface DataType {
  id: string;
  status: string;
  driver: {
    name: string;
    phone: string;
  };
  pickUpLocation: string;
  pickUpTime: string;
  deliveryLocation: string;
  deliveryTime: string;
  typeOfTruck: string;
  customer: {
    name: string;
    phone: string;
  };
  total: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
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
    width: 160,
    align: "center",
    render: (text) => (
      <Tag color="cyan" bordered={false}>
        {text}
      </Tag>
    ),
  },
  {
    title: "Driver",
    dataIndex: "driver",
    key: "driver",
    width: 200,
    render: (text) => <AssignDriver driver={text} />,
  },
  {
    title: "Pick up location",
    dataIndex: "pickUpLocation",
    key: "pickUpLocation",
    width: 256,
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Pick up time",
    dataIndex: "pickUpTime",
    key: "pickUpTime",
    width: 128,
    render: (text) => (
      <div className="flex flex-col">
        <span>{dayjs(text).format("LL")}</span>
        <span>{dayjs(text).format("hh:mm A")}</span>
      </div>
    ),
  },
  {
    title: "Delivery location",
    dataIndex: "deliveryLocation",
    key: "deliveryLocation",
    width: 256,
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Delivery time",
    dataIndex: "deliveryTime",
    key: "deliveryTime",
    width: 128,
    render: (text) => (
      <div className="flex flex-col">
        <span>{dayjs(text).format("LL")}</span>
        <span>{dayjs(text).format("hh:mm A")}</span>
      </div>
    ),
  },
  {
    title: "Type of truck",
    dataIndex: "typeOfTruck",
    key: "typeOfTruck",
    width: 128,
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
    width: 200,
    render: (text) => (
      <div>
        <p>{text.name}</p>
        <p>{text.phone}</p>
      </div>
    ),
  },
  {
    title: "Total",
    key: "total",
    fixed: "right",
    width: 128,
    align: "center",
    render: (_, record) => <span>AUD {record.total}</span>,
  },
  {
    title: "Action",
    key: "action",
    fixed: "right",
    width: 128,
    align: "center",
    render: () => (
      <Space size="middle">
        <a className="text-blue-500 underline">Detail</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    id: "TN-212234",
    status: "Assigning Driver",
    driver: {
      name: "Nguyen Van A",
      phone: "0123456789",
    },
    pickUpLocation: "HCM",
    pickUpTime: "2023-06-21 10:00",
    deliveryLocation: "HN",
    deliveryTime: "2023-06-21 11:00",
    typeOfTruck: "5 tons",
    customer: {
      name: "Nguyen Van B",
      phone: "0123456789",
    },
    total: 304,
  },
  {
    id: "TN-212234",
    status: "Assigning Driver",
    driver: null,
    pickUpLocation: "HCM",
    pickUpTime: "2023-06-21 10:00",
    deliveryLocation: "HN",
    deliveryTime: "2023-06-21 11:00",
    typeOfTruck: "5 tons",
    customer: {
      name: "Nguyen Van B",
      phone: "0123456789",
    },
    total: 304,
  },
];

export const TableOrders: React.FC = () => {
  return (
    <div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        scroll={{ x: 1600 }}
        bordered
      />
    </div>
  );
};
