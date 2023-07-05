import { Button, Input, notification, Segmented } from "antd";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { observer } from "mobx-react-lite";
import React, { useEffect, useMemo, useState } from "react";

import { useInterval } from "@/hooks";
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

  const { operatorStore } = useStores();

  const [tabKey, setTabKey] = useState<ITrackingTabKey>("WAITING_ASSIGN");
  const [isLoading, setIsLoading] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState("");

  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const [formFilterValues, setFormFilterValues] = useState<IFormFilterValues>();

  const isAppliedFilter =
    formFilterValues?.dateRange?.length || formFilterValues?.status?.length;

  const fetchData = async (shouldLoading = true) => {
    if (shouldLoading) {
      setIsLoading(true);
    }

    if (tabKey === "WAITING_ASSIGN") {
      console.log("get bookings");
      await operatorStore.bookingStore.getBookings();
    } else {
      console.log("get orders");
      await operatorStore.orderStore.getOrders();
    }

    setRefreshFlag(new Date().toISOString());

    if (shouldLoading) {
      setIsLoading(false);
    }
  };

  const handleAssignDriver = async (bookingId: string, driverId: string) => {
    const res = await operatorStore.bookingStore.assignDriver(
      bookingId,
      driverId
    );

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

  const handleCancelBooking = async (bookingId: string) => {
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

  const handleCancelOrder = async (orderId: string) => {
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

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabKey]);

  useInterval(() => {
    fetchData(false);
  }, REFRESH_DATA_INTERVAL);

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
    </div>
  );
};

export const BookingListContainer = observer(BookingListContainerCom);
