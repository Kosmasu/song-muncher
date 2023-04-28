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

import express, { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import authRoute from "./routes/AuthRoute.js";
import songRoute from "./routes/SongRoute.js";
import commentRoute from "./routes/CommentRoute.js";
import ratingRoute from "./routes/RatingRoute.js";
import { SpotifyAPIError } from "./exceptions/SpotifyAPIError.js";

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/song", songRoute);
app.use("/api/rating", ratingRoute);
app.use("/api/comment", commentRoute);

//Error handling
app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if (err instanceof SpotifyAPIError) {
    return res.status(err.status_code).send({
      status: err.status_code,
      message: err.message,
    })
  }
  return res.status(500).send({
    status: 500,
    message: "Something went wrong!",
  });
});

const port = 3000;
app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
