import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { getUserID } from "./UserController.js";
import { isSongExist } from "./SongController.js";
import RatingReview from "../models/ratingreview.js";

export const createRating = async (req: Request, res: Response, next: NextFunction) => {
  const { song_id, rating, review }:
    { song_id: string, rating: number, review: string } = req.body;
  try {
    await Joi.object({
      song_id: Joi.string().required().label("song id"),
      rating: Joi.number().positive().max(5).required().label("rating"),
      review: Joi.string().required().label("review"),
    }).validateAsync(req.body);
  }
  catch (error) {
    return res.status(400).send({ message: String(error) });
  }
  try {
    const user_id = await getUserID(req.headers.authorization as string);
    await isSongExist(song_id, req.headers.authorization as string);
    const ratingReview = await RatingReview.create({
      song_id, rating, review, user_id
    });
    return res.status(201).send({
      message: "Successfully created a new rating and review!",
      rating_review: ratingReview,
    });
  }
  catch (error) {
    next(error);
  }
}

export const updateRating = async (req: Request, res: Response, next: NextFunction) => {
  const { rating, review }:
    { rating: number, review: string } = req.body;
  const { rating_id } = req.params;
  try {
    await Joi.object({
      rating: Joi.number().positive().max(5).required().label("rating"),
      review: Joi.string().required().label("review"),
    }).validateAsync(req.body);
  }
  catch (error) {
    return res.status(400).send({ message: String(error) });
  }
  try {
    const ratingReview = await RatingReview.findByPk(rating_id);
    if (!ratingReview) {
      return res.status(404).send({
        message: "Rating and review is not found!"
      })
    }
    ratingReview.rating = rating;
    ratingReview.review = review;
    await ratingReview.save();
    return res.status(201).send({
      message: `Rating and review is successfully updated!`,
      rating_review: ratingReview,
    })
  }
  catch (error) {
    next(error);
  }
}

export const deleteRating = async (req: Request, res: Response, next: NextFunction) => {
  const { rating_id } = req.params;
  try {
    const ratingReview = await RatingReview.findByPk(rating_id);
    if (!ratingReview) {
      return res.status(404).send({
        message: "Rating Review is not found!"
      })
    }
    await ratingReview.destroy();
    return res.status(201).send({
      message: `Rating Review is successfully deleted!`,
      rating_review: ratingReview,
    })
  }
  catch (error) {
    next(error);
  }
}