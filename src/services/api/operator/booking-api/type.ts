import { IBooking } from "@/models/operator";

import { GeneralApiProblem } from "../../api-problem";
import { Response } from "../../type";

export interface RequestGetBookingConfigResponse {
  cargoTypes: { id: string; name: string }[];
  cargoWeights: {
    id: string;
    minWeight?: number;
    maxWeight: number;
    description: string;
  }[];
}

export type RequestGetBookingConfigResult =
  Response<RequestGetBookingConfigResponse>;

interface Enterprise {
  id: string;
  name: string;
  address: string;
}

interface Parking {
  id: string;
  name: string;
  address: string;
}

interface TruckType {
  id: string;
  name: string;
  description: string;
  height: number;
  width: number;
  length: number;
  weightLimit: number;
}

interface CostConfig {
  id: string;
  costPerHour: number;
  costPerHourWithDriver: number;
  currency: string;
}

export interface RequestCreateBookingBody {
  pickupTime: string;
  dropoffTime: string;
  pickup: {
    latitude: number;
    longitude: number;
    address: string;
    fullName: string;
    phoneNumber: string;
    addressNote: string;
  };
  dropoff: {
    latitude: number;
    longitude: number;
    address: string;
    fullName: string;
    phoneNumber: string;
    addressNote: string;
  };
  truckTypeId?: string;
  parkingId?: string;
  enterpriseId?: string;
  customerId?: string;
  cargoTypeId?: string;
  cargoWeightId?: string;
  cargoSize?: {
    width: number;
    height: number;
    length: number;
  };
  isSelfDriving?: boolean;
}

export interface IRequestBooking {
  id: string;
  code: string;
  pickupTime: string;
  dropoffTime: string;
  rentalPeriod: number;
  pickup: {
    latitude: number;
    longitude: number;
    address: string;
    fullName: string;
    phoneNumber: string;
    addressNote: string;
  };
  dropoff: {
    latitude: number;
    longitude: number;
    address: string;
    fullName: string;
    phoneNumber: string;
    addressNote: string;
  };
  cargoType: null | number;
  cargoWeight: null | number;
  cargoSize: null | number;
  distance: null | number;
  duration: null | number;
  cost: number;
  status: string;

  enterprise: Enterprise;
  parking: Parking;
  truckType: TruckType;
  costConfig: CostConfig;
}

export type RequestBookingResult = Response<IBooking>;

export type RequestBookingsResponse = IBooking[];

export type RequestBookingsResult = Response<RequestBookingsResponse>;

export type RequestAssignDriverResponse = null;
export type RequestAssignDriverResult =
  | GeneralApiProblem
  | { kind: "ok"; result: RequestAssignDriverResponse };

export type RequestCancelBookingResponse = null;
export type RequestCancelBookingResult = Response<RequestCancelBookingResponse>;
