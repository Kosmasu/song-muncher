import express from "express";
import { getSongs, getSong } from "../controllers/SongController.js";
const router = express.Router();
router.get("/", getSongs);
router.get("/:song_id", getSong);
export default router;
