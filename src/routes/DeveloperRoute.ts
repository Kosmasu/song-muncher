import express, { Router } from "express";
import {
  devLogin,
  devRegister,
  devForgorPassword,
  devTopUp,
  devBuyInfo,
  devBuyCsv,
} from "../controllers/DeveloperController.js";
const router: Router = express.Router();
import multer from "multer";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "storage/uploads/images");
  },
  filename(req, file, cb) {
    cb(
      null,
      req.body.username +
        file.originalname.substring(file.originalname.length - 4)
    );
  },
});

const upload = multer({ storage });

router.get("/login", devLogin);
router.post("/register", upload.single("image"), devRegister);
router.get("/forget", devForgorPassword);
router.post("/topup", devTopUp);
router.get("/song", devBuyInfo);
router.get("/csv", devBuyCsv);

export default router;
