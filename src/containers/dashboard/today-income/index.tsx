import { FallOutlined, RiseOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import classNames from "classnames";
import React, { useState } from "react";
import _JSXStyle from "styled-jsx/style";

import { REFRESH_DATA_INTERVAL } from "@/containers/booking-list/constants";
import { useInterval } from "@/hooks";
import { useStores } from "@/models";

export const TodayIncome = () => {
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);
  const { dashboardStore } = useStores();

  useInterval(async () => {
    setIsLoadingDashboard(true);
    await dashboardStore.getTotalIncome();
    setIsLoadingDashboard(false);
  }, REFRESH_DATA_INTERVAL);

  return (
    <>
      <_JSXStyle jsx>{`
        .ant-spin-wrapper {
          display: flex;
          flex: 1;
        }
        .ant-spin-wrapper .ant-spin-container {
          display: flex;
          flex: 1;
        }
      `}</_JSXStyle>
      <Spin
        wrapperClassName="ant-spin-wrapper"
        style={{ display: "flex" }}
        spinning={isLoadingDashboard}
      >
        <div className="flex flex-1 items-center justify-between rounded border border-sky-100 bg-white px-4 py-3">
          <div className="shrink grow basis-0 font-Inter text-base font-normal leading-normal text-black">
            Today&apos;s Income
          </div>
          <div className="flex shrink grow basis-0 items-center justify-start gap-4">
            <div className="flex shrink grow basis-0 items-center justify-end gap-2">
              <div className="text-right font-Inter text-sm font-normal leading-[31px] text-neutral-400">
                {dashboardStore.income.totalIncomeToday.currency}
              </div>
              <div className="text-neutral-950 text-right font-Inter text-[22px] font-semibold leading-7">
                {dashboardStore.income.totalIncomeToday.total ?? 0}
              </div>
            </div>
            <div className="flex items-center justify-center gap-1 rounded bg-emerald-50 px-1 py-0.5">
              {dashboardStore.income.revenueRatio >= 0 ? (
                <RiseOutlined className="text-xs text-teal-500" />
              ) : (
                <FallOutlined className="text-xs text-red-500" />
              )}

              <div
                className={classNames(
                  "font-Inter text-xs font-normal leading-none",
                  {
                    "text-teal-500": dashboardStore.income.revenueRatio >= 0,
                    "text-red-500": dashboardStore.income.revenueRatio < 0,
                  }
                )}
              >
                {dashboardStore.income.revenueRatio}%
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </>
  );
};
