import express from "express";
import { AddUserRating, getUserCourseProgress, getUserData, purchaseCourse, updateUserCourseProgress, userEnrolledCourses } from "../controllers/userController.js";


const userRouter = express.Router();

// 🔐 Protect the routes
userRouter.get("/data",  getUserData);
userRouter.get("/enrolled-courses",  userEnrolledCourses);
userRouter.post("/purchase",  purchaseCourse);

userRouter.post("/update-course-progress", updateUserCourseProgress)
userRouter.post("/get-course-progress", getUserCourseProgress)
userRouter.post("/add-rating", AddUserRating)

export default userRouter;
