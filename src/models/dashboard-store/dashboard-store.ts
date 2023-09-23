import { sumBy } from "lodash";
import { cast, flow, Instance, SnapshotOut, types } from "mobx-state-tree";

import { withEnvironment } from "@/models/extensions";
import {
  RequestGetActiveDriverResponse,
  RequestGetActiveTruckResponse,
  RequestGetTotalBookingResult,
} from "@/services/api/operator/dashboard-api/type";

import {
  ActiveDriverModel,
  ActiveTruckModel,
  TotalBookingModel,
} from "./dashboard-model";

const bookingStatuses = [
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

const activeTrucks = [
  {
    status: "on_the_way_to_pickup",
    title: "On the way to pick-up",
    color: "#00DAE8",
  },
  {
    status: "order_pickup",
    title: "Pick-up order",
    color: "#00F5BA",
  },
  {
    status: "on_the_way_to_dropoff",
    title: "On the way to delivery",
    color: "#009DF5",
  },
  {
    status: "inactive",
    title: "Inactive",
    color: "#E1E1E2",
  },
];

export const DashboardModel = types
  .model("DashboardModel")
  .props({
    totalBooking: types.optional(TotalBookingModel, {}),
    activeDriver: types.optional(ActiveDriverModel, {}),
    activeTruck: types.optional(ActiveTruckModel, {}),
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
          ...bookingStatuses.map((item) => {
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
          ...views.totalBookingAnalytics,
        ];
      },
    };
    return views;
  })
  .views((self) => {
    const views = {
      get activeTruckAnalytics() {
        return activeTrucks.map((item) => {
          return {
            ...item,
            count:
              self.activeTruck.data.find((d) => d.status === item.status)
                ?.count ?? 0,
          };
        });
      },
      get activeTruckStatuses() {
        return [
          {
            title: "All",
            status: "all",
            color: "#FFD495",
            count: self.activeTruck.total,
          },
          ...views.activeTruckAnalytics,
        ];
      },
    };
    return views;
  })
  .views((self) => {
    const views = {
      get activeDriverAnalytics() {
        return activeTrucks.map((item) => {
          return {
            ...item,
            count:
              self.activeDriver.data.find((d) => d.status === item.status)
                ?.count ?? 0,
          };
        });
      },
      get activeDriverStatuses() {
        return [
          {
            title: "All",
            status: "all",
            color: "#FFD495",
            count: self.activeDriver.total,
          },
          ...views.activeDriverAnalytics,
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
    getActiveDriver: flow(function* () {
      const result: RequestGetActiveDriverResponse =
        yield self.operatorDashboardApi.getActiveDriver();

      if (result.kind === "ok") {
        self.activeDriver = cast(result.result);
      }
    }),
    getActiveTruck: flow(function* () {
      const result: RequestGetActiveTruckResponse =
        yield self.operatorDashboardApi.getActiveTruck();

      if (result.kind === "ok") {
        self.activeTruck = cast(result.result);
      }
    }),
  }));

export type IDashboard = Instance<typeof DashboardModel>;
export type IDashboardSnapshot = SnapshotOut<typeof DashboardModel>;
