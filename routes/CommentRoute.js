import express from "express";
import { getComments, createComment, updateComment, deleteComment, } from "../controllers/CommentController.js";
const router = express.Router();
router.get("/", getComments);
router.post("/", createComment);
router.patch("/:comment_id", updateComment);
router.delete("/:comment_id", deleteComment);
export default router;
