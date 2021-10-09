import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'

import {Car} from './Car'

@Table
export class Lot extends Model {
  @Index
  @AutoIncrement
  @PrimaryKey
  @Column
  declare id: number;

  @Index
  @AllowNull(true)
  @ForeignKey(() => Car)
  @Column({type: DataType.INTEGER})
  declare carId: number | null;

  @BelongsTo(() => Car)
  declare car?: Car;

  @Column
  declare createdAt: Date;

  @Column
  declare updatedAt: Date;
}

