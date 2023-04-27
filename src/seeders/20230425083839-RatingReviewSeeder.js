"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("RatingReviews", [{}]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("RatingReviews", null, {});
  },
};
