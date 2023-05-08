"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Comments", "created_at", {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    });
    await queryInterface.changeColumn("Comments", "updated_at", {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    });
    await queryInterface.changeColumn("Developers", "created_at", {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    });
    await queryInterface.changeColumn("Developers", "updated_at", {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    });
    await queryInterface.changeColumn("RatingReviews", "created_at", {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    });
    await queryInterface.changeColumn("RatingReviews", "updated_at", {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Comments", "created_at", {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.changeColumn("Comments", "updated_at", {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.changeColumn("Developers", "created_at", {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.changeColumn("Developers", "updated_at", {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.changeColumn("RatingReviews", "created_at", {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.changeColumn("RatingReviews", "updated_at", {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
