import { Request, Response } from "express";
import Joi from "joi";
import { getUserID } from "./UserController";

/**
 * TODO:
 * 1. pengecekan authorization bearer token itu valid atau tidak
 *  dan berikan kembalian response yang sesuai.
 * 2. pengecekan kalau sudah lewat rate limit
 *  dan berikan kembalian response yang sesuai.
 */


export const createRating = async (req: Request, res: Response) => {
  const { song_id, rating, review }:
    { song_id: string, rating: number, review: string } = req.body;
  try {
    await Joi.object({
      song_id: Joi.string().required().label("song id"),
      rating: Joi.number().positive().max(5).required().label("rating"),
      review: Joi.string().required().label("review"),
    }).validateAsync(req.query);
  }
  catch (error) {
    return res.status(400).send({ message: String(error) });
  }
  const user_id = await getUserID(req.headers.authorization as string);
  /**
   * TODO
   * 1. pengecekan song_id exists
   * 2. create rating (201)
   */
}

export const updateRating = async (req: Request, res: Response) => {
  const { rating, review }:
    { rating: number, review: string } = req.body;
  const { rating_id } = req.params;
  try {
    await Joi.object({
      rating: Joi.number().positive().max(5).required().label("rating"),
      review: Joi.string().required().label("review"),
    }).validateAsync(req.query);
  }
  catch (error) {
    return res.status(400).send({ message: String(error) });
  }
  /**
   * TODO:
   * 1. pengecekan rating exist
   * 2. update rating (201)
   */
}

export const deleteRating = async (req: Request, res: Response) => {
  const { rating_id } = req.params;
  /**
   * TODO:
   * 1. pengecekan rating exist
   * 2. delete rating (201)
   */
}