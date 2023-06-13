import express from "express";
import { devLogin, devRegister, devResetPassword, devTopUp, devBuyInfo, devBuyCsv, } from "../controllers/DeveloperController.js";
const router = express.Router();
import multer from "multer";
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "storage/uploads/images");
    },
    filename(req, file, cb) {
        cb(null, req.body.username +
            file.originalname.substring(file.originalname.length - 4));
    },
});
const upload = multer({ storage });
router.get("/login", devLogin);
router.post("/register", upload.single("image"), devRegister);
router.put("/resetpassword", devResetPassword);
router.post("/topup", devTopUp);
router.get("/song", devBuyInfo);
router.get("/csv", devBuyCsv);
export default router;
