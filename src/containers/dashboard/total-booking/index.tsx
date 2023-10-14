import { notification, Spin } from "antd";
import { observer } from "mobx-react-lite";
import React, { useCallback, useMemo, useState } from "react";
import _JSXStyle from "styled-jsx/style";

import { REFRESH_DATA_INTERVAL } from "@/containers/booking-list/constants";
import { useConfirmDialog, useInterval } from "@/hooks";
import { useStores } from "@/models";

import { TotalBookingDashboard } from "./components/dashboard";
import { TotalBookingModal } from "./components/modal";
import {
  convertBookingsToTable,
  convertOrdersToTable,
} from "./components/table-bookings/utils";

export const TotalBooking: React.FC = observer(() => {
  const [noti] = notification.useNotification();
  const { confirmDialog } = useConfirmDialog();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tabKey, setTabKey] = useState<string>("all");
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);
  const { dashboardStore, operatorStore } = useStores();

  const fetchData = useCallback(
    async (isRefresh = true) => {
      setIsLoadingData(true);

      if (tabKey === "assigning_driver") {
        await operatorStore.bookingStore.getBookings({
          limit: isRefresh ? operatorStore.bookingStore.pagination.limit : 10,
          page: isRefresh ? operatorStore.bookingStore.pagination.page : 1,
        });
      } else {
        await operatorStore.orderStore.getOrders({
          limit: isRefresh ? operatorStore.orderStore.pagination.limit : 10,
          page: isRefresh ? operatorStore.orderStore.pagination.page : 1,
          status: tabKey !== "all" && tabKey.toLowerCase(),
        });
      }

      setIsLoadingData(false);
    },
    [operatorStore.bookingStore, operatorStore.orderStore, tabKey]
  );

  useInterval(
    async (isRefresh: boolean) => {
      if (!isModalOpen) return;
      fetchData(isRefresh);
    },
    REFRESH_DATA_INTERVAL,
    [tabKey, isModalOpen]
  );

  const loadData = useCallback(
    async (page: number, limit: number) => {
      setIsLoadingData(true);
      if (tabKey === "assigning_driver") {
        await operatorStore.bookingStore.getBookings({ limit, page });
      } else {
        await operatorStore.orderStore.getOrders({
          limit,
          page,
          status: tabKey !== "all" && tabKey.toLowerCase(),
        });
      }
      setIsLoadingData(false);
    },
    [operatorStore.bookingStore, operatorStore.orderStore, tabKey]
  );

  const pagination = useMemo(() => {
    switch (tabKey) {
      case "assigning_driver":
        return {
          ...operatorStore.bookingStore.pagination,
          pages: operatorStore.bookingStore?.pages,
        };
      default:
        return {
          ...operatorStore.orderStore.pagination,
          pages: operatorStore.orderStore?.pages,
        };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    operatorStore.bookingStore?.pages,
    operatorStore.bookingStore.pagination.limit,
    operatorStore.bookingStore.pagination.page,
    operatorStore.orderStore?.pages,
    operatorStore.orderStore.pagination.limit,
    operatorStore.orderStore.pagination.page,
    tabKey,
  ]);

  const tableData = useMemo(() => {
    if (tabKey === "assigning_driver") {
      const bookings = operatorStore.bookingStore.bookingsView;
      return convertBookingsToTable(bookings);
    }

    const orders = operatorStore.orderStore.ordersView;

    return convertOrdersToTable(orders);
  }, [
    operatorStore.bookingStore.bookingsView,
    operatorStore.orderStore.ordersView,
    tabKey,
  ]);

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

  const handleAssignDriver = async (id: string, driverId: string) => {
    const api =
      tabKey === "assigning_driver"
        ? operatorStore.bookingStore.assignDriver
        : operatorStore.orderStore.assignDriver;
    const res = await api(id, driverId);

    if (res.kind === "conflict") {
      const content = res.errors?.[0]?.message || "Failed to assign driver";
      noti.error({ message: content });
      return false;
    }

    if (res.kind !== "ok") {
      noti.error({ message: "Failed to assign driver" });
      return false;
    }

    noti.success({ message: "Assign driver successfully" });
    fetchData(true);

    return true;
  };

  const handleCancelBooking = async (bookingId: string, code: string) => {
    const isConfirmed = await confirmDialog({
      content: (
        <span>
          Are you sure you want to cancel booking{" "}
          <span className="font-semibold">#{code}</span>
        </span>
      ),
    });

    if (!isConfirmed) {
      return;
    }

    const res = await operatorStore.bookingStore.cancelBooking(bookingId);

    if (res.kind === "conflict") {
      const content = res.errors?.[0]?.message || "Failed to cancel booking";
      noti.error({ message: content });
      return false;
    }

    if (res.kind !== "ok") {
      noti.error({ message: "Failed to cancel booking" });
      return false;
    }

    noti.success({ message: "Cancel booking successfully" });
    fetchData(true);

    return true;
  };

  const handleCancelOrder = async (orderId: string, code: string) => {
    const isConfirmed = await confirmDialog({
      content: (
        <span>
          Are you sure you want to cancel order{" "}
          <span className="font-semibold">#{code}</span>
        </span>
      ),
    });

    if (!isConfirmed) {
      return;
    }

    const res = await operatorStore.orderStore.cancelOrder(orderId);

    if (res.kind === "conflict") {
      const content = res.errors?.[0]?.message || "Failed to cancel order";
      noti.error({ message: content });
      return false;
    }

    if (res.kind !== "ok") {
      noti.error({ message: "Failed to cancel order" });
      return false;
    }

    noti.success({ message: "Cancel order successfully" });
    fetchData(true);

    return true;
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
        tableData={tableData}
        loadData={loadData}
        pagination={pagination}
        statuses={dashboardStore.totalBookingStatuses}
        isModalOpen={isModalOpen}
        handleOk={changeIsModalOpen(false)}
        handleCancel={changeIsModalOpen(false)}
        onChangeTabKey={handleChangeTabKey}
        tabKey={tabKey}
        isLoading={isLoadingData}
        // functions
        onAssignDriver={handleAssignDriver}
        onCancelBooking={handleCancelBooking}
        onCancelOrder={handleCancelOrder}
      />
    </>
  );
});
