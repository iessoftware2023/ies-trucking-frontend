import { types } from "mobx-state-tree";

export const UserModel = types.model("UserModel").props({
  id: types.optional(types.string, ""),
  name: types.optional(types.string, ""),
  email: types.optional(types.string, ""),
  enterpriseId: types.optional(types.string, ""),
});
