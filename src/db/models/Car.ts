import {DataTypes, Model, Sequelize} from 'sequelize'

import {defaultAttributes} from 'helpers'

export interface CarAttr {
  id: number;

  licensePlate: string;

  banned: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export type Car = CarAttr & Model<
  CarAttr,
  {licensePlate: string, banned?: boolean}
>;

export const carAttr = {
  banned: DataTypes.BOOLEAN,
  licensePlate: {
    type: DataTypes.STRING,
    unique: 'compositeIndex',
  },
  ...defaultAttributes,
}

export const defineCar = (s: Sequelize) => s.define<Car>(
    'car',
    carAttr
)
