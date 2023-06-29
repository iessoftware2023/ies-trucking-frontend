import { IOrder } from "@/models/operator";

import { Response } from "../../type";

export type RequestGetOrdersResult = Response<IOrder[]>;

export type RequestGetOrderResult = Response<IOrder>;
