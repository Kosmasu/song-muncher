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
  @Column({ primaryKey: true })
  username!: string;

  @Column
  password!: string;

  @Column
  ktp!: string;

  @Column
  email!: string;

  @Column
  kuota!: number;

  @CreatedAt
  created_at!: Date;

  @UpdatedAt
  updated_at!: Date;

  @DeletedAt
  deletedAt?: Date;
}
