import { Spin } from "antd";
import { observer } from "mobx-react-lite";
import React, { useCallback, useState } from "react";
import _JSXStyle from "styled-jsx/style";

import { REFRESH_DATA_INTERVAL } from "@/containers/booking-list/constants";
import { useInterval } from "@/hooks";
import { useStores } from "@/models";

import { ActiveDriverDashboard, ListActiveDriverModal } from "./components";
import { IDriverStatus } from "./types";

export const ActiveDriver = observer(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tabKey, setTabKey] = useState<IDriverStatus>("all");
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);
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

  const fetchData = useCallback(
    async (isRefresh: boolean) => {
      setIsLoadingData(true);
      await dashboardStore.getDriverList({
        page: isRefresh ? dashboardStore.activeDriver.pagination.page : 1,
        limit: isRefresh ? dashboardStore.activeDriver.pagination.limit : 10,
        status: tabKey === "all" ? undefined : tabKey,
      });
      setIsLoadingData(false);
    },
    [dashboardStore, tabKey]
  );

  const loadData = useCallback(
    async (page: number, limit: number) => {
      setIsLoadingData(true);
      await dashboardStore.getDriverList({
        page: page,
        limit: limit,
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
    [isModalOpen, tabKey]
  );

  const handleChangeTabKey = (tabKey: IDriverStatus) => {
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
          total={dashboardStore.activeDriver.summary.total}
          totalActive={dashboardStore.activeDriver.summary.totalActive}
          openModal={changeIsModalOpen(true)}
        />
      </Spin>
      <ListActiveDriverModal
        data={dashboardStore.activeDriver.driversView}
        statuses={dashboardStore.activeDriverStatuses}
        statusKey={tabKey}
        isLoading={isLoadingData}
        handleOk={changeIsModalOpen(false)}
        handleCancel={changeIsModalOpen(false)}
        onChangeTabKey={handleChangeTabKey}
        isModalOpen={isModalOpen}
        pagination={dashboardStore.activeDriver.pagination}
        loadData={loadData}
      />
    </>
  );
});
