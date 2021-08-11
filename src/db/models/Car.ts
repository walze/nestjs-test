import { defaultTimestamp } from 'helpers';
import { DataTypes, Model } from 'sequelize/types';

export class Car extends Model {
  id: number;

  licensePlate: string;

  createdAt: Date;
  updatedAt: Date;
}

export const carAttr = {
  ...defaultTimestamp,
  licensePlate: DataTypes.STRING,
};
