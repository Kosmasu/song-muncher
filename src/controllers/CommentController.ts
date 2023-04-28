import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { getUserID } from "./UserController.js";
import { isSongExist } from "./SongController.js";
import { Comment } from "../models/index.js";

export const getComments = async (req: Request, res: Response) => {
  const comments = await Comment.findAll();
  return res.status(200).send({ comments });
};

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { song_id, comment }: { song_id: string; comment: string } = req.body;
  try {
    await Joi.object({
      song_id: Joi.string().required().label("song id"),
      comment: Joi.string().required().label("comment"),
    }).validateAsync(req.body);
  } catch (error) {
    return res.status(400).send({ message: String(error) });
  }
  try {
    const user_id = await getUserID(req.headers.authorization as string);
    await isSongExist(song_id, req.headers.authorization as string);
    const createComment = await Comment.create({
      song_id,
      comment,
      user_id,
    });
    return res.status(201).send({
      message: "Successfully created a new comment!",
      comment: createComment,
    });
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { comment }: { comment: string } = req.body;
  const { comment_id } = req.params;
  try {
    await Joi.object({
      comment: Joi.string().required().label("comment"),
    }).validateAsync(req.body);
  } catch (error) {
    return res.status(400).send({ message: String(error) });
  }
  try {
    const commentUpdate = await Comment.findByPk(comment_id);
    if (!commentUpdate) {
      return res.status(404).send({ message: "Comment is not found!" });
    }
    commentUpdate.comment = comment;
    await commentUpdate.save();
    return res.status(200).send({
      message: "Comment is successfully updated!",
      comment: commentUpdate,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { comment_id } = req.params;
  try {
    const commentDelete = await Comment.findByPk(comment_id);
    if (!commentDelete) {
      return res.status(404).send({ message: "Comment is not found!" });
    }
    await commentDelete.destroy();
    return res.status(201).send({
      message: "Comment is successfully deleted!",
      comment: commentDelete,
    });
  } catch (error) {
    next(error);
  }
};
