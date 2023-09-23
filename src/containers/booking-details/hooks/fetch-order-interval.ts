import { useEffect } from "react";

import { REFRESH_DATA_INTERVAL } from "@/containers/booking-list/constants";
import { useStores } from "@/models";

export const useFetchOrderInterval = (orderId: string) => {
  const {
    operatorStore: {
      orderStore: { getOrder, order },
    },
  } = useStores();

  useEffect(() => {
    const fetchData = async () => {
      console.log("useFetchOrderInterval");
      if (orderId) {
        console.time("order");
        await getOrder(orderId);
        console.timeEnd("order");
      }
    };

    fetchData();

    let intervalId: NodeJS.Timer;
    if (orderId && !["completed", "cancelled"].includes(order?.status)) {
      intervalId = setInterval(fetchData, REFRESH_DATA_INTERVAL);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [orderId, order?.status, getOrder]);
};
