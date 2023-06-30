import { notification } from "antd";
import { observer } from "mobx-react-lite";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";

import { useStores } from "@/models";

import { OrderInfo } from "./components";
import { useFetchBookingInterval } from "./hooks/fetch-booking-interval";
import { useFetchOrderInterval } from "./hooks/fetch-order-interval";

const TrackingMaps = dynamic(
  () =>
    import("@/containers/order-details/components").then((m) => m.TrackingMaps),
  {
    ssr: false,
  }
);

const extractLatLng = (location: { latitude: number; longitude: number }) =>
  location ? { lat: location.latitude, lng: location.longitude } : null;

type IProps = {
  bookingId: string;
};

export const OrderDetailsContainer: React.FC<IProps> = observer(
  ({ bookingId }) => {
    const [noti, notiContextHolder] = notification.useNotification();

    const { operatorStore } = useStores();

    const { booking } = operatorStore.bookingStore;
    const { order } = operatorStore.orderStore;

    const router = useRouter();

    useFetchBookingInterval(bookingId);
    useFetchOrderInterval(booking?.order?.id);

    useEffect(() => {
      if (
        !bookingId ||
        ["cancelled", "expired"].includes(booking?.status) ||
        ["cancelled", "completed"].includes(order?.status)
      ) {
        noti.error({ message: "Booking has been cancelled or expired" });
        router.push("/");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookingId, booking?.status, order?.status]);

    const origin = useMemo(() => {
      if (["order_pickup", "on_the_way_to_dropoff"].includes(order?.status)) {
        return extractLatLng(booking?.pickup);
      }

      return {
        lat: order?.tracking?.current?.lat ?? 0,
        lng: order?.tracking?.current?.lng ?? 0,
      };
    }, [order?.status, order?.tracking, booking?.pickup]);

    const destination = useMemo(() => {
      if (
        ["order_placed", "schedule_delivery", "on_the_way_to_pickup"].includes(
          order?.status
        )
      ) {
        return extractLatLng(booking?.pickup);
      }

      return extractLatLng(booking?.dropoff);
    }, [booking?.dropoff, booking?.pickup, order?.status]);

    const driverLocation = useMemo(() => {
      if (!order?.tracking?.current) {
        return null;
      }

      return {
        lat: order?.tracking?.current?.lat,
        lng: order?.tracking?.current?.lng,
      };
    }, [order?.tracking]);

    const handleAssignDriver = async (bookingId: string, driverId: string) => {
      const res = await operatorStore.bookingStore.assignDriver(
        bookingId,
        driverId
      );

      if (res.kind === "conflict") {
        const message = res.errors?.[0]?.message || "Failed to assign driver";
        noti.error({ message });
        return false;
      }

      if (res.kind !== "ok") {
        noti.error({ message: "Failed to assign driver" });
        return false;
      }

      noti.success({ message: "Assign driver successfully" });
      operatorStore.bookingStore.getBooking(booking?.id);
      operatorStore.orderStore.getOrder(order?.id);

      return true;
    };

    return (
      <div className="grid h-content grid-cols-2">
        <div className="overflow-y-scroll bg-white">
          <OrderInfo
            booking={booking}
            order={order}
            onAssignDriver={handleAssignDriver}
          />
        </div>

        <div>
          <TrackingMaps
            origin={origin}
            destination={destination}
            driverLocation={driverLocation}
          />
        </div>

        {notiContextHolder}
      </div>
    );
  }
);
