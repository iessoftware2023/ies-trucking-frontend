import { NextPageContext } from "next";
import Router from "next/router";

import { ROUTES_NO_AUTH } from "@/constants";

export function utilRedirectLocation(location: string, ctx?: NextPageContext) {
  if (typeof window === "undefined") {
    ctx?.res?.writeHead(301, { Location: location });
    ctx?.res?.end();
    return {
      pageProps: {},
    };
  } else {
    Router.replace(location);
  }
}

type ParamsRedirectAuth = {
  isAuth: boolean;
  ctx?: NextPageContext;
};

export function redirectAuth(params: ParamsRedirectAuth) {
  const { ctx, isAuth } = params;

  const url = ctx?.pathname;

  const routeAuth = ROUTES_NO_AUTH.indexOf(url) < 0;

  if (!isAuth && routeAuth) {
    return utilRedirectLocation("/login", ctx);
  }

  if (isAuth && !routeAuth) {
    return utilRedirectLocation("/", ctx);
  }
}
