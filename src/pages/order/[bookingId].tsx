import { NextPage } from "next";
import dynamic from "next/dynamic";
import Router from "next/router";

import { LayoutBase } from "@/components/layout";
import { NextPageContextWithRootStore } from "@/types/next";

const OrderDetailsContainer = dynamic(() =>
  import("@/containers/order-details").then((m) => m.OrderDetailsContainer)
);

type IProps = {
  bookingId: string;
};

const OrderDetailsPage: NextPage<IProps> = ({ bookingId }) => {
  return (
    <LayoutBase
      title="Order Details"
      headerTitle="Order Details"
      menuActiveKey="DASHBOARD"
    >
      <OrderDetailsContainer bookingId={bookingId} />
    </LayoutBase>
  );
};

OrderDetailsPage.getInitialProps = async (
  context: NextPageContextWithRootStore
) => {
  const bookingId = context.query?.bookingId as string;

  if (!bookingId) {
    if (context.res) {
      context.res.writeHead(307, { Location: "/" });
      context.res.end();
    } else {
      Router.replace("/");
    }
  }

  context.store.operatorStore.bookingStore.getBooking(bookingId);

  return {
    bookingId,
  };
};

export default OrderDetailsPage;
