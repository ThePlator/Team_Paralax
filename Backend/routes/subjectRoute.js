import express from "express";
import {
  createSubjectController,
  updateSubjectController,
  SubjectController,
  deleteSubjectController,
} from "../controllers/subjectController.js";

const router = express.Router();

router.post("/create-subject", createSubjectController);

router.put("/update-subject/:id", updateSubjectController);

router.get("/get-subject", SubjectController);

router.delete(
  "/delete-subject/:id",

  deleteSubjectController
);

export default router;
