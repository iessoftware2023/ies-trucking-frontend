import dayjs from "dayjs";
import { sumBy } from "lodash";
import { cast, flow, Instance, SnapshotOut, types } from "mobx-state-tree";

import { withEnvironment } from "@/models/extensions";
import {
  IDriveStatus,
  RequestGetActiveDriverResult,
  RequestGetActiveTruckResult,
  RequestGetBookingHistoryResult,
  RequestGetDriverListResult,
  RequestGetTotalBookingResult,
  RequestGetTotalIncomeResult,
} from "@/services/api/operator/dashboard-api/type";

import {
  ActiveDriverModel,
  ActiveTruckModel,
  BookingHistoryModel,
  IncomeModel,
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
    bookingHistory: types.optional(types.map(BookingHistoryModel), {}),
    income: types.optional(IncomeModel, {}),
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
              self.activeTruck.summary.data.find(
                (d) => d.status === item.status
              )?.count ?? 0,
          };
        });
      },
      get activeTruckStatuses() {
        return [
          {
            title: "All",
            status: "all",
            color: "#FFD495",
            count: self.activeTruck.summary.total,
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
              self.activeDriver.summary.data.find(
                (d) => d.status === item.status
              )?.count ?? 0,
          };
        });
      },
      get activeDriverStatuses() {
        return [
          {
            title: "All",
            status: "all",
            color: "#FFD495",
            count: self.activeDriver.summary.total,
          },
          ...views.activeDriverAnalytics,
        ];
      },
    };
    return views;
  })
  .views((self) => ({
    bookingHistoryView(startDate: string, endDate: string) {
      const diffDate = dayjs(endDate).diff(dayjs(startDate), "day");
      return Array.from({ length: diffDate + 1 }).map((_, index) => {
        const dayValue = dayjs(startDate).add(index, "day").valueOf();
        return [
          dayValue,
          self.bookingHistory.get(dayValue.toString())?.total ?? 0,
        ];
      });
    },
  }))
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
      const result: RequestGetActiveDriverResult =
        yield self.operatorDashboardApi.getActiveDriver();

      if (result.kind === "ok") {
        self.activeDriver.summary = cast(result.result);
      }
    }),
    getDriverList: flow(function* ({
      page = 1,
      limit = 10,
      status,
    }: {
      page: number;
      limit: number;
      status?: IDriveStatus;
    }) {
      const result: RequestGetDriverListResult =
        yield self.operatorDashboardApi.getDriverList({ page, limit, status });

      if (result.kind === "ok") {
        self.activeDriver.data.clear();
        result.result.data.forEach((driver) => {
          self.activeDriver.data.set(driver.id.toString(), cast(driver));
        });
        self.activeDriver.pagination = cast(result.result.pagination);
      }
      return result;
    }),
    getActiveTruck: flow(function* () {
      const result: RequestGetActiveTruckResult =
        yield self.operatorDashboardApi.getActiveTruck();

      if (result.kind === "ok") {
        self.activeTruck.summary = cast(result.result);
      }
    }),
    getTruckList: flow(function* ({
      page = 1,
      limit = 10,
      status,
    }: {
      page: number;
      limit: number;
      status?: IDriveStatus;
    }) {
      const result: RequestGetDriverListResult =
        yield self.operatorDashboardApi.getTruckList({ page, limit, status });

      if (result.kind === "ok") {
        self.activeTruck.data.clear();
        result.result.data.forEach((truck) => {
          self.activeTruck.data.set(truck.id.toString(), cast(truck));
        });
        self.activeTruck.pagination = cast(result.result.pagination);
      }
    }),
    getBookingHistory: flow(function* ({
      startDate,
      endDate,
    }: {
      startDate: string;
      endDate: string;
    }) {
      const result: RequestGetBookingHistoryResult =
        yield self.operatorDashboardApi.getBookingHistory({
          startDate,
          endDate,
        });

      if (result.kind === "ok") {
        result.result.forEach((bookingHistory) => {
          self.bookingHistory.set(
            new Date(bookingHistory.date).valueOf().toString(),
            cast(bookingHistory)
          );
        });
      }
      return result;
    }),
  }))
  .actions((self) => ({
    getTotalIncome: flow(function* () {
      const result: RequestGetTotalIncomeResult =
        yield self.operatorDashboardApi.getTotalIncome();
      if (result.kind === "ok") {
        self.income = cast(result.result);
      }
      return result;
    }),
  }));

export type IDashboard = Instance<typeof DashboardModel>;
export type IDashboardSnapshot = SnapshotOut<typeof DashboardModel>;
