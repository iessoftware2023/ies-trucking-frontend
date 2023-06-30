import { useEffect } from "react";

import { REFRESH_DATA_INTERVAL } from "@/containers/booking-list/constants";
import { useStores } from "@/models";

export const useFetchBookingInterval = (bookingId: string) => {
  const {
    operatorStore: {
      bookingStore: { getBooking, booking },
    },
  } = useStores();

  useEffect(() => {
    const fetchData = async () => {
      console.log("useFetchBookingInterval");
      if (bookingId) {
        await getBooking(bookingId);
      }
    };

    fetchData();

    let intervalId: NodeJS.Timeout;
    if (bookingId && booking?.status === "pending") {
      intervalId = setInterval(fetchData, REFRESH_DATA_INTERVAL);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [booking?.status, bookingId, getBooking]);
};
