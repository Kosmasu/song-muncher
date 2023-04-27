"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Developers", [{}]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Developers", null, {});
  },
};
