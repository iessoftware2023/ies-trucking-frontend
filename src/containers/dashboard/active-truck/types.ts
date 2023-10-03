import type * as DashboardTypes from "@/models/dashboard-store";
import { ITruckStatus } from "@/services/api/operator/dashboard-api/type";

export type IPagination = DashboardTypes.IPagination & {
  pages: number;
};

export type IActiveTruckStatus = ITruckStatus | "all";

export interface IStatus {
  status: ITruckStatus;
  count: number;
}
