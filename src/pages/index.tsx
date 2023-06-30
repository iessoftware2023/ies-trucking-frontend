import dynamic from "next/dynamic";

import { LayoutBase } from "@/components/layout";

const BookingListContainer = dynamic(() =>
  import("@/containers/booking-list").then((m) => m.BookingListContainer)
);

export default function HomePage() {
  return (
    <LayoutBase title="Home" menuActiveKey="DASHBOARD">
      <BookingListContainer />
    </LayoutBase>
  );
}
