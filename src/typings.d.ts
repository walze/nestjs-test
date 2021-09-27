export type IResponse<T> = {
  status: number;
  data: T;
};

export type IResponseError = Error & IResponse<null>;

