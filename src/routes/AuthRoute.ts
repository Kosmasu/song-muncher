import express, { Router } from "express";
import { login, callbackLogin } from "../controllers/AuthController.js";
const router: Router = express.Router();

router.get("/login", login);
router.get("/callback-login", callbackLogin);

export default router;