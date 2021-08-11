import { defaultTimestamp } from 'helpers';
import { DataTypes, Model } from 'sequelize';

export class Car extends Model {
  id: number;

  licensePlate: string;

  createdAt: Date;
  updatedAt: Date;
}

export const carAttr = {
  ...defaultTimestamp,
  licensePlate: { type: DataTypes.STRING, unique: 'compositeIndex' },
};
