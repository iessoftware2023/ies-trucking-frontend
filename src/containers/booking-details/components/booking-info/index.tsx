import { Tabs } from "antd";
import React from "react";

import { OrderStatus } from "@/containers/booking-list/components/order-status";
import { IBooking, IOrder } from "@/models/operator";
import { currencyFormat, distanceFormat, durationFormat } from "@/utils/number";

import { TabInfo } from "./tab-info";
import { TabTracking } from "./tab-tracking";

type IProps = {
  booking: IBooking;
  order: IOrder;

  onAssignDriver: (bookingId: string, driverId: string) => Promise<boolean>;
};

export const BookingInfo: React.FC<IProps> = ({
  booking,
  order,
  onAssignDriver,
}) => {
  if (!booking?.id) {
    return null;
  }

  return (
    <div>
      <div className="sticky top-0 z-10 flex items-center border-b bg-white p-4">
        <div className="flex flex-1 flex-col">
          <span className="text-lg font-semibold">#{booking?.code}</span>
          <span className="uppercase text-gray-400">Booking ID</span>
        </div>

        <OrderStatus
          bookingStatus={booking?.status}
          orderStatus={order?.status}
        />
      </div>

      <div className="border-b p-4">
        <div className="grid grid-cols-3 divide-x">
          <div className="flex items-center justify-center space-x-1">
            <span className="text-gray-400">Distance:</span>
            <span className="font-semibold">
              {distanceFormat(booking?.distance)}
            </span>
          </div>

          <div className="flex items-center justify-center space-x-1">
            <span className="text-gray-400">Time:</span>
            <span className="font-semibold">
              {durationFormat(booking?.duration)}
            </span>
          </div>

          <div className="flex items-center justify-center space-x-1">
            <span className="text-gray-400">Total:</span>
            <span className="font-semibold">
              {currencyFormat(
                order?.status === "cancelled" ? 0 : booking?.cost,
                { currency: booking?.currency }
              )}
            </span>
          </div>
        </div>
      </div>

      {booking?.status === "pending" && (
        <TabInfo
          booking={booking}
          order={order}
          onAssignDriver={onAssignDriver}
        />
      )}

      {booking?.status === "confirmed" && (
        <Tabs
          items={[
            {
              key: "INFO",
              label: "Order Details",
              children: (
                <TabInfo
                  booking={booking}
                  order={order}
                  onAssignDriver={onAssignDriver}
                />
              ),
            },
            {
              key: "TRACKING",
              label: "Tracking Details",
              children: (
                <TabTracking
                  orderCreatedAt={order?.createdAt}
                  bookingStatus={booking?.status}
                  orderStatus={order?.status}
                  metadata={order?.metadata}
                />
              ),
            },
          ]}
          centered
          tabBarStyle={{ marginBottom: 0 }}
        />
      )}
    </div>
  );
};
