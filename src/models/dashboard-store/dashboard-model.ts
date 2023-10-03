import { Instance, types } from "mobx-state-tree";

export const TotalBookingModel = types.model("TotalBookingModel").props({
  total: types.maybeNull(types.optional(types.number, 0)),
  data: types.maybeNull(
    types.optional(
      types.array(
        types.model({
          status: types.maybeNull(types.string),
          count: types.maybeNull(types.number),
        })
      ),
      []
    )
  ),
});

export const PaginationModel = types
  .model("PaginationModel")
  .props({
    page: types.optional(types.number, 1),
    limit: types.optional(types.number, 10),
    total: types.optional(types.number, 0),
  })
  .views((self) => ({
    get pages() {
      return Math.ceil(self.total / self.limit);
    },
  }));

export const ActiveTruckSummaryModel = types
  .model("ActiveTruckSummaryModel")
  .props({
    total: types.maybeNull(types.optional(types.number, 0)),
    totalActive: types.maybeNull(types.optional(types.number, 0)),
    data: types.maybeNull(
      types.optional(
        types.array(
          types.model({
            status: types.maybeNull(types.string),
            count: types.maybeNull(types.number),
          })
        ),
        []
      )
    ),
  });

export const TruckModel = types.model("TruckModel").props({
  id: types.optional(types.string, ""),
  name: types.maybeNull(types.optional(types.string, "")),
  licensePlate: types.maybeNull(types.optional(types.string, "")),
  truckType: types.optional(
    types.model({
      name: types.optional(types.string, ""),
      cargoTypes: types.array(types.model({ name: types.string })),
    }),
    {}
  ),
});

export const ActiveTruckModel = types
  .model("ActiveTruckModel")
  .props({
    summary: types.optional(ActiveTruckSummaryModel, {}),
    data: types.optional(types.map(TruckModel), {}),
    pagination: types.optional(PaginationModel, {}),
  })
  .views((self) => ({
    get trucksView() {
      return Array.from(self.data.values());
    },
  }));

export const ActiveDriverSummaryModel = types
  .model("ActiveDriverSummaryModel")
  .props({
    total: types.maybeNull(types.optional(types.number, 0)),
    totalActive: types.maybeNull(types.optional(types.number, 0)),
    data: types.maybeNull(
      types.optional(
        types.array(
          types.model({
            status: types.maybeNull(types.string),
            count: types.maybeNull(types.number),
          })
        ),
        []
      )
    ),
  });

export const DriverModel = types.model("ActiveDriverModel").props({
  id: types.optional(types.string, ""),
  name: types.maybeNull(types.optional(types.string, "")),
  phoneNumber: types.maybeNull(types.optional(types.string, "")),
  truckType: types.optional(
    types.model({
      name: types.optional(types.string, ""),
    }),
    {}
  ),
});

export const ActiveDriverModel = types
  .model("ActiveDriverModel")
  .props({
    summary: types.optional(ActiveDriverSummaryModel, {}),
    data: types.optional(types.map(DriverModel), {}),
    pagination: types.optional(PaginationModel, {}),
  })
  .views((self) => ({
    get driversView() {
      return Array.from(self.data.values());
    },
  }));

export type ITotalBooking = Instance<typeof TotalBookingModel>;

export type IActiveTruckSummary = Instance<typeof ActiveTruckSummaryModel>;
export type ITruck = Instance<typeof TruckModel>;

export type IActiveDriverSummary = Instance<typeof ActiveDriverSummaryModel>;
export type IDriver = Instance<typeof DriverModel>;
export type IPagination = Instance<typeof PaginationModel>;
