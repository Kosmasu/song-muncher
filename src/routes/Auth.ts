import express from "express";
import { login, callbackLogin } from "../controllers/AuthController.js";
const router = express.Router();

router.get("/login", login);
router.get("/callback-login", callbackLogin);

export default router;