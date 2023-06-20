import { ApisauceInstance, create } from "apisauce";
import envGlobal from "env";
import { NextPageContext } from "next";
import Nookies from "nookies";

import { APP_CONSTANTS } from "@/constants";
import { RootStore } from "@/models/root-store";

const { API_URL } = envGlobal();

class Api {
  private static instance: ApisauceInstance;
  private static token: string;

  public static getInstance(): ApisauceInstance {
    if (!Api.instance) {
      Api.instance = create({ baseURL: API_URL });

      Api.instance.axiosInstance.interceptors.request.use(
        (request) => {
          request.headers = {
            Accept: "*/*",
            Authorization: "Bearer " + Api.token,
          };
          return request;
        },
        (error) => {
          return error;
        }
      );
      Api.instance.axiosInstance.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          return error;
        }
      );
    }
    return Api.instance;
  }

  public static setToken(
    ctx: NextPageContext & {
      store?: RootStore;
    }
  ) {
    const cookies = Nookies.get(ctx);
    Api.token = cookies[APP_CONSTANTS.AUTH] || "";
  }

  public static getToken() {
    return Api.token;
  }
}

export { Api };
