import { ApiResponse, ApisauceInstance } from "apisauce";

import { IOrder } from "@/models/operator";

import { Api } from "../../api-core";
import { returnResponse } from "../../api-utilities";
import * as Types from "./type";

const prefix = "/operator/order";

const api: ApisauceInstance = Api.getInstance();

const routes = {
  tracking: (orderId: string) => `${prefix}/${orderId}/tracking`,
  item: (orderId: string) => `${prefix}/${orderId}`,
  list: () => `${prefix}`,
  assignDriver: (orderId: string) => `${prefix}/${orderId}/assign-driver`,
  cancel: (orderId: string) => `${prefix}/${orderId}/cancel`,
};

export const OperatorOrderApi = {
  async getOrders(): Promise<Types.RequestGetOrdersResult> {
    const url = routes.list();
    const result: ApiResponse<IOrder[]> = await api.get(url);
    return returnResponse(result);
  },

  async getOrder(orderId: string): Promise<Types.RequestGetOrderResult> {
    const url = routes.item(orderId);
    const result: ApiResponse<IOrder> = await api.get(url);
    return returnResponse(result);
  },

  async getOrderTracking(
    orderId: string
  ): Promise<Types.RequestGetOrderResult> {
    const url = routes.tracking(orderId);
    const result: ApiResponse<IOrder> = await api.get(url);
    return returnResponse(result);
  },

  async assignDriver(
    orderId: string,
    driverId: string
  ): Promise<Types.RequestAssignDriverResult> {
    const url = routes.assignDriver(orderId);
    const result: ApiResponse<Types.RequestAssignDriverResponse> =
      await api.put(url, { driverId });
    return returnResponse(result);
  },

  async cancelOrder(orderId: string): Promise<Types.RequestCancelOrderResult> {
    const url = routes.cancel(orderId);
    const result: ApiResponse<Types.RequestCancelOrderResponse> = await api.put(
      url
    );
    return returnResponse(result);
  },
};
