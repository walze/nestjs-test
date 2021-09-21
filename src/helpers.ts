import {DataTypes} from 'sequelize'
import {IResponseError} from 'typings'
import {pipe} from 'ramda'

export const defaultAttributes = {
  createdAt: {
    defaultValue: new Date(),
    type: DataTypes.DATE,
  },
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  updatedAt: {
    defaultValue: new Date(),
    type: DataTypes.DATE,
  },
}

export const isValidDate = pipe(
    (d: Date | number) => Number(new Date(d)),
    Number.isNaN,
)

export const RequestError = ({
  message,
  status = 500,
}: {
  message: string;
  status: number;
}): IResponseError => ({
  ...new Error(message),
  data: null,
  message,
  status,
})
