import "../../public/fonts/FontAwesomePro/css/fontawesome.min.css";
import "../../public/fonts/FontAwesomePro/css/regular.min.css";
import "../../public/fonts/FontAwesomePro/css/solid.min.css";
import "animate.css";
import "antd/dist/reset.css";
import "@/styles/globals.css";

import { getSnapshot } from "mobx-state-tree";
import type { AppInitialProps, AppProps } from "next/app";
import App from "next/app";
import { Inter } from "next/font/google";
import NextNprogress from "nextjs-progressbar";
import { useMemo } from "react";

import { ThemeProvider } from "@/components/theme";
import { initializeStore, RootStoreProvider } from "@/models/root-store";
import { Api } from "@/services/api";
import { AppContext } from "@/types/next";
import { redirectAuth } from "@/utils/router";

const inter = Inter({
  display: "swap",
  subsets: ["vietnamese"],
  variable: "--font-inter",
});

function IESWebApp({ Component, pageProps }: AppProps) {
  const rootStore = useMemo(
    () => initializeStore(pageProps?.initialState),
    [pageProps?.initialState]
  );

  return (
    <>
      <RootStoreProvider value={rootStore}>
        <NextNprogress
          color="#ffd31a"
          height={3}
          options={{
            showSpinner: false,
          }}
        />

        <ThemeProvider>
          <div className={`${inter.variable} ${inter.className}`}>
            <Component {...pageProps} />
          </div>
        </ThemeProvider>
      </RootStoreProvider>
    </>
  );
}

IESWebApp.getInitialProps = async (appContext: AppContext) => {
  const rootStore = initializeStore(undefined, appContext.ctx);

  let isAuth = false;

  const token = Api.getToken();

  if (!token) {
    rootStore.authStore.setAuth(false);
  } else {
    if (!rootStore.authStore.user.id) {
      await rootStore.authStore.getMe();
    }

    if (rootStore.authStore.user.id) {
      rootStore.authStore.setAuth(true);
      isAuth = true;
    } else {
      rootStore.authStore.setAuth(false);
    }
  }

  appContext.ctx.store = rootStore;
  const appProps: AppInitialProps = await App.getInitialProps(appContext);

  redirectAuth({
    isAuth,
    ctx: appContext?.ctx,
  });

  return {
    pageProps: {
      ...appProps.pageProps,
      initialState: getSnapshot(rootStore),
    },
  };
};

export default IESWebApp;
