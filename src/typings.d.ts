export interface ConfigValues {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: string;
  adminKeys: string[];
}

export type environments = 'production' | 'development' | 'testing';

export type Config = {
  [key in environments]: ConfigValues;
};
