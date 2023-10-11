import { NextPage } from "next";
import dynamic from "next/dynamic";
import Router from "next/router";

import { LayoutBase } from "@/components/layout";
import { RequestGetDriverDetailResult } from "@/services/api/operator/dashboard-api/type";
import { NextPageContextWithRootStore } from "@/types/next";

const DriverDetailContainer = dynamic(() =>
  import("@/containers/driver-detail").then((m) => m.DriverDetailContainer)
);

type IProps = {
  driverId: string;
};

const DriverDetailsPage: NextPage<IProps> = ({ driverId }) => {
  console.log("driverId", driverId);
  return (
    <LayoutBase
      title="Driver Details"
      headerTitle="Driver Details"
      menuActiveKey="DASHBOARD"
    >
      <DriverDetailContainer />
    </LayoutBase>
  );
};

DriverDetailsPage.getInitialProps = async (
  context: NextPageContextWithRootStore
) => {
  const driverId = context.query?.driverId as string;
  const result: RequestGetDriverDetailResult =
    await context.store.dashboardStore.getDriverDetail(driverId);

  if (!driverId || result.kind !== "ok") {
    if (context.res) {
      context.res.writeHead(307, { Location: "/dashboard" });
      context.res.end();
    } else {
      Router.replace("/dashboard");
    }
  }

  return {
    driverId,
  };
};

export default DriverDetailsPage;
