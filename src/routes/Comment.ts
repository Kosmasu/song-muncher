import express, {Router} from "express";
import {createComment, updateComment, deleteComment} from "../controllers/CommentController";
const router: Router = express.Router();

router.get("/", createComment);
router.put("/:comment_id", updateComment);
router.delete("/:delete_comment", deleteComment);

export default router;