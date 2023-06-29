/* eslint-disable @typescript-eslint/ban-ts-comment */

import { cast, flow, Instance, SnapshotOut, types } from "mobx-state-tree";

import { withEnvironment } from "@/models/extensions";
import { OperatorBookingTypes } from "@/services/api/operator";

import { BookingConfigModel, BookingModel } from "./booking-model";

export const OperatorBookingStoreModel = types
  .model("OperatorBookingStoreModel")
  .props({
    configs: types.optional(BookingConfigModel, {}),
    bookings: types.optional(types.map(BookingModel), {}),
    booking: types.maybe(types.safeReference(types.late(() => BookingModel))),
  })
  .extend(withEnvironment)
  .views((self) => ({
    get bookingsView() {
      return Array.from(self.bookings.values());
    },
  }))
  .actions((self) => ({
    async getBookingConfigs() {
      const result = await self.operatorBookingApi.getBookingConfigs();
      if (result.kind === "ok") {
        self.configs = cast(result.result);
      }
    },
  }))
  .actions((self) => ({
    getBookings: flow(function* () {
      const result: OperatorBookingTypes.RequestBookingsResult =
        yield self.operatorBookingApi.getBookings();

      if (result.kind === "ok") {
        self.bookings.clear();
        result.result.forEach((booking) => {
          self.bookings.set(booking.id.toString(), cast(booking));
        });
      }
      return result;
    }),

    getBooking: flow(function* (bookingId: string) {
      const result: OperatorBookingTypes.RequestBookingResult =
        yield self.operatorBookingApi.getBooking(bookingId);

      if (result.kind === "ok") {
        // @ts-ignore
        self.booking = result.result?.id;
        self.bookings.set(result.result?.id.toString(), cast(result.result));
      }
    }),

    assignDriver: flow(function* (bookingId: string, driverId: string) {
      const result: OperatorBookingTypes.RequestAssignDriverResult =
        yield self.operatorBookingApi.assignDriver(bookingId, driverId);
      return result;
    }),

    cancelBooking: flow(function* (bookingId: string) {
      const result: OperatorBookingTypes.RequestCancelBookingResult =
        yield self.operatorBookingApi.cancelBooking(bookingId);
      return result;
    }),
  }));

export type IOperatorBookingStore = Instance<typeof OperatorBookingStoreModel>;
export type IOperatorBookingStoreSnapshot = SnapshotOut<
  typeof OperatorBookingStoreModel
>;
