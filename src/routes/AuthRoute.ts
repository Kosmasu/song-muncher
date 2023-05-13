import express, { Router } from "express";
import { login, callbackLogin, refreshToken } from "../controllers/AuthController.js";
const router: Router = express.Router();

router.get("/login", login);
router.get("/callback-login", callbackLogin);
router.get("/refresh-token", refreshToken);

export default router;