import makeInspectable from "mobx-devtools-mst";
import { applySnapshot } from "mobx-state-tree";
import { NextPageContext } from "next";

import { Api } from "@/services/api";

import { Environment } from "../environment";
import { IRootStore, IRootStoreSnapshot, RootStoreModel } from "./root-store";

let store: IRootStore | undefined;

export function createEnvironment(ctx?: NextPageContext): Environment {
  const env = new Environment();
  Api.setToken(ctx);
  return env;
}

export function initializeStore(
  snapshot?: IRootStoreSnapshot | null,
  ctx?: NextPageContext
): IRootStore {
  const env = createEnvironment(ctx);

  const _store = store ?? RootStoreModel.create({}, env);

  // If your page has Next.js data fetching methods that use a Mobx store, it will get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
  if (snapshot) {
    applySnapshot(_store, snapshot);
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;

  // Create the store once in the client
  if (!store) store = _store;

  makeInspectable(store);

  return store;
}
