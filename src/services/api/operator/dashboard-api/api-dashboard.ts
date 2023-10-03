import { ApiResponse, ApisauceInstance } from "apisauce";

import { Api } from "../../api-core";
import { returnResponse } from "../../api-utilities";
import * as Types from "./type";

const prefix = "/dashboard";

const api: ApisauceInstance = Api.getInstance();

const routes = {
  totalBooking: () => `${prefix}/total-booking`,
  // truck
  activeTruck: () => `${prefix}/truck/summary`,
  truckList: () => `${prefix}/truck/list`,
  truckItem: (truckId: string) => `${prefix}/truck/${truckId}`,
  truckGeoLocation: () => `${prefix}/truck/geo-location`,
  // Driver
  activeDriver: () => `${prefix}/driver/summary`,
  driverList: () => `${prefix}/driver/list`,
  driverItem: (driverId: string) => `${prefix}/driver/${driverId}`,
  // history
  bookingHistory: () => `${prefix}/booking-history`,
};

export const OperatorDashboardApi = {
  async getTotalBooking(): Promise<Types.RequestGetTotalBookingResult> {
    const url = routes.totalBooking();
    const result: ApiResponse<Types.RequestGetTotalBookingResponse> =
      await api.get(url);
    return returnResponse(result);
  },
  // truck
  async getActiveTruck(): Promise<Types.RequestGetActiveTruckResult> {
    const url = routes.activeTruck();
    const result: ApiResponse<Types.RequestGetActiveTruckResponse> =
      await api.get(url);
    return returnResponse(result);
  },
  async getTruckItem({
    truckId,
  }: {
    truckId: string;
  }): Promise<Types.RequestGetTruckItemResult> {
    const url = routes.truckItem(truckId);
    const result: ApiResponse<Types.RequestGetTruckItemResponse> =
      await api.get(url);
    return returnResponse(result);
  },
  async getTruckList({
    page = 1,
    limit = 10,
    status,
  }: {
    page: number;
    limit: number;
    status?: Types.ITruckStatus;
  }): Promise<Types.RequestGetTruckListResult> {
    const url = routes.truckList();
    const result: ApiResponse<Types.RequestGetTruckListResponse> =
      await api.get(url, { status, page, limit });
    return returnResponse(result);
  },
  // driver
  async getActiveDriver(): Promise<Types.RequestGetActiveDriverResult> {
    const url = routes.activeDriver();
    const result: ApiResponse<Types.RequestGetActiveDriverResponse> =
      await api.get(url);
    return returnResponse(result);
  },
  async getDriverList({
    page = 1,
    limit = 10,
    status,
  }: {
    page: number;
    limit: number;
    status?: Types.IDriveStatus;
  }): Promise<Types.RequestGetDriverListResult> {
    const url = routes.driverList();
    const result: ApiResponse<Types.RequestGetDriverListResponse> =
      await api.get(url, { page, limit, status });
    return returnResponse(result);
  },
  async getDriverItem({
    driverId,
  }: {
    driverId: string;
  }): Promise<Types.RequestGetDriverItemResult> {
    const url = routes.driverItem(driverId);
    const result: ApiResponse<Types.RequestGetDriverItemResponse> =
      await api.get(url);
    return returnResponse(result);
  },
  // history
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
