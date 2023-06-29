import { IUser } from "@/models";

import { Response } from "../../type";

export type RequestGetMeResult = Response<IUser>;

export type RequestLoginBody = {
  email: string;
  password: string;
};

export type LoginResult = {
  accessToken: string;
};

export type RequestLoginResult = Response<LoginResult>;
