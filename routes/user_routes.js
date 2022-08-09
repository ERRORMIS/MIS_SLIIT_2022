import express from "express";
const router = express.Router();
import multer from "multer";

import rateLimiter from "express-rate-limit";
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

//file upload manager
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

import {
  register,
  getUserByID,
  updateUser,
  updateProfileImage,
  getAllStaff,
  getAllAlumni,
  getAllPartner,
  getAllStudent
} from "../controllers/user_controller.js";

import authenticateUser from "../middleware/auth.js";

router.route("/register").post(apiLimiter, register);
router.route("/getUserByID").post(apiLimiter, getUserByID);
router.route("/updateUser").post(apiLimiter, updateUser);
router
  .route("/updateProfileImg")
  .post(apiLimiter, upload.single("photo"), updateProfileImage);
router.route("/getAllStaff").get(getAllStaff);
router.route("/getAllAlumni").get(getAllAlumni);
router.route("/getAllPartner").get(getAllPartner);
router.route("/getAllStudent").get(getAllStudent);

export default router;
