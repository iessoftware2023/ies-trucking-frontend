import { IOrder, IOrderPagination } from "@/models/operator";

import { GeneralApiProblem } from "../../api-problem";
import { Response } from "../../type";

export type RequestGetOrdersResponse = {
  data: IOrder[];
  pagination: IOrderPagination;
};

export type RequestGetOrdersResult = Response<RequestGetOrdersResponse>;

export type RequestGetOrderResult = Response<IOrder>;

export type RequestCancelOrderResponse = boolean;
export type RequestCancelOrderResult = Response<boolean>;

export type RequestAssignDriverResponse = null;
export type RequestAssignDriverResult =
  | GeneralApiProblem
  | { kind: "ok"; result: RequestAssignDriverResponse };
