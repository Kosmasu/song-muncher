"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const password = await bcrypt.hashSync("123", 10);
        const kuota = 0;
        await queryInterface.bulkInsert("Developers", [
            {
                username: "joko",
                password,
                email: "joko@gmail.com",
                kuota,
            },
            {
                username: "odi",
                password,
                email: "odi@gmail.com",
                kuota,
            },
            {
                username: "kenny",
                password,
                email: "kenny@gmail.com",
                kuota,
            },
        ]);
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Developers", null, {});
    },
};
export {};
