import {IOrder} from "@/models/operator";

import {GeneralApiProblem} from "../../api-problem";
import {Response} from "../../type";

export type RequestGetOrdersResult = Response<IOrder[]>;

export type RequestGetOrderResult = Response<IOrder>;

export type RequestCancelOrderResponse = boolean;
export type RequestCancelOrderResult = Response<boolean>;

export type RequestAssignDriverResponse = null;
export type RequestAssignDriverResult =
  | GeneralApiProblem
  | { kind: "ok"; result: RequestAssignDriverResponse };
