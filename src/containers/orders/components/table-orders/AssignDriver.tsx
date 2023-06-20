import { DownOutlined, UserAddOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import React from "react";

import { UserAvatar } from "@/components/elements";

const EmptyDriver = () => {
  return (
    <div className="flex items-center space-x-2 text-gray-400">
      <span className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-400">
        <UserAddOutlined />
      </span>
      <span>Assignee</span>
    </div>
  );
};

const DriverSelected: React.FC<{
  driver: {
    name: string;
    phone: string;
  };
  readOnly: boolean;
}> = ({ driver, readOnly }) => {
  return (
    <div className="flex items-center space-x-2">
      <UserAvatar size="small" name={driver?.name} />

      <div className="flex-1">
        <div>{driver?.name}</div>
        <div className="text-gray-400">{driver?.phone}</div>
      </div>

      {!readOnly && (
        <span>
          <DownOutlined className="text-sm text-gray-400" />
        </span>
      )}
    </div>
  );
};

type IProps = {
  driver: {
    name: string;
    phone: string;
  };

  readOnly?: boolean;
};

export const AssignDriver: React.FC<IProps> = ({ driver, readOnly }) => {
  return (
    <Dropdown
      menu={{
        items: [
          {
            key: "1",
            label: "Action 1",
          },
        ],
      }}
      trigger={["click"]}
      disabled={readOnly}
      arrow
      placement="bottom"
    >
      <div className="cursor-pointer">
        {!driver ? (
          <EmptyDriver />
        ) : (
          <DriverSelected driver={driver} readOnly={readOnly} />
        )}
      </div>
    </Dropdown>
  );
};
