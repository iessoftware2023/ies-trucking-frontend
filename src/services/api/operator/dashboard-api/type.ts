import {
  IActiveDriverSummary,
  IActiveTruck,
  IDriver,
  IPagination,
  ITotalBooking,
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

export interface IBookingHistory {
  date: string;
  total: number;
}

export type RequestGetTotalBookingResponse = ITotalBooking;
export type RequestGetTotalBookingResult =
  Response<RequestGetTotalBookingResponse>;

export type RequestGetActiveTruckResponse = IActiveTruck;
export type RequestGetActiveTruckResult =
  Response<RequestGetActiveTruckResponse>;

export type RequestGetTruckListResponse = {
  data: IActiveTruck[];
  pagination: IPagination;
};
export type RequestGetTruckListResult = Response<RequestGetTruckListResponse>;

export type RequestGetTruckItemResponse = IActiveTruck;
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
