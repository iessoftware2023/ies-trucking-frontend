import { ApiResponse } from "apisauce";

export type GeneralApiProblem =
  /**
   * Times up.
   */
  | { kind: `timeout`; temporary: true }
  /**
   * Cannot connect to the server for some reason.
   */
  | { kind: `cannot-connect`; temporary: true }
  /**
   * The server experienced a problem. Any 5xx error.
   */
  | { kind: `server` }
  /**
   * We're not allowed because we haven't identified ourself. This is 401.
   */
  | { kind: `unauthorized` }
  /**
   * We don't have access to perform that request. This is 403.
   */
  | { kind: `forbidden` }
  /**
   * Unable to find that resource.  This is a 404.
   */
  | { kind: `not-found` }
  /**
   * Conflict
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { kind: "conflict"; data: any }
  /**
   * All other 4xx series errors.
   */
  | { kind: `rejected` }
  /**
   * Something truly unexpected happened. Most likely can try again. This is a catch all.
   */
  | { kind: `unknown`; temporary: true }
  /**
   * The data we received is not in the expected format.
   */
  | { kind: `bad-data` }
  | { kind: "payment-required" }
  | null;

/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
export function getGeneralApiProblem<T>(
  response: ApiResponse<T>
): GeneralApiProblem | void {
  switch (response.problem) {
    case `CONNECTION_ERROR`:
      return { kind: `cannot-connect`, temporary: true };
    case `NETWORK_ERROR`:
      return { kind: `cannot-connect`, temporary: true };
    case `TIMEOUT_ERROR`:
      return { kind: `timeout`, temporary: true };
    case `SERVER_ERROR`:
      return { kind: `server` };
    case `UNKNOWN_ERROR`:
      return { kind: `unknown`, temporary: true };
    case `CLIENT_ERROR`:
      switch (response.status) {
        case 401:
          return { kind: `unauthorized` };
        case 402:
          return { kind: "payment-required" };
        case 403:
          return { kind: `forbidden` };
        case 404:
          return { kind: `not-found` };
        case 409:
          return { kind: `conflict`, data: response.data };
        case 405: {
          return { kind: "bad-data" };
        }
        default:
          return { kind: `rejected` };
      }
    default:
      return { kind: `unknown`, temporary: true };
  }
}
