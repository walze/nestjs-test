import { defaultTimestamp } from 'helpers';
import { Model } from 'sequelize/types';

export class Lot extends Model {
  id: number;

  createdAt: Date;
  updatedAt: Date;

  CarId: number | null;
}

export const lotAttr = { ...defaultTimestamp };
