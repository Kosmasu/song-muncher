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
import express from "express";
import authRoute from "./routes/AuthRoute.js";
import songRoute from "./routes/SongRoute.js";
import commentRoute from "./routes/CommentRoute.js";
import developerRoute from "./routes/DeveloperRoute.js";
import ratingRoute from "./routes/RatingRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { GlobalErrorHandler } from "./middleware/GlobalErrorHandler.js";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/song", songRoute);
app.use("/api/rating", ratingRoute);
app.use("/api/comment", commentRoute);
app.use("/api/developer", developerRoute);
app.use(GlobalErrorHandler);
const port = 3000;
app.listen(port, function () {
    console.log(`listening on port ${port}`);
});
