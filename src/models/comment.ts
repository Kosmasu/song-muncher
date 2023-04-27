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
export default class Comment extends Model {
  @Column({ primaryKey: true })
  id!: bigint;

  @Column
  song_id!: string;

  @Column
  spotify_id!: string;

  @Column(DataType.TEXT)
  comment!: string;

  @Column
  parent_id!: bigint;

  @CreatedAt
  created_at!: Date;

  @UpdatedAt
  updated_at!: Date;

  @DeletedAt
  deletedAt?: Date;
}
