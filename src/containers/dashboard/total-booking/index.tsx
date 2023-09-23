import { Spin } from "antd";
import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useState } from "react";
import _JSXStyle from "styled-jsx/style";

import { REFRESH_DATA_INTERVAL } from "@/containers/booking-list/constants";
import { useInterval } from "@/hooks";
import { useStores } from "@/models";
import { IOrder } from "@/models/operator";

import { TotalBookingDashboard } from "./components/dashboard";
import { TotalBookingModal } from "./components/modal";

export const TotalBooking: React.FC = observer(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tabKey, setTabKey] = useState<string>("all");
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);
  const [data, setData] = useState<IOrder[]>([]);
  const { dashboardStore } = useStores();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true);
      const result = await dashboardStore.operatorOrderApi.getOrders(
        tabKey !== "all" ? tabKey : undefined
      );
      if (result.kind === "ok") {
        setData(result.result);
      }

      setIsLoadingData(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabKey]);

  useInterval(async () => {
    setIsLoadingDashboard(true);
    await dashboardStore.getTotalBooking();
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
        <TotalBookingDashboard
          analytics={dashboardStore.totalBookingAnalytics}
          total={dashboardStore.totalBooking.total}
          openModal={changeIsModalOpen(true)}
        />
      </Spin>

      <TotalBookingModal
        data={data}
        statuses={dashboardStore.totalBookingStatuses}
        isModalOpen={isModalOpen}
        handleOk={changeIsModalOpen(true)}
        handleCancel={changeIsModalOpen(false)}
        onChangeTabKey={handleChangeTabKey}
        tabKey={tabKey}
        isLoading={isLoadingData}
      />
    </>
  );
});
