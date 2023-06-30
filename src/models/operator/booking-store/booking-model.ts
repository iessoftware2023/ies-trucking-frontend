import { Instance, types } from "mobx-state-tree";

export const CargoSizeModel = types.model("CargoSizeModel").props({
  height: types.maybeNull(types.number),
  width: types.maybeNull(types.number),
  length: types.maybeNull(types.number),
});

export const CargoTypesModel = types.model("CargoTypesModel").props({
  id: types.optional(types.string, ""),
  name: types.optional(types.string, ""),
});

export const CargoWeightsModel = types.model("CargoTypesModel").props({
  id: types.maybeNull(types.optional(types.string, "")),
  description: types.maybeNull(types.optional(types.string, "")),
  minWeight: types.maybeNull(types.number),
  maxWeight: types.maybeNull(types.number),
});

export const BookingConfigModel = types.model("BookingConfigModel").props({
  cargoTypes: types.array(CargoTypesModel),
  cargoWeights: types.array(CargoWeightsModel),
});

export const BOOKING_STATUS_AS_CONST = [
  "pending",
  "confirmed",
  "cancelled",
  "expired",
] as const;

export const BookingModel = types
  .model("BookingModel")
  .props({
    id: types.identifier,
    code: types.maybeNull(types.string),
    pickupTime: types.maybeNull(types.string),
    dropoffTime: types.maybeNull(types.string),
    rentalPeriod: types.maybeNull(types.number),
    pickup: types.maybeNull(
      types.model({
        latitude: types.maybeNull(types.number),
        longitude: types.maybeNull(types.number),
        address: types.maybeNull(types.string),
        fullName: types.maybeNull(types.string),
        phoneNumber: types.maybeNull(types.string),
        addressNote: types.maybeNull(types.string),
      })
    ),
    dropoff: types.maybeNull(
      types.model({
        latitude: types.maybeNull(types.number),
        longitude: types.maybeNull(types.number),
        address: types.maybeNull(types.string),
        fullName: types.maybeNull(types.string),
        phoneNumber: types.maybeNull(types.string),
        addressNote: types.maybeNull(types.string),
      })
    ),
    enterprise: types.maybeNull(
      types.model({
        id: types.maybeNull(types.string),
        name: types.maybeNull(types.string),
        address: types.maybeNull(types.string),
      })
    ),
    parking: types.maybeNull(
      types.model({
        id: types.maybeNull(types.string),
        name: types.maybeNull(types.string),
        address: types.maybeNull(types.string),
      })
    ),
    truckType: types.maybeNull(
      types.model({
        id: types.maybeNull(types.string),
        name: types.maybeNull(types.string),
        description: types.maybeNull(types.string),
        height: types.maybeNull(types.number),
        width: types.maybeNull(types.number),
        length: types.maybeNull(types.number),
        weightLimit: types.maybeNull(types.number),
      })
    ),
    // enterpriseId: types.maybeNull(types.string),
    // truckTypeId: types.maybeNull(types.string),
    // parkingId: types.maybeNull(types.string),
    // customerId: types.maybeNull(types.string),
    cargoType: types.maybeNull(
      types.model("CargoTypeModel").props({
        name: types.maybeNull(types.string),
      })
    ),
    cargoWeight: types.maybeNull(
      types.model("CargoWeightModel").props({
        name: types.maybeNull(types.string),
      })
    ),
    cargoSize: types.maybeNull(
      types.model({
        height: types.maybeNull(types.number),
        width: types.maybeNull(types.number),
        length: types.maybeNull(types.number),
      })
    ),
    distance: types.maybeNull(types.number),
    duration: types.maybeNull(types.number),
    cost: types.maybeNull(types.number),
    currency: types.maybeNull(types.string),
    status: types.enumeration("BookingStatus", [...BOOKING_STATUS_AS_CONST]),
    order: types.maybeNull(
      types.model({
        id: types.maybeNull(types.string),
        code: types.maybeNull(types.string),
      })
    ),
    createdAt: types.maybeNull(types.string),
    drivers: types.optional(
      types.array(
        types.model({
          id: types.maybeNull(types.string),
          firstName: types.maybeNull(types.string),
          lastName: types.maybeNull(types.string),
          name: types.maybeNull(types.string),
          address: types.maybeNull(types.string),
          phoneNumber: types.maybeNull(types.string),
        })
      ),
      []
    ),
    customer: types.maybeNull(
      types.model({
        firstName: types.maybeNull(types.string),
        lastName: types.maybeNull(types.string),
        middleName: types.maybeNull(types.string),
        phoneNumber: types.maybeNull(types.string),
      })
    ),
  })
  .views((self) => ({
    get customerFullName() {
      return `${self?.customer?.firstName} ${self?.customer?.lastName}`;
    },
  }));

export type IBooking = Instance<typeof BookingModel>;
export type IBookingStatus = (typeof BOOKING_STATUS_AS_CONST)[number];
