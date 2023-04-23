/*
  List command
  npx sequelize-cli init
  npx sequelize-cli model:generate --name Buku --attributes nama:string,tahunTerbit:integer
  npx sequelize-cli model:generate --name KategoriBuku --attributes nama:string
  npx sequelize-cli db:create
  npx sequelize-cli db:migrate
*/

import { expression } from "joi";

interface User {
  name: string,
  socialSecurityNumber: number,
  orangTua: User | null,
}

const kevin: User = {
  name: "Kevin",
  socialSecurityNumber: 123,
  orangTua: {
    name: "Ferdinandus",
    socialSecurityNumber: 789,
    orangTua: null
  }
}

// const express = require("express");
// const { hey } = require("./helper/coba");

import express from "express";
import { hey } from "./helper/coba.js";

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/api", async (req, res) => {
  return res.status(200).send({
    message: "test",
    kevin,
    hey,
  })
})

const port = 3000;
app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
