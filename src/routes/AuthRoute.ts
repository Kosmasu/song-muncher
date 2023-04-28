import express, { Router } from "express";
import { login, callbackLogin, refreshToken } from "../controllers/AuthController.js";
const router: Router = express.Router();

router.post("/login", login);
router.post("/callback-login", callbackLogin);
router.post("/refresh-token", refreshToken);

export default router;