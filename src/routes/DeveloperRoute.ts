import express, { Router } from "express";
import { devLogin,devRegister,devForgorPassword,devTopUp,devBuyInfo } from "../controllers/DeveloperController.js";
const router: Router = express.Router();

router.get("/login", devLogin);
router.get("/register", devRegister);
router.get("/forget", devForgorPassword);
router.get("/topup", devTopUp);
router.get("/info/:song_id", devBuyInfo);


export default router;