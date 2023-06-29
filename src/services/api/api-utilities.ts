import { ApiResponse } from "apisauce";

import { getGeneralApiProblem } from "./api-problem";
import { Response } from "./type";

export function returnResponse<T>(result: ApiResponse<T>): Response<T> {
  if (!result.ok || result.problem) {
    const problem = getGeneralApiProblem(result);
    if (problem) return problem;
  }

  try {
    if (result.data) {
      return {
        kind: `ok`,
        result: result.data,
      };
    }
    return { kind: "ok", result: null };
  } catch {
    return { kind: `bad-data` };
  }
}
