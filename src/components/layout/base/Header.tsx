import { ArrowLeftOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Tag } from "antd";
import clsx from "clsx";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import React, { useEffect, useState } from "react";

import { UserAvatar } from "@/components/elements";
import { IUser } from "@/models";

dayjs.extend(LocalizedFormat);

type IProps = {
  title?: string;
  user: IUser;
  collapsed: boolean;
  isDashboard: boolean;
  onBackClick?: React.MouseEventHandler<HTMLAnchorElement> &
    React.MouseEventHandler<HTMLButtonElement>;
  onLogoutClick: React.MouseEventHandler<HTMLAnchorElement>;
};

export const Header: React.FC<IProps> = ({
  title = "Tracking",
  user,
  collapsed,
  isDashboard,
  onBackClick,
  onLogoutClick,
}) => {
  const [, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const now = new Date();
    const timeUntilNextMinute = 60 - now.getSeconds();
    setTimeout(() => {
      setCurrentTime(new Date());
      const intervalId = setInterval(() => {
        setCurrentTime(new Date());
      }, 60 * 1000);

      return () => clearInterval(intervalId);
    }, timeUntilNextMinute * 1000);
  }, []);

  return (
    <>
      <header className="fixed right-0 top-0 z-50 w-full">
        <div
          className={clsx(
            "flex h-[72px] items-center border-b bg-white px-4 transition-all duration-200",
            {
              "ml-[80px]": collapsed,
              "ml-[224px]": !collapsed,
            }
          )}
        >
          <div className="flex flex-1 items-center space-x-2 text-xl font-semibold">
            {onBackClick && (
              <Button
                shape="circle"
                icon={<ArrowLeftOutlined />}
                className="text-gray-500"
                onClick={onBackClick}
              />
            )}
            {isDashboard ? (
              <div className="flex flex-row items-center gap-x-10">
                <div className="flex flex-col gap-y-0.5">
                  <span className="font-Inter text-xl font-medium text-[#525256]">
                    {title}
                  </span>
                  <span className="font-Inter text-sm font-normal text-[#A3A3A3]">
                    {dayjs().format("lll")}
                  </span>
                </div>
                <Tag className="border-[#11F] py-1 px-3 text-[#11F]">Today</Tag>
              </div>
            ) : (
              <span>{title}</span>
            )}
          </div>

          <Dropdown
            menu={{
              items: [
                {
                  key: "LOGOUT",
                  label: (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a href="#" onClick={onLogoutClick}>
                      Logout
                    </a>
                  ),
                },
              ],
            }}
            trigger={["click"]}
            getPopupContainer={(trigger) => trigger.parentElement}
          >
            <div className="flex items-center space-x-4">
              <div className="flex flex-col items-end">
                <span className="text-base font-medium">{user.name}</span>
                <span className="text-gray-400">{user.email}</span>
              </div>

              <UserAvatar name={user.name} size="large" />

              <DownOutlined />
            </div>
          </Dropdown>
        </div>
      </header>

      <div className="h-[72px]"></div>
    </>
  );
};
