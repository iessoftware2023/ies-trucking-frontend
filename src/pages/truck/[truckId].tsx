import { NextPage } from "next";
import dynamic from "next/dynamic";
import Router from "next/router";

import { LayoutBase } from "@/components/layout";
import { RequestGetTruckDetailResult } from "@/services/api/operator/dashboard-api/type";
import { NextPageContextWithRootStore } from "@/types/next";

const TruckDetailContainer = dynamic(() =>
  import("@/containers/truck-detail").then((m) => m.TruckDetailContainer)
);

type IProps = {
  truckId: string;
};

const DriverDetailsPage: NextPage<IProps> = ({ truckId }) => {
  console.log("truckId", truckId);
  return (
    <LayoutBase
      title="Truck Details"
      headerTitle="Truck Details"
      menuActiveKey="DASHBOARD"
    >
      <TruckDetailContainer />
    </LayoutBase>
  );
};

DriverDetailsPage.getInitialProps = async (
  context: NextPageContextWithRootStore
) => {
  const truckId = context.query?.truckId as string;
  const result: RequestGetTruckDetailResult =
    await context.store.dashboardStore.getTruckDetail(truckId);

  if (!truckId || result.kind !== "ok") {
    if (context.res) {
      context.res.writeHead(307, { Location: "/dashboard" });
      context.res.end();
    } else {
      Router.replace("/dashboard");
    }
  }

  return {
    truckId,
  };
};

export default DriverDetailsPage;
