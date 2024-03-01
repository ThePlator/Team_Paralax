import express from "express";
import {
  createClassController,
  updateClassController,
  classController,
  deleteClassController,
} from "../controllers/classController.js";

const router = express.Router();

router.post("/create-class", createClassController);

router.put("/update-class/:id", updateClassController);

router.get("/get-class", classController);

router.delete(
  "/delete-class/:id",

  deleteClassController
);

export default router;
