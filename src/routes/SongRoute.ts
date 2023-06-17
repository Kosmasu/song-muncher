import express, { Router } from "express";
import { getSongs, getSong ,getSelfData} from "../controllers/SongController.js";
const router: Router = express.Router();

router.get("/", getSongs)
router.get("/selfdata",getSelfData)
router.get("/:song_id", getSong)

export default router;