import { Tag } from "antd";
import React from "react";

import { IBookingStatus, IOrderStatus } from "@/models/operator";

import { BOOKING_STATUS_OBJ, ORDER_STATUS_OBJ } from "./constants";

type IProps = {
  bookingStatus: IBookingStatus;
  orderStatus: IOrderStatus;
};

export const OrderStatus: React.FC<IProps> = ({
  bookingStatus,
  orderStatus,
}) => {
  let obj: { text: string; color: string; bg: string };

  if (bookingStatus !== "confirmed") {
    obj = BOOKING_STATUS_OBJ[bookingStatus];
  } else {
    obj = ORDER_STATUS_OBJ[orderStatus];
  }

  return (
    <Tag
      bordered={false}
      style={{ color: obj?.color, backgroundColor: obj?.bg }}
    >
      {obj?.text}
    </Tag>
  );
};
