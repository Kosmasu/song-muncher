'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('RatingReviews', "spotify_id", "user_id");
    await queryInterface.renameColumn('Comments', "spotify_id", "user_id");
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('RatingReviews', "user_id", "spotify_id");
    await queryInterface.renameColumn('Comments', "user_id", "spotify_id");
  }
};
