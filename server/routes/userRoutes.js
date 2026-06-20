import express from "express";
import {
  getUserData,
  purchaseCourse,
  userEnrolledCourses,
  updateUserCourseProgress,
  getUserCourseProgress,
  addUserRating,
} from "../controllers/userController.js";
import { protectUser } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/data", protectUser, getUserData);
userRouter.post("/purchase", protectUser, purchaseCourse);
userRouter.get("/enrolled-courses", protectUser, userEnrolledCourses);

// ✅ MATCHES Player.jsx fetch call
userRouter.post("/update-course-progress", protectUser, updateUserCourseProgress);

userRouter.post("/course-progress/get", protectUser, getUserCourseProgress);
userRouter.post("/rating", protectUser, addUserRating);

export default userRouter;