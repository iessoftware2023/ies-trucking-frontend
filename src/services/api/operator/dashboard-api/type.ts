import {
  IActiveDriver,
  IActiveTruck,
  ITotalBooking,
} from "@/models/dashboard-store";

import { GeneralApiProblem } from "../../api-problem";
import { Response } from "../../type";

export type RequestGetTotalBookingResult = Response<ITotalBooking>;
export type RequestGetTotalBookingResponse =
  | GeneralApiProblem
  | { kind: "ok"; result: RequestGetTotalBookingResult };

export type RequestGetActiveTruckResult = Response<IActiveTruck>;
export type RequestGetActiveTruckResponse =
  | GeneralApiProblem
  | { kind: "ok"; result: RequestGetActiveTruckResult };

export type RequestGetActiveDriverResult = Response<IActiveDriver>;
export type RequestGetActiveDriverResponse =
  | GeneralApiProblem
  | { kind: "ok"; result: RequestGetActiveDriverResult };
