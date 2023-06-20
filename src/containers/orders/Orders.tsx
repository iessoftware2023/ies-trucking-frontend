import { Segmented } from "antd";
import { observer } from "mobx-react-lite";
import React from "react";

import { TableOrders } from "./components";

const OrdersContainerCom: React.FC = () => {
  return (
    <div>
      <div className="border-b bg-white p-4">
        <Segmented
          options={["Waitting Assign", "On-going", "History"]}
          size="large"
        />
      </div>

      <div className="p-4">
        <TableOrders />
      </div>
    </div>
  );
};

export const OrdersContainer = observer(OrdersContainerCom);
