import { pipe } from 'ramda';
import { DataTypes } from 'sequelize';

export const defaultAttributes = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },
};

export const isValidDate = pipe(
  (d: Date | number) => +new Date(d),
  Number.isNaN,
);

export type IResponse<T> = {
  status: number;
  data: T;
};

export type IResponseError = Error & IResponse<null>;

export const RequestError = ({
  message,
  status = 500,
}: {
  message: string;
  status: number;
}): IResponseError => ({
  ...new Error(message),
  message,
  status,
  data: null,
});
