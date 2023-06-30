import React, { useMemo } from "react";

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
};

export const TabTracking: React.FC<IProps> = ({
  bookingStatus,
  orderStatus,
}) => {
  const status = useMemo(() => {
    if (bookingStatus === "pending") {
      return "pending";
    }
    if (bookingStatus === "confirmed") {
      return orderStatus;
    }
  }, [bookingStatus, orderStatus]);

  const STEPS = [
    {
      title: "Order placed",
      content: formatDate(new Date()),
    },
    {
      title: "On the way to pick-up",
      content: formatDate(new Date()),
    },
    {
      title: "Pick-up order",
      content: "",
    },
    {
      title: "On the way to delivery",
      content: "",
    },
    {
      title: "Delivery completed",
      content: "",
    },
  ];

  return (
    <div className="p-4">
      <div className="rounded-lg border p-4">
        <Steps steps={STEPS} current={STEP_KEYS.indexOf(status)} />
      </div>
    </div>
  );
};
