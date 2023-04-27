"use strict";

import fs from "fs";
import path from "path";
import { ModelCtor } from "sequelize-typescript";
import sequelize from "../config/instance.js";

// import process from 'process';
const __dirname = path.dirname(__filename);
const __basename = path.basename(__filename);

// read all files under models
const files = fs.readdirSync(__dirname).filter((file) => {
  return (
    file.indexOf(".") !== 0 &&
    file !== __basename &&
    file.slice(-3) === ".ts" &&
    file.indexOf(".test.js") === -1
  );
});

// get model class and push to models
const models: ModelCtor[] = [];
await Promise.all(
  files.map(async (file) => {
    const jsName = "./" + file.slice(0, -3) + ".js";
    // console.log("loading ",jsName);
    const { default: model } = await import(jsName);
    // console.log("model is ",model);

    models.push(model);
  })
);
// add to sequelize
sequelize.addModels(models);

// add exports here everytime you add a new module
export { default as Comment } from "./comment.js";
export { default as Developer } from "./developer.js";
export { default as RatingReview } from "./ratingreview.js";
