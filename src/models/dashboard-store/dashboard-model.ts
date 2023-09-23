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

export const ActiveTruckModel = types.model("ActiveTruckModel").props({
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

export const ActiveDriverModel = types.model("ActiveDriverModel").props({
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

export type ITotalBooking = Instance<typeof TotalBookingModel>;
export type IActiveTruck = Instance<typeof ActiveTruckModel>;
export type IActiveDriver = Instance<typeof ActiveDriverModel>;
