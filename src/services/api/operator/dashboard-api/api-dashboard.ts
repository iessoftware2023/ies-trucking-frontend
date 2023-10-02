import { ApiResponse, ApisauceInstance } from "apisauce";

import { Api } from "../../api-core";
import { returnResponse } from "../../api-utilities";
import * as Types from "./type";

const prefix = "/dashboard";

const api: ApisauceInstance = Api.getInstance();

const routes = {
  totalBooking: () => `${prefix}/total-booking`,
  activeTruck: () => `${prefix}/truck/summary`,
  activeDriver: () => `${prefix}/driver/summary`,
  bookingHistory: () => `${prefix}/booking-history`,
};

export const OperatorDashboardApi = {
  async getTotalBooking(): Promise<Types.RequestGetTotalBookingResult> {
    const url = routes.totalBooking();
    const result: ApiResponse<Types.RequestGetTotalBookingResponse> =
      await api.get(url);
    return returnResponse(result);
  },
  async getActiveTruck(): Promise<Types.RequestGetActiveTruckResult> {
    const url = routes.activeTruck();
    const result: ApiResponse<Types.RequestGetActiveTruckResponse> =
      await api.get(url);
    return returnResponse(result);
  },
  async getActiveDriver(): Promise<Types.RequestGetActiveDriverResult> {
    const url = routes.activeDriver();
    const result: ApiResponse<Types.RequestGetActiveDriverResponse> =
      await api.get(url);
    return returnResponse(result);
  },
  async getBookingHistory({
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  }): Promise<Types.RequestGetBookingHistoryResult> {
    const url = routes.bookingHistory();
    const result: ApiResponse<Types.RequestGetBookingHistoryResponse> =
      await api.get(url, {
        startDate,
        endDate,
      });
    return returnResponse(result);
  },
};
