import { Instance, types } from "mobx-state-tree";

import {
  BOOKING_STATUS_AS_CONST,
  CargoSizeModel,
  CargoTypesModel,
  CargoWeightsModel,
} from "../booking-store";

const ORDER_STATUS_AS_CONST = [
  "order_placed",
  "on_the_way_to_pickup",
  "order_pickup",
  "on_the_way_to_dropoff",
  "cancelled",
  "completed",
] as const;

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
      cargoType: types.maybeNull(CargoTypesModel),
      cargoWeight: types.maybeNull(CargoWeightsModel),
      cargoSize: types.maybeNull(CargoSizeModel),
      note: types.maybeNull(types.string),
      distance: types.maybeNull(types.number),
      duration: types.maybeNull(types.number),
      cost: types.maybeNull(types.number),
      currency: types.maybeNull(types.string),
      status: types.enumeration("BookingStatus", [...BOOKING_STATUS_AS_CONST]),
      createdAt: types.maybeNull(types.string),
      drivers: types.maybeNull(
        types.array(
          types.model({
            id: types.maybeNull(types.string),
            firstName: types.maybeNull(types.string),
            lastName: types.maybeNull(types.string),
            name: types.maybeNull(types.string),
            address: types.maybeNull(types.string),
            phoneNumber: types.maybeNull(types.string),
          })
        )
      ),
    })
  ),
  status: types.enumeration("OrderStatus", [...ORDER_STATUS_AS_CONST]),
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
  metadata: types.maybeNull(
    types.array(
      types.model("MetadataModel").props({
        status: types.enumeration("OrderStatus", [...ORDER_STATUS_AS_CONST]),
        time: types.maybeNull(types.string),
      })
    )
  ),
  createdAt: types.maybeNull(types.string),
});

export type IOrder = Instance<typeof OrderModel>;
export type IOrderStatus = (typeof ORDER_STATUS_AS_CONST)[number];
