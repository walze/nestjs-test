import { sequelize } from 'db/setup';
import { defaultAttributes } from 'helpers';
import { DataTypes, Model, Optional } from 'sequelize';

export interface CarAttr {
  id: number;

  licensePlate: string;

  banned: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export type Car = Model<CarAttr, Optional<CarAttr, 'id'>>;

export const carAttr = {
  banned: DataTypes.BOOLEAN,
  licensePlate: { type: DataTypes.STRING, unique: 'compositeIndex' },
  ...defaultAttributes,
};

export const Car = sequelize.define<Car>('car', carAttr);
