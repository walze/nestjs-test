import {
  AutoIncrement,
  Column,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'

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

  @Column
  declare updatedAt: Date;
}
