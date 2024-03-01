import express from "express";
import {
  createTeacherController,
  updateTeacherController,
  teacherController,
  singleTeacherController,
  deleteTeacherController,
} from "../controllers/teacherController.js";

const router = express.Router();

router.post("/create-teacher", createTeacherController);

router.put("/update-teacher/:id", updateTeacherController);

router.get("/get-teacher", teacherController);

router.get("/single-teacher/:id", singleTeacherController);

router.delete(
  "/delete-teacher/:id",

  deleteTeacherController
);

export default router;
