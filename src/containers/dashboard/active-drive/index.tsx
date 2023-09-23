import { Spin } from "antd";
import React, { useCallback, useState } from "react";
import _JSXStyle from "styled-jsx/style";

import { REFRESH_DATA_INTERVAL } from "@/containers/booking-list/constants";
import { useInterval } from "@/hooks";
import { useStores } from "@/models";
import { IActiveDriver } from "@/models/dashboard-store";

import { ActiveDriverDashboard, ListActiveDriverModal } from "./components";

export const ActiveDriver = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tabKey, setTabKey] = useState<string>("all");
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);
  const [data, setData] = useState<IActiveDriver[]>([]);
  const { dashboardStore } = useStores();

  useInterval(async () => {
    setIsLoadingDashboard(true);
    await dashboardStore.getActiveDriver();
    setIsLoadingDashboard(false);
  }, REFRESH_DATA_INTERVAL);

  const changeIsModalOpen = useCallback(
    (isModalOpen: boolean) => () => {
      setIsModalOpen(isModalOpen);
    },
    []
  );

  const handleChangeTabKey = (tabKey: string) => {
    if (isLoadingData) return;
    setTabKey(tabKey);
  };

  return (
    <>
      <_JSXStyle jsx>{`
        .ant-spin-wrapper {
          display: flex;
          flex: 1;
        }
        .ant-spin-wrapper .ant-spin-container {
          display: flex;
          flex: 1;
        }
      `}</_JSXStyle>
      <Spin
        wrapperClassName="ant-spin-wrapper"
        style={{ display: "flex" }}
        spinning={isLoadingDashboard}
      >
        <ActiveDriverDashboard
          analytics={dashboardStore.activeDriverAnalytics}
          total={dashboardStore.activeDriver.total}
          totalActive={dashboardStore.activeDriver.totalActive}
          openModal={changeIsModalOpen(true)}
        />
      </Spin>
      <ListActiveDriverModal
        data={[]}
        statuses={dashboardStore.activeDriverStatuses}
        statusKey={tabKey}
        handleOk={changeIsModalOpen(true)}
        handleCancel={changeIsModalOpen(false)}
        onChangeTabKey={handleChangeTabKey}
        isModalOpen={isModalOpen}
      />
    </>
  );
};
