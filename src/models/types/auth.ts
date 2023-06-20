import { Instance } from "mobx-state-tree";

import { UserModel } from "../auth-store";

export type IUser = Instance<typeof UserModel>;
