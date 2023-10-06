import {
  IActiveDriverSummary,
  IActiveTruckSummary,
  IBookingHistory,
  IDriver,
  IIncome,
  IPagination,
  ITotalBooking,
  ITruck,
} from "@/models/dashboard-store";

import { Response } from "../../type";

export type IDriveStatus =
  | "on_the_way_to_pickup"
  | "order_pickup"
  | "on_the_way_to_dropoff"
  | "inactive";

export type ITruckStatus =
  | "on_the_way_to_pickup"
  | "order_pickup"
  | "on_the_way_to_dropoff"
  | "inactive";

export type RequestGetTotalBookingResponse = ITotalBooking;
export type RequestGetTotalBookingResult =
  Response<RequestGetTotalBookingResponse>;

export type RequestGetActiveTruckResponse = IActiveTruckSummary;
export type RequestGetActiveTruckResult =
  Response<RequestGetActiveTruckResponse>;

export type RequestGetTruckListResponse = {
  data: ITruck[];
  pagination: IPagination;
};
export type RequestGetTruckListResult = Response<RequestGetTruckListResponse>;

export type RequestGetTruckItemResponse = ITruck;
export type RequestGetTruckItemResult = Response<RequestGetTruckItemResponse>;

export type RequestGetActiveDriverResponse = IActiveDriverSummary;
export type RequestGetActiveDriverResult =
  Response<RequestGetActiveDriverResponse>;

export type RequestGetDriverListResponse = {
  data: IDriver[];
  pagination: IPagination;
};
export type RequestGetDriverListResult = Response<RequestGetDriverListResponse>;

export type RequestGetDriverItemResponse = IDriver;
export type RequestGetDriverItemResult = Response<RequestGetDriverItemResponse>;

export type RequestGetBookingHistoryResponse = IBookingHistory[];
export type RequestGetBookingHistoryResult =
  Response<RequestGetBookingHistoryResponse>;

export type RequestGetTotalIncomeResponse = IIncome;
export type RequestGetTotalIncomeResult =
  Response<RequestGetTotalIncomeResponse>;
