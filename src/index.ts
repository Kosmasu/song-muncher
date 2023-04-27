/*
  List command
  npx sequelize-cli init
  npx sequelize-cli model:generate --name Buku --attributes nama:string,tahunTerbit:integer
  npx sequelize-cli model:generate --name KategoriBuku --attributes nama:string
  npx sequelize-cli seed:generate --name <nama_seeder>
  npx sequelize-cli db:create
  npx sequelize-cli db:migrate
  npx sequelize-cli db:seed:all
  npx sequelize-cli db:migrate:undo:all
  npx sequelize-cli db:seed:undo:all
*/

import { expression } from "joi";

interface User {
  name: string;
  socialSecurityNumber: number;
  orangTua: User | null;
}

const kevin: User = {
  name: "Kevin",
  socialSecurityNumber: 123,
  orangTua: {
    name: "Ferdinandus",
    socialSecurityNumber: 789,
    orangTua: null,
  },
};

import express from "express";
import authRoute from "./routes/AuthRoute.js";
import songRoute from "./routes/SongRoute.js";
import commentRoute from "./routes/Comment.js";

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/api", async (req, res) => {
  return res.status(200).send({
    message: "test",
    kevin,
  });
});

app.use("/api/auth", authRoute);
app.use("/api/song", songRoute);
app.use("/api/comment", commentRoute);

const port = 3000;
app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
