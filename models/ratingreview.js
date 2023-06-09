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
let RatingReview = class RatingReview extends Model {
};
__decorate([
    Column({ primaryKey: true, autoIncrement: true }),
    __metadata("design:type", BigInt)
], RatingReview.prototype, "id", void 0);
__decorate([
    Column,
    __metadata("design:type", String)
], RatingReview.prototype, "song_id", void 0);
__decorate([
    Column,
    __metadata("design:type", String)
], RatingReview.prototype, "user_id", void 0);
__decorate([
    Column(DataType.FLOAT),
    __metadata("design:type", Number)
], RatingReview.prototype, "rating", void 0);
__decorate([
    Column(DataType.TEXT),
    __metadata("design:type", String)
], RatingReview.prototype, "review", void 0);
__decorate([
    CreatedAt,
    __metadata("design:type", Date)
], RatingReview.prototype, "created_at", void 0);
__decorate([
    UpdatedAt,
    __metadata("design:type", Date)
], RatingReview.prototype, "updated_at", void 0);
__decorate([
    DeletedAt,
    __metadata("design:type", Date)
], RatingReview.prototype, "deleted_at", void 0);
RatingReview = __decorate([
    Table
], RatingReview);
export default RatingReview;
