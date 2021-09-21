import {DataTypes, Model, Optional} from 'sequelize'

import {defaultAttributes} from 'helpers'
import {sequelize} from 'db/setup'

export interface CarAttr {
  id: number;

  licensePlate: string;

  banned: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export type Car = CarAttr & Model<CarAttr, Optional<CarAttr, 'id'>>;

export const carAttr = {
  banned: DataTypes.BOOLEAN,
  licensePlate: {type: DataTypes.STRING,
    unique: 'compositeIndex'},
  ...defaultAttributes,
}

export const Car = sequelize.define<Car>(
    'car',
    carAttr
)
