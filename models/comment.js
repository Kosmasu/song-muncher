"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, DeletedAt, } from "sequelize-typescript";
let Comment = class Comment extends Model {
};
__decorate([
    Column({ primaryKey: true, autoIncrement: true }),
    __metadata("design:type", BigInt)
], Comment.prototype, "id", void 0);
__decorate([
    Column,
    __metadata("design:type", String)
], Comment.prototype, "song_id", void 0);
__decorate([
    Column,
    __metadata("design:type", String)
], Comment.prototype, "user_id", void 0);
__decorate([
    Column(DataType.TEXT),
    __metadata("design:type", String)
], Comment.prototype, "comment", void 0);
__decorate([
    Column({
        allowNull: true,
    }),
    __metadata("design:type", BigInt)
], Comment.prototype, "parent_id", void 0);
__decorate([
    CreatedAt,
    __metadata("design:type", Date)
], Comment.prototype, "created_at", void 0);
__decorate([
    UpdatedAt,
    __metadata("design:type", Date)
], Comment.prototype, "updated_at", void 0);
__decorate([
    DeletedAt,
    __metadata("design:type", Date)
], Comment.prototype, "deleted_at", void 0);
Comment = __decorate([
    Table
], Comment);
export default Comment;
