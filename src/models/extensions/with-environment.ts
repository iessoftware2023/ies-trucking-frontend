import { getEnv, IStateTreeNode } from "mobx-state-tree";

import {
  OperatorAuthApi,
  OperatorBookingApi,
  OperatorDashboardApi,
  OperatorOrderApi,
} from "@/services/api/operator";

import { Environment } from "../environment";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const withEnvironment = (self: IStateTreeNode) => ({
  views: {
    get environment() {
      return getEnv<Environment>(self);
    },
  },
  state: {
    operatorAuthApi: OperatorAuthApi,
    operatorBookingApi: OperatorBookingApi,
    operatorOrderApi: OperatorOrderApi,
    operatorDashboardApi: OperatorDashboardApi,
  },
});
