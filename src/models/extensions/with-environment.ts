import { getEnv, IStateTreeNode } from "mobx-state-tree";

import { AuthApi } from "@/services/api";

import { Environment } from "../environment";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const withEnvironment = (self: IStateTreeNode) => ({
  views: {
    get environment() {
      return getEnv<Environment>(self);
    },
  },
  state: {
    apiAuth: AuthApi,
  },
});
