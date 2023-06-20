import dynamic from "next/dynamic";

import { LayoutBase } from "@/components/layout";

const OrdersContainer = dynamic(() =>
  import("@/containers/orders").then((m) => m.OrdersContainer)
);

export default function HomePage() {
  return (
    <LayoutBase title="Home" menuActiveKey="DASHBOARD">
      <OrdersContainer />
    </LayoutBase>
  );
}
