import { Instance, types } from "mobx-state-tree";

import { CargoSizeModel } from "../booking-store";

export const OrderModel = types.model("OrderModel").props({
  id: types.identifier,
  booking: types.maybeNull(
    types.model("OrderBookingModel").props({
      id: types.maybeNull(types.string),
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
      cargoType: types.maybeNull(types.string),
      cargoWeight: types.maybeNull(types.string),
      cargoSize: types.maybeNull(CargoSizeModel),
      distance: types.maybeNull(types.number),
      duration: types.maybeNull(types.number),
      cost: types.maybeNull(types.number),
      currency: types.maybeNull(types.string),
      status: types.enumeration("BookingStatus", [
        "pending",
        "confirmed",
        "cancelled",
      ]),
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
    })
  ),
  status: types.enumeration("OrderStatus", [
    "order_placed",
    "schedule_delivery",
    "on_the_way_to_pickup",
    "order_pickup",
    "on_the_way_to_dropoff",
    "cancelled",
    "completed",
  ]),
  driver: types.maybeNull(
    types.model({
      id: types.maybeNull(types.string),
      firstName: types.maybeNull(types.string),
      lastName: types.maybeNull(types.string),
      name: types.maybeNull(types.string),
      address: types.maybeNull(types.string),
      phoneNumber: types.maybeNull(types.string),
    })
  ),
  tracking: types.maybeNull(
    types.model({
      current: types.maybeNull(
        types.model({
          lat: types.maybeNull(types.number),
          lng: types.maybeNull(types.number),
        })
      ),
    })
  ),
  truck: types.maybeNull(
    types.model({
      id: types.maybeNull(types.string),
      licensePlate: types.maybeNull(types.string),
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
    })
  ),
  enterprise: types.maybeNull(
    types.model({
      id: types.maybeNull(types.string),
      name: types.maybeNull(types.string),
      address: types.maybeNull(types.string),
    })
  ),
});

export type IOrder = Instance<typeof OrderModel>;
