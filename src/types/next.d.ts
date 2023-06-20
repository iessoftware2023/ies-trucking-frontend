import { RootStore } from "@models";
import { NextComponentType, NextPageContext } from "next";
import { Router } from "next/dist/client/router";
import { AppTreeType } from "next/dist/next-server/lib/utils";

declare type AppContext = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  Component: NextComponentType<NextPageContext, {}, {}>;
  AppTree: AppTreeType;
  ctx: NextPageContext & {
    store?: RootStore;
  };
  router: Router;
};

declare type NextPageContextWithRootStore = NextPageContext & {
  store?: RootStore;
};
