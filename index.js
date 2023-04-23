/*
  List command
  npx sequelize-cli init
  npx sequelize-cli model:generate --name Buku --attributes nama:string,tahunTerbit:integer
  npx sequelize-cli model:generate --name KategoriBuku --attributes nama:string
  npx sequelize-cli db:create
  npx sequelize-cli db:migrate
*/

const { login } = require("./src/controllers/AuthController")

const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

const port = 3000;
app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
