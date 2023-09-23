import { ApiResponse, ApisauceInstance } from "apisauce";

import {
  IActiveDriver,
  IActiveTruck,
  ITotalBooking,
} from "@/models/dashboard-store";

import { Api } from "../../api-core";
import { returnResponse } from "../../api-utilities";
import * as Types from "./type";

const prefix = "/dashboard";

const api: ApisauceInstance = Api.getInstance();

const routes = {
  totalBooking: () => `${prefix}/total-booking`,
  activeTruck: () => `${prefix}/active-truck`,
  activeDriver: () => `${prefix}/active-driver`,
};

export const OperatorDashboardApi = {
  async getTotalBooking(): Promise<Types.RequestGetTotalBookingResult> {
    const url = routes.totalBooking();
    const result: ApiResponse<ITotalBooking> = await api.get(url);
    return returnResponse(result);
  },
  async getActiveTruck(): Promise<Types.RequestGetActiveTruckResult> {
    const url = routes.activeTruck();
    const result: ApiResponse<IActiveTruck> = await api.get(url);
    return returnResponse(result);
  },
  async getActiveDriver(): Promise<Types.RequestGetActiveDriverResult> {
    const url = routes.activeDriver();
    const result: ApiResponse<IActiveDriver> = await api.get(url);
    return returnResponse(result);
  },
};
