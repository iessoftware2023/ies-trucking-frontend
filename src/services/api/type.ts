import { GeneralApiProblem } from "./api-problem";

export type Response<T> = GeneralApiProblem | { kind: "ok"; result: T };

export type PartiallyOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type PartiallyRequired<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

export type ResponseError = {
  errors: {
    message: string;
  }[];
};
