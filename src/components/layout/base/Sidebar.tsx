/* eslint-disable @next/next/no-img-element */
import {
  AppstoreOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import clsx from "clsx";
import React from "react";

import { IMenuActiveKey } from "./types";

type IProps = {
  collapsed: boolean;
  menuActiveKey: IMenuActiveKey;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Sidebar: React.FC<IProps> = ({
  collapsed,
  menuActiveKey,
  setCollapsed,
}) => {
  return (
    <Layout.Sider
      width={224}
      trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      //
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 9999,
      }}
    >
      <div className="flex h-full flex-col">
        <div
          className={clsx(
            "flex h-[72px] items-center space-x-4 border-b border-solid border-secondary-600 px-4 transition-all duration-200",
            {
              "px-5": collapsed,
            }
          )}
        >
          <img
            src="/images/ies-logo.png"
            className="h-10 w-10 rounded-lg"
            alt="Logo"
          />

          <div
            className={clsx(
              "flex w-full flex-1 flex-col space-y-1 overflow-hidden whitespace-nowrap text-lg font-bold leading-none text-white transition-all duration-200",
              {
                "w-0": collapsed,
              }
            )}
          >
            <span>IES</span>
            <span>Transport</span>
          </div>
        </div>

        <Menu
          className="grow p-3"
          onClick={(e) => console.log(e)}
          theme="dark"
          items={[
            {
              key: "DASHBOARD",
              icon: <AppstoreOutlined />,
              label: "Dashboard",
            },
          ]}
          selectedKeys={[menuActiveKey]}
        />

        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="border-t border-secondary-600 bg-transparent py-2 text-base text-secondary-200"
        >
          {collapsed ? <RightOutlined /> : <LeftOutlined />}
        </button>
      </div>
    </Layout.Sider>
  );
};
