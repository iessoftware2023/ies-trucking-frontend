/* eslint-disable @typescript-eslint/ban-ts-comment */

import { cast, flow, Instance, types } from "mobx-state-tree";

import { withEnvironment } from "@/models/extensions";
import { OperatorOrderTypes } from "@/services/api/operator";

import { OrderModel } from "./order-model";

export const OperatorOrderStoreModel = types
  .model("OperatorOrderStoreModel")
  .props({
    orders: types.optional(types.map(OrderModel), {}),
    order: types.maybe(types.safeReference(types.late(() => OrderModel))),
  })
  .extend(withEnvironment)
  .views((self) => ({
    get ordersView() {
      return Array.from(self.orders.values());
    },
  }))
  .actions((self) => ({
    getOrders: flow(function* () {
      const result: OperatorOrderTypes.RequestGetOrdersResult =
        yield self.operatorOrderApi.getOrders();

      if (result.kind === "ok") {
        self.orders.clear();
        result.result.forEach((order) => {
          self.orders.set(order.id, cast(order));
        });
      }

      return result;
    }),

    getOrder: flow(function* (orderId: string) {
      const result: OperatorOrderTypes.RequestGetOrderResult =
        yield self.operatorOrderApi.getOrder(orderId);

      if (result.kind === "ok") {
        // @ts-ignore
        self.order = result.result.id;
        self.orders.set(result.result.id, cast(result.result));
      }
      return result;
    }),
  }));

export type IOperatorOrderStore = Instance<typeof OperatorOrderStoreModel>;
