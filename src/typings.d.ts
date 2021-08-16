import { Options } from 'sequelize';

export interface ConfigValues extends Options {
  adminKeys: string[];
}

export type environments = 'production' | 'development' | 'testing';

export type Config = {
  [key in environments]: ConfigValues;
};
