import express, { Router } from "express";
import { getSong } from "../controllers/SongController.js";
const router: Router = express.Router();

router.get("/:song_id", getSong)

export default router;