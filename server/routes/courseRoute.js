// routes/courseRoute.js
import express from "express";
import { getAllCourse, getCourseId } from "../controllers/courseController.js";

const courseRouter = express.Router();

courseRouter.get("/all", getAllCourse);
courseRouter.get("/:id", getCourseId); // This MUST be /:id to match the controller

export default courseRouter;

