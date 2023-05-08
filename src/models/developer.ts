"use strict";
import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from "sequelize-typescript";

@Table
export default class Developer extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  username!: string;

  @Column
  password!: string;

  @Column
  email!: string;

  @Column
  kuota!: number;

  @CreatedAt
  created_at!: Date;

  @UpdatedAt
  updated_at!: Date;

  @DeletedAt
  deleted_at?: Date;
}
