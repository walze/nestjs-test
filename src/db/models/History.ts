import {
  AutoIncrement,
  Column,
  ForeignKey,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import {Car, Lot} from '.'

@Table
export class History extends Model {
  @Index
  @AutoIncrement
  @PrimaryKey
  @Column
  declare id: number;

  @Column
  @ForeignKey(() => Lot)
  declare lotId: number;

  @Column
  @ForeignKey(() => Car)
  declare carId: number;

  @Column
  declare date: Date;
}
