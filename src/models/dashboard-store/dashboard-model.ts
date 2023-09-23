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

export type ITotalBooking = Instance<typeof TotalBookingModel>;
