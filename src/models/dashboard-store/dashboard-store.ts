import { sumBy } from "lodash";
import { cast, flow, Instance, SnapshotOut, types } from "mobx-state-tree";

import { withEnvironment } from "@/models/extensions";
import { RequestGetTotalBookingResult } from "@/services/api/operator/dashboard-api/type";

import { TotalBookingModel } from "./dashboard-model";

const statuses = [
  {
    title: "Order Placed",
    color: "#E88B00",
    status: "order_placed",
  },
  {
    title: "On the Way to Pickup",
    color: "#00DAE8",
    status: "on_the_way_to_pickup",
  },
  {
    title: "Pick-up order",
    color: "#00F5BA",
    status: "order_pickup",
  },
  {
    title: "On the way to delivery",
    color: "#009DF5",
    status: "on_the_way_to_dropoff",
  },
  {
    title: "Delivery completed",
    color: "#47DF00",
    status: "completed",
  },
  {
    title: "Order cancelled",
    color: "#E1E1E2",
    status: "cancelled",
  },
];

export const DashboardModel = types
  .model("DashboardModel")
  .props({
    totalBooking: types.optional(TotalBookingModel, {}),
  })
  .views((self) => {
    const views = {
      getItem(status: string) {
        return self.totalBooking.data.find((d) => d.status === status);
      },
      get totalBookingAnalytics() {
        return [
          {
            title: "Assigning Driver",
            status: "assigning_driver",
            color: "#FFD495",
            count:
              self.totalBooking.total - sumBy(self.totalBooking.data, "count"),
          },
          ...statuses.map((item) => {
            return {
              ...item,
              count: views.getItem(item.status)?.count ?? 0,
            };
          }),
        ];
      },
      get totalBookingStatuses() {
        return [
          {
            title: "All",
            status: "all",
            color: "#FFD495",
            count: self.totalBooking.total,
          },
          ...statuses.map((item) => {
            return {
              ...item,
              count: views.getItem(item.status)?.count ?? 0,
            };
          }),
        ];
      },
    };
    return views;
  })
  .extend(withEnvironment)
  .actions((self) => ({
    getTotalBooking: flow(function* () {
      const result: RequestGetTotalBookingResult =
        yield self.operatorDashboardApi.getTotalBooking();

      if (result.kind === "ok") {
        self.totalBooking = cast(result.result);
      }
    }),
  }));

export type IDashboard = Instance<typeof DashboardModel>;
export type IDashboardSnapshot = SnapshotOut<typeof DashboardModel>;
