import { notification } from "antd";
import { observer } from "mobx-react-lite";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";

import { useStores } from "@/models";

import { BookingInfo, MapsEmpty } from "./components";
import { useFetchBookingInterval } from "./hooks/fetch-booking-interval";
import { useFetchOrderInterval } from "./hooks/fetch-order-interval";
import { extractLatLngFromModel } from "./utils";

const TrackingMaps = dynamic(
  () =>
    import("@/containers/booking-details/components").then(
      (m) => m.TrackingMaps
    ),
  {
    ssr: false,
  }
);

type IProps = {
  bookingId: string;
};

export const BookingDetailsContainer: React.FC<IProps> = observer(
  ({ bookingId }) => {
    const [noti, notiContextHolder] = notification.useNotification();

    const { operatorStore } = useStores();

    const { booking } = operatorStore.bookingStore;
    const { order } = operatorStore.orderStore;

    useFetchBookingInterval(bookingId);
    useFetchOrderInterval(booking?.order?.id);

    const origin = useMemo(() => {
      const originObj = {
        order_placed: booking?.pickup,
        on_the_way_to_pickup: order?.tracking?.current,
        order_pickup: booking?.pickup,
        on_the_way_to_dropoff: booking?.pickup,
        cancelled: booking?.pickup,
        completed: booking?.pickup,
        undefined: booking?.pickup,
      };

      return extractLatLngFromModel(originObj[order?.status]);
    }, [order?.status, order?.tracking, booking?.pickup]);

    const destination = useMemo(() => {
      const destinationObj = {
        order_placed: booking?.dropoff,
        on_the_way_to_pickup: booking?.pickup,
        order_pickup: booking?.dropoff,
        on_the_way_to_dropoff: booking?.dropoff,
        cancelled: booking?.dropoff,
        completed: booking?.dropoff,
        undefined: booking?.dropoff,
      };

      return extractLatLngFromModel(destinationObj[order?.status]);
    }, [booking?.dropoff, booking?.pickup, order?.status]);

    const driverLocation = useMemo(() => {
      if (!order?.tracking?.current) {
        return null;
      }

      return {
        lat: order?.tracking?.current?.lat,
        lng: order?.tracking?.current?.lng,
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [order?.tracking?.current?.lat, order?.tracking?.current?.lng]);

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
      <div className="grid h-content grid-cols-2 divide-x">
        <div className="overflow-y-scroll bg-white">
          <div>
            {order?.tracking?.current?.lat}, {order?.tracking?.current?.lng}
          </div>

          <BookingInfo
            booking={booking}
            order={order}
            onAssignDriver={handleAssignDriver}
          />
        </div>

        <div className="overflow-hidden">
          {![undefined, "confirmed"].includes(booking?.status) ? (
            <MapsEmpty
              title="Please wait a moment..."
              description="The tracking map will be displayed when the order change on-going status"
            />
          ) : (
            <>
              {[undefined, "cancelled", "completed"].includes(order?.status) ? (
                <MapsEmpty
                  title="The order has ended"
                  description="The tracking map will only be displayed when the order has an on-going
                status."
                />
              ) : (
                <TrackingMaps
                  pickup={extractLatLngFromModel(booking?.pickup)}
                  dropoff={extractLatLngFromModel(booking?.dropoff)}
                  //
                  origin={origin}
                  destination={destination}
                  driverLocation={driverLocation}
                />
              )}
            </>
          )}
        </div>

        {notiContextHolder}
      </div>
    );
  }
);
