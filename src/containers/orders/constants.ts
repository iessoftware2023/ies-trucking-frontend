import envGlobal from "env";
import _ from "lodash";

const ENV = envGlobal();

export const TRACKING_TABS_CONST = [
  {
    label: "Waitting Assign",
    value: "WAITING_ASSIGN",
  },
  {
    label: "On Going",
    value: "ON_GOING",
  },
  {
    label: "History",
    value: "HISTORY",
  },
] as const;

export const TRACKING_TABS = [...TRACKING_TABS_CONST];

export const REFRESH_DATA_INTERVAL =
  _.toNumber(ENV.REFRESH_DATA_INTERVAL) || 15000;

export const TRACKING_TAB_FILTER_STATUS = {
  WAITING_ASSIGN: [],
  ON_GOING: [
    "order_placed",
    "on_the_way_to_pickup",
    "order_pickup",
    "on_the_way_to_dropoff",
  ],
  HISTORY: ["cancelled", "completed"],
};
