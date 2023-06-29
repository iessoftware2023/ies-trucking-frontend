import { NextComponentType, NextPageContext } from "next";
import { Router } from "next/dist/client/router";
import { AppTreeType } from "next/dist/next-server/lib/utils";

import { IRootStore } from "@/models";

declare type AppContext = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  Component: NextComponentType<NextPageContext, {}, {}>;
  AppTree: AppTreeType;
  ctx: NextPageContext & {
    store?: IRootStore;
  };
  router: Router;
};

declare type NextPageContextWithRootStore = NextPageContext & {
  store?: IRootStore;
};
