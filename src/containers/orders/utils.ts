import dayjs from "dayjs";

import { search } from "@/utils/string";

import { IFormFilterValues } from "./components/drawer-filter";
import { TRACKING_TAB_FILTER_STATUS } from "./constants";
import { ITrackingTabKey } from "./types";

export const handleTrackingFilter = (
  filter: IFormFilterValues,
  fields: {
    tabKey: ITrackingTabKey;
    searchField: string;
    date: string;
    status: string;
  }
) => {
  const temp = TRACKING_TAB_FILTER_STATUS[fields?.tabKey];
  const filterTabKey = temp?.length ? temp?.includes(fields?.status) : true;

  const filterSearch = filter?.search
    ? search(fields?.searchField, filter?.search)
    : true;

  const filterDateRange = filter?.dateRange
    ? dayjs(fields?.date).isBetween(
        filter?.dateRange[0],
        filter?.dateRange[1],
        "day",
        "[]"
      )
    : true;

  const filterStatus = filter?.status?.length
    ? filter?.status?.includes(fields?.status)
    : true;

  return filterTabKey && filterSearch && filterDateRange && filterStatus;
};

export const checkCanCancelBooking = (status: string) => {
  return ["pending", "order_placed"].includes(status);
};

export const checkCanAssignDriver = (status: string) => {
  return ["pending", "order_placed"].includes(status);
};