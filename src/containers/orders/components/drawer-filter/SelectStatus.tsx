import { Checkbox } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import React from "react";

import { IOrderStatus } from "@/models/operator";

import { OrderStatus } from "../order-status";

export const SelectStatus: React.FC<{
  options: string[];
  value?: string[];
  onChange?: (checkedValue: CheckboxValueType[]) => void;
}> = ({ options, value, onChange }) => {
  return (
    <Checkbox.Group
      className="flex flex-col space-y-2"
      value={value}
      onChange={onChange}
    >
      {options.map((option) => {
        return (
          <Checkbox key={option} value={option}>
            <OrderStatus
              bookingStatus="confirmed"
              orderStatus={option as IOrderStatus}
            />
          </Checkbox>
        );
      })}
    </Checkbox.Group>
  );
};
