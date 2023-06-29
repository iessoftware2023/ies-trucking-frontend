import { createContext, useContext } from "react";

import { IRootStore } from "./root-store";

const RootStoreContext = createContext<IRootStore>({} as IRootStore);

export const RootStoreProvider = RootStoreContext.Provider;

export const useStores = (): IRootStore => useContext(RootStoreContext);
