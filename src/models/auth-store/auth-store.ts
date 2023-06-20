import { applySnapshot, cast, flow, getRoot, types } from "mobx-state-tree";
import Nookies from "nookies";

import { APP_CONSTANTS } from "@/constants";
import {
  RequestGetMeResult,
  RequestLoginBody,
  RequestLoginResult,
} from "@/services/api";

import { withEnvironment } from "../extensions/with-environment";
import { RootStore } from "../root-store";
import { UserModel } from "./user-model";

export const AuthStoreModel = types
  .model("AuthStore")
  .props({
    isAuth: types.optional(types.boolean, false),
    user: types.optional(UserModel, {}),
  })
  .extend(withEnvironment)
  .actions((self) => {
    const actions = {
      setAuth(isAuth: boolean) {
        this.isAuth = isAuth;
      },

      login: flow(function* (data: RequestLoginBody, isRememberMe?: boolean) {
        const res: RequestLoginResult = yield self.apiAuth.login(data);

        if (res.kind !== "ok") {
          return false;
        }

        Nookies.set(undefined, APP_CONSTANTS.AUTH, res.result.accessToken, {
          path: "/",
          maxAge: isRememberMe ? 30 * 24 * 60 * 60 : null,
        });

        return true;
      }),

      logout() {
        Nookies.destroy(undefined, APP_CONSTANTS.AUTH);

        const rootStore = getRoot<RootStore>(self);
        applySnapshot(rootStore, {});
      },

      getMe: flow(function* () {
        const res: RequestGetMeResult = yield self.apiAuth.getMe();

        if (res.kind !== "ok") {
          return null;
        }

        self.user = cast(res.result);

        return res.result;
      }),
    };

    return actions;
  });
