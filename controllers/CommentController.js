import Joi from "joi";
import { getUserID } from "./UserController.js";
import { isSongExist } from "./SongController.js";
import { Comment } from "../models/index.js";
export const getComments = async (req, res) => {
    const comments = await Comment.findAll();
    return res.status(200).send({ comments });
};
export const createComment = async (req, res, next) => {
    const { song_id, comment } = req.body;
    try {
        await Joi.object({
            song_id: Joi.string().required().label("song id"),
            comment: Joi.string().required().label("comment"),
        }).validateAsync(req.body);
        const user_id = await getUserID(req.headers.authorization);
        await isSongExist(song_id, req.headers.authorization);
        const createComment = await Comment.create({
            song_id,
            comment,
            user_id,
        });
        return res.status(201).send({
            message: "Successfully created a new comment!",
            comment: createComment,
        });
    }
    catch (error) {
        next(error);
    }
};
export const updateComment = async (req, res, next) => {
    const { comment } = req.body;
    const { comment_id } = req.params;
    try {
        await Joi.object({
            comment: Joi.string().required().label("comment"),
        }).validateAsync(req.body);
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
    }
    catch (error) {
        next(error);
    }
};
export const deleteComment = async (req, res, next) => {
    const { comment_id } = req.params;
    try {
        const commentDelete = await Comment.findByPk(comment_id);
        if (!commentDelete) {
            return res.status(404).send({ message: "Comment is not found!" });
        }
        await commentDelete.destroy();
        return res.status(200).send({
            message: "Comment is successfully deleted!",
            comment: commentDelete,
        });
    }
    catch (error) {
        next(error);
    }
};
