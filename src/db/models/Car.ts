import {
  AutoIncrement,
  Column,
  HasOne,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'

import {Lot} from './Lot'

@Table
export class Car extends Model {
  @Index
  @AutoIncrement
  @PrimaryKey
  @Column
  declare id: number;

  @Index
  @Column
  declare licensePlate: string;

  @Column
  declare banned: boolean;

  @Column
  declare createdAt: Date;

  @HasOne(() => Lot)
  declare lot: Lot

  @Column
  declare updatedAt: Date;
}
