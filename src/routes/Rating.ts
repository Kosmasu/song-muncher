import express, { Router } from "express";
import { createRating, deleteRating, updateRating } from "../controllers/RatingController";
const router: Router = express.Router();

router.post("/", createRating);
router.put("/:rating_id", updateRating);
router.delete("/:delete_rating", deleteRating);

export default router;