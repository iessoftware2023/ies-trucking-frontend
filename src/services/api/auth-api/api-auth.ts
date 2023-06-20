import { ApiResponse, ApisauceInstance } from "apisauce";

import { IUser } from "@/models";

import { Api } from "../api-core";
import { returnResponse } from "../api-utilities";
import * as Types from "./type";

const prefix = "/operator";

const api: ApisauceInstance = Api.getInstance();

const routes = {
  getMe: () => `${prefix}/me`,
  login: () => `${prefix}/auth/login`,
};

export const AuthApi = {
  async getMe(): Promise<Types.RequestGetMeResult> {
    const url = routes.getMe();
    const result: ApiResponse<IUser> = await api.get(url);
    return returnResponse(result);
  },

  async login(data: Types.RequestLoginBody): Promise<Types.RequestLoginResult> {
    const url = routes.login();
    const result: ApiResponse<Types.LoginResult> = await api.post(url, data);
    return returnResponse(result);
  },
};
