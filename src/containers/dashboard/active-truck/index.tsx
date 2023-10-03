import { Spin } from "antd";
import React, { useCallback, useState } from "react";
import _JSXStyle from "styled-jsx/style";

import { REFRESH_DATA_INTERVAL } from "@/containers/booking-list/constants";
import { useInterval } from "@/hooks";
import { useStores } from "@/models";

import { ActiveTruckDashboard, ListActiveTruckModal } from "./components";
import { IActiveTruckStatus } from "./types";

export const ActiveTruck = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tabKey, setTabKey] = useState<IActiveTruckStatus>("all");
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);
  const { dashboardStore } = useStores();

  useInterval(async () => {
    setIsLoadingDashboard(true);
    await dashboardStore.getActiveTruck();
    setIsLoadingDashboard(false);
  }, REFRESH_DATA_INTERVAL);

  const fetchData = useCallback(
    async (isRefresh: boolean) => {
      setIsLoadingData(true);
      await dashboardStore.getTruckList({
        page: isRefresh ? dashboardStore.activeTruck.pagination.page : 1,
        limit: isRefresh ? dashboardStore.activeTruck.pagination.limit : 10,
        status: tabKey === "all" ? undefined : tabKey,
      });
      setIsLoadingData(false);
    },
    [dashboardStore, tabKey]
  );

  useInterval(
    (isRefresh: boolean) => {
      if (!isModalOpen) return;
      fetchData(isRefresh);
    },
    REFRESH_DATA_INTERVAL,
    [tabKey, isModalOpen]
  );

  const loadData = useCallback(
    async (page: number, limit: number) => {
      setIsLoadingData(true);
      await dashboardStore.getTruckList({
        page: page,
        limit: limit,
        status: tabKey === "all" ? undefined : tabKey,
      });
      setIsLoadingData(false);
    },
    [dashboardStore, tabKey]
  );

  const changeIsModalOpen = useCallback(
    (isModalOpen: boolean) => () => {
      setIsModalOpen(isModalOpen);
    },
    []
  );

  const handleChangeTabKey = (tabKey: IActiveTruckStatus) => {
    if (isLoadingData) return;
    setTabKey(tabKey);
  };

  console.log("📢 isLoadingData", isLoadingData);

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
          total={dashboardStore.activeTruck.summary.total}
          totalActive={dashboardStore.activeTruck.summary.totalActive}
          openModal={changeIsModalOpen(true)}
        />
      </Spin>
      <ListActiveTruckModal
        data={dashboardStore.activeTruck.trucksView}
        statuses={dashboardStore.activeTruckStatuses}
        statusKey={tabKey}
        handleOk={changeIsModalOpen(false)}
        handleCancel={changeIsModalOpen(false)}
        onChangeTabKey={handleChangeTabKey}
        isModalOpen={isModalOpen}
        isLoading={isLoadingData}
        loadData={loadData}
        pagination={dashboardStore.activeTruck.pagination}
      />
    </>
  );
};
