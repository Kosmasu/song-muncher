import { Request, Response } from "express";
import Joi from "joi";
import { getUserID } from "./UserController";

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
  const user_id = await getUserID(req.headers.authorization as string);
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
