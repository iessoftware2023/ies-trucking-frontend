import { ITotalBooking } from "@/models/dashboard-store";

import { GeneralApiProblem } from "../../api-problem";
import { Response } from "../../type";

export type RequestGetTotalBookingResult = Response<ITotalBooking>;

export type RequestGetTotalBookingResponse =
  | GeneralApiProblem
  | { kind: "ok"; result: RequestGetTotalBookingResult };
