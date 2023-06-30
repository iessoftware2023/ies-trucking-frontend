import { useEffect } from "react";

import { REFRESH_DATA_INTERVAL } from "@/containers/orders/constants";
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
        await getOrder(orderId);
      }
    };

    // Fetch data immediately upon focus
    fetchData();

    // Then fetch data every 30 seconds
    let intervalId: NodeJS.Timer;
    if (orderId && !["completed", "cancelled"].includes(order?.status)) {
      intervalId = setInterval(fetchData, REFRESH_DATA_INTERVAL);
    }

    // Clear the interval upon losing focus
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [orderId, order?.status, getOrder]);
};
