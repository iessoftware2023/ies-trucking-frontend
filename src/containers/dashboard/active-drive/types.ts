import type * as DashboardTypes from "@/models/dashboard-store";
import type * as Types from "@/services/api/operator/dashboard-api/type";

export type IPagination = DashboardTypes.IPagination & {
  pages: number;
};

export type IDriverStatus = Types.IDriveStatus | "all";
