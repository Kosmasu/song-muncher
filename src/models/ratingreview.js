"use strict";
import { Model } from "sequelize";
module.exports = (sequelize, DataTypes) => {
  class RatingReview extends Model {
    static associate(models) {}
  }
  RatingReview.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      song_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      spotify_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      review: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "RatingReview",
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
    }
  );
  return RatingReview;
};
