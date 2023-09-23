import { NextPage } from "next";
import dynamic from "next/dynamic";
import Router from "next/router";

import { LayoutBase } from "@/components/layout";
import { NextPageContextWithRootStore } from "@/types/next";

const BookingDetailsContainer = dynamic(() =>
  import("@/containers/booking-details").then((m) => m.BookingDetailsContainer)
);

type IProps = {
  bookingId: string;
};

const BookingDetailsPage: NextPage<IProps> = ({ bookingId }) => {
  return (
    <LayoutBase
      title="Booking Details"
      headerTitle="Booking Details"
      menuActiveKey="BOOKING"
    >
      <BookingDetailsContainer bookingId={bookingId} />
    </LayoutBase>
  );
};

BookingDetailsPage.getInitialProps = async (
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

  return {
    bookingId,
  };
};

export default BookingDetailsPage;
