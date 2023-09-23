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
