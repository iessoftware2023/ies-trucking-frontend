import { applySnapshot, Instance, SnapshotOut, types } from "mobx-state-tree";

import { OperatorBookingStoreModel } from "./booking-store";
import { OperatorOrderStoreModel } from "./order-store";

export * from "./booking-store";
export * from "./order-store";

export const OperatorStoreModel = types
  .model("OperatorStoreModel")
  .props({
    bookingStore: types.optional(OperatorBookingStoreModel, {}),
    orderStore: types.optional(OperatorOrderStoreModel, {}),
  })
  .actions((self) => ({
    reset() {
      applySnapshot(self, {});
    },
  }));

export type IOperatorStore = Instance<typeof OperatorStoreModel>;
export type IOperatorStoreSnapshot = SnapshotOut<typeof OperatorStoreModel>;
