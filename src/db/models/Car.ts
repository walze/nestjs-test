import { defaultTimestamp } from 'helpers';
import { DataTypes, Model } from 'sequelize';

export class Car extends Model {
  id: number;

  licensePlate: string;

  banned: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export const carAttr = {
  ...defaultTimestamp,
  banned: DataTypes.BOOLEAN,
  licensePlate: { type: DataTypes.STRING, unique: 'compositeIndex' },
};
