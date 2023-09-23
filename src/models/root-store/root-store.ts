import { Instance, SnapshotOut, types } from "mobx-state-tree";

import { AuthStoreModel } from "../auth-store";
import { DashboardModel } from "../dashboard-store";
import { withEnvironment } from "../extensions/with-environment";
import { OperatorStoreModel } from "../operator";

export const RootStoreModel = types
  .model({
    authStore: types.optional(AuthStoreModel, {}),
    operatorStore: types.optional(OperatorStoreModel, {}),
    dashboardStore: types.optional(DashboardModel, {}),
  })
  .extend(withEnvironment);

export type IRootStore = Instance<typeof RootStoreModel>;
export type IRootStoreSnapshot = SnapshotOut<typeof RootStoreModel>;
export type IStoreSnapshotOut = SnapshotOut<typeof RootStoreModel>;
