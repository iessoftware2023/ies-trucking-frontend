import { IUser } from "@/models";

import { GeneralApiProblem } from "../api-problem";
import { Response } from "../api-utilities";

export type RequestGetMeResult =
  | {
      kind: `ok`;
      result: IUser;
    }
  | GeneralApiProblem;

export type RequestLoginBody = {
  email: string;
  password: string;
};

export type LoginResult = {
  accessToken: string;
};

export type RequestLoginResult = Response<LoginResult>;
