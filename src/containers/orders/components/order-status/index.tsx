import { Tag } from "antd";
import React from "react";

import { ORDER_STATUS_OBJ } from "./constants";

export type IOrderStatus = keyof typeof ORDER_STATUS_OBJ;

type IProps = {
  status: IOrderStatus;
};

export const OrderStatus: React.FC<IProps> = ({ status }) => {
  const obj = ORDER_STATUS_OBJ[status];

  return (
    <Tag bordered={false} style={{ color: obj.color, backgroundColor: obj.bg }}>
      {obj.text}
    </Tag>
  );
};
