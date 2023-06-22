"use strict";
import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from "sequelize-typescript";

@Table({
  tableName:"comments",
  modelName:"Comment"
})
export default class Comment extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: bigint;

  @Column
  song_id!: string;

  @Column
  user_id!: string;

  @Column(DataType.TEXT)
  comment!: string;

  @Column({
    allowNull: true,
  })
  parent_id!: bigint;

  @CreatedAt
  created_at!: Date;

  @UpdatedAt
  updated_at!: Date;

  @DeletedAt
  deleted_at?: Date;
}
