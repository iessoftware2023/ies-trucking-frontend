import dynamic from "next/dynamic";

import { LayoutBase } from "@/components/layout";

const OrderDetailsContainer = dynamic(() =>
  import("@/containers/order-details").then((m) => m.OrderDetailsContainer)
);

export default function HomePage() {
  return (
    <LayoutBase
      title="Order Details"
      headerTitle="Order Details"
      menuActiveKey="DASHBOARD"
    >
      <OrderDetailsContainer />
    </LayoutBase>
  );
}
