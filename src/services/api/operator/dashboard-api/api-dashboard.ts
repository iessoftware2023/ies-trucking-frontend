import { ApiResponse, ApisauceInstance } from "apisauce";

import { ITotalBooking } from "@/models/dashboard-store";

import { Api } from "../../api-core";
import { returnResponse } from "../../api-utilities";
import * as Types from "./type";

const prefix = "/dashboard";

const api: ApisauceInstance = Api.getInstance();

const routes = {
  totalBooking: () => `${prefix}/total-booking`,
};

export const OperatorDashboardApi = {
  async getTotalBooking(): Promise<Types.RequestGetTotalBookingResult> {
    const url = routes.totalBooking();
    const result: ApiResponse<ITotalBooking> = await api.get(url);
    return returnResponse(result);
  },
};
