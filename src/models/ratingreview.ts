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

@Table
export default class RatingReview extends Model {
  @Column({ primaryKey: true })
  id!: bigint;

  @Column
  song_id!: string;

  @Column
  user_id!: string;

  @Column(DataType.FLOAT)
  rating!: number;

  @Column(DataType.TEXT)
  review!: string;

  @CreatedAt
  created_at!: Date;

  @UpdatedAt
  updated_at!: Date;

  @DeletedAt
  deleted_at?: Date;
}