import { defaultTimestamp } from 'helpers';
import { Model } from 'sequelize';

export class Lot extends Model {
  id: number;

  createdAt: Date;
  updatedAt: Date;

  carId: number | null;
}

export const lotAttr = { ...defaultTimestamp };
