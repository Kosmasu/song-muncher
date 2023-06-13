"use strict";
const { faker } = require("@faker-js/faker");
const seeders = require("./seed.json");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const ratingReviews = [];
        for (let i = 1; i <= 50; i++) {
            ratingReviews.push({
                song_id: seeders.song_id[Math.floor(Math.random() * seeders.song_id.length)],
                user_id: seeders.user[Math.floor(Math.random() * seeders.user.length)]
                    .spotify_id,
                rating: Math.floor(Math.random() * 5) + 1,
                review: faker.random.words(),
            });
        }
        await queryInterface.bulkInsert("RatingReviews", ratingReviews);
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("RatingReviews", null, {});
    },
};
export {};
