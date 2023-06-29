import { TRACKING_TABS_CONST } from "./constants";

export type ITrackingTabKey = (typeof TRACKING_TABS_CONST)[number]["value"];

export type IDriver = {
  id: string;
  name: string;
  phoneNumber: string;
};
