import React, { useMemo } from "react";

import { ORDER_STATUS_OBJ } from "@/containers/booking-list/components/order-status/constants";
import { IOrderStatus } from "@/models/operator";
import { formatDate } from "@/utils/string";

import { Steps } from "../../steps";

const STEP_KEYS = [
  "order_placed",
  "on_the_way_to_pickup",
  "order_pickup",
  "on_the_way_to_dropoff",
  "completed",
];

type IProps = {
  bookingStatus: string;
  orderStatus: string;
  metadata: { status: IOrderStatus; time: string }[];
};

export const TabTracking: React.FC<IProps> = ({
  bookingStatus,
  orderStatus,
  metadata = [],
}) => {
  const status = useMemo(() => {
    if (bookingStatus === "pending") {
      return "pending";
    }
    if (bookingStatus === "confirmed") {
      return orderStatus;
    }
  }, [bookingStatus, orderStatus]);

  const STEPS = STEP_KEYS.map((key) => {
    const metadataItem = metadata.find((item) => item.status === key);
    return {
      title: ORDER_STATUS_OBJ[key]?.text,
      content: metadataItem?.time ? formatDate(metadataItem.time) : "",
    };
  });

  return (
    <div className="p-4">
      <div className="rounded-lg border p-4">
        <Steps steps={STEPS} current={STEP_KEYS.indexOf(status)} />
      </div>
    </div>
  );
};
