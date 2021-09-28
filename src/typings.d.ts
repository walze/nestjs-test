export interface IResponse<T> {
  status: number;
  data: T;
  message: string,
}

export type IResponseError = Error & IResponse<null>;

export type INonNullResponse<T> =
  Exclude<
    IResponse<Exclude<T, IResponseError>>,
    IResponse<IResponseError>
  >

export type IMaybeResponse<T> =
  INonNullResponse<T> |
  IResponseError

// eslint-disable-next-line no-unused-vars
export type Without<T, U> = { [_ in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = (T | U) extends Record<string, unknown>
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;
