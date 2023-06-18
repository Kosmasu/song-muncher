import { NextFunction, Request, Response } from "express";
import { fetchSongs, fetchSong } from "../services/SongService.js";
import { RatingReview } from "../models/index.js";
import { Comment } from "../models/index.js";
import { getUserID } from "./UserController.js";
import Joi from "joi";

export const getSongs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { query, type } = req.query;
  try {
    await Joi.object({
      query: Joi.string().required().label("query"),
      type: Joi.string().optional().label("type"),
    }).validateAsync(req.query);
  } catch (error) {
    next(error);
  }
  try {
    const response = await fetchSongs(
      query?.toString() ?? "",
      type?.toString() ?? "track",
      req.header("Authorization") as string
    );
    if (type) {
      const resArtistSongs = [];
      for (let i = 0; i < response.data.artists.items.length; i++) {
        resArtistSongs.push(response.data.artists.items[i].id);
      }
      return res.status(200).send(resArtistSongs);
    }
    return res.status(200).send(response.data.tracks.items);
  } catch (error) {
    next(error);
  }
};

export const getSong = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    params: { song_id },
  } = req;
  try {
    const response = await fetchSong(
      song_id,
      req.header("Authorization") as string
    );
    return res.status(200).send(response.data);
  } catch (error) {
    next(error);
  }
};

export const getSelfData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = await getUserID(req.headers.authorization as string);
    const ratings = await RatingReview.findAll({
      where: {
        user_id: user_id,
      },
      attributes: ["song_id", "rating", "review"],
    });
    const comments = await Comment.findAll({
      where: {
        user_id: user_id,
      },
      attributes: ["song_id", "comment"],
    });
    return res.status(200).send({
      user_id,
      Comments: comments,
      RatingReview: ratings,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Will return null if the song does not exist, or return the song object if the song does exist.
 * will throw an exception if the status code is not 200
 * @param song_id the id of the song e.g "11dFghVXANMlKmJXsNCbNl"
 * @param authorization the Authorization header e.g "Bearer B11577ygspod234..."
 */
export const isSongExist = async (
  song_id: string,
  authorization: string
): Promise<boolean> => {
  const response = await fetchSong(song_id, authorization);
  if (response.status != 200) {
    return Promise.reject(response);
  }
  return true;
};
