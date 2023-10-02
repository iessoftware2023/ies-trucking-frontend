export type ITotalBookingStatus =
  | "order_placed"
  | "on_the_way_to_pickup"
  | "order_pickup"
  | "on_the_way_to_dropoff"
  | "cancelled"
  | "completed";

export interface IStatus {
  status: ITotalBookingStatus;
  count: number;
}

import { TRACKING_TABS_CONST } from "./constants";

export type ITrackingTabKey = (typeof TRACKING_TABS_CONST)[number]["value"];

export type IDriver = {
  id: string;
  name: string;
  phoneNumber: string;
};
