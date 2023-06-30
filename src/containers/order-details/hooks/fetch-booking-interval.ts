import { useEffect } from "react";

import { REFRESH_DATA_INTERVAL } from "@/containers/orders/constants";
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

    // Fetch data immediately upon focus
    fetchData();

    // Then fetch data every 30 seconds
    let intervalId: NodeJS.Timeout;
    if (bookingId && booking?.status === "pending") {
      intervalId = setInterval(fetchData, REFRESH_DATA_INTERVAL);
    }

    // Clear the interval upon losing focus
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [booking?.status, bookingId, getBooking]);
};
