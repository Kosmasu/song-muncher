"use strict";
const { faker } = require("@faker-js/faker");
const seeders = require("./seed.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const comments = [];
    for (let i = 1; i <= 50; i++) {
      let parent_id = null;
      if (i >= 3 && Math.floor(Math.random() * 2) == 1) {
        parent_id = Math.floor(Math.random() * (i - 1)) + 1;
      }
      comments.push({
        song_id:
          seeders.song_id[Math.floor(Math.random() * seeders.song_id.length)],
        user_id:
          seeders.user[Math.floor(Math.random() * seeders.user.length)]
            .spotify_id,
        comment: faker.random.words(),
        parent_id,
      });
    }
    await queryInterface.bulkInsert("Comments", comments);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Comments", null, {});
  },
};
