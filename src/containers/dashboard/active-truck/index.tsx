import { Spin } from "antd";
import React, { useCallback, useState } from "react";
import _JSXStyle from "styled-jsx/style";

import { REFRESH_DATA_INTERVAL } from "@/containers/booking-list/constants";
import { useInterval } from "@/hooks";
import { useStores } from "@/models";
import { IActiveTruck } from "@/models/dashboard-store";

import { ActiveTruckDashboard, ListActiveTruckModal } from "./components";

export const ActiveTruck = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tabKey, setTabKey] = useState<string>("all");
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);
  const [data, setData] = useState<IActiveTruck[]>([]);
  const { dashboardStore } = useStores();

  useInterval(async () => {
    setIsLoadingDashboard(true);
    await dashboardStore.getActiveTruck();
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
        <ActiveTruckDashboard
          analytics={dashboardStore.activeTruckAnalytics}
          total={dashboardStore.activeTruck.total}
          totalActive={dashboardStore.activeTruck.totalActive}
          openModal={changeIsModalOpen(true)}
        />
      </Spin>
      <ListActiveTruckModal
        data={[]}
        statuses={dashboardStore.activeTruckStatuses}
        statusKey={tabKey}
        handleOk={changeIsModalOpen(true)}
        handleCancel={changeIsModalOpen(false)}
        onChangeTabKey={handleChangeTabKey}
        isModalOpen={isModalOpen}
      />
    </>
  );
};
