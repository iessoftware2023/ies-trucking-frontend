import React from "react";

import { LayoutBase } from "@/components/layout";
import { DashboardContainer } from "@/containers/dashboard";

const DashboardPage = () => {
  return (
    <LayoutBase
      title="Dashboard"
      headerTitle="Dashboard"
      menuActiveKey="DASHBOARD"
    >
      <DashboardContainer />
    </LayoutBase>
  );
};

export default DashboardPage;
