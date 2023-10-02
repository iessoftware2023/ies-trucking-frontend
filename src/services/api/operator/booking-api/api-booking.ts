import { ApiResponse, ApisauceInstance } from "apisauce";

import { IBooking } from "@/models/operator";

import { Api } from "../../api-core";
import { returnResponse } from "../../api-utilities";
import * as Types from "./type";

const prefix = "/operator/booking";

const api: ApisauceInstance = Api.getInstance();

const routes = {
  index: () => `${prefix}`,
  detail: (bookingId: string) => `${prefix}/${bookingId}`,
  assignDriver: (bookingId: string) => `${prefix}/${bookingId}/assign-driver`,
  cancel: (bookingId: string) => `${prefix}/${bookingId}/cancel`,
  config: () => `${prefix}/configs`,
};

export const OperatorBookingApi = {
  async getBookings({
    page = 1,
    limit = 10,
  }: {
    page: number;
    limit: number;
  }): Promise<Types.RequestBookingsResult> {
    const url = routes.index();
    const result: ApiResponse<Types.RequestBookingsResponse> = await api.get(
      url,
      { page, limit }
    );
    return returnResponse(result);
  },

  async getBooking(bookingId: string): Promise<Types.RequestBookingResult> {
    const url = routes.detail(bookingId);
    const result: ApiResponse<IBooking> = await api.get(url);
    return returnResponse(result);
  },

  async assignDriver(
    bookingId: string,
    driverId: string
  ): Promise<Types.RequestAssignDriverResult> {
    const url = routes.assignDriver(bookingId);
    const result: ApiResponse<Types.RequestAssignDriverResponse> =
      await api.put(url, { driverId });
    return returnResponse(result);
  },

  async cancelBooking(
    bookingId: string
  ): Promise<Types.RequestCancelBookingResult> {
    const url = routes.cancel(bookingId);
    const result: ApiResponse<Types.RequestCancelBookingResponse> =
      await api.put(url);
    return returnResponse(result);
  },

  async getBookingConfigs(): Promise<Types.RequestGetBookingConfigResult> {
    const url = routes.config();
    const result: ApiResponse<Types.RequestGetBookingConfigResponse> =
      await api.get(url);
    return returnResponse(result);
  },
};
