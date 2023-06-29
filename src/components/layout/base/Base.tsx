import { Layout } from "antd";
import { observer } from "mobx-react-lite";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { PropsWithChildren, useState } from "react";

import { useStores } from "@/models";

import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { IMenuActiveKey } from "./types";

type IProps = PropsWithChildren<{
  title: string;
  headerTitle?: string;
  menuActiveKey?: IMenuActiveKey;
}>;

export const LayoutBase: React.FC<IProps> = observer(
  ({ title, headerTitle, menuActiveKey, children }) => {
    const [collapsed, setCollapsed] = useState(false);

    const { authStore } = useStores();

    const router = useRouter();

    const handleLogoutClick: React.MouseEventHandler<HTMLAnchorElement> = (
      e
    ) => {
      e.preventDefault();

      authStore.logout();
      router.replace("/login", undefined);
    };

    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>

        <Layout hasSider>
          <Sidebar
            collapsed={collapsed}
            menuActiveKey={menuActiveKey}
            setCollapsed={setCollapsed}
          />

          <Layout
            style={{ marginLeft: collapsed ? 80 : 224, transition: "all 0.2s" }}
          >
            <Header
              title={headerTitle}
              user={authStore.user}
              collapsed={collapsed}
              onLogoutClick={handleLogoutClick}
            />

            <main>{children}</main>
          </Layout>
        </Layout>
      </>
    );
  }
);
