import express from "express";
import { login, callbackLogin, refreshToken } from "../controllers/AuthController.js";
const router = express.Router();
router.get("/login", login);
router.get("/callback-login", callbackLogin);
router.get("/refresh-token", refreshToken);
export default router;
