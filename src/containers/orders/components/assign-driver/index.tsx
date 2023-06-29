import { UserAddOutlined } from "@ant-design/icons";
import { Dropdown, Spin } from "antd";
import React, { useState } from "react";

import { phoneFormat } from "@/utils/string";

import { IDriver } from "../../types";
import { UserItem } from "../user-item";

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

const Assigning = () => {
  return (
    <div className="flex items-center space-x-2">
      <Spin size="small" />
      <span className="font-medium text-primary-500">Assigning ...</span>
    </div>
  );
};

const DriverItem: React.FC<{
  driver: IDriver;
  readOnly: boolean;
}> = ({ driver, readOnly }) => {
  return (
    <UserItem
      id={driver.id}
      name={driver.name}
      description={phoneFormat(driver.phoneNumber)}
      isSelect={!readOnly}
    />
  );
};

const DriverOptions: React.FC<{
  options: IDriver[];
  onChange: (driverId: string) => void;
}> = ({ options = [], onChange }) => {
  return (
    <div className="rounded-md border bg-white py-1 shadow-md">
      {options.map((option) => {
        return (
          <UserItem
            key={option.id}
            id={option.id}
            name={option.name}
            description={phoneFormat(option.phoneNumber)}
            onClick={onChange}
            //
            className="cursor-pointer px-3 py-1 hover:bg-gray-100"
          />
        );
      })}
    </div>
  );
};

type IProps = {
  bookingId: string;
  driver: IDriver;
  driverOptions?: IDriver[];
  readOnly?: boolean;

  onAssignDriver?: (bookingId: string, driverId: string) => Promise<boolean>;
};

export const AssignDriver: React.FC<IProps> = ({
  bookingId,
  driver,
  driverOptions = [],
  readOnly,

  onAssignDriver,
}) => {
  const [isAssigning, setIsAssigning] = useState(false);

  const handleDriverChange = async (driverId: string) => {
    if (!onAssignDriver) {
      return;
    }

    setIsAssigning(true);
    await onAssignDriver(bookingId, driverId);
    setIsAssigning(false);
  };

  if (isAssigning) {
    return <Assigning />;
  }

  return (
    <Dropdown
      dropdownRender={() => (
        <div>
          <DriverOptions
            options={driverOptions}
            onChange={handleDriverChange}
          />
        </div>
      )}
      placement="bottomLeft"
      disabled={readOnly}
    >
      <div className="cursor-pointer">
        {!driver?.id ? (
          <EmptyDriver />
        ) : (
          <DriverItem driver={driver} readOnly={readOnly} />
        )}
      </div>
    </Dropdown>
  );
};
