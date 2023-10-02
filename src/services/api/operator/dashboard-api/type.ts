import {
  IActiveDriver,
  IActiveTruck,
  ITotalBooking,
} from "@/models/dashboard-store";

import { Response } from "../../type";

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

export type RequestGetActiveDriverResponse = IActiveDriver;
export type RequestGetActiveDriverResult = Response<IActiveDriver>;

export type RequestGetBookingHistoryResponse = IBookingHistory[];
export type RequestGetBookingHistoryResult =
  Response<RequestGetBookingHistoryResponse>;
