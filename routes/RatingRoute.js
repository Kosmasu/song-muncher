import express from "express";
import { createRating, deleteRating, updateRating } from "../controllers/RatingController.js";
const router = express.Router();
router.post("/", createRating);
router.patch("/:rating_id", updateRating);
router.delete("/:rating_id", deleteRating);
export default router;
