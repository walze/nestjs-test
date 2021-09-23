import {Car} from 'db/models'
import {Options} from 'sequelize'

export interface ConfigValues extends Options {
  adminKeys: string[];
}

export type environments = 'production' | 'development' | 'testing';

export type Config = {
  [_ in environments]: ConfigValues;
};

export type IResponse<T> = {
  status: number;
  data: T;
};

export type IResponseError = Error & IResponse<null>;

