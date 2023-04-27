import express, { Router } from "express";
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/CommentController.js";
const router: Router = express.Router();

router.get("/", getComments);
router.post("/", createComment);
router.put("/:comment_id", updateComment);
router.delete("/:delete_comment", deleteComment);

export default router;
