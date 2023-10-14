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
  truckDetail: (truckId: string) => `${prefix}/truck/${truckId}`,
  truckGeoLocation: () => `${prefix}/truck/geo-location`,
  // Driver
  activeDriver: () => `${prefix}/driver/summary`,
  driverList: () => `${prefix}/driver/list`,
  driverDetail: (driverId: string) => `${prefix}/driver/${driverId}`,
  // history
  bookingHistory: () => `${prefix}/booking-history`,
  // income
  income: () => `${prefix}/total-income`,
  geoLocations: () => `${prefix}/truck/geo-location`,
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
  async getTruckDetail(
    truckId: string
  ): Promise<Types.RequestGetTruckDetailResult> {
    const url = routes.truckDetail(truckId);
    const result: ApiResponse<Types.RequestGetTruckDetailResponse> =
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
  async getDriverDetail(
    driverId: string
  ): Promise<Types.RequestGetDriverDetailResult> {
    const url = routes.driverDetail(driverId);
    const result: ApiResponse<Types.RequestGetDriverDetailResponse> =
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
  // income
  async getTotalIncome(): Promise<Types.RequestGetTotalIncomeResult> {
    const url = routes.income();
    const result: ApiResponse<Types.RequestGetTotalIncomeResponse> =
      await api.get(url);
    return returnResponse(result);
  },
  async getGeoLocation(): Promise<Types.RequestGetGeoLocationResult> {
    const url = routes.geoLocations();
    const result: ApiResponse<Types.RequestGetGeoLocationResponse> =
      await api.get(url);
    return returnResponse(result);
  },
};
