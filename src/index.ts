import { CommonRequest, CommonResponse } from "servie/dist/common";

export class StatusError extends Error {
  status: number;
  code = "EINVALIDSTATUS";

  constructor(public response: CommonResponse, message: string) {
    super(message);
    this.status = response.status;
  }
}

export function status(min = 200, max = 400) {
  return async function checkStatus<T extends CommonResponse>(
    req: CommonRequest,
    next: () => Promise<T>
  ): Promise<T> {
    const res = await next();

    if (res.status >= min && res.status < max) return res;

    throw new StatusError(res, `${req.url} responded with ${res.status}`);
  };
}
