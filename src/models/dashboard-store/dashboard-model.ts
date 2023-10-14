import { Instance, types } from "mobx-state-tree";

export const BookingHistoryModel = types.model("BookingHistoryModel").props({
  date: types.maybeNull(types.optional(types.string, "")),
  total: types.maybeNull(types.optional(types.number, 0)),
});

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

export const DriverModel = types.model("DriverModel").props({
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

export const IncomeModel = types.model("IncomeModel").props({
  revenueRatio: types.maybeNull(types.optional(types.number, 0)),
  totalIncomeToday: types.maybeNull(
    types.optional(
      types.model({
        total: types.maybeNull(types.optional(types.number, 0)),
        currency: types.maybeNull(types.optional(types.string, "")),
      }),
      {}
    )
  ),
});

const TruckType = types.model("TruckType", {
  name: types.optional(types.string, ""),
  weightLimit: types.maybeNull(types.number),
  description: types.optional(types.string, ""),
  length: types.maybeNull(types.number),
  width: types.maybeNull(types.number),
  height: types.maybeNull(types.number),
  cargoTypes: types.optional(
    types.array(
      types.model({
        name: types.optional(types.string, ""),
      })
    ),
    []
  ),
});

const Tracking = types.model("Tracking", {
  id: types.optional(types.string, ""),
  code: types.optional(types.string, ""),
  orderId: types.optional(types.string, ""),
  current: types.optional(
    types.model({
      lat: types.maybeNull(types.number),
      lng: types.maybeNull(types.number),
    }),
    {}
  ),
  polygons: types.optional(types.array(types.array(types.number)), []),
  createdAt: types.optional(types.string, ""),
  updatedAt: types.optional(types.string, ""),
});

const OrderStatus = types.enumeration("OrderStatus", [
  "order_placed",
  "on_the_way_to_pickup",
  "order_pickup",
  "on_the_way_to_dropoff",
  "cancelled",
  "completed",
]);

const Order = types.model("Order", {
  status: types.optional(OrderStatus, "order_placed"),
  tracking: types.optional(Tracking, {}),
  booking: types.optional(
    types.model({
      pickup: types.optional(
        types.model({
          latitude: types.maybeNull(types.number),
          longitude: types.maybeNull(types.number),
          address: types.optional(types.string, ""),
          fullName: types.optional(types.string, ""),
          phoneNumber: types.optional(types.string, ""),
          addressNote: types.optional(types.string, ""),
        }),
        {}
      ),
      dropoff: types.optional(
        types.model({
          latitude: types.maybeNull(types.number),
          longitude: types.maybeNull(types.number),
          address: types.optional(types.string, ""),
          fullName: types.optional(types.string, ""),
          phoneNumber: types.optional(types.string, ""),
          addressNote: types.optional(types.string, ""),
        }),
        {}
      ),
    }),
    {}
  ),
});

const Truck = types.model("Truck", {
  licensePlate: types.optional(types.string, ""),
  truckType: types.optional(TruckType, {}),
  orders: types.optional(types.array(Order), []),
  parking: types.optional(
    types.model({
      name: types.optional(types.string, ""),
      address: types.optional(types.string, ""),
      location: types.optional(
        types.model({
          type: types.optional(types.string, "Point"),
          coordinates: types.optional(types.array(types.number), []),
        }),
        {}
      ),
    }),
    {}
  ),
});

const Driver = types.model("Driver", {
  name: types.optional(types.string, ""),
  phoneNumber: types.optional(types.string, ""),
  enterprise: types.optional(
    types.model({
      name: types.optional(types.string, ""),
      address: types.optional(types.string, ""),
    }),
    {}
  ),
  trucks: types.optional(types.array(Truck), []),
  orders: types.optional(types.array(Order), []),
});

const RevenueData = types.model("RevenueData", {
  revenueRatio: types.maybeNull(types.optional(types.number, 0)),
  totalIncomeToday: types.optional(
    types.model({
      total: types.maybeNull(types.optional(types.number, 0)),
      currency: types.optional(types.string, "UAD"),
    }),
    {}
  ),
});

export const DriverDetailModel = types.model("DriverDetailModel", {
  driver: types.optional(Driver, {}),
  revenueData: types.optional(RevenueData, {}),
});

export const TruckDetailModel = types.model("TruckDetailModel", {
  truck: types.optional(Truck, {}),
  revenueData: types.optional(RevenueData, {}),
});

const ParkingLocation = types.model("ParkingLocation", {
  id: types.optional(types.string, ""),
  name: types.optional(types.string, ""),
  location: types.optional(
    types.model({
      lat: types.maybeNull(types.number),
      lng: types.maybeNull(types.number),
    }),
    {}
  ),
  totalTrucks: types.optional(types.number, 0),
});

const TruckLocation = types.model("TruckLocation", {
  licensePlate: types.optional(types.string, ""),
  location: types.optional(
    types.model({
      lat: types.maybeNull(types.number),
      lng: types.maybeNull(types.number),
    }),
    {}
  ),
});

export const GeoLocationModel = types
  .model("GeoLocationModel", {
    parkings: types.optional(types.map(ParkingLocation), {}),
    trucks: types.optional(types.map(TruckLocation), {}),
  })
  .views((self) => ({
    get parkingLocationView() {
      return Array.from(self.parkings.values());
    },
    get truckLocationView() {
      return Array.from(self.trucks.values());
    },
  }));

export type ITotalBooking = Instance<typeof TotalBookingModel>;

export type IActiveTruckSummary = Instance<typeof ActiveTruckSummaryModel>;
export type ITruck = Instance<typeof TruckModel>;

export type IActiveDriverSummary = Instance<typeof ActiveDriverSummaryModel>;
export type IDriver = Instance<typeof DriverModel>;
export type IPagination = Instance<typeof PaginationModel>;

export type IBookingHistory = Instance<typeof BookingHistoryModel>;

export type IIncome = Instance<typeof IncomeModel>;

export type IDriverDetail = Instance<typeof Driver>;

export type ITruckDetail = Instance<typeof Truck>;

export type IGeoLocation = {
  parkings: Instance<typeof ParkingLocation>[];
  trucks: Instance<typeof TruckLocation>[];
};
