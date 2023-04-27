import { Request, Response } from "express";
import { Comment } from "../models/index.js";
import Joi from "joi";

export const getComments = async (req: Request, res: Response) => {
  const comments = await Comment.findAll();
  return res.status(200).send({ comments });
};

export const createComment = async (req: Request, res: Response) => {
  const { song_id, comment }: { song_id: string; comment: string } = req.body;
  try {
    await Joi.object({
      song_id: Joi.string().required().label("song id"),
      comment: Joi.string().required().label("comment"),
    }).validateAsync(req.body);
  } catch (error) {
    return res.status(400).send({ message: String(error) });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  const { comment_id } = req.params;
  const { comment }: { comment: string } = req.body;
  try {
    await Joi.object({
      comment: Joi.string().required().label("comment"),
    }).validateAsync(req.body);
  } catch (error) {
    return res.status(400).send({ message: String(error) });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  const { comment_id } = req.params;
  try {
    await Joi.object({
      comment: Joi.string().required().label("comment"),
    }).validateAsync(req.body);
  } catch (error) {
    return res.status(400).send({ message: String(error) });
  }
};
