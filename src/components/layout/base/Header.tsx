import { ArrowLeftOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import clsx from "clsx";
import React from "react";

import { UserAvatar } from "@/components/elements";
import { IUser } from "@/models";

type IProps = {
  user: IUser;
  collapsed: boolean;
  onBackClick?: React.MouseEventHandler<HTMLAnchorElement> &
    React.MouseEventHandler<HTMLButtonElement>;
  onLogoutClick: React.MouseEventHandler<HTMLAnchorElement>;
};

export const Header: React.FC<IProps> = ({
  user,
  collapsed,
  onBackClick,
  onLogoutClick,
}) => {
  return (
    <>
      <header className="fixed right-0 top-0 z-[9998] w-full">
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

            <span>Tracking</span>
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
