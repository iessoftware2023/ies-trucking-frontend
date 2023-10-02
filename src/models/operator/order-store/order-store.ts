/* eslint-disable @typescript-eslint/ban-ts-comment */

import { cast, flow, Instance, types } from "mobx-state-tree";

import { withEnvironment } from "@/models/extensions";
import { OperatorOrderTypes } from "@/services/api/operator";

import { OrderModel, OrderPaginationModel } from "./order-model";

export const OperatorOrderStoreModel = types
  .model("OperatorOrderStoreModel")
  .props({
    orders: types.optional(types.map(OrderModel), {}),
    order: types.maybe(types.safeReference(OrderModel)),
    pagination: types.optional(OrderPaginationModel, {}),
  })
  .extend(withEnvironment)
  .views((self) => ({
    get ordersView() {
      return Array.from(self.orders.values());
    },
    get pages() {
      return Math.ceil(self.pagination.total / self.pagination.limit);
    },
  }))
  .actions((self) => ({
    getOrders: flow(function* ({
      status,
      type,
      page = 1,
      limit = 10,
    }: {
      status?: string;
      type?: string;
      page: number;
      limit: number;
    }) {
      const result: OperatorOrderTypes.RequestGetOrdersResult =
        yield self.operatorOrderApi.getOrders({ status, type, page, limit });
      if (result.kind === "ok") {
        const { data, pagination } = result.result;
        self.orders.clear();
        data.forEach((order) => {
          self.orders.set(order.id, cast(order));
        });
        self.pagination = pagination;
      }

      return result;
    }),

    getOrder: flow(function* (orderId: string) {
      const result: OperatorOrderTypes.RequestGetOrderResult =
        yield self.operatorOrderApi.getOrder(orderId);

      if (result.kind === "ok") {
        self.orders.set(result.result.id, cast(result.result));
        // @ts-ignore
        self.order = result.result.id;
      }

      return result;
    }),

    assignDriver: flow(function* (orderId: string, driverId: string) {
      const result: OperatorOrderTypes.RequestAssignDriverResult =
        yield self.operatorOrderApi.assignDriver(orderId, driverId);
      return result;
    }),

    cancelOrder: flow(function* (orderId: string) {
      const result: OperatorOrderTypes.RequestCancelOrderResult =
        yield self.operatorOrderApi.cancelOrder(orderId);
      return result;
    }),
  }));

export type IOperatorOrderStore = Instance<typeof OperatorOrderStoreModel>;
