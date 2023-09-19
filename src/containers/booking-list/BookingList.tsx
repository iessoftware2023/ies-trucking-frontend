import { Button, Input, notification, Segmented } from "antd";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { observer } from "mobx-react-lite";
import React, { memo, useCallback, useMemo, useState } from "react";

import { useConfirmDialog, useInterval } from "@/hooks";
import { useStores } from "@/models";

import { TableBookings } from "./components";
import { DrawerFilter, IFormFilterValues } from "./components/drawer-filter";
import {
  convertBookingsToTable,
  convertOrdersToTable,
  getBookingSearchField,
  getOrderSearchField,
} from "./components/table-bookings/utils";
import { REFRESH_DATA_INTERVAL, TRACKING_TABS } from "./constants";
import { ITrackingTabKey } from "./types";
import { handleTrackingFilter } from "./utils";

dayjs.extend(isBetween);

const BookingListContainerCom: React.FC = () => {
  const [noti, notiContextHolder] = notification.useNotification();
  const { confirmDialog, modalContextHolder } = useConfirmDialog();

  const { operatorStore } = useStores();

  const [tabKey, setTabKey] = useState<ITrackingTabKey>("WAITING_ASSIGN");
  const [isLoading, setIsLoading] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState("");

  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const [formFilterValues, setFormFilterValues] = useState<IFormFilterValues>();

  const isAppliedFilter =
    formFilterValues?.dateRange?.length || formFilterValues?.status?.length;

  const fetchData = useCallback(
    async (shouldLoading = true) => {
      if (shouldLoading) {
        setIsLoading(true);
      }

      if (tabKey === "WAITING_ASSIGN") {
        console.log("get bookings");
        console.log("start: ", new Date().toUTCString());
        await operatorStore.bookingStore.getBookings();
        console.log("end: ", new Date().toUTCString());
      } else {
        console.log("get orders");
        console.log("start: ", new Date().toUTCString());
        await operatorStore.orderStore.getOrders();
        console.log("end: ", new Date().toUTCString());
      }

      setRefreshFlag(new Date().toISOString());

      if (shouldLoading) {
        setIsLoading(false);
      }
    },
    [operatorStore.bookingStore, operatorStore.orderStore, tabKey]
  );

  const handleAssignDriver = async (id: string, driverId: string) => {
    const api =
      tabKey === "WAITING_ASSIGN"
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

  const handleApplyFilter = (values: IFormFilterValues) => {
    setFormFilterValues(values);
    setIsOpenFilter(false);
  };

  useInterval(fetchData, REFRESH_DATA_INTERVAL);

  const tableData = useMemo(() => {
    if (tabKey === "WAITING_ASSIGN") {
      const bookings = operatorStore.bookingStore.bookingsView.filter(
        (booking) => {
          return handleTrackingFilter(formFilterValues, {
            tabKey,
            date: booking.pickupTime,
            status: booking.status,
            searchField: getBookingSearchField(booking),
          });
        }
      );
      return convertBookingsToTable(bookings);
    }

    const orders = operatorStore.orderStore.ordersView.filter((order) => {
      return handleTrackingFilter(formFilterValues, {
        tabKey,
        date: order.booking.pickupTime,
        status: order.status,
        searchField: getOrderSearchField(order),
      });
    });

    return convertOrdersToTable(orders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshFlag, formFilterValues]);

  return (
    <div>
      <div className="flex space-x-4 border-b bg-white p-4">
        <Segmented
          options={TRACKING_TABS}
          size="large"
          value={tabKey}
          onChange={(key: ITrackingTabKey) => setTabKey(key)}
        />

        <div className="flex-1" />

        <Input.Search
          placeholder="Search"
          style={{ width: 256 }}
          onSearch={(value) => {
            setFormFilterValues((prevValues) => {
              return {
                ...prevValues,
                search: value,
              };
            });
          }}
          allowClear
        />
        <Button
          type={isAppliedFilter ? "primary" : "default"}
          icon={<i className="far fa-filter" />}
          onClick={() => setIsOpenFilter(true)}
        >
          {isAppliedFilter ? "Update Filter" : "Add Filter"}
        </Button>
      </div>

      <div className="p-4">
        <TableBookings
          tabKey={tabKey}
          data={tableData}
          isLoading={isLoading}
          //
          onAssignDriver={handleAssignDriver}
          onCancelBooking={handleCancelBooking}
          onCancelOrder={handleCancelOrder}
        />
      </div>

      <DrawerFilter
        isOpen={isOpenFilter}
        tabKey={tabKey}
        initialValues={formFilterValues}
        onSubmit={handleApplyFilter}
        onClose={() => setIsOpenFilter(false)}
      />

      {notiContextHolder}
      {modalContextHolder}
    </div>
  );
};

export const BookingListContainer = memo(observer(BookingListContainerCom));
